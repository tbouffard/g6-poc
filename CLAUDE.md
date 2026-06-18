# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

This repository is an evaluation (POC) of the [AntV G6](https://g6.antv.vision) graph visualization
library. It is not a product. The goal is to assess, for two major versions of G6, the available
features, the TypeScript support, and the bundle size / tree-shaking behavior. Findings are recorded
in the root `README.md`, which is the primary deliverable.

When changing a POC, the README evaluation is expected to be updated to match what was actually tested.
The README legend distinguishes `✅` (tested) from `❓` (not tested).

## Structure

Two independent, self-contained POCs, each with its own `package.json` and lockfile:

- `g6-v4/` - G6 `~4.8.24`, built with **Vite 5**, SVG renderer, classic v4 API.
- `g6-v5/` - G6 `~5.0.21`, built with **Rsbuild 1**, SVG renderer via the separate `@antv/g-svg` package.

There is no shared code or workspace between them. Treat each directory as a separate project: `cd` into
it before running any command.

## Commands

Both projects expose the same npm scripts. Run them from inside the relevant POC directory. Lockfiles are
`package-lock.json`, so use `npm` (the `g6-v5/README.md` mentions `pnpm`, but the committed lockfile is npm's).

```bash
npm install
npm run dev      # start dev server (g6-v5 opens the browser automatically)
npm run build    # production build (g6-v4 runs tsc first, then vite build)
npm run preview  # serve the production build locally
```

There are no tests, linters, or formatters configured in either project.

To inspect bundle / chunk sizes (the main thing this POC measures), run `npm run build` and read the
size report printed by Vite (v4) or Rsbuild (v5); compare against the numbers in the root `README.md`.

## Key API differences between the two POCs

These two versions have meaningfully different APIs; do not assume v4 idioms work in v5.

- Data loading: v4 `graph.data(data); graph.render()` vs v5 `graph.setData(data); graph.render()`
  (v5 `render()` returns a Promise).
- Node coordinates: v4 uses top-level `x` / `y` on a node; v5 uses `style: { x, y }`.
- Interaction config: v4 `modes: { default: [...] }` vs v5 `behaviors: [...]`.
- Renderer: v4 selects SVG with `renderer: 'svg'`; v5 imports `Renderer` from `@antv/g-svg` and passes
  `renderer: () => new Renderer()` (the SVG renderer is an extra dependency, deliberately, to test
  tree-shaking).
- Plugins: v5 adds e.g. `plugins: ['grid-line']`; v4 plugins/minimap are configured differently.

`g6-v5/src/index.ts` keeps large blocks of v4 code commented out and tagged `// TODO from v4`. These mark
features not yet ported to the v5 POC (label fitting/ellipsis, live `graph.update`, `addItem`, navigation
optimizations). Leave them as reference unless explicitly migrating a feature.
