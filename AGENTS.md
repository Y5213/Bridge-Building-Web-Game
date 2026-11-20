# SpanCraft — Workspace Engineering Contract

## Project Identity
SpanCraft is a vibrant 2D structural physics bridge-building web game ("Poly Bridge"-style)
built as a strict TypeScript monorepo (packages/shared, apps/api, apps/web) with
full login/signup authentication and automatic exact-level resumption for returning players.

## Hard Architectural Invariants (Never Violate)

### Single Source of Truth (packages/shared):
- ALL physics simulation (XPBD truss solver, vehicle model, Voronoi contact), material specs,
  8-level campaign definitions, budget quotation calculators, and Zod schemas MUST live in
  packages/shared.
- packages/shared MUST have ZERO DOM, Canvas, React, Node-only fs, or database imports so
  it runs identically in browsers, Vitest, and the Hono server.

### Deterministic Fixed-Timestep XPBD Physics:
- Do NOT install Matter.js, Planck.js, Box2D, or Rapier2D. Use our custom deterministic 2D XPBD
  solver (dt = 1/60 s, 24 substeps, 2 iterations, Float64 math, alpha = L / EA).
- Axial force MUST come directly from -lambda / (h * h). Compressive limits MUST enforce
  Euler buckling min(c_crush, pi^2 * EI / L^2). Cables MUST skip projection when C <= 0.
- Wheel-to-deck contact MUST use Single-Best Voronoi Face-Normal resolution (never raw radial
  box end-caps) so vehicles never snag on road seams.

### 60 FPS Canvas / React Isolation:
- Use layered HTML5 Canvas 2D + offscreen static backdrop caching + offscreen cheap bloom.
  Do NOT install PixiJS, Phaser, or Three.js.
- NEVER set ctx.filter on the visible main canvas context.
- NEVER store 60 Hz physics/particle/cursor state in React useState. Own the RAF loop inside
  EngineController attached via useRef inside a React.memo canvas shell.

### Hardened Auth & Exact Auto-Resume:
- Passwords MUST use @node-rs/argon2 (Argon2id: m=19456, t=2, p=1). Never use bcryptjs.
- Sessions MUST use 160-bit CSPRNG opaque tokens stored as SHA-256 hashes in SQLite (better-sqlite3
  with busy_timeout=5000, journal_mode=WAL, synchronous=NORMAL, foreign_keys=ON).
- Cookies MUST be HttpOnly, SameSite=Lax, Path=/, Secure in production. Never store
  auth tokens in localStorage. All non-GET /api/* routes MUST enforce hono/csrf Origin checks.
- Returning authenticated users MUST boot directly into users.last_played_level_id with their
  saved draft blueprint restored in one GET /api/auth/me round trip.

## Verification Command (Mandatory Gate Before Claiming Done)
Run `npm run check` (executes typechecks across all workspaces and full Vitest
unit + physics campaign gate + API integration tests). Never claim completion with failing checks
or skipped tests.
