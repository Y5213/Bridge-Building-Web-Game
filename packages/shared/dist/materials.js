export const MATERIALS = {
    road: {
        type: 'road',
        name: 'Road Deck',
        costPerMeter: 160,
        costPerM: 160,
        maxLenM: 2.5,
        massKgPerM: 200,
        axialStiffnessEA: 4.0e7,
        flexuralRigidityEI: 3.2e4,
        maxTensionN: 95000,
        crushCompressionN: 100000,
        isDrivable: true,
        isRoad: true,
        isCable: false,
        color: '#38342F'
    },
    reinforced_road: {
        type: 'reinforced_road',
        name: 'Reinforced Road',
        costPerMeter: 320,
        costPerM: 320,
        maxLenM: 2.5,
        massKgPerM: 310,
        axialStiffnessEA: 8.5e7,
        flexuralRigidityEI: 9.0e4,
        maxTensionN: 220000,
        crushCompressionN: 230000,
        isDrivable: true,
        isRoad: true,
        isCable: false,
        color: '#267162'
    },
    wood: {
        type: 'wood',
        name: 'Wood Beam',
        costPerMeter: 120,
        costPerM: 120,
        maxLenM: 2.5,
        massKgPerM: 70,
        axialStiffnessEA: 2.6e7,
        flexuralRigidityEI: 3.4e4,
        maxTensionN: 85000,
        crushCompressionN: 90000,
        isDrivable: false,
        isRoad: false,
        isCable: false,
        color: '#B99B6C'
    },
    steel: {
        type: 'steel',
        name: 'Steel I-Beam',
        costPerMeter: 340,
        costPerM: 340,
        maxLenM: 4.5,
        massKgPerM: 150,
        axialStiffnessEA: 1.0e8,
        flexuralRigidityEI: 1.7e5,
        maxTensionN: 300000,
        crushCompressionN: 300000,
        isDrivable: false,
        isRoad: false,
        isCable: false,
        color: '#519DAF'
    },
    cable: {
        type: 'cable',
        name: 'Steel Cable',
        costPerMeter: 220,
        costPerM: 220,
        maxLenM: 18.0,
        massKgPerM: 20,
        axialStiffnessEA: 6.0e7,
        flexuralRigidityEI: 0,
        maxTensionN: 260000,
        crushCompressionN: 0,
        isDrivable: false,
        isRoad: false,
        isCable: true,
        color: '#8B9DAD'
    }
};
export const MATERIAL_CATALOG = MATERIALS;
/**
 * Computes compressive capacity under Euler buckling:
 * Cmax(L) = min(Ccrush, pi^2 * EI / max(L, 0.25)^2)
 * Cable carries 0.0 N in compression.
 */
export function computeEulerBucklingLimit(mat, lengthM) {
    if (mat.type === 'cable')
        return 0;
    const effLen = Math.max(0.25, lengthM);
    const eulerLimit = (Math.PI * Math.PI * mat.flexuralRigidityEI) / (effLen * effLen);
    return Math.min(mat.crushCompressionN, eulerLimit);
}
/**
 * Returns normalized stress ratio (0.0 to 1.0+, where > 1.0 indicates fracture)
 * Tension: F / Tmax
 * Compression: |F| / Cmax(L)
 */
export function computeNormalizedStress(mat, axialForceN, lengthM) {
    if (mat.type === 'cable' && axialForceN <= 0) {
        // Slack cable carries exact 0.00 kN force
        return { stressRatio: 0, failMode: 'none' };
    }
    if (axialForceN > 0) {
        // Tension
        const ratio = axialForceN / mat.maxTensionN;
        return {
            stressRatio: ratio,
            failMode: ratio > 1.0 ? 'tension' : 'none'
        };
    }
    else if (axialForceN < 0) {
        // Compression
        const cap = computeEulerBucklingLimit(mat, lengthM);
        if (cap <= 0) {
            return { stressRatio: mat.type === 'cable' ? 0 : 999.0, failMode: 'buckling' };
        }
        const ratio = Math.abs(axialForceN) / cap;
        return {
            stressRatio: ratio,
            failMode: ratio > 1.0 ? 'buckling' : 'none'
        };
    }
    return { stressRatio: 0, failMode: 'none' };
}
