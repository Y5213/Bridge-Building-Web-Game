import { MATERIALS } from './materials';
export function calculateBlueprintQuotation(blueprint, level) {
    const nodeMap = new Map();
    for (const n of blueprint.nodes) {
        nodeMap.set(n.id, { x: n.x, y: n.y });
    }
    const bom = {
        road: { material: 'road', name: MATERIALS.road.name, count: 0, totalLengthM: 0, totalCost: 0 },
        reinforced_road: { material: 'reinforced_road', name: MATERIALS.reinforced_road.name, count: 0, totalLengthM: 0, totalCost: 0 },
        wood: { material: 'wood', name: MATERIALS.wood.name, count: 0, totalLengthM: 0, totalCost: 0 },
        steel: { material: 'steel', name: MATERIALS.steel.name, count: 0, totalLengthM: 0, totalCost: 0 },
        cable: { material: 'cable', name: MATERIALS.cable.name, count: 0, totalLengthM: 0, totalCost: 0 }
    };
    let totalCost = 0;
    const illegalLengths = [];
    const noBuildViolations = [];
    const unlockedMaterialViolations = [];
    for (const m of blueprint.members) {
        const na = nodeMap.get(m.nodeAId);
        const nb = nodeMap.get(m.nodeBId);
        if (!na || !nb)
            continue;
        const dx = nb.x - na.x;
        const dy = nb.y - na.y;
        const lengthM = Math.sqrt(dx * dx + dy * dy);
        const mat = MATERIALS[m.material];
        if (!mat)
            continue;
        // Check unlocked materials
        if (level && !level.unlockedMaterials.includes(m.material)) {
            unlockedMaterialViolations.push(m.id);
        }
        // Check max legal length (allow tiny 1e-4 tolerance for floating point)
        if (lengthM > mat.maxLenM + 0.005) {
            illegalLengths.push({
                memberId: m.id,
                lengthM,
                maxLenM: mat.maxLenM
            });
        }
        // Check Level 5 No-Build boat zone: y < maxY and within minX..maxX
        if (level?.noBuildZone) {
            const nbz = level.noBuildZone;
            const midX = (na.x + nb.x) * 0.5;
            const midY = (na.y + nb.y) * 0.5;
            if ((midX >= nbz.minX && midX <= nbz.maxX && midY < nbz.maxY) ||
                (na.x >= nbz.minX && na.x <= nbz.maxX && na.y < nbz.maxY) ||
                (nb.x >= nbz.minX && nb.x <= nbz.maxX && nb.y < nbz.maxY)) {
                noBuildViolations.push(m.id);
            }
        }
        const memberCost = Math.round(lengthM * mat.costPerMeter);
        totalCost += memberCost;
        const entry = bom[m.material];
        entry.count += 1;
        entry.totalLengthM += lengthM;
        entry.totalCost += memberCost;
    }
    const isOverBudget = level ? totalCost > level.budgetCap : false;
    const isValid = illegalLengths.length === 0 &&
        noBuildViolations.length === 0 &&
        unlockedMaterialViolations.length === 0;
    return {
        totalCost,
        budgetCap: level?.budgetCap,
        isOverBudget,
        bom,
        illegalLengths,
        noBuildViolations,
        unlockedMaterialViolations,
        isValid
    };
}
export function evaluateStarRating(totalCost, brokenCount, peakStressPct, level) {
    if (totalCost > level.budgetCap) {
        return 0; // Over budget = no official pass
    }
    // 1 Star: All vehicles crossed under budgetCap
    let stars = 1;
    // 2 Stars: Passed with zero broken members
    if (brokenCount === 0) {
        stars = 2;
    }
    // 3 Stars: Zero broken members AND totalCost <= threeStarBudget AND peakStress < 90%
    if (brokenCount === 0 && totalCost <= level.threeStarBudget && peakStressPct < 90.0) {
        stars = 3;
    }
    return stars;
}
