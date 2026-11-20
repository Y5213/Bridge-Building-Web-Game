import { BlueprintJSON, LevelDefinition } from '../schemas';
import { XPBDSolver } from './xpbdSolver';
import { VehicleInstance } from './vehicleModel';
import { calculateBlueprintQuotation, evaluateStarRating } from '../quotation';

export interface SimulationResult {
  passed: boolean;
  brokenCount: number;
  brokenMemberIds?: string[];
  peakStressPct: number;
  crossingTimeSec: number;
  totalCost: number;
  starRating: number;
  failReason?: 'collapse' | 'submerged' | 'stalled' | 'over_budget' | 'illegal_geometry';
}

export class SimulationRunner {
  static run(
    blueprint: BlueprintJSON,
    level: LevelDefinition,
    maxDurationSec = 16.0
  ): SimulationResult {
    // 1. Validate quotation & constraints first
    const quotation = calculateBlueprintQuotation(blueprint, level);
    if (!quotation.isValid) {
      if (process.env.DEBUG_GATE) {
        console.log(`[Level ${level.id} Invalid Details]`, {
          illegalLengths: quotation.illegalLengths,
          noBuildViolations: quotation.noBuildViolations,
          unlockedMaterialViolations: quotation.unlockedMaterialViolations
        });
      }
      return {
        passed: false,
        brokenCount: 0,
        peakStressPct: 0,
        crossingTimeSec: 0,
        totalCost: quotation.totalCost,
        starRating: 0,
        failReason: 'illegal_geometry'
      };
    }

    if (quotation.isOverBudget) {
      return {
        passed: false,
        brokenCount: 0,
        peakStressPct: 0,
        crossingTimeSec: 0,
        totalCost: quotation.totalCost,
        starRating: 0,
        failReason: 'over_budget'
      };
    }

    // 2. Initialize Solver & Load Bridge
    const solver = new XPBDSolver();
    solver.loadBridge(blueprint.nodes, blueprint.members);

    // 3. Initialize Vehicles
    // For convoy, space them out
    const vehicleInstances: { instance: VehicleInstance; crossed: boolean; spawnTime: number }[] = [];
    let currentSpawnTime = 0.0;

    for (let v = 0; v < level.vehicles.length; v++) {
      const vConfig = level.vehicles[v];
      const startX = -1.5 - v * 4.5;
      const startY = 0.0;
      const inst = new VehicleInstance(vConfig, startX, startY);
      inst.attachToSolver(solver);
      vehicleInstances.push({
        instance: inst,
        crossed: false,
        spawnTime: currentSpawnTime
      });
      currentSpawnTime += 2.0;
    }

    const dt = solver.fixedDt;
    const maxSteps = Math.ceil(maxDurationSec / dt);

    const targetEndX = level.spanM + 1.2;
    let peakStressEver = 0;
    let allCrossed = false;
    let elapsedSec = 0;

    for (let step = 0; step < maxSteps; step++) {
      elapsedSec = step * dt;

      // Update motor propulsion
      for (const vi of vehicleInstances) {
        if (!vi.crossed) {
          vi.instance.updateDrive(dt);
        }
      }

      // Step physics
      solver.stepFrame();

      if (solver.peakStressEver > peakStressEver) {
        peakStressEver = solver.peakStressEver;
      }

      // Check vehicle progress & failure conditions
      let activeVehiclesAllCrossed = true;

      for (const vi of vehicleInstances) {
        const v = vi.instance;

        // Check canyon plunge / water immersion
        if (v.getMinY() < level.waterLevelY + 0.6) {
          return {
            passed: false,
            brokenCount: solver.brokenCount,
            brokenMemberIds: solver.members.filter((m) => m.broken).map((m) => m.id),
            peakStressPct: peakStressEver * 100,
            crossingTimeSec: elapsedSec,
            totalCost: quotation.totalCost,
            starRating: 0,
            failReason: 'submerged'
          };
        }

        // Check if this vehicle reached the right approach
        if (v.getMinX() >= targetEndX) {
          vi.crossed = true;
        } else {
          activeVehiclesAllCrossed = false;
        }
      }

      if (activeVehiclesAllCrossed) {
        allCrossed = true;
        break;
      }

      // Check catastrophic collapse (e.g. all road members broken)
      const intactRoads = solver.members.filter((m) => m.material.isDrivable && !m.broken);
      if (intactRoads.length === 0 && !allCrossed) {
        return {
          passed: false,
          brokenCount: solver.brokenCount,
          peakStressPct: peakStressEver * 100,
          crossingTimeSec: elapsedSec,
          totalCost: quotation.totalCost,
          starRating: 0,
          failReason: 'collapse'
        };
      }
    }

    const peakStressPct = peakStressEver * 100;
    const passed = allCrossed && quotation.totalCost <= level.budgetCap;
    const stars = passed
      ? evaluateStarRating(quotation.totalCost, solver.brokenCount, peakStressPct, level)
      : 0;

    return {
      passed,
      brokenCount: solver.brokenCount,
      peakStressPct,
      crossingTimeSec: elapsedSec,
      totalCost: quotation.totalCost,
      starRating: stars,
      failReason: passed ? undefined : (allCrossed ? 'over_budget' : 'stalled')
    };
  }
}
