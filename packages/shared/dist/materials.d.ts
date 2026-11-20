import { MaterialType } from './schemas';
export interface MaterialDef {
    type: MaterialType;
    name: string;
    costPerMeter: number;
    costPerM: number;
    maxLenM: number;
    massKgPerM: number;
    axialStiffnessEA: number;
    flexuralRigidityEI: number;
    maxTensionN: number;
    crushCompressionN: number;
    isDrivable: boolean;
    isRoad: boolean;
    isCable: boolean;
    color: string;
}
export declare const MATERIALS: Record<MaterialType, MaterialDef>;
export declare const MATERIAL_CATALOG: Record<"road" | "reinforced_road" | "wood" | "steel" | "cable", MaterialDef>;
/**
 * Computes compressive capacity under Euler buckling:
 * Cmax(L) = min(Ccrush, pi^2 * EI / max(L, 0.25)^2)
 * Cable carries 0.0 N in compression.
 */
export declare function computeEulerBucklingLimit(mat: MaterialDef, lengthM: number): number;
/**
 * Returns normalized stress ratio (0.0 to 1.0+, where > 1.0 indicates fracture)
 * Tension: F / Tmax
 * Compression: |F| / Cmax(L)
 */
export declare function computeNormalizedStress(mat: MaterialDef, axialForceN: number, lengthM: number): {
    stressRatio: number;
    failMode: 'none' | 'tension' | 'buckling';
};
//# sourceMappingURL=materials.d.ts.map