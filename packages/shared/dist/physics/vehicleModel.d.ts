import { VehicleConfig } from '../schemas';
import { WheelParticle, ChassisParticle, InternalSpring, XPBDSolver } from './xpbdSolver';
export declare class VehicleInstance {
    config: VehicleConfig;
    wheels: WheelParticle[];
    chassis: ChassisParticle[];
    springs: InternalSpring[];
    targetSpeedMs: number;
    startX: number;
    startY: number;
    wheelbaseM: number;
    chassisHeightM: number;
    constructor(config: VehicleConfig, startX: number, startY: number);
    private buildVehicle;
    attachToSolver(solver: XPBDSolver): void;
    /**
     * Apply motor drive along grounded road tangent
     */
    updateDrive(dt: number): void;
    getMinX(): number;
    getMaxX(): number;
    getMinY(): number;
}
//# sourceMappingURL=vehicleModel.d.ts.map