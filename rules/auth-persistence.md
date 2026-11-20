---
trigger: glob
globs:
  - "apps/api/**"
description: Hono API, SQLite WAL & Security Rules
---

# Hono API, SQLite WAL & Security Rules

## SQLite Connection & Transactions
Always initialize better-sqlite3 PRAGMAs in this exact order:
1. `busy_timeout = 5000`
2. `journal_mode = WAL`
3. `synchronous = NORMAL`
4. `foreign_keys = ON`
5. `temp_store = MEMORY`

- Use `BEGIN IMMEDIATE` transactions for multi-table mutations (signup+guest migration, level completion).
- Support `DB_PATH=":memory:"` (or temp file path) via environment variable so Vitest runs isolated test databases without touching `data/spancraft.db`.

## Authentication & CSRF Security
- Hash passwords with `@node-rs/argon2` (algorithm: `Algorithm.Argon2id`, `memoryCost: 19456`, `timeCost: 2`, `parallelism: 1`).
- Generate session tokens with `crypto.randomBytes(20).toString('base64url')` (160 bits). Store ONLY `crypto.createHash('sha256').update(token).digest('hex')` in `sessions.token_hash`.
- Emit ONE session cookie `spancraft_session` (`HttpOnly`, `SameSite=Lax`, `Path=/`, `Max-Age=2592000`, `Secure` when `NODE_ENV === 'production'`). Do NOT emit multiple Set-Cookie headers in one response.
- Enforce `hono/csrf` with explicit allowed origins on all `/api/*` non-GET routes. Never use `origin: '*'` with `credentials: true`.
- Re-validate blueprint material unlocks, max_len, no-build zones, and `totalCost <= level.budgetCap` server-side via `packages/shared` inside `POST /api/levels/:levelId/complete`.

## Testing Pattern
- Export pure `createApp(db)` from `apps/api/src/app.ts` and test all auth, cookie, CSRF 403, draft upsert, level completion, and auto-resume flows directly via `app.request()` in Vitest.
