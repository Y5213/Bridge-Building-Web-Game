import { VehicleConfig } from '../schemas';
import { WheelParticle, ChassisParticle, InternalSpring, XPBDSolver } from './xpbdSolver';

export class VehicleInstance {
  config: VehicleConfig;
  wheels: WheelParticle[] = [];
  chassis: ChassisParticle[] = [];
  springs: InternalSpring[] = [];

  targetSpeedMs: number;
  startX: number;
  startY: number;
  wheelbaseM: number;
  chassisHeightM: number;

  constructor(config: VehicleConfig, startX: number, startY: number) {
    this.config = config;
    this.targetSpeedMs = config.speedMs;
    this.startX = startX;
    this.startY = startY;
    this.wheelbaseM = config.wheelbaseM;
    this.chassisHeightM = config.chassisHeightM;

    this.buildVehicle();
  }

  private buildVehicle(): void {
    const totalMass = this.config.massKg;
    const wheelMassRatio = 0.35;
    const chassisMassRatio = 0.65;

    const wheelCount = this.config.wheelCount;
    const perWheelMass = (totalMass * wheelMassRatio) / wheelCount;
    const perChassisMass = (totalMass * chassisMassRatio) / 2;

    const r = this.config.wheelRadiusM;
    const wb = this.config.wheelbaseM;
    const ch = this.config.chassisHeightM;

    // 1. Create Wheels
    if (wheelCount === 2) {
      // Rear wheel (left)
      this.wheels.push({
        id: 'wheel_rear',
        x: this.startX - wb * 0.5,
        y: this.startY + r,
        prevX: this.startX - wb * 0.5,
        prevY: this.startY + r,
        vx: this.targetSpeedMs * 0.8,
        vy: 0,
        invMass: 1.0 / perWheelMass,
        radiusM: r,
        grounded: false,
        groundTangentX: 1,
        groundTangentY: 0
      });

      // Front wheel (right)
      this.wheels.push({
        id: 'wheel_front',
        x: this.startX + wb * 0.5,
        y: this.startY + r,
        prevX: this.startX + wb * 0.5,
        prevY: this.startY + r,
        vx: this.targetSpeedMs * 0.8,
        vy: 0,
        invMass: 1.0 / perWheelMass,
        radiusM: r,
        grounded: false,
        groundTangentX: 1,
        groundTangentY: 0
      });
    } else {
      // 3-axle heavy vehicle: steer front, tandem rear
      const rear1X = this.startX - wb * 0.5;
      const rear2X = this.startX - wb * 0.5 + 1.2;
      const frontX = this.startX + wb * 0.5;

      this.wheels.push({
        id: 'wheel_rear_1',
        x: rear1X,
        y: this.startY + r,
        prevX: rear1X,
        prevY: this.startY + r,
        vx: this.targetSpeedMs * 0.8,
        vy: 0,
        invMass: 1.0 / perWheelMass,
        radiusM: r,
        grounded: false,
        groundTangentX: 1,
        groundTangentY: 0
      });

      this.wheels.push({
        id: 'wheel_rear_2',
        x: rear2X,
        y: this.startY + r,
        prevX: rear2X,
        prevY: this.startY + r,
        vx: this.targetSpeedMs * 0.8,
        vy: 0,
        invMass: 1.0 / perWheelMass,
        radiusM: r,
        grounded: false,
        groundTangentX: 1,
        groundTangentY: 0
      });

      this.wheels.push({
        id: 'wheel_front',
        x: frontX,
        y: this.startY + r,
        prevX: frontX,
        prevY: this.startY + r,
        vx: this.targetSpeedMs * 0.8,
        vy: 0,
        invMass: 1.0 / perWheelMass,
        radiusM: r,
        grounded: false,
        groundTangentX: 1,
        groundTangentY: 0
      });
    }

    // 2. Create Elevated Chassis Particles (Rear roof & Front roof)
    const chassisY = this.startY + r + ch;
    const cRear: ChassisParticle = {
      id: 'chassis_rear',
      x: this.startX - wb * 0.45,
      y: chassisY,
      prevX: this.startX - wb * 0.45,
      prevY: chassisY,
      vx: this.targetSpeedMs * 0.8,
      vy: 0,
      invMass: 1.0 / perChassisMass
    };

    const cFront: ChassisParticle = {
      id: 'chassis_front',
      x: this.startX + wb * 0.45,
      y: chassisY,
      prevX: this.startX + wb * 0.45,
      prevY: chassisY,
      vx: this.targetSpeedMs * 0.8,
      vy: 0,
      invMass: 1.0 / perChassisMass
    };

    this.chassis.push(cRear, cFront);

    // 3. Stiff Chassis Beam linking cRear & cFront (alpha = 1e-8)
    const cdx = cFront.x - cRear.x;
    const cdy = cFront.y - cRear.y;
    const chassisLen = Math.sqrt(cdx * cdx + cdy * cdy);
    this.springs.push({
      pA: cRear,
      pB: cFront,
      restLengthM: chassisLen,
      compliance: 1e-8,
      damping: 0.015,
      lagrangeMultiplier: 0
    });

    // 4. Compliant Vertical & Diagonal Suspension Struts
    // k_susp = 8 * M * g
    const kSusp = 8.0 * totalMass * 9.81;
    const suspCompliance = 1.0 / kSusp;
    const suspDamping = 0.018;

    for (const w of this.wheels) {
      // Connect to rear chassis
      const dRearX = cRear.x - w.x;
      const dRearY = cRear.y - w.y;
      const lRear = Math.sqrt(dRearX * dRearX + dRearY * dRearY);
      this.springs.push({
        pA: w,
        pB: cRear,
        restLengthM: lRear,
        compliance: suspCompliance,
        damping: suspDamping,
        lagrangeMultiplier: 0
      });

      // Connect to front chassis
      const dFrontX = cFront.x - w.x;
      const dFrontY = cFront.y - w.y;
      const lFront = Math.sqrt(dFrontX * dFrontX + dFrontY * dFrontY);
      this.springs.push({
        pA: w,
        pB: cFront,
        restLengthM: lFront,
        compliance: suspCompliance,
        damping: suspDamping,
        lagrangeMultiplier: 0
      });
    }
  }

  attachToSolver(solver: XPBDSolver): void {
    solver.wheels.push(...this.wheels);
    solver.chassisParticles.push(...this.chassis);
    solver.vehicleSprings.push(...this.springs);
  }

  /**
   * Apply motor drive along grounded road tangent
   */
  updateDrive(dt: number): void {
    const targetSpd = this.targetSpeedMs;
    // High hill-climbing drive acceleration (especially for uphill climbs like Stepped Bluff)
    const maxAccel = this.config.type === 'suv' ? 8.5 : 6.0; // m/s^2

    for (const w of this.wheels) {
      if (w.grounded) {
        const curSpd = w.vx * w.groundTangentX + w.vy * w.groundTangentY;
        if (curSpd < targetSpd) {
          const accel = Math.min(maxAccel * dt, targetSpd - curSpd);
          w.vx += accel * w.groundTangentX;
          w.vy += accel * w.groundTangentY;
        }
      }
    }
  }

  getMinX(): number {
    let min = Infinity;
    for (const w of this.wheels) {
      if (w.x < min) min = w.x;
    }
    return min;
  }

  getMaxX(): number {
    let max = -Infinity;
    for (const w of this.wheels) {
      if (w.x > max) max = w.x;
    }
    return max;
  }

  getMinY(): number {
    let min = Infinity;
    for (const w of this.wheels) {
      if (w.y < min) min = w.y;
    }
    return min;
  }
}
