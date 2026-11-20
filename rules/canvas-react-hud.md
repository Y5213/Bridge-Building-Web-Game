---
trigger: glob
globs:
  - "apps/web/**"
description: Vibrant Canvas 2D, React HUD & Web Audio Rules
---

# Vibrant Canvas 2D, React HUD & Web Audio Rules

## Rendering & Performance
- Cap backing-store DPR at `Math.min(window.devicePixelRatio || 1, 2)`.
- Cache static level backdrop (sky, mountains, cliffs, piers, foliage) onto an offscreen canvas; rebuild only on level change or resize.
- Implement bloom strictly via a persistent offscreen buffer (`willReadFrequently: false`) using 2 ping-pong self-blur passes and one `globalCompositeOperation = 'lighter'` blit. Reset main context to `source-over` and `globalAlpha = 1.0` immediately afterward.
- Pre-allocate a fixed particle pool (200 objects) for wood splinters, sparks, dust, and water splash.
- Never call React state setters inside `requestAnimationFrame` every frame. Throttle live HUD telemetry snapshots (stress %, vehicle progress %) to `<= 12 Hz`.

## Visual Accessibility & Viewport Lock
- Root app shell MUST use `height: 100dvh; position: fixed; inset: 0; overscroll-behavior: none;`.
- Interactive `<canvas>` MUST set `touch-action: none;`.
- Stress visualization MUST support default Blue (tension) / Orange-Red (compression) AND a Colorblind High-Contrast mode (Blue #1A73E8 vs Orange #FA903E + directional chevrons + % labels).
- Glassmorphic HUD panels MUST cap `backdrop-filter` at `blur(8px)`, provide an opaque baseline outside `@supports`, meet WCAG >= 4.5:1 text contrast, and include `@media (forced-colors: active)`.

## Web Audio & Auto-Resume UX
- Lazy-unlock `AudioContext` on first pointer/keyboard gesture. Use `setTargetAtTime` / `exponentialRampToValueAtTime` for all gain/frequency changes (zero clicks).
- Pre-generate 2-second Paul Kellet pink noise and Brownian noise `AudioBuffer` loops once (never use deprecated `ScriptProcessorNode`).
- On mount, await `GET /api/auth/me` before rendering any level so returning players land straight on `lastPlayedLevelId` with their saved draft blueprint intact. Flush dirty drafts on `visibilitychange` using `fetch(..., { method: 'PUT', keepalive: true })`.
