---
name: physics-campaign-gate
description: Runs and validates the headless deterministic XPBD physics engine, analytical static equilibrium, cable slack, Euler buckling, Voronoi seam-free contact, and all 8 campaign level solvability gates via Vitest. Use whenever modifying physics, materials, vehicles, or level definitions.
---

# Physics & Campaign Solvability Verification Protocol

Follow these steps whenever verifying or debugging packages/shared:
1. Execute the focused shared test suite first:
   `npm run test --workspace=@spancraft/shared`
2. Confirm all five physics invariants pass with zero skipped tests:
   - Analytical 2-bar 45-degree steel arch equilibrium matches `-(40000 + m_apex * 9.81) / (2 * sin(theta))` within 0.2%.
   - Compressed cable reports 0.00 kN axial force.
   - Wood strut under 60 kN compression survives at 1.4 m and fails by buckling at 2.4 m.
   - Flexible L2 bridge crossing completes smoothly (`crossed === true`) with zero abutment seam stalling.
   - Determinism check: running Level 2 twice produces bit-identical final node positions and peak stress.
3. Confirm the 8-level campaign matrix passes 100%:
   - For every level 1 through 8, an unbraced flat road collapses (`passed === false`).
   - For every level 1 through 8, the reference engineered bridge crosses with `passed === true`, `brokenCount === 0`, `totalCost <= budgetCap`, and `peakStressPct < 90%`.
