import { z } from 'zod';
export declare const MaterialTypeSchema: z.ZodEnum<["road", "reinforced_road", "wood", "steel", "cable"]>;
export type MaterialType = z.infer<typeof MaterialTypeSchema>;
export declare const NodeSchema: z.ZodObject<{
    id: z.ZodString;
    x: z.ZodNumber;
    y: z.ZodNumber;
    isAnchor: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    isPier: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    id: string;
    x: number;
    y: number;
    isAnchor: boolean;
    isPier?: boolean | undefined;
}, {
    id: string;
    x: number;
    y: number;
    isAnchor?: boolean | undefined;
    isPier?: boolean | undefined;
}>;
export type NodeData = z.infer<typeof NodeSchema>;
export declare const MemberSchema: z.ZodObject<{
    id: z.ZodString;
    nodeAId: z.ZodString;
    nodeBId: z.ZodString;
    material: z.ZodEnum<["road", "reinforced_road", "wood", "steel", "cable"]>;
}, "strip", z.ZodTypeAny, {
    id: string;
    nodeAId: string;
    nodeBId: string;
    material: "road" | "reinforced_road" | "wood" | "steel" | "cable";
}, {
    id: string;
    nodeAId: string;
    nodeBId: string;
    material: "road" | "reinforced_road" | "wood" | "steel" | "cable";
}>;
export type MemberData = z.infer<typeof MemberSchema>;
export declare const BlueprintSchema: z.ZodObject<{
    nodes: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        x: z.ZodNumber;
        y: z.ZodNumber;
        isAnchor: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        isPier: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        x: number;
        y: number;
        isAnchor: boolean;
        isPier?: boolean | undefined;
    }, {
        id: string;
        x: number;
        y: number;
        isAnchor?: boolean | undefined;
        isPier?: boolean | undefined;
    }>, "many">;
    members: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        nodeAId: z.ZodString;
        nodeBId: z.ZodString;
        material: z.ZodEnum<["road", "reinforced_road", "wood", "steel", "cable"]>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        nodeAId: string;
        nodeBId: string;
        material: "road" | "reinforced_road" | "wood" | "steel" | "cable";
    }, {
        id: string;
        nodeAId: string;
        nodeBId: string;
        material: "road" | "reinforced_road" | "wood" | "steel" | "cable";
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    nodes: {
        id: string;
        x: number;
        y: number;
        isAnchor: boolean;
        isPier?: boolean | undefined;
    }[];
    members: {
        id: string;
        nodeAId: string;
        nodeBId: string;
        material: "road" | "reinforced_road" | "wood" | "steel" | "cable";
    }[];
}, {
    nodes: {
        id: string;
        x: number;
        y: number;
        isAnchor?: boolean | undefined;
        isPier?: boolean | undefined;
    }[];
    members: {
        id: string;
        nodeAId: string;
        nodeBId: string;
        material: "road" | "reinforced_road" | "wood" | "steel" | "cable";
    }[];
}>;
export declare const BlueprintJSONSchema: z.ZodObject<{
    nodes: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        x: z.ZodNumber;
        y: z.ZodNumber;
        isAnchor: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        isPier: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        x: number;
        y: number;
        isAnchor: boolean;
        isPier?: boolean | undefined;
    }, {
        id: string;
        x: number;
        y: number;
        isAnchor?: boolean | undefined;
        isPier?: boolean | undefined;
    }>, "many">;
    members: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        nodeAId: z.ZodString;
        nodeBId: z.ZodString;
        material: z.ZodEnum<["road", "reinforced_road", "wood", "steel", "cable"]>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        nodeAId: string;
        nodeBId: string;
        material: "road" | "reinforced_road" | "wood" | "steel" | "cable";
    }, {
        id: string;
        nodeAId: string;
        nodeBId: string;
        material: "road" | "reinforced_road" | "wood" | "steel" | "cable";
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    nodes: {
        id: string;
        x: number;
        y: number;
        isAnchor: boolean;
        isPier?: boolean | undefined;
    }[];
    members: {
        id: string;
        nodeAId: string;
        nodeBId: string;
        material: "road" | "reinforced_road" | "wood" | "steel" | "cable";
    }[];
}, {
    nodes: {
        id: string;
        x: number;
        y: number;
        isAnchor?: boolean | undefined;
        isPier?: boolean | undefined;
    }[];
    members: {
        id: string;
        nodeAId: string;
        nodeBId: string;
        material: "road" | "reinforced_road" | "wood" | "steel" | "cable";
    }[];
}>;
export type BlueprintJSON = z.infer<typeof BlueprintSchema>;
export declare const VehicleTypeSchema: z.ZodEnum<["hatchback", "pickup", "van", "suv", "bus", "box_truck", "tanker", "semi"]>;
export type VehicleType = z.infer<typeof VehicleTypeSchema>;
export declare const VehicleConfigSchema: z.ZodObject<{
    type: z.ZodEnum<["hatchback", "pickup", "van", "suv", "bus", "box_truck", "tanker", "semi"]>;
    name: z.ZodString;
    massKg: z.ZodNumber;
    speedMs: z.ZodNumber;
    wheelCount: z.ZodNumber;
    wheelRadiusM: z.ZodNumber;
    wheelbaseM: z.ZodNumber;
    chassisHeightM: z.ZodNumber;
    color: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "hatchback" | "pickup" | "van" | "suv" | "bus" | "box_truck" | "tanker" | "semi";
    name: string;
    massKg: number;
    speedMs: number;
    wheelCount: number;
    wheelRadiusM: number;
    wheelbaseM: number;
    chassisHeightM: number;
    color: string;
}, {
    type: "hatchback" | "pickup" | "van" | "suv" | "bus" | "box_truck" | "tanker" | "semi";
    name: string;
    massKg: number;
    speedMs: number;
    wheelCount: number;
    wheelRadiusM: number;
    wheelbaseM: number;
    chassisHeightM: number;
    color: string;
}>;
export type VehicleConfig = z.infer<typeof VehicleConfigSchema>;
export declare const LevelDefinitionSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    biome: z.ZodString;
    spanM: z.ZodNumber;
    elevationStepM: z.ZodDefault<z.ZodNumber>;
    anchors: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        x: z.ZodNumber;
        y: z.ZodNumber;
        isPier: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        x: number;
        y: number;
        isPier?: boolean | undefined;
    }, {
        id: string;
        x: number;
        y: number;
        isPier?: boolean | undefined;
    }>, "many">;
    waterLevelY: z.ZodDefault<z.ZodNumber>;
    leftLedgePolygon: z.ZodArray<z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>, "many">;
    rightLedgePolygon: z.ZodArray<z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>, "many">;
    pierPolygons: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>, "many">, "many">>;
    noBuildZone: z.ZodOptional<z.ZodObject<{
        minX: z.ZodNumber;
        maxX: z.ZodNumber;
        maxY: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        minX: number;
        maxX: number;
        maxY: number;
    }, {
        minX: number;
        maxX: number;
        maxY: number;
    }>>;
    vehicles: z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<["hatchback", "pickup", "van", "suv", "bus", "box_truck", "tanker", "semi"]>;
        name: z.ZodString;
        massKg: z.ZodNumber;
        speedMs: z.ZodNumber;
        wheelCount: z.ZodNumber;
        wheelRadiusM: z.ZodNumber;
        wheelbaseM: z.ZodNumber;
        chassisHeightM: z.ZodNumber;
        color: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "hatchback" | "pickup" | "van" | "suv" | "bus" | "box_truck" | "tanker" | "semi";
        name: string;
        massKg: number;
        speedMs: number;
        wheelCount: number;
        wheelRadiusM: number;
        wheelbaseM: number;
        chassisHeightM: number;
        color: string;
    }, {
        type: "hatchback" | "pickup" | "van" | "suv" | "bus" | "box_truck" | "tanker" | "semi";
        name: string;
        massKg: number;
        speedMs: number;
        wheelCount: number;
        wheelRadiusM: number;
        wheelbaseM: number;
        chassisHeightM: number;
        color: string;
    }>, "many">;
    unlockedMaterials: z.ZodArray<z.ZodEnum<["road", "reinforced_road", "wood", "steel", "cable"]>, "many">;
    budgetCap: z.ZodNumber;
    threeStarBudget: z.ZodNumber;
    maxStressTolerancePct: z.ZodDefault<z.ZodNumber>;
    structuralHint: z.ZodOptional<z.ZodString>;
    hintBlueprint: z.ZodOptional<z.ZodObject<{
        nodes: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            x: z.ZodNumber;
            y: z.ZodNumber;
            isAnchor: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            isPier: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            x: number;
            y: number;
            isAnchor: boolean;
            isPier?: boolean | undefined;
        }, {
            id: string;
            x: number;
            y: number;
            isAnchor?: boolean | undefined;
            isPier?: boolean | undefined;
        }>, "many">;
        members: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            nodeAId: z.ZodString;
            nodeBId: z.ZodString;
            material: z.ZodEnum<["road", "reinforced_road", "wood", "steel", "cable"]>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            nodeAId: string;
            nodeBId: string;
            material: "road" | "reinforced_road" | "wood" | "steel" | "cable";
        }, {
            id: string;
            nodeAId: string;
            nodeBId: string;
            material: "road" | "reinforced_road" | "wood" | "steel" | "cable";
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        nodes: {
            id: string;
            x: number;
            y: number;
            isAnchor: boolean;
            isPier?: boolean | undefined;
        }[];
        members: {
            id: string;
            nodeAId: string;
            nodeBId: string;
            material: "road" | "reinforced_road" | "wood" | "steel" | "cable";
        }[];
    }, {
        nodes: {
            id: string;
            x: number;
            y: number;
            isAnchor?: boolean | undefined;
            isPier?: boolean | undefined;
        }[];
        members: {
            id: string;
            nodeAId: string;
            nodeBId: string;
            material: "road" | "reinforced_road" | "wood" | "steel" | "cable";
        }[];
    }>>;
}, "strip", z.ZodTypeAny, {
    id: number;
    name: string;
    biome: string;
    spanM: number;
    elevationStepM: number;
    anchors: {
        id: string;
        x: number;
        y: number;
        isPier?: boolean | undefined;
    }[];
    waterLevelY: number;
    leftLedgePolygon: [number, number][];
    rightLedgePolygon: [number, number][];
    vehicles: {
        type: "hatchback" | "pickup" | "van" | "suv" | "bus" | "box_truck" | "tanker" | "semi";
        name: string;
        massKg: number;
        speedMs: number;
        wheelCount: number;
        wheelRadiusM: number;
        wheelbaseM: number;
        chassisHeightM: number;
        color: string;
    }[];
    unlockedMaterials: ("road" | "reinforced_road" | "wood" | "steel" | "cable")[];
    budgetCap: number;
    threeStarBudget: number;
    maxStressTolerancePct: number;
    pierPolygons?: [number, number][][] | undefined;
    noBuildZone?: {
        minX: number;
        maxX: number;
        maxY: number;
    } | undefined;
    structuralHint?: string | undefined;
    hintBlueprint?: {
        nodes: {
            id: string;
            x: number;
            y: number;
            isAnchor: boolean;
            isPier?: boolean | undefined;
        }[];
        members: {
            id: string;
            nodeAId: string;
            nodeBId: string;
            material: "road" | "reinforced_road" | "wood" | "steel" | "cable";
        }[];
    } | undefined;
}, {
    id: number;
    name: string;
    biome: string;
    spanM: number;
    anchors: {
        id: string;
        x: number;
        y: number;
        isPier?: boolean | undefined;
    }[];
    leftLedgePolygon: [number, number][];
    rightLedgePolygon: [number, number][];
    vehicles: {
        type: "hatchback" | "pickup" | "van" | "suv" | "bus" | "box_truck" | "tanker" | "semi";
        name: string;
        massKg: number;
        speedMs: number;
        wheelCount: number;
        wheelRadiusM: number;
        wheelbaseM: number;
        chassisHeightM: number;
        color: string;
    }[];
    unlockedMaterials: ("road" | "reinforced_road" | "wood" | "steel" | "cable")[];
    budgetCap: number;
    threeStarBudget: number;
    elevationStepM?: number | undefined;
    waterLevelY?: number | undefined;
    pierPolygons?: [number, number][][] | undefined;
    noBuildZone?: {
        minX: number;
        maxX: number;
        maxY: number;
    } | undefined;
    maxStressTolerancePct?: number | undefined;
    structuralHint?: string | undefined;
    hintBlueprint?: {
        nodes: {
            id: string;
            x: number;
            y: number;
            isAnchor?: boolean | undefined;
            isPier?: boolean | undefined;
        }[];
        members: {
            id: string;
            nodeAId: string;
            nodeBId: string;
            material: "road" | "reinforced_road" | "wood" | "steel" | "cable";
        }[];
    } | undefined;
}>;
export type LevelDefinition = z.infer<typeof LevelDefinitionSchema>;
export declare const AuthSignupSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    displayName: z.ZodString;
    guestState: z.ZodOptional<z.ZodObject<{
        lastPlayedLevelId: z.ZodOptional<z.ZodNumber>;
        highestUnlockedLevelId: z.ZodOptional<z.ZodNumber>;
        drafts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            nodes: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                x: z.ZodNumber;
                y: z.ZodNumber;
                isAnchor: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
                isPier: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                id: string;
                x: number;
                y: number;
                isAnchor: boolean;
                isPier?: boolean | undefined;
            }, {
                id: string;
                x: number;
                y: number;
                isAnchor?: boolean | undefined;
                isPier?: boolean | undefined;
            }>, "many">;
            members: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                nodeAId: z.ZodString;
                nodeBId: z.ZodString;
                material: z.ZodEnum<["road", "reinforced_road", "wood", "steel", "cable"]>;
            }, "strip", z.ZodTypeAny, {
                id: string;
                nodeAId: string;
                nodeBId: string;
                material: "road" | "reinforced_road" | "wood" | "steel" | "cable";
            }, {
                id: string;
                nodeAId: string;
                nodeBId: string;
                material: "road" | "reinforced_road" | "wood" | "steel" | "cable";
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            nodes: {
                id: string;
                x: number;
                y: number;
                isAnchor: boolean;
                isPier?: boolean | undefined;
            }[];
            members: {
                id: string;
                nodeAId: string;
                nodeBId: string;
                material: "road" | "reinforced_road" | "wood" | "steel" | "cable";
            }[];
        }, {
            nodes: {
                id: string;
                x: number;
                y: number;
                isAnchor?: boolean | undefined;
                isPier?: boolean | undefined;
            }[];
            members: {
                id: string;
                nodeAId: string;
                nodeBId: string;
                material: "road" | "reinforced_road" | "wood" | "steel" | "cable";
            }[];
        }>>>;
    }, "strip", z.ZodTypeAny, {
        lastPlayedLevelId?: number | undefined;
        highestUnlockedLevelId?: number | undefined;
        drafts?: Record<string, {
            nodes: {
                id: string;
                x: number;
                y: number;
                isAnchor: boolean;
                isPier?: boolean | undefined;
            }[];
            members: {
                id: string;
                nodeAId: string;
                nodeBId: string;
                material: "road" | "reinforced_road" | "wood" | "steel" | "cable";
            }[];
        }> | undefined;
    }, {
        lastPlayedLevelId?: number | undefined;
        highestUnlockedLevelId?: number | undefined;
        drafts?: Record<string, {
            nodes: {
                id: string;
                x: number;
                y: number;
                isAnchor?: boolean | undefined;
                isPier?: boolean | undefined;
            }[];
            members: {
                id: string;
                nodeAId: string;
                nodeBId: string;
                material: "road" | "reinforced_road" | "wood" | "steel" | "cable";
            }[];
        }> | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    displayName: string;
    guestState?: {
        lastPlayedLevelId?: number | undefined;
        highestUnlockedLevelId?: number | undefined;
        drafts?: Record<string, {
            nodes: {
                id: string;
                x: number;
                y: number;
                isAnchor: boolean;
                isPier?: boolean | undefined;
            }[];
            members: {
                id: string;
                nodeAId: string;
                nodeBId: string;
                material: "road" | "reinforced_road" | "wood" | "steel" | "cable";
            }[];
        }> | undefined;
    } | undefined;
}, {
    email: string;
    password: string;
    displayName: string;
    guestState?: {
        lastPlayedLevelId?: number | undefined;
        highestUnlockedLevelId?: number | undefined;
        drafts?: Record<string, {
            nodes: {
                id: string;
                x: number;
                y: number;
                isAnchor?: boolean | undefined;
                isPier?: boolean | undefined;
            }[];
            members: {
                id: string;
                nodeAId: string;
                nodeBId: string;
                material: "road" | "reinforced_road" | "wood" | "steel" | "cable";
            }[];
        }> | undefined;
    } | undefined;
}>;
export type AuthSignupInput = z.infer<typeof AuthSignupSchema>;
export declare const AuthLoginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type AuthLoginInput = z.infer<typeof AuthLoginSchema>;
export declare const CurrentLevelUpdateSchema: z.ZodObject<{
    levelId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    levelId: number;
}, {
    levelId: number;
}>;
export declare const SaveDraftSchema: z.ZodObject<{
    blueprint: z.ZodObject<{
        nodes: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            x: z.ZodNumber;
            y: z.ZodNumber;
            isAnchor: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            isPier: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            x: number;
            y: number;
            isAnchor: boolean;
            isPier?: boolean | undefined;
        }, {
            id: string;
            x: number;
            y: number;
            isAnchor?: boolean | undefined;
            isPier?: boolean | undefined;
        }>, "many">;
        members: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            nodeAId: z.ZodString;
            nodeBId: z.ZodString;
            material: z.ZodEnum<["road", "reinforced_road", "wood", "steel", "cable"]>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            nodeAId: string;
            nodeBId: string;
            material: "road" | "reinforced_road" | "wood" | "steel" | "cable";
        }, {
            id: string;
            nodeAId: string;
            nodeBId: string;
            material: "road" | "reinforced_road" | "wood" | "steel" | "cable";
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        nodes: {
            id: string;
            x: number;
            y: number;
            isAnchor: boolean;
            isPier?: boolean | undefined;
        }[];
        members: {
            id: string;
            nodeAId: string;
            nodeBId: string;
            material: "road" | "reinforced_road" | "wood" | "steel" | "cable";
        }[];
    }, {
        nodes: {
            id: string;
            x: number;
            y: number;
            isAnchor?: boolean | undefined;
            isPier?: boolean | undefined;
        }[];
        members: {
            id: string;
            nodeAId: string;
            nodeBId: string;
            material: "road" | "reinforced_road" | "wood" | "steel" | "cable";
        }[];
    }>;
    revision: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    blueprint: {
        nodes: {
            id: string;
            x: number;
            y: number;
            isAnchor: boolean;
            isPier?: boolean | undefined;
        }[];
        members: {
            id: string;
            nodeAId: string;
            nodeBId: string;
            material: "road" | "reinforced_road" | "wood" | "steel" | "cable";
        }[];
    };
    revision?: number | undefined;
}, {
    blueprint: {
        nodes: {
            id: string;
            x: number;
            y: number;
            isAnchor?: boolean | undefined;
            isPier?: boolean | undefined;
        }[];
        members: {
            id: string;
            nodeAId: string;
            nodeBId: string;
            material: "road" | "reinforced_road" | "wood" | "steel" | "cable";
        }[];
    };
    revision?: number | undefined;
}>;
export declare const CompleteLevelSchema: z.ZodObject<{
    blueprint: z.ZodObject<{
        nodes: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            x: z.ZodNumber;
            y: z.ZodNumber;
            isAnchor: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            isPier: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            x: number;
            y: number;
            isAnchor: boolean;
            isPier?: boolean | undefined;
        }, {
            id: string;
            x: number;
            y: number;
            isAnchor?: boolean | undefined;
            isPier?: boolean | undefined;
        }>, "many">;
        members: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            nodeAId: z.ZodString;
            nodeBId: z.ZodString;
            material: z.ZodEnum<["road", "reinforced_road", "wood", "steel", "cable"]>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            nodeAId: string;
            nodeBId: string;
            material: "road" | "reinforced_road" | "wood" | "steel" | "cable";
        }, {
            id: string;
            nodeAId: string;
            nodeBId: string;
            material: "road" | "reinforced_road" | "wood" | "steel" | "cable";
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        nodes: {
            id: string;
            x: number;
            y: number;
            isAnchor: boolean;
            isPier?: boolean | undefined;
        }[];
        members: {
            id: string;
            nodeAId: string;
            nodeBId: string;
            material: "road" | "reinforced_road" | "wood" | "steel" | "cable";
        }[];
    }, {
        nodes: {
            id: string;
            x: number;
            y: number;
            isAnchor?: boolean | undefined;
            isPier?: boolean | undefined;
        }[];
        members: {
            id: string;
            nodeAId: string;
            nodeBId: string;
            material: "road" | "reinforced_road" | "wood" | "steel" | "cable";
        }[];
    }>;
    peakStressPct: z.ZodNumber;
    brokenCount: z.ZodNumber;
    crossingTimeSec: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    blueprint: {
        nodes: {
            id: string;
            x: number;
            y: number;
            isAnchor: boolean;
            isPier?: boolean | undefined;
        }[];
        members: {
            id: string;
            nodeAId: string;
            nodeBId: string;
            material: "road" | "reinforced_road" | "wood" | "steel" | "cable";
        }[];
    };
    peakStressPct: number;
    brokenCount: number;
    crossingTimeSec: number;
}, {
    blueprint: {
        nodes: {
            id: string;
            x: number;
            y: number;
            isAnchor?: boolean | undefined;
            isPier?: boolean | undefined;
        }[];
        members: {
            id: string;
            nodeAId: string;
            nodeBId: string;
            material: "road" | "reinforced_road" | "wood" | "steel" | "cable";
        }[];
    };
    peakStressPct: number;
    brokenCount: number;
    crossingTimeSec: number;
}>;
export declare const UserPreferencesSchema: z.ZodObject<{
    colorblindMode: z.ZodOptional<z.ZodBoolean>;
    audioMuted: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    colorblindMode?: boolean | undefined;
    audioMuted?: boolean | undefined;
}, {
    colorblindMode?: boolean | undefined;
    audioMuted?: boolean | undefined;
}>;
//# sourceMappingURL=schemas.d.ts.map