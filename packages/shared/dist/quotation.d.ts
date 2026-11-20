import { BlueprintJSON, LevelDefinition, MaterialType } from './schemas';
export interface BOMEntry {
    material: MaterialType;
    name: string;
    count: number;
    totalLengthM: number;
    totalCost: number;
}
export interface BlueprintQuotation {
    totalCost: number;
    budgetCap?: number;
    isOverBudget: boolean;
    bom: Record<MaterialType, BOMEntry>;
    illegalLengths: {
        memberId: string;
        lengthM: number;
        maxLenM: number;
    }[];
    noBuildViolations: string[];
    unlockedMaterialViolations: string[];
    isValid: boolean;
}
export declare function calculateBlueprintQuotation(blueprint: BlueprintJSON, level?: LevelDefinition): BlueprintQuotation;
export declare function evaluateStarRating(totalCost: number, brokenCount: number, peakStressPct: number, level: LevelDefinition): number;
//# sourceMappingURL=quotation.d.ts.map