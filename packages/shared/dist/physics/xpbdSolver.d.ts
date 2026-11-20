import { MaterialDef } from '../materials';
import { MaterialType } from '../schemas';
export interface SimNode {
    id: string;
    x: number;
    y: number;
    prevX: number;
    prevY: number;
    vx: number;
    vy: number;
    invMass: number;
    mass: number;
    isAnchor: boolean;
    isPier: boolean;
    appliedForceY?: number;
}
export interface SimMember {
    id: string;
    nodeA: SimNode;
    nodeB: SimNode;
    material: MaterialDef;
    restLengthM: number;
    lagrangeMultiplier: number;
    axialForceN: number;
    stressRatio: number;
    broken: boolean;
    failMode: 'none' | 'tension' | 'buckling';
}
export interface WheelParticle {
    id: string;
    x: number;
    y: number;
    prevX: number;
    prevY: number;
    vx: number;
    vy: number;
    invMass: number;
    radiusM: number;
    grounded: boolean;
    groundTangentX: number;
    groundTangentY: number;
}
export interface ChassisParticle {
    id: string;
    x: number;
    y: number;
    prevX: number;
    prevY: number;
    vx: number;
    vy: number;
    invMass: number;
}
export interface InternalSpring {
    pA: {
        x: number;
        y: number;
        prevX: number;
        prevY: number;
        invMass: number;
    };
    pB: {
        x: number;
        y: number;
        prevX: number;
        prevY: number;
        invMass: number;
    };
    restLengthM: number;
    compliance: number;
    damping: number;
    lagrangeMultiplier: number;
}
export declare class XPBDSolver {
    readonly gravity = 9.81;
    readonly fixedDt: number;
    readonly substeps = 24;
    readonly iterations = 2;
    readonly h: number;
    readonly betaDamp = 0.0012;
    readonly minNodeMassFloor = 40;
    readonly airRetentionNodes = 0.999;
    readonly airRetentionVehicles = 0.9995;
    nodes: SimNode[];
    members: SimMember[];
    wheels: WheelParticle[];
    chassisParticles: ChassisParticle[];
    vehicleSprings: InternalSpring[];
    onMemberFracture?: (member: SimMember, timeSec: number) => void;
    peakStressEver: number;
    brokenCount: number;
    simTime: number;
    constructor();
    /**
     * Initializes or rebuilds the simulation mesh from blueprint nodes and members.
     */
    loadBridge(nodesData: {
        id: string;
        x: number;
        y: number;
        isAnchor: boolean;
        isPier?: boolean;
    }[], membersData: {
        id: string;
        nodeAId: string;
        nodeBId: string;
        material: MaterialType;
    }[]): void;
    /**
     * Advance the simulation by one full frame (1/60s) via 24 substeps
     */
    stepFrame(): void;
    /**
     * Compliant axial constraint projection with Rayleigh damping
     */
    private projectTrussMembers;
    /**
     * Internal vehicle suspension and chassis structural constraints
     */
    private projectVehicleInternalSprings;
    /**
     * Single-Best Voronoi Face-Normal Contact Resolution.
     * Eliminates wheel tire snagging across contiguous road beams.
     */
    private resolveVoronoiWheelDeckContact;
    /**
     * Recovers axial forces in Newtons from Lagrange multipliers: F = -lambda / h^2
     * Evaluates Euler buckling and fractures members exceeding capacity.
     */
    private evaluateMemberForces;
}
//# sourceMappingURL=xpbdSolver.d.ts.map