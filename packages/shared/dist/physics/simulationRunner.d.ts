import { BlueprintJSON, LevelDefinition } from '../schemas';
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
export declare class SimulationRunner {
    static run(blueprint: BlueprintJSON, level: LevelDefinition, maxDurationSec?: number): SimulationResult;
}
//# sourceMappingURL=simulationRunner.d.ts.map