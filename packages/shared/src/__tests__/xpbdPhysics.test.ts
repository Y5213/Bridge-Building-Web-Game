import { describe, it, expect } from 'vitest';
import { XPBDSolver } from '../physics/xpbdSolver';
import { MATERIALS, computeEulerBucklingLimit } from '../materials';
import { VehicleInstance } from '../physics/vehicleModel';
import { CAMPAIGN_LEVELS } from '../levels';

describe('XPBD Physics Engine & Material Verification', () => {
  it('Analytical static equilibrium: 2-bar 45-degree steel arch under 40 kN apex load matches within 0.2%', () => {
    const solver = new XPBDSolver();

    // 45-degree arch: base anchors at (-2, 0) and (2, 0), apex at (0, 2)
    // theta = 45 deg, sin(45) = 1 / sqrt(2)
    const span = 2.0;
    const height = 2.0;
    const theta = Math.PI / 4;

    solver.loadBridge(
      [
        { id: 'left_anchor', x: -span, y: 0, isAnchor: true },
        { id: 'right_anchor', x: span, y: 0, isAnchor: true },
        { id: 'apex', x: 0, y: height, isAnchor: false }
      ],
      [
        { id: 'beam_left', nodeAId: 'left_anchor', nodeBId: 'apex', material: 'steel' },
        { id: 'beam_right', nodeAId: 'right_anchor', nodeBId: 'apex', material: 'steel' }
      ]
    );

    const apexNode = solver.nodes.find((n) => n.id === 'apex')!;
    const apexMass = apexNode.mass;

    // Apply downward 40 kN vertical load on apex continuously
    const loadN = 40000;
    apexNode.appliedForceY = -loadN;

    // Run 300 steps (5 seconds) to achieve static equilibrium
    for (let s = 0; s < 300; s++) {
      solver.stepFrame();
    }

    // Analytical compression force in each bar:
    // F_exact = -(P + m_apex * 9.81) / (2 * sin(theta))
    const totalDownForce = loadN + apexMass * solver.gravity;
    const exactForce = -totalDownForce / (2 * Math.sin(theta));

    const beamLeft = solver.members[0];
    const beamRight = solver.members[1];

    const relErrorLeft = Math.abs(beamLeft.axialForceN - exactForce) / Math.abs(exactForce);
    const relErrorRight = Math.abs(beamRight.axialForceN - exactForce) / Math.abs(exactForce);

    expect(relErrorLeft).toBeLessThan(0.002); // Under 0.2% error
    expect(relErrorRight).toBeLessThan(0.002);
  });

  it('Cable slack invariant: compressed cable (dist < L0) exerts exact 0.00 kN compressive force', () => {
    const solver = new XPBDSolver();
    solver.loadBridge(
      [
        { id: 'top_anchor', x: 0, y: 10, isAnchor: true },
        { id: 'joint', x: 0, y: 2, isAnchor: false }
      ],
      [
        { id: 'cable_1', nodeAId: 'top_anchor', nodeBId: 'joint', material: 'cable' }
      ]
    );

    const joint = solver.nodes.find((n) => n.id === 'joint')!;
    // Push joint upward so distance is 5 m instead of restLength 8 m
    joint.y = 5.0;

    // Step 20 frames
    for (let i = 0; i < 20; i++) {
      solver.stepFrame();
    }

    const cable = solver.members[0];
    // Slack cable must have 0 force
    expect(cable.axialForceN).toBe(0);
    expect(cable.stressRatio).toBe(0);
    expect(cable.broken).toBe(false);
  });

  it('Euler buckling calibration: wood strut under 60 kN compression survives at 1.4 m and buckles at 2.4 m', () => {
    const mat = MATERIALS.wood;

    // 1. Short strut: L = 1.4 m
    const capShort = computeEulerBucklingLimit(mat, 1.4);
    // 60 kN load vs capacity:
    expect(capShort).toBeGreaterThan(60000); // Survives 60 kN!

    // 2. Slender strut: L = 2.4 m
    const capSlender = computeEulerBucklingLimit(mat, 2.4);
    // Euler limit drops: pi^2 * 3.4e4 / (2.4)^2 = 335570 / 5.76 = ~58.2 kN
    expect(capSlender).toBeLessThan(60000); // Buckles under 60 kN!
  });

  it('Single-Best Voronoi Face-Normal contact prevents tire snagging on road joints', () => {
    const solver = new XPBDSolver();

    // Create a 2-segment chained road: (0, 0) -> (2, 0) -> (4, 0)
    solver.loadBridge(
      [
        { id: 'n0', x: 0, y: 0, isAnchor: true },
        { id: 'n1', x: 2, y: 0, isAnchor: false },
        { id: 'n2', x: 4, y: 0, isAnchor: true }
      ],
      [
        { id: 'r0', nodeAId: 'n0', nodeBId: 'n1', material: 'road' },
        { id: 'r1', nodeAId: 'n1', nodeBId: 'n2', material: 'road' }
      ]
    );

    const level1 = CAMPAIGN_LEVELS[0];
    const vehicle = new VehicleInstance(level1.vehicles[0], 0.5, 0.0);
    vehicle.attachToSolver(solver);

    // Roll vehicle across the intermediate joint at x = 2.0
    for (let f = 0; f < 60; f++) {
      vehicle.updateDrive(solver.fixedDt);
      solver.stepFrame();
    }

    // Vehicle front wheel should have rolled past x = 2.0 with positive forward speed
    expect(vehicle.getMaxX()).toBeGreaterThan(2.2);
    for (const w of vehicle.wheels) {
      expect(w.vx).toBeGreaterThan(0); // Never kicked backward horizontally!
    }
  });

  it('Determinism check: running simulation twice produces bit-identical final coordinates and peak stress', () => {
    const level1 = CAMPAIGN_LEVELS[0];
    const blueprint = {
      nodes: [
        { id: 'a0', x: 0, y: 0, isAnchor: true },
        { id: 'a1', x: 8, y: 0, isAnchor: true },
        { id: 'n1', x: 2, y: 0, isAnchor: false },
        { id: 'n2', x: 4, y: 0, isAnchor: false },
        { id: 'n3', x: 6, y: 0, isAnchor: false }
      ],
      members: [
        { id: 'm0', nodeAId: 'a0', nodeBId: 'n1', material: 'road' as const },
        { id: 'm1', nodeAId: 'n1', nodeBId: 'n2', material: 'road' as const },
        { id: 'm2', nodeAId: 'n2', nodeBId: 'n3', material: 'road' as const },
        { id: 'm3', nodeAId: 'n3', nodeBId: 'a1', material: 'road' as const }
      ]
    };

    const runSim = () => {
      const solver = new XPBDSolver();
      solver.loadBridge(blueprint.nodes, blueprint.members);
      const vi = new VehicleInstance(level1.vehicles[0], -0.5, 0.0);
      vi.attachToSolver(solver);

      for (let f = 0; f < 30; f++) {
        vi.updateDrive(solver.fixedDt);
        solver.stepFrame();
      }

      return {
        peakStress: solver.peakStressEver,
        nodePos: solver.nodes.map((n) => ({ x: n.x, y: n.y }))
      };
    };

    const runA = runSim();
    const runB = runSim();

    expect(runA.peakStress).toBe(runB.peakStress);
    for (let i = 0; i < runA.nodePos.length; i++) {
      expect(runA.nodePos[i].x).toBe(runB.nodePos[i].x);
      expect(runA.nodePos[i].y).toBe(runB.nodePos[i].y);
    }
  });
});
