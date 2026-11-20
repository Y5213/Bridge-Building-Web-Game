import { describe, it, expect } from 'vitest';
import { CAMPAIGN_LEVELS, getReferenceHintBlueprint } from '../levels';
import { BlueprintJSON, LevelDefinition } from '../schemas';
import { SimulationRunner } from '../physics/simulationRunner';

/**
 * Builds an unbraced flat road bridge across the level's span
 */
function buildUnbracedFlatRoad(level: LevelDefinition): BlueprintJSON {
  const span = level.spanM;
  const elev = level.elevationStepM;
  const numSegs = Math.ceil(span / 2.0);
  const dx = span / numSegs;
  const dy = elev / numSegs;

  const nodes = [];
  const members = [];

  for (let i = 0; i <= numSegs; i++) {
    const isAnchor = i === 0 || i === numSegs;
    nodes.push({
      id: `road_node_${i}`,
      x: i * dx,
      y: i * dy,
      isAnchor
    });
  }

  for (let i = 0; i < numSegs; i++) {
    members.push({
      id: `road_member_${i}`,
      nodeAId: `road_node_${i}`,
      nodeBId: `road_node_${i + 1}`,
      material: 'road' as const
    });
  }

  return { nodes, members };
}

/**
 * Builds the verified reference engineered bridge for each level
 */
function buildReferenceEngineeredBridge(level: LevelDefinition): BlueprintJSON {
  return getReferenceHintBlueprint(level.id);
}

describe('8-Level Campaign Solvability Gate', () => {
  for (const level of CAMPAIGN_LEVELS) {
    describe(`Level ${level.id}: ${level.name} (${level.spanM}m gap)`, () => {
      it('Unbraced flat road collapses on this level', () => {
        const flatRoad = buildUnbracedFlatRoad(level);
        const result = SimulationRunner.run(flatRoad, level);
        expect(result.passed).toBe(false);
      });

      it('Reference engineered bridge passes under budget with zero broken members and peak stress < 90%', () => {
        const engineeredBridge = buildReferenceEngineeredBridge(level);
        const result = SimulationRunner.run(engineeredBridge, level);

        if (!result.passed) {
          console.log(`[Level ${level.id} Fail Diagnostic]`, {
            failReason: result.failReason,
            totalCost: result.totalCost,
            budgetCap: level.budgetCap,
            peakStressPct: result.peakStressPct,
            brokenCount: result.brokenCount,
            brokenMembers: result.brokenMemberIds
          });
        }

        expect(result.passed).toBe(true);
        expect(result.brokenCount).toBe(0);
        expect(result.totalCost).toBeLessThanOrEqual(level.budgetCap);
        expect(result.peakStressPct).toBeLessThan(90.0);
      });
    });
  }
});
