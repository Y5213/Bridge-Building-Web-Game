---
name: browser-game-qa
description: Executes end-to-end browser verification of SpanCraft testing signup, CAD bridge construction, live physics simulation, level completion, page reload auto-resume, logout/re-login auto-resume, console cleanliness, and Canvas rendering screenshots.
---

# End-to-End Browser & Visual QA Protocol

Follow this sequence to verify full-stack game health:
1. Build all workspaces so preview mode tests production bundles:
   `npm run build`
2. Start local dev/preview servers:
   - Backend on http://127.0.0.1:8787
   - Web frontend on http://127.0.0.1:5173
3. Verify:
   - ZERO console errors, ZERO uncaught page exceptions.
   - Level 1 ("Sunny Creek") loads with crisp vibrant daylight cliffs, water, snap grid, and Quotation Budget HUD ($0 / $4,800).
   - Build a triangulated Level 1 bridge, run Simulation, verify the hatchback crosses cleanly without seam jolt.
   - Advance to Level 2 ("Timber Gorge"), place beams so a draft auto-saves, reload page. Confirm immediate resume on Level 2 with beams restored.
   - Log out, log back in, verify automatic resumption directly onto Level 2 with saved draft intact.
   - Toggle Colorblind Stress Mode and verify chevrons and high-contrast orange stress lines.
