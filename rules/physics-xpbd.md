---
trigger: glob
globs:
  - "packages/shared/**"
  - "tests/**"
description: XPBD Physics & Campaign Engineering Rules
---

# XPBD Physics & Campaign Engineering Rules

## Solver Constants (Verified Baseline)
- Gravity: G = 9.81 m/s^2 (Y-up world coordinates; renderer flips Y to screen space).
- Fixed frame step: dt = 1 / 60, substeps = 24, iterations = 2 (h = dt / 24).
- Structural Rayleigh damping coefficient: beta_damp = 0.0012; suspension damping: 0.018.
- Minimum free node mass floor: 40.0 kg. Air velocity retention: 0.999 (nodes), 0.9995 (vehicles).

## Exact Calibrated Material Catalog
- `road` (drivable): $160/m, maxLen 2.5 m, 200 kg/m, EA 4.0e7, EI 3.2e4, Tmax 95 kN, Ccrush 100 kN
- `reinforced_road` (drivable): $320/m, maxLen 2.5 m, 310 kg/m, EA 8.5e7, EI 9.0e4, Tmax 220 kN, Ccrush 230 kN
- `wood` (structural): $120/m, maxLen 2.5 m, 70 kg/m, EA 2.6e7, EI 3.4e4, Tmax 85 kN, Ccrush 90 kN
- `steel` (structural): $340/m, maxLen 4.5 m, 150 kg/m, EA 1.0e8, EI 1.7e5, Tmax 300 kN, Ccrush 300 kN
- `cable` (tension-only): $220/m, maxLen 18.0 m, 20 kg/m, EA 6.0e7, EI 0, Tmax 260 kN, Ccrush 0 kN

## Mandatory Unit & Gate Invariants
- Static 2-bar 45-degree steel arch under 40 kN apex load MUST match analytical equilibrium
  `F_exact = -(40000 + m_apex * 9.81) / (2 * sin(theta))` within 0.2%.
- Compressed cable (dist < L0) MUST report exact 0.00 kN force (slack).
- Wood column under 60 kN compression MUST survive at L = 1.4 m and fail by buckling at L = 2.4 m.
- All 8 campaign levels MUST have an automated test proving:
  1. An unbraced flat road collapses (passed === false).
  2. The reference engineered bridge passes with brokenCount === 0, cost <= budgetCap, and peakStressPct < 90%.
- Never use Math.random() inside xpbdSolver.ts or vehicleModel.ts. Keep physics 100% deterministic.
