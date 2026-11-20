import { LevelDefinition, BlueprintJSON } from './schemas';

export const CAMPAIGN_LEVELS: LevelDefinition[] = [
  {
    id: 1,
    name: 'Sunny Creek',
    biome: 'Meadow',
    spanM: 8.0,
    elevationStepM: 0,
    anchors: [
      { id: 'anchor_l0', x: 0.0, y: 0.0 },
      { id: 'anchor_r0', x: 8.0, y: 0.0 }
    ],
    waterLevelY: -3.5,
    leftLedgePolygon: [
      [-5.0, 0.0],
      [0.0, 0.0],
      [0.0, -1.0],
      [-1.5, -4.5],
      [-5.0, -4.5]
    ],
    rightLedgePolygon: [
      [8.0, 0.0],
      [13.0, 0.0],
      [13.0, -4.5],
      [9.5, -4.5],
      [8.0, -1.0]
    ],
    vehicles: [
      {
        type: 'hatchback',
        name: 'Hatchback',
        massKg: 1500,
        speedMs: 4.5,
        wheelCount: 2,
        wheelRadiusM: 0.35,
        wheelbaseM: 2.2,
        chassisHeightM: 1.1,
        color: '#E87A5D'
      }
    ],
    unlockedMaterials: ['road', 'wood'],
    budgetCap: 4800,
    threeStarBudget: 4080,
    maxStressTolerancePct: 100.0
  },
  {
    id: 2,
    name: 'Timber Gorge',
    biome: 'Pine Valley',
    spanM: 12.0,
    elevationStepM: 0,
    anchors: [
      { id: 'anchor_l0', x: 0.0, y: 0.0 },
      { id: 'anchor_r0', x: 12.0, y: 0.0 }
    ],
    waterLevelY: -4.5,
    leftLedgePolygon: [
      [-6.0, 0.0],
      [0.0, 0.0],
      [0.0, -1.2],
      [-2.0, -5.5],
      [-6.0, -5.5]
    ],
    rightLedgePolygon: [
      [12.0, 0.0],
      [18.0, 0.0],
      [18.0, -5.5],
      [14.0, -5.5],
      [12.0, -1.2]
    ],
    vehicles: [
      {
        type: 'pickup',
        name: 'Pickup Truck',
        massKg: 2400,
        speedMs: 4.4,
        wheelCount: 2,
        wheelRadiusM: 0.38,
        wheelbaseM: 2.6,
        chassisHeightM: 1.25,
        color: '#398D4A'
      }
    ],
    unlockedMaterials: ['road', 'wood'],
    budgetCap: 7600,
    threeStarBudget: 6460,
    maxStressTolerancePct: 100.0
  },
  {
    id: 3,
    name: 'River Pier',
    biome: 'Stone Gorge',
    spanM: 16.0,
    elevationStepM: 0,
    anchors: [
      { id: 'anchor_l0', x: 0.0, y: 0.0 },
      { id: 'anchor_r0', x: 16.0, y: 0.0 },
      { id: 'anchor_pier', x: 8.0, y: -1.8, isPier: true }
    ],
    waterLevelY: -4.2,
    leftLedgePolygon: [
      [-6.0, 0.0],
      [0.0, 0.0],
      [0.0, -1.5],
      [-2.5, -5.5],
      [-6.0, -5.5]
    ],
    rightLedgePolygon: [
      [16.0, 0.0],
      [22.0, 0.0],
      [22.0, -5.5],
      [18.5, -5.5],
      [16.0, -1.5]
    ],
    pierPolygons: [
      [
        [7.4, -1.8],
        [8.6, -1.8],
        [8.8, -5.5],
        [7.2, -5.5]
      ]
    ],
    vehicles: [
      {
        type: 'van',
        name: 'Delivery Van',
        massKg: 3400,
        speedMs: 4.3,
        wheelCount: 2,
        wheelRadiusM: 0.40,
        wheelbaseM: 2.8,
        chassisHeightM: 1.45,
        color: '#519DAF'
      }
    ],
    unlockedMaterials: ['road', 'wood', 'steel'],
    budgetCap: 12800,
    threeStarBudget: 10880,
    maxStressTolerancePct: 100.0
  },
  {
    id: 4,
    name: 'Stepped Bluff',
    biome: 'Terraced Cliffs',
    spanM: 14.0,
    elevationStepM: 2.0,
    anchors: [
      { id: 'anchor_l0', x: 0.0, y: 0.0 },
      { id: 'anchor_l_ledge', x: 0.0, y: -2.0 },
      { id: 'anchor_r0', x: 14.0, y: 2.0 },
      { id: 'anchor_r_ledge', x: 14.0, y: 0.0 }
    ],
    waterLevelY: -5.0,
    leftLedgePolygon: [
      [-6.0, 0.0],
      [0.0, 0.0],
      [0.0, -2.5],
      [-2.5, -6.0],
      [-6.0, -6.0]
    ],
    rightLedgePolygon: [
      [14.0, 2.0],
      [20.0, 2.0],
      [20.0, -6.0],
      [14.0, -0.5]
    ],
    vehicles: [
      {
        type: 'suv',
        name: 'Safari SUV',
        massKg: 3800,
        speedMs: 4.2,
        wheelCount: 2,
        wheelRadiusM: 0.42,
        wheelbaseM: 2.7,
        chassisHeightM: 1.35,
        color: '#DC9500'
      }
    ],
    unlockedMaterials: ['road', 'reinforced_road', 'wood', 'steel'],
    budgetCap: 23500,
    threeStarBudget: 21900,
    maxStressTolerancePct: 100.0
  },
  {
    id: 5,
    name: 'Barge Canal Arch',
    biome: 'Harbor',
    spanM: 16.0,
    elevationStepM: 0,
    anchors: [
      { id: 'anchor_l0', x: 0.0, y: 0.0 },
      { id: 'anchor_r0', x: 16.0, y: 0.0 }
    ],
    waterLevelY: -4.0,
    leftLedgePolygon: [
      [-6.0, 0.0],
      [0.0, 0.0],
      [0.0, -1.8],
      [-2.0, -5.0],
      [-6.0, -5.0]
    ],
    rightLedgePolygon: [
      [16.0, 0.0],
      [22.0, 0.0],
      [22.0, -5.0],
      [18.0, -5.0],
      [16.0, -1.8]
    ],
    noBuildZone: {
      minX: 3.0,
      maxX: 13.0,
      maxY: -0.5
    },
    vehicles: [
      {
        type: 'bus',
        name: 'City Bus',
        massKg: 5200,
        speedMs: 4.2,
        wheelCount: 2,
        wheelRadiusM: 0.44,
        wheelbaseM: 3.8,
        chassisHeightM: 1.6,
        color: '#EABE61'
      }
    ],
    unlockedMaterials: ['road', 'reinforced_road', 'wood', 'steel'],
    budgetCap: 28500,
    threeStarBudget: 24800,
    maxStressTolerancePct: 100.0
  },
  {
    id: 6,
    name: 'Cable Ravine',
    biome: 'Alpine Pass',
    spanM: 20.0,
    elevationStepM: 0,
    anchors: [
      { id: 'anchor_l0', x: 0.0, y: 0.0 },
      { id: 'anchor_r0', x: 20.0, y: 0.0 },
      { id: 'anchor_l_tower', x: 0.0, y: 6.5 },
      { id: 'anchor_r_tower', x: 20.0, y: 6.5 }
    ],
    waterLevelY: -7.0,
    leftLedgePolygon: [
      [-6.0, 7.0],
      [0.0, 6.5],
      [0.0, 0.0],
      [-1.5, -8.0],
      [-6.0, -8.0]
    ],
    rightLedgePolygon: [
      [20.0, 6.5],
      [26.0, 7.0],
      [26.0, -8.0],
      [21.5, -8.0],
      [20.0, 0.0]
    ],
    vehicles: [
      {
        type: 'box_truck',
        name: 'Heavy Box Truck',
        massKg: 6800,
        speedMs: 4.0,
        wheelCount: 2,
        wheelRadiusM: 0.45,
        wheelbaseM: 3.4,
        chassisHeightM: 1.7,
        color: '#267162'
      }
    ],
    unlockedMaterials: ['road', 'reinforced_road', 'wood', 'steel', 'cable'],
    budgetCap: 35500,
    threeStarBudget: 31000,
    maxStressTolerancePct: 100.0
  },
  {
    id: 7,
    name: 'Twin Viaduct',
    biome: 'Canyon Delta',
    spanM: 24.0,
    elevationStepM: 0,
    anchors: [
      { id: 'anchor_l0', x: 0.0, y: 0.0 },
      { id: 'anchor_r0', x: 24.0, y: 0.0 },
      { id: 'anchor_pier', x: 10.0, y: -2.2, isPier: true },
      { id: 'anchor_l_tower', x: 0.0, y: 6.5 },
      { id: 'anchor_r_tower', x: 24.0, y: 7.5 }
    ],
    waterLevelY: -6.5,
    leftLedgePolygon: [
      [-6.0, 7.0],
      [0.0, 6.5],
      [0.0, 0.0],
      [-2.5, -7.5],
      [-6.0, -7.5]
    ],
    rightLedgePolygon: [
      [24.0, 7.5],
      [30.0, 8.0],
      [30.0, -7.5],
      [26.0, -7.5],
      [24.0, 0.0]
    ],
    pierPolygons: [
      [
        [9.3, -2.2],
        [10.7, -2.2],
        [11.0, -7.5],
        [9.0, -7.5]
      ]
    ],
    vehicles: [
      {
        type: 'hatchback',
        name: 'Escort Sedan',
        massKg: 2000,
        speedMs: 4.5,
        wheelCount: 2,
        wheelRadiusM: 0.36,
        wheelbaseM: 2.3,
        chassisHeightM: 1.15,
        color: '#E87A5D'
      },
      {
        type: 'tanker',
        name: '3-Axle Liquid Tanker',
        massKg: 8500,
        speedMs: 3.8,
        wheelCount: 3,
        wheelRadiusM: 0.46,
        wheelbaseM: 4.5,
        chassisHeightM: 1.6,
        color: '#453126'
      }
    ],
    unlockedMaterials: ['road', 'reinforced_road', 'wood', 'steel', 'cable'],
    budgetCap: 46500,
    threeStarBudget: 41000,
    maxStressTolerancePct: 100.0
  },
  {
    id: 8,
    name: 'Grand Canyon Freight',
    biome: 'Sunset Canyon',
    spanM: 28.0,
    elevationStepM: 0,
    anchors: [
      { id: 'anchor_l0', x: 0.0, y: 0.0 },
      { id: 'anchor_r0', x: 28.0, y: 0.0 },
      { id: 'anchor_l_ledge', x: 0.0, y: -2.5 },
      { id: 'anchor_r_ledge', x: 28.0, y: -2.5 },
      { id: 'anchor_l_tower', x: 0.0, y: 8.5 },
      { id: 'anchor_r_tower', x: 28.0, y: 8.5 }
    ],
    waterLevelY: -9.0,
    leftLedgePolygon: [
      [-6.0, 9.0],
      [0.0, 8.5],
      [0.0, 0.0],
      [-3.0, -10.0],
      [-6.0, -10.0]
    ],
    rightLedgePolygon: [
      [28.0, 8.5],
      [34.0, 9.0],
      [34.0, -10.0],
      [31.0, -10.0],
      [28.0, 0.0]
    ],
    vehicles: [
      {
        type: 'semi',
        name: '12.5t Heavy Freight Semi',
        massKg: 12500,
        speedMs: 3.6,
        wheelCount: 3,
        wheelRadiusM: 0.48,
        wheelbaseM: 5.2,
        chassisHeightM: 1.8,
        color: '#A45650'
      }
    ],
    unlockedMaterials: ['road', 'reinforced_road', 'wood', 'steel', 'cable'],
    budgetCap: 72000,
    threeStarBudget: 62500,
    maxStressTolerancePct: 100.0
  }
];

