import { z } from 'zod';

export const MaterialTypeSchema = z.enum([
  'road',
  'reinforced_road',
  'wood',
  'steel',
  'cable'
]);
export type MaterialType = z.infer<typeof MaterialTypeSchema>;

export const NodeSchema = z.object({
  id: z.string(),
  x: z.number(),
  y: z.number(),
  isAnchor: z.boolean().optional().default(false),
  isPier: z.boolean().optional()
});
export type NodeData = z.infer<typeof NodeSchema>;

export const MemberSchema = z.object({
  id: z.string(),
  nodeAId: z.string(),
  nodeBId: z.string(),
  material: MaterialTypeSchema
});
export type MemberData = z.infer<typeof MemberSchema>;

export const BlueprintSchema = z.object({
  nodes: z.array(NodeSchema),
  members: z.array(MemberSchema)
});
export const BlueprintJSONSchema = BlueprintSchema;
export type BlueprintJSON = z.infer<typeof BlueprintSchema>;

export const VehicleTypeSchema = z.enum([
  'hatchback',
  'pickup',
  'van',
  'suv',
  'bus',
  'box_truck',
  'tanker',
  'semi'
]);
export type VehicleType = z.infer<typeof VehicleTypeSchema>;

export const VehicleConfigSchema = z.object({
  type: VehicleTypeSchema,
  name: z.string(),
  massKg: z.number(),
  speedMs: z.number(),
  wheelCount: z.number().int().min(2).max(3),
  wheelRadiusM: z.number(),
  wheelbaseM: z.number(),
  chassisHeightM: z.number(),
  color: z.string()
});
export type VehicleConfig = z.infer<typeof VehicleConfigSchema>;

export const LevelDefinitionSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  biome: z.string(),
  spanM: z.number(),
  elevationStepM: z.number().default(0),
  anchors: z.array(z.object({
    id: z.string(),
    x: z.number(),
    y: z.number(),
    isPier: z.boolean().optional()
  })),
  waterLevelY: z.number().default(-4.0),
  leftLedgePolygon: z.array(z.tuple([z.number(), z.number()])),
  rightLedgePolygon: z.array(z.tuple([z.number(), z.number()])),
  pierPolygons: z.array(z.array(z.tuple([z.number(), z.number()]))).optional(),
  noBuildZone: z.object({
    minX: z.number(),
    maxX: z.number(),
    maxY: z.number()
  }).optional(),
  vehicles: z.array(VehicleConfigSchema),
  unlockedMaterials: z.array(MaterialTypeSchema),
  budgetCap: z.number(),
  threeStarBudget: z.number(),
  maxStressTolerancePct: z.number().default(100.0),
  structuralHint: z.string().optional(),
  hintBlueprint: BlueprintSchema.optional()
});
export type LevelDefinition = z.infer<typeof LevelDefinitionSchema>;

// API Schemas
export const AuthSignupSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(8).max(128),
  displayName: z.string().min(2).max(40).trim(),
  guestState: z.object({
    lastPlayedLevelId: z.number().int().min(1).max(8).optional(),
    highestUnlockedLevelId: z.number().int().min(1).max(8).optional(),
    drafts: z.record(z.string(), BlueprintSchema).optional()
  }).optional()
});
export type AuthSignupInput = z.infer<typeof AuthSignupSchema>;

export const AuthLoginSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(1).max(128)
});
export type AuthLoginInput = z.infer<typeof AuthLoginSchema>;

export const CurrentLevelUpdateSchema = z.object({
  levelId: z.number().int().min(1).max(8)
});

export const SaveDraftSchema = z.object({
  blueprint: BlueprintSchema,
  revision: z.number().int().optional()
});

export const CompleteLevelSchema = z.object({
  blueprint: BlueprintSchema,
  peakStressPct: z.number(),
  brokenCount: z.number().int(),
  crossingTimeSec: z.number()
});

export const UserPreferencesSchema = z.object({
  colorblindMode: z.boolean().optional(),
  audioMuted: z.boolean().optional()
});
