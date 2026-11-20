import { computeNormalizedStress, MATERIALS } from '../materials';
export class XPBDSolver {
    // Solver constants
    gravity = 9.81; // m/s^2 (Y-up)
    fixedDt = 1 / 60;
    substeps = 24;
    iterations = 2;
    h; // dt / substeps
    betaDamp = 0.0012; // Structural Rayleigh damping
    minNodeMassFloor = 40.0; // kg
    airRetentionNodes = 0.999;
    airRetentionVehicles = 0.9995;
    nodes = [];
    members = [];
    wheels = [];
    chassisParticles = [];
    vehicleSprings = [];
    // Fracture callback
    onMemberFracture;
    peakStressEver = 0;
    brokenCount = 0;
    simTime = 0;
    constructor() {
        this.h = this.fixedDt / this.substeps;
    }
    /**
     * Initializes or rebuilds the simulation mesh from blueprint nodes and members.
     */
    loadBridge(nodesData, membersData) {
        this.nodes = [];
        this.members = [];
        this.peakStressEver = 0;
        this.brokenCount = 0;
        this.simTime = 0;
        const nodeMap = new Map();
        for (const nd of nodesData) {
            const node = {
                id: nd.id,
                x: nd.x,
                y: nd.y,
                prevX: nd.x,
                prevY: nd.y,
                vx: 0,
                vy: 0,
                invMass: nd.isAnchor ? 0 : 1 / this.minNodeMassFloor,
                mass: nd.isAnchor ? Infinity : this.minNodeMassFloor,
                isAnchor: nd.isAnchor,
                isPier: nd.isPier || false
            };
            this.nodes.push(node);
            nodeMap.set(node.id, node);
        }
        // Accumulate incident member masses onto nodes
        const nodeMassAccum = new Map();
        for (const nd of nodesData) {
            nodeMassAccum.set(nd.id, 0);
        }
        for (const md of membersData) {
            const na = nodeMap.get(md.nodeAId);
            const nb = nodeMap.get(md.nodeBId);
            if (!na || !nb)
                continue;
            const dx = nb.x - na.x;
            const dy = nb.y - na.y;
            const restLen = Math.sqrt(dx * dx + dy * dy);
            const mat = MATERIALS[md.material];
            const halfMass = 0.5 * (mat.massKgPerM * restLen);
            nodeMassAccum.set(na.id, (nodeMassAccum.get(na.id) || 0) + halfMass);
            nodeMassAccum.set(nb.id, (nodeMassAccum.get(nb.id) || 0) + halfMass);
            this.members.push({
                id: md.id,
                nodeA: na,
                nodeB: nb,
                material: mat,
                restLengthM: restLen,
                lagrangeMultiplier: 0,
                axialForceN: 0,
                stressRatio: 0,
                broken: false,
                failMode: 'none'
            });
        }
        // Apply accumulated mass with 40 kg numerical floor
        for (const n of this.nodes) {
            if (!n.isAnchor) {
                const totalMass = Math.max(this.minNodeMassFloor, nodeMassAccum.get(n.id) || this.minNodeMassFloor);
                n.mass = totalMass;
                n.invMass = 1.0 / totalMass;
            }
        }
    }
    /**
     * Advance the simulation by one full frame (1/60s) via 24 substeps
     */
    stepFrame() {
        const h = this.h;
        const g = this.gravity;
        for (let sub = 0; sub < this.substeps; sub++) {
            this.simTime += h;
            // 1. Symplectic Prediction
            for (let i = 0; i < this.nodes.length; i++) {
                const n = this.nodes[i];
                if (n.invMass === 0)
                    continue;
                n.prevX = n.x;
                n.prevY = n.y;
                // Integrate gravity + external force
                const extAccY = (n.appliedForceY || 0) * n.invMass;
                n.vy += (extAccY - g) * h;
                // Position prediction
                n.x += n.vx * h;
                n.y += n.vy * h;
            }
            // Vehicles prediction
            for (let i = 0; i < this.wheels.length; i++) {
                const w = this.wheels[i];
                w.prevX = w.x;
                w.prevY = w.y;
                w.vy -= g * h;
                w.x += w.vx * h;
                w.y += w.vy * h;
                w.grounded = false;
            }
            for (let i = 0; i < this.chassisParticles.length; i++) {
                const c = this.chassisParticles[i];
                c.prevX = c.x;
                c.prevY = c.y;
                c.vy -= g * h;
                c.x += c.vx * h;
                c.y += c.vy * h;
            }
            // Reset Lagrange multipliers for this substep
            for (let i = 0; i < this.members.length; i++) {
                this.members[i].lagrangeMultiplier = 0;
            }
            for (let i = 0; i < this.vehicleSprings.length; i++) {
                this.vehicleSprings[i].lagrangeMultiplier = 0;
            }
            // 2. Constraint Projection Passes (Gauss-Seidel)
            for (let iter = 0; iter < this.iterations; iter++) {
                this.projectTrussMembers(h);
                this.projectVehicleInternalSprings(h);
                this.resolveVoronoiWheelDeckContact();
            }
            // 3. Velocity Derivation & Air Retention
            for (let i = 0; i < this.nodes.length; i++) {
                const n = this.nodes[i];
                if (n.invMass === 0)
                    continue;
                n.vx = ((n.x - n.prevX) / h) * this.airRetentionNodes;
                n.vy = ((n.y - n.prevY) / h) * this.airRetentionNodes;
            }
            for (let i = 0; i < this.wheels.length; i++) {
                const w = this.wheels[i];
                w.vx = ((w.x - w.prevX) / h) * this.airRetentionVehicles;
                w.vy = ((w.y - w.prevY) / h) * this.airRetentionVehicles;
            }
            for (let i = 0; i < this.chassisParticles.length; i++) {
                const c = this.chassisParticles[i];
                c.vx = ((c.x - c.prevX) / h) * this.airRetentionVehicles;
                c.vy = ((c.y - c.prevY) / h) * this.airRetentionVehicles;
            }
            // 4. Axial Force Recovery & Fracture Detection
            this.evaluateMemberForces(h);
        }
    }
    /**
     * Compliant axial constraint projection with Rayleigh damping
     */
    projectTrussMembers(h) {
        const hSq = h * h;
        for (let i = 0; i < this.members.length; i++) {
            const m = this.members[i];
            if (m.broken)
                continue;
            const na = m.nodeA;
            const nb = m.nodeB;
            const dx = nb.x - na.x;
            const dy = nb.y - na.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d <= 1e-7)
                continue;
            const nx = dx / d;
            const ny = dy / d;
            // Stretch constraint C = d - L0
            const C = d - m.restLengthM;
            // Cable slack condition: skip projection when compressed
            if (m.material.type === 'cable' && C <= 0) {
                continue;
            }
            const alpha = m.restLengthM / m.material.axialStiffnessEA;
            const alphaTilde = alpha / hSq;
            // Axial relative displacement for Rayleigh damping
            const vRelN = ((nb.x - nb.prevX) - (na.x - na.prevX)) * nx +
                ((nb.y - nb.prevY) - (na.y - na.prevY)) * ny;
            const gamma = alphaTilde * (this.betaDamp / h);
            const wSum = na.invMass + nb.invMass;
            const deltaLambda = (-C - alphaTilde * m.lagrangeMultiplier - gamma * vRelN) /
                ((1.0 + gamma) * wSum + alphaTilde);
            m.lagrangeMultiplier += deltaLambda;
            // Position corrections
            if (na.invMass > 0) {
                na.x -= na.invMass * deltaLambda * nx;
                na.y -= na.invMass * deltaLambda * ny;
            }
            if (nb.invMass > 0) {
                nb.x += nb.invMass * deltaLambda * nx;
                nb.y += nb.invMass * deltaLambda * ny;
            }
        }
    }
    /**
     * Internal vehicle suspension and chassis structural constraints
     */
    projectVehicleInternalSprings(h) {
        const hSq = h * h;
        for (let i = 0; i < this.vehicleSprings.length; i++) {
            const s = this.vehicleSprings[i];
            const pa = s.pA;
            const pb = s.pB;
            const dx = pb.x - pa.x;
            const dy = pb.y - pa.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d <= 1e-7)
                continue;
            const nx = dx / d;
            const ny = dy / d;
            const C = d - s.restLengthM;
            const alphaTilde = s.compliance / hSq;
            const vRelN = ((pb.x - pb.prevX) - (pa.x - pa.prevX)) * nx +
                ((pb.y - pb.prevY) - (pa.y - pa.prevY)) * ny;
            const gamma = alphaTilde * (s.damping / h);
            const wSum = pa.invMass + pb.invMass;
            const deltaLambda = (-C - alphaTilde * s.lagrangeMultiplier - gamma * vRelN) /
                ((1.0 + gamma) * wSum + alphaTilde);
            s.lagrangeMultiplier += deltaLambda;
            if (pa.invMass > 0) {
                pa.x -= pa.invMass * deltaLambda * nx;
                pa.y -= pa.invMass * deltaLambda * ny;
            }
            if (pb.invMass > 0) {
                pb.x += pb.invMass * deltaLambda * nx;
                pb.y += pb.invMass * deltaLambda * ny;
            }
        }
    }
    /**
     * Single-Best Voronoi Face-Normal Contact Resolution.
     * Eliminates wheel tire snagging across contiguous road beams.
     */
    resolveVoronoiWheelDeckContact() {
        for (let w = 0; w < this.wheels.length; w++) {
            const wheel = this.wheels[w];
            const r = wheel.radiusM;
            let winningDist = Infinity;
            let winningIsInterior = false;
            let winningMember = null;
            let winningS = 0;
            let winningNormX = 0;
            let winningNormY = 1;
            let winningSignedH = 0;
            let winningTangentX = 1;
            let winningTangentY = 0;
            for (let m = 0; m < this.members.length; m++) {
                const mem = this.members[m];
                if (mem.broken || !mem.material.isDrivable)
                    continue;
                const na = mem.nodeA;
                const nb = mem.nodeB;
                const dx = nb.x - na.x;
                const dy = nb.y - na.y;
                const segLen = Math.sqrt(dx * dx + dy * dy);
                if (segLen <= 1e-6)
                    continue;
                const tx = dx / segLen;
                const ty = dy / segLen;
                // Upward unit face normal: (-ty, tx) pointing upwards
                let nx = -ty;
                let ny = tx;
                if (ny < 0) {
                    nx = -nx;
                    ny = -ny;
                }
                // Projection
                const rAx = wheel.x - na.x;
                const rAy = wheel.y - na.y;
                const sRaw = (rAx * tx + rAy * ty) / segLen;
                const sClamped = Math.max(0.0, Math.min(1.0, sRaw));
                const qx = na.x + sClamped * dx;
                const qy = na.y + sClamped * dy;
                const distVecX = wheel.x - qx;
                const distVecY = wheel.y - qy;
                const signedH = distVecX * nx + distVecY * ny;
                // Ignore contact if wheel is deep beneath the bridge (signedH < -0.22m)
                if (signedH < -0.22)
                    continue;
                const isInterior = sRaw >= 0.0 && sRaw <= 1.0;
                const dist = Math.sqrt(distVecX * distVecX + distVecY * distVecY);
                // Prioritize interior face projection first, closest distance second
                let isBetter = false;
                if (!winningMember) {
                    isBetter = true;
                }
                else if (isInterior && !winningIsInterior) {
                    isBetter = true;
                }
                else if (isInterior === winningIsInterior && dist < winningDist) {
                    isBetter = true;
                }
                if (isBetter) {
                    winningDist = dist;
                    winningIsInterior = isInterior;
                    winningMember = mem;
                    winningS = sClamped;
                    winningNormX = nx;
                    winningNormY = ny;
                    winningSignedH = signedH;
                    winningTangentX = tx;
                    winningTangentY = ty;
                }
            }
            // Resolve collision with the winning face normal
            if (winningMember && winningSignedH < r) {
                const na = winningMember.nodeA;
                const nb = winningMember.nodeB;
                const s = winningS;
                const wA = na.invMass;
                const wB = nb.invMass;
                const wEff = wheel.invMass + (1.0 - s) * (1.0 - s) * wA + s * s * wB;
                if (wEff > 0) {
                    const deltaLambdaC = (r - winningSignedH) / wEff;
                    // Apply correction along unit face normal
                    wheel.x += wheel.invMass * deltaLambdaC * winningNormX;
                    wheel.y += wheel.invMass * deltaLambdaC * winningNormY;
                    if (wA > 0) {
                        na.x -= (1.0 - s) * wA * deltaLambdaC * winningNormX;
                        na.y -= (1.0 - s) * wA * deltaLambdaC * winningNormY;
                    }
                    if (wB > 0) {
                        nb.x -= s * wB * deltaLambdaC * winningNormX;
                        nb.y -= s * wB * deltaLambdaC * winningNormY;
                    }
                    wheel.grounded = true;
                    wheel.groundTangentX = winningTangentX;
                    wheel.groundTangentY = winningTangentY;
                }
            }
        }
    }
    /**
     * Recovers axial forces in Newtons from Lagrange multipliers: F = -lambda / h^2
     * Evaluates Euler buckling and fractures members exceeding capacity.
     */
    evaluateMemberForces(h) {
        const hSq = h * h;
        for (let i = 0; i < this.members.length; i++) {
            const m = this.members[i];
            if (m.broken)
                continue;
            // Axial force: positive = tension, negative = compression
            const rawForceN = -m.lagrangeMultiplier / hSq;
            const forceN = Math.abs(rawForceN) < 1e-9 ? 0 : rawForceN;
            m.axialForceN = forceN;
            const evalResult = computeNormalizedStress(m.material, forceN, m.restLengthM);
            m.stressRatio = evalResult.stressRatio;
            m.failMode = evalResult.failMode;
            if (evalResult.stressRatio > this.peakStressEver) {
                this.peakStressEver = evalResult.stressRatio;
            }
            // Check fracture
            if (evalResult.stressRatio > 1.0) {
                m.broken = true;
                this.brokenCount++;
                if (this.onMemberFracture) {
                    this.onMemberFracture(m, this.simTime);
                }
            }
        }
    }
}