export function getLevelStructuralHint(levelId: number): string {
  switch (levelId) {
    case 1:
      return 'The unbraced flat road sags and snaps under the 1.5t hatchback. Form an under-deck Warren truss: place 3 lower joints around y = -1.5m and triangulate with wood diagonals connected to the road joints.';
    case 2:
      return 'Wood beams have lower compressive capacity than road tension. Build an OVERHEAD through-truss (top wood chord arching at y = +2.0m) with alternating wood diagonals. The road carries tension while wood stays in gentle compression!';
    case 3:
      return 'The stone center pier at (8, -1.8) is a rock-solid anchor! Build two independent 8m wood truss spans that meet at the center pier, and reinforce the pier junction with rigid steel struts.';
    case 4:
      return 'The 4x4 SUV must climb a +2m grade over 14m. Use Reinforced Road for the climbing deck, and construct a steel under-arch braced against the rock ledges at (0, -2) and (14, 0).';
    case 5:
      return 'Waterway clearance rules prohibit building below y = -0.5m across the center canal. Construct an overhead steel arch with triangular abutment bracing at both canyon banks to transfer lateral thrust.';
    case 6:
      return 'A 20m span under a 6.8t heavy box truck requires suspension cables! Connect high-tension steel cables from the left tower (0, 6.5) and right tower (20, 6.5) to each road joint to spread the load.';
    case 7:
      return 'A massive 24m gorge crossed by an 8.5t fuel tanker. Combine the center pier anchor at (10, -2.2) with cable-stayed fans from the left (y=6.5) and right (y=7.5) towers for composite viaduct stability.';
    case 8:
      return 'The 12.5-ton 3-axle freight semi generates immense bending moments. Use Reinforced Road, dual high-tower cable arrays (left y=8.5, right y=8.5), and steel approach bracing anchored to lower cliff pins.';
    default:
      return 'Triangulate your structural members into rigid triangles. Ensure load paths transfer directly to fixed anchor pins on the canyon walls.';
  }
}

export function getReferenceHintBlueprint(levelId: number): BlueprintJSON {
  if (levelId === 1) {
    return {
      nodes: [
        { id: 'n0', x: 0, y: 0, isAnchor: true },
        { id: 'n1', x: 2, y: 0, isAnchor: false },
        { id: 'n2', x: 4, y: 0, isAnchor: false },
        { id: 'n3', x: 6, y: 0, isAnchor: false },
        { id: 'n4', x: 8, y: 0, isAnchor: true },
        { id: 'b1', x: 2, y: -1.4, isAnchor: false },
        { id: 'b2', x: 4, y: -1.6, isAnchor: false },
        { id: 'b3', x: 6, y: -1.4, isAnchor: false }
      ],
      members: [
        { id: 'r0', nodeAId: 'n0', nodeBId: 'n1', material: 'road' },
        { id: 'r1', nodeAId: 'n1', nodeBId: 'n2', material: 'road' },
        { id: 'r2', nodeAId: 'n2', nodeBId: 'n3', material: 'road' },
        { id: 'r3', nodeAId: 'n3', nodeBId: 'n4', material: 'road' },
        { id: 'bc0', nodeAId: 'n0', nodeBId: 'b1', material: 'wood' },
        { id: 'bc1', nodeAId: 'b1', nodeBId: 'b2', material: 'wood' },
        { id: 'bc2', nodeAId: 'b2', nodeBId: 'b3', material: 'wood' },
        { id: 'bc3', nodeAId: 'b3', nodeBId: 'n4', material: 'wood' },
        { id: 'w1', nodeAId: 'n1', nodeBId: 'b1', material: 'wood' },
        { id: 'w2', nodeAId: 'n2', nodeBId: 'b2', material: 'wood' },
        { id: 'w3', nodeAId: 'n3', nodeBId: 'b3', material: 'wood' },
        { id: 'wd0', nodeAId: 'b1', nodeBId: 'n2', material: 'wood' },
        { id: 'wd1', nodeAId: 'b3', nodeBId: 'n2', material: 'wood' }
      ]
    };
  }

  if (levelId === 2) {
    return {
      nodes: [
        { id: 'n0', x: 0, y: 0, isAnchor: true },
        { id: 'n1', x: 2, y: 0, isAnchor: false },
        { id: 'n2', x: 4, y: 0, isAnchor: false },
        { id: 'n3', x: 6, y: 0, isAnchor: false },
        { id: 'n4', x: 8, y: 0, isAnchor: false },
        { id: 'n5', x: 10, y: 0, isAnchor: false },
        { id: 'n6', x: 12, y: 0, isAnchor: true },
        { id: 't1', x: 1, y: 1.8, isAnchor: false },
        { id: 't2', x: 3, y: 2.0, isAnchor: false },
        { id: 't3', x: 5, y: 2.0, isAnchor: false },
        { id: 't4', x: 7, y: 2.0, isAnchor: false },
        { id: 't5', x: 9, y: 2.0, isAnchor: false },
        { id: 't6', x: 11, y: 1.8, isAnchor: false }
      ],
      members: [
        { id: 'r0', nodeAId: 'n0', nodeBId: 'n1', material: 'road' },
        { id: 'r1', nodeAId: 'n1', nodeBId: 'n2', material: 'road' },
        { id: 'r2', nodeAId: 'n2', nodeBId: 'n3', material: 'road' },
        { id: 'r3', nodeAId: 'n3', nodeBId: 'n4', material: 'road' },
        { id: 'r4', nodeAId: 'n4', nodeBId: 'n5', material: 'road' },
        { id: 'r5', nodeAId: 'n5', nodeBId: 'n6', material: 'road' },
        { id: 'tc0', nodeAId: 't1', nodeBId: 't2', material: 'wood' },
        { id: 'tc1', nodeAId: 't2', nodeBId: 't3', material: 'wood' },
        { id: 'tc2', nodeAId: 't3', nodeBId: 't4', material: 'wood' },
        { id: 'tc3', nodeAId: 't4', nodeBId: 't5', material: 'wood' },
        { id: 'tc4', nodeAId: 't5', nodeBId: 't6', material: 'wood' },
        { id: 'w0', nodeAId: 'n0', nodeBId: 't1', material: 'wood' },
        { id: 'w1', nodeAId: 't1', nodeBId: 'n1', material: 'wood' },
        { id: 'w2', nodeAId: 'n1', nodeBId: 't2', material: 'wood' },
        { id: 'w3', nodeAId: 't2', nodeBId: 'n2', material: 'wood' },
        { id: 'w4', nodeAId: 'n2', nodeBId: 't3', material: 'wood' },
        { id: 'w5', nodeAId: 't3', nodeBId: 'n3', material: 'wood' },
        { id: 'w6', nodeAId: 'n3', nodeBId: 't4', material: 'wood' },
        { id: 'w7', nodeAId: 't4', nodeBId: 'n4', material: 'wood' },
        { id: 'w8', nodeAId: 'n4', nodeBId: 't5', material: 'wood' },
        { id: 'w9', nodeAId: 't5', nodeBId: 'n5', material: 'wood' },
        { id: 'w10', nodeAId: 'n5', nodeBId: 't6', material: 'wood' },
        { id: 'w11', nodeAId: 't6', nodeBId: 'n6', material: 'wood' }
      ]
    };
  }

  if (levelId === 3) {
    return {
      nodes: [
        { id: 'n0', x: 0, y: 0, isAnchor: true },
        { id: 'n1', x: 2, y: 0, isAnchor: false },
        { id: 'n2', x: 4, y: 0, isAnchor: false },
        { id: 'n3', x: 6, y: 0, isAnchor: false },
        { id: 'n4', x: 8, y: 0, isAnchor: false },
        { id: 'n5', x: 10, y: 0, isAnchor: false },
        { id: 'n6', x: 12, y: 0, isAnchor: false },
        { id: 'n7', x: 14, y: 0, isAnchor: false },
        { id: 'n8', x: 16, y: 0, isAnchor: true },
        { id: 'pier', x: 8, y: -1.8, isAnchor: true, isPier: true },
        { id: 'b1', x: 2, y: -1.3, isAnchor: false },
        { id: 'b2', x: 4, y: -1.4, isAnchor: false },
        { id: 'b3', x: 6, y: -1.3, isAnchor: false },
        { id: 'b5', x: 10, y: -1.3, isAnchor: false },
        { id: 'b6', x: 12, y: -1.4, isAnchor: false },
        { id: 'b7', x: 14, y: -1.3, isAnchor: false }
      ],
      members: [
        { id: 'r0', nodeAId: 'n0', nodeBId: 'n1', material: 'road' },
        { id: 'r1', nodeAId: 'n1', nodeBId: 'n2', material: 'road' },
        { id: 'r2', nodeAId: 'n2', nodeBId: 'n3', material: 'road' },
        { id: 'r3', nodeAId: 'n3', nodeBId: 'n4', material: 'road' },
        { id: 'r4', nodeAId: 'n4', nodeBId: 'n5', material: 'road' },
        { id: 'r5', nodeAId: 'n5', nodeBId: 'n6', material: 'road' },
        { id: 'r6', nodeAId: 'n6', nodeBId: 'n7', material: 'road' },
        { id: 'r7', nodeAId: 'n7', nodeBId: 'n8', material: 'road' },
        { id: 'p0', nodeAId: 'pier', nodeBId: 'n4', material: 'steel' },
        { id: 'p1', nodeAId: 'pier', nodeBId: 'n3', material: 'steel' },
        { id: 'p2', nodeAId: 'pier', nodeBId: 'n5', material: 'steel' },
        { id: 'wb0', nodeAId: 'n0', nodeBId: 'b1', material: 'wood' },
        { id: 'wb1', nodeAId: 'b1', nodeBId: 'b2', material: 'wood' },
        { id: 'wb2', nodeAId: 'b2', nodeBId: 'b3', material: 'wood' },
        { id: 'wb3', nodeAId: 'b3', nodeBId: 'pier', material: 'wood' },
        { id: 'wv1', nodeAId: 'n1', nodeBId: 'b1', material: 'wood' },
        { id: 'wv2', nodeAId: 'n2', nodeBId: 'b2', material: 'wood' },
        { id: 'wv3', nodeAId: 'n3', nodeBId: 'b3', material: 'wood' },
        { id: 'wd0', nodeAId: 'b1', nodeBId: 'n2', material: 'wood' },
        { id: 'wd1', nodeAId: 'b2', nodeBId: 'n3', material: 'wood' },
        { id: 'wb4', nodeAId: 'pier', nodeBId: 'b5', material: 'wood' },
        { id: 'wb5', nodeAId: 'b5', nodeBId: 'b6', material: 'wood' },
        { id: 'wb6', nodeAId: 'b6', nodeBId: 'b7', material: 'wood' },
        { id: 'wb7', nodeAId: 'b7', nodeBId: 'n8', material: 'wood' },
        { id: 'wv5', nodeAId: 'n5', nodeBId: 'b5', material: 'wood' },
        { id: 'wv6', nodeAId: 'n6', nodeBId: 'b6', material: 'wood' },
        { id: 'wv7', nodeAId: 'n7', nodeBId: 'b7', material: 'wood' },
        { id: 'wd2', nodeAId: 'b6', nodeBId: 'n5', material: 'wood' },
        { id: 'wd3', nodeAId: 'b7', nodeBId: 'n6', material: 'wood' }
      ]
    };
  }

  if (levelId === 4) {
    return {
      nodes: [
        { id: 'n0', x: 0, y: 0, isAnchor: true },
        { id: 'l_ledge', x: 0, y: -2, isAnchor: true },
        { id: 'n1', x: 2, y: 0.28, isAnchor: false },
        { id: 'n2', x: 4, y: 0.57, isAnchor: false },
        { id: 'n3', x: 6, y: 0.86, isAnchor: false },
        { id: 'n4', x: 8, y: 1.14, isAnchor: false },
        { id: 'n5', x: 10, y: 1.43, isAnchor: false },
        { id: 'n6', x: 12, y: 1.71, isAnchor: false },
        { id: 'n7', x: 14, y: 2.0, isAnchor: true },
        { id: 'r_ledge', x: 14, y: 0, isAnchor: true },
        { id: 's1', x: 2.5, y: -1.2, isAnchor: false },
        { id: 's2', x: 5.5, y: -0.9, isAnchor: false },
        { id: 's3', x: 8.5, y: -0.6, isAnchor: false },
        { id: 's4', x: 11.5, y: -0.3, isAnchor: false }
      ],
      members: [
        { id: 'r0', nodeAId: 'n0', nodeBId: 'n1', material: 'reinforced_road' },
        { id: 'r1', nodeAId: 'n1', nodeBId: 'n2', material: 'reinforced_road' },
        { id: 'r2', nodeAId: 'n2', nodeBId: 'n3', material: 'reinforced_road' },
        { id: 'r3', nodeAId: 'n3', nodeBId: 'n4', material: 'reinforced_road' },
        { id: 'r4', nodeAId: 'n4', nodeBId: 'n5', material: 'reinforced_road' },
        { id: 'r5', nodeAId: 'n5', nodeBId: 'n6', material: 'reinforced_road' },
        { id: 'r6', nodeAId: 'n6', nodeBId: 'n7', material: 'reinforced_road' },
        { id: 'sc0', nodeAId: 'l_ledge', nodeBId: 's1', material: 'steel' },
        { id: 'sc1', nodeAId: 's1', nodeBId: 's2', material: 'steel' },
        { id: 'sc2', nodeAId: 's2', nodeBId: 's3', material: 'steel' },
        { id: 'sc3', nodeAId: 's3', nodeBId: 's4', material: 'steel' },
        { id: 'sc4', nodeAId: 's4', nodeBId: 'r_ledge', material: 'steel' },
        { id: 'sw0', nodeAId: 'l_ledge', nodeBId: 'n1', material: 'steel' },
        { id: 'sw1', nodeAId: 's1', nodeBId: 'n1', material: 'steel' },
        { id: 'sw2', nodeAId: 's1', nodeBId: 'n2', material: 'steel' },
        { id: 'sw3', nodeAId: 's2', nodeBId: 'n2', material: 'steel' },
        { id: 'sw4', nodeAId: 's2', nodeBId: 'n3', material: 'steel' },
        { id: 'sw5', nodeAId: 's2', nodeBId: 'n4', material: 'steel' },
        { id: 'sw6', nodeAId: 's3', nodeBId: 'n4', material: 'steel' },
        { id: 'sw7', nodeAId: 's3', nodeBId: 'n5', material: 'steel' },
        { id: 'sw8', nodeAId: 's4', nodeBId: 'n5', material: 'steel' },
        { id: 'sw9', nodeAId: 's4', nodeBId: 'n6', material: 'steel' },
        { id: 'sw10', nodeAId: 'r_ledge', nodeBId: 'n6', material: 'steel' }
      ]
    };
  }

  if (levelId === 5) {
    return {
      nodes: [
        { id: 'n0', x: 0, y: 0, isAnchor: true },
        { id: 'n1', x: 2, y: 0, isAnchor: false },
        { id: 'n2', x: 4, y: 0, isAnchor: false },
        { id: 'n3', x: 6, y: 0, isAnchor: false },
        { id: 'n4', x: 8, y: 0, isAnchor: false },
        { id: 'n5', x: 10, y: 0, isAnchor: false },
        { id: 'n6', x: 12, y: 0, isAnchor: false },
        { id: 'n7', x: 14, y: 0, isAnchor: false },
        { id: 'n8', x: 16, y: 0, isAnchor: true },
        { id: 'a0', x: 1.2, y: 1.4, isAnchor: false },
        { id: 'a1', x: 3.0, y: 2.6, isAnchor: false },
        { id: 'a2', x: 5.5, y: 3.6, isAnchor: false },
        { id: 'a3', x: 8.0, y: 4.0, isAnchor: false },
        { id: 'a4', x: 10.5, y: 3.6, isAnchor: false },
        { id: 'a5', x: 13.0, y: 2.6, isAnchor: false },
        { id: 'a6', x: 14.8, y: 1.4, isAnchor: false }
      ],
      members: [
        { id: 'r0', nodeAId: 'n0', nodeBId: 'n1', material: 'reinforced_road' },
        { id: 'r1', nodeAId: 'n1', nodeBId: 'n2', material: 'reinforced_road' },
        { id: 'r2', nodeAId: 'n2', nodeBId: 'n3', material: 'reinforced_road' },
        { id: 'r3', nodeAId: 'n3', nodeBId: 'n4', material: 'reinforced_road' },
        { id: 'r4', nodeAId: 'n4', nodeBId: 'n5', material: 'reinforced_road' },
        { id: 'r5', nodeAId: 'n5', nodeBId: 'n6', material: 'reinforced_road' },
        { id: 'r6', nodeAId: 'n6', nodeBId: 'n7', material: 'reinforced_road' },
        { id: 'r7', nodeAId: 'n7', nodeBId: 'n8', material: 'reinforced_road' },
        { id: 'ar0', nodeAId: 'n0', nodeBId: 'a0', material: 'steel' },
        { id: 'ar1', nodeAId: 'a0', nodeBId: 'a1', material: 'steel' },
        { id: 'ar2', nodeAId: 'a1', nodeBId: 'a2', material: 'steel' },
        { id: 'ar3', nodeAId: 'a2', nodeBId: 'a3', material: 'steel' },
        { id: 'ar4', nodeAId: 'a3', nodeBId: 'a4', material: 'steel' },
        { id: 'ar5', nodeAId: 'a4', nodeBId: 'a5', material: 'steel' },
        { id: 'ar6', nodeAId: 'a5', nodeBId: 'a6', material: 'steel' },
        { id: 'ar7', nodeAId: 'a6', nodeBId: 'n8', material: 'steel' },
        { id: 's0', nodeAId: 'a0', nodeBId: 'n1', material: 'steel' },
        { id: 's1', nodeAId: 'a1', nodeBId: 'n1', material: 'steel' },
        { id: 's2', nodeAId: 'a1', nodeBId: 'n2', material: 'steel' },
        { id: 's3', nodeAId: 'a2', nodeBId: 'n2', material: 'steel' },
        { id: 's4', nodeAId: 'a2', nodeBId: 'n3', material: 'steel' },
        { id: 's5', nodeAId: 'a3', nodeBId: 'n3', material: 'steel' },
        { id: 's6', nodeAId: 'a3', nodeBId: 'n4', material: 'steel' },
        { id: 's7', nodeAId: 'a3', nodeBId: 'n5', material: 'steel' },
        { id: 's8', nodeAId: 'a4', nodeBId: 'n5', material: 'steel' },
        { id: 's9', nodeAId: 'a4', nodeBId: 'n6', material: 'steel' },
        { id: 's10', nodeAId: 'a5', nodeBId: 'n6', material: 'steel' },
        { id: 's11', nodeAId: 'a5', nodeBId: 'n7', material: 'steel' },
        { id: 's12', nodeAId: 'a6', nodeBId: 'n7', material: 'steel' }
      ]
    };
  }

  if (levelId === 6) {
    return {
      nodes: [
        { id: 'n0', x: 0, y: 0, isAnchor: true },
        { id: 'tl', x: 0, y: 6.5, isAnchor: true },
        { id: 'n1', x: 2, y: 0, isAnchor: false },
        { id: 'n2', x: 4, y: 0, isAnchor: false },
        { id: 'n3', x: 6, y: 0, isAnchor: false },
        { id: 'n4', x: 8, y: 0, isAnchor: false },
        { id: 'n5', x: 10, y: 0, isAnchor: false },
        { id: 'n6', x: 12, y: 0, isAnchor: false },
        { id: 'n7', x: 14, y: 0, isAnchor: false },
        { id: 'n8', x: 16, y: 0, isAnchor: false },
        { id: 'n9', x: 18, y: 0, isAnchor: false },
        { id: 'n10', x: 20, y: 0, isAnchor: true },
        { id: 'tr', x: 20, y: 6.5, isAnchor: true }
      ],
      members: [
        { id: 'r0', nodeAId: 'n0', nodeBId: 'n1', material: 'reinforced_road' },
        { id: 'r1', nodeAId: 'n1', nodeBId: 'n2', material: 'reinforced_road' },
        { id: 'r2', nodeAId: 'n2', nodeBId: 'n3', material: 'reinforced_road' },
        { id: 'r3', nodeAId: 'n3', nodeBId: 'n4', material: 'reinforced_road' },
        { id: 'r4', nodeAId: 'n4', nodeBId: 'n5', material: 'reinforced_road' },
        { id: 'r5', nodeAId: 'n5', nodeBId: 'n6', material: 'reinforced_road' },
        { id: 'r6', nodeAId: 'n6', nodeBId: 'n7', material: 'reinforced_road' },
        { id: 'r7', nodeAId: 'n7', nodeBId: 'n8', material: 'reinforced_road' },
        { id: 'r8', nodeAId: 'n8', nodeBId: 'n9', material: 'reinforced_road' },
        { id: 'r9', nodeAId: 'n9', nodeBId: 'n10', material: 'reinforced_road' },
        { id: 'cl0', nodeAId: 'tl', nodeBId: 'n1', material: 'cable' },
        { id: 'cl1', nodeAId: 'tl', nodeBId: 'n2', material: 'cable' },
        { id: 'cl2', nodeAId: 'tl', nodeBId: 'n3', material: 'cable' },
        { id: 'cl3', nodeAId: 'tl', nodeBId: 'n4', material: 'cable' },
        { id: 'cl4', nodeAId: 'tl', nodeBId: 'n5', material: 'cable' },
        { id: 'cr0', nodeAId: 'tr', nodeBId: 'n5', material: 'cable' },
        { id: 'cr1', nodeAId: 'tr', nodeBId: 'n6', material: 'cable' },
        { id: 'cr2', nodeAId: 'tr', nodeBId: 'n7', material: 'cable' },
        { id: 'cr3', nodeAId: 'tr', nodeBId: 'n8', material: 'cable' },
        { id: 'cr4', nodeAId: 'tr', nodeBId: 'n9', material: 'cable' }
      ]
    };
  }

  if (levelId === 7) {
    return {
      nodes: [
        { id: 'n0', x: 0, y: 0, isAnchor: true },
        { id: 'tl', x: 0, y: 6.5, isAnchor: true },
        { id: 'n1', x: 2, y: 0, isAnchor: false },
        { id: 'n2', x: 4, y: 0, isAnchor: false },
        { id: 'n3', x: 6, y: 0, isAnchor: false },
        { id: 'n4', x: 8, y: 0, isAnchor: false },
        { id: 'n5', x: 10, y: 0, isAnchor: false },
        { id: 'pier', x: 10, y: -2.2, isAnchor: true, isPier: true },
        { id: 'n6', x: 12, y: 0, isAnchor: false },
        { id: 'n7', x: 14, y: 0, isAnchor: false },
        { id: 'n8', x: 16, y: 0, isAnchor: false },
        { id: 'n9', x: 18, y: 0, isAnchor: false },
        { id: 'n10', x: 20, y: 0, isAnchor: false },
        { id: 'n11', x: 22, y: 0, isAnchor: false },
        { id: 'n12', x: 24, y: 0, isAnchor: true },
        { id: 'tr', x: 24, y: 7.5, isAnchor: true }
      ],
      members: [
        { id: 'r0', nodeAId: 'n0', nodeBId: 'n1', material: 'reinforced_road' },
        { id: 'r1', nodeAId: 'n1', nodeBId: 'n2', material: 'reinforced_road' },
        { id: 'r2', nodeAId: 'n2', nodeBId: 'n3', material: 'reinforced_road' },
        { id: 'r3', nodeAId: 'n3', nodeBId: 'n4', material: 'reinforced_road' },
        { id: 'r4', nodeAId: 'n4', nodeBId: 'n5', material: 'reinforced_road' },
        { id: 'r5', nodeAId: 'n5', nodeBId: 'n6', material: 'reinforced_road' },
        { id: 'r6', nodeAId: 'n6', nodeBId: 'n7', material: 'reinforced_road' },
        { id: 'r7', nodeAId: 'n7', nodeBId: 'n8', material: 'reinforced_road' },
        { id: 'r8', nodeAId: 'n8', nodeBId: 'n9', material: 'reinforced_road' },
        { id: 'r9', nodeAId: 'n9', nodeBId: 'n10', material: 'reinforced_road' },
        { id: 'r10', nodeAId: 'n10', nodeBId: 'n11', material: 'reinforced_road' },
        { id: 'r11', nodeAId: 'n11', nodeBId: 'n12', material: 'reinforced_road' },
        { id: 'p0', nodeAId: 'pier', nodeBId: 'n5', material: 'steel' },
        { id: 'p1', nodeAId: 'pier', nodeBId: 'n4', material: 'steel' },
        { id: 'p2', nodeAId: 'pier', nodeBId: 'n6', material: 'steel' },
        { id: 'cl0', nodeAId: 'tl', nodeBId: 'n1', material: 'cable' },
        { id: 'cl1', nodeAId: 'tl', nodeBId: 'n2', material: 'cable' },
        { id: 'cl2', nodeAId: 'tl', nodeBId: 'n3', material: 'cable' },
        { id: 'cl3', nodeAId: 'tl', nodeBId: 'n4', material: 'cable' },
        { id: 'cr0', nodeAId: 'tr', nodeBId: 'n6', material: 'cable' },
        { id: 'cr1', nodeAId: 'tr', nodeBId: 'n7', material: 'cable' },
        { id: 'cr2', nodeAId: 'tr', nodeBId: 'n8', material: 'cable' },
        { id: 'cr3', nodeAId: 'tr', nodeBId: 'n9', material: 'cable' },
        { id: 'cr4', nodeAId: 'tr', nodeBId: 'n10', material: 'cable' },
        { id: 'cr5', nodeAId: 'tr', nodeBId: 'n11', material: 'cable' }
      ]
    };
  }

  // Level 8
  return {
    nodes: [
      { id: 'n0', x: 0, y: 0, isAnchor: true },
      { id: 'tl', x: 0, y: 8.5, isAnchor: true },
      { id: 'll', x: 0, y: -2.5, isAnchor: true },
      { id: 'n1', x: 2, y: 0, isAnchor: false },
      { id: 'n2', x: 4, y: 0, isAnchor: false },
      { id: 'n3', x: 6, y: 0, isAnchor: false },
      { id: 'n4', x: 8, y: 0, isAnchor: false },
      { id: 'n5', x: 10, y: 0, isAnchor: false },
      { id: 'n6', x: 12, y: 0, isAnchor: false },
      { id: 'n7', x: 14, y: 0, isAnchor: false },
      { id: 'n8', x: 16, y: 0, isAnchor: false },
      { id: 'n9', x: 18, y: 0, isAnchor: false },
      { id: 'n10', x: 20, y: 0, isAnchor: false },
      { id: 'n11', x: 22, y: 0, isAnchor: false },
      { id: 'n12', x: 24, y: 0, isAnchor: false },
      { id: 'n13', x: 26, y: 0, isAnchor: false },
      { id: 'n14', x: 28, y: 0, isAnchor: true },
      { id: 'tr', x: 28, y: 8.5, isAnchor: true },
      { id: 'lr', x: 28, y: -2.5, isAnchor: true },
      { id: 'u1', x: 2.5, y: -2.0, isAnchor: false },
      { id: 'u2', x: 25.5, y: -2.0, isAnchor: false }
    ],
    members: [
      { id: 'r0', nodeAId: 'n0', nodeBId: 'n1', material: 'reinforced_road' },
      { id: 'r1', nodeAId: 'n1', nodeBId: 'n2', material: 'reinforced_road' },
      { id: 'r2', nodeAId: 'n2', nodeBId: 'n3', material: 'reinforced_road' },
      { id: 'r3', nodeAId: 'n3', nodeBId: 'n4', material: 'reinforced_road' },
      { id: 'r4', nodeAId: 'n4', nodeBId: 'n5', material: 'reinforced_road' },
      { id: 'r5', nodeAId: 'n5', nodeBId: 'n6', material: 'reinforced_road' },
      { id: 'r6', nodeAId: 'n6', nodeBId: 'n7', material: 'reinforced_road' },
      { id: 'r7', nodeAId: 'n7', nodeBId: 'n8', material: 'reinforced_road' },
      { id: 'r8', nodeAId: 'n8', nodeBId: 'n9', material: 'reinforced_road' },
      { id: 'r9', nodeAId: 'n9', nodeBId: 'n10', material: 'reinforced_road' },
      { id: 'r10', nodeAId: 'n10', nodeBId: 'n11', material: 'reinforced_road' },
      { id: 'r11', nodeAId: 'n11', nodeBId: 'n12', material: 'reinforced_road' },
      { id: 'r12', nodeAId: 'n12', nodeBId: 'n13', material: 'reinforced_road' },
      { id: 'r13', nodeAId: 'n13', nodeBId: 'n14', material: 'reinforced_road' },
      { id: 'cl0', nodeAId: 'tl', nodeBId: 'n2', material: 'cable' },
      { id: 'cl1', nodeAId: 'tl', nodeBId: 'n3', material: 'cable' },
      { id: 'cl2', nodeAId: 'tl', nodeBId: 'n4', material: 'cable' },
      { id: 'cl3', nodeAId: 'tl', nodeBId: 'n5', material: 'cable' },
      { id: 'cl4', nodeAId: 'tl', nodeBId: 'n6', material: 'cable' },
      { id: 'cl5', nodeAId: 'tl', nodeBId: 'n7', material: 'cable' },
      { id: 'cr0', nodeAId: 'tr', nodeBId: 'n7', material: 'cable' },
      { id: 'cr1', nodeAId: 'tr', nodeBId: 'n8', material: 'cable' },
      { id: 'cr2', nodeAId: 'tr', nodeBId: 'n9', material: 'cable' },
      { id: 'cr3', nodeAId: 'tr', nodeBId: 'n10', material: 'cable' },
      { id: 'cr4', nodeAId: 'tr', nodeBId: 'n11', material: 'cable' },
      { id: 'cr5', nodeAId: 'tr', nodeBId: 'n12', material: 'cable' },
      { id: 'sa0', nodeAId: 'll', nodeBId: 'u1', material: 'steel' },
      { id: 'sa1', nodeAId: 'u1', nodeBId: 'n1', material: 'steel' },
      { id: 'sa2', nodeAId: 'u1', nodeBId: 'n2', material: 'steel' },
      { id: 'sa3', nodeAId: 'u1', nodeBId: 'n3', material: 'steel' },
      { id: 'sa4', nodeAId: 'lr', nodeBId: 'u2', material: 'steel' },
      { id: 'sa5', nodeAId: 'u2', nodeBId: 'n13', material: 'steel' },
      { id: 'sa6', nodeAId: 'u2', nodeBId: 'n12', material: 'steel' },
      { id: 'sa7', nodeAId: 'u2', nodeBId: 'n11', material: 'steel' }
    ]
  };
}

// Hydrate structural hints and reference blueprints into campaign levels
for (const lvl of CAMPAIGN_LEVELS) {
  lvl.structuralHint = getLevelStructuralHint(lvl.id);
  lvl.hintBlueprint = getReferenceHintBlueprint(lvl.id);
}

export function getLevelById(levelId: number): LevelDefinition | undefined {
  return CAMPAIGN_LEVELS.find((l) => l.id === levelId);
}
