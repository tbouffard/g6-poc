# POC the G6 library

## Goals

Evaluate:
  - the features of the library
  - the support for TypeScript
  - the bundle size and the tree-shaking capabilities

Legend used in the evaluation:
- ✅ tested feature
- ❓ feature not tested (doc not found, no time, ...)


## G6 v4

Note: done on `2024-03-21`

See the sources of the [g6-v4](./g6-v4) poc. 

**Test with a single dependency @antv/g6 4.8.24 released on 2023-12-12**

**Support for TS:**

- Apparently better than at the end of 2020.
- There are still some props defined in configs that don’t seem to be used. We survive.
- No JSDoc on types, so not great for guidance.

**Rendering:** SVG and Canvas

**Navigation:** everything is delegated to the browser via the `transform` property (at least in SVG)

- Zoom, pan/drag with the mouse
- API: fit view/center + padding, zoom (animations possible)

**Default viewer mode**

**Event**

- ❓ Overlays?
- ❓ Perimeter projection?
- ❓ Edge points/waypoints: apparently yes

**Style**

- Gradient: fill and stroke
- Shadow
- Plenty of options for labels (including true SVG label, ellipse)

**Label dimensions?**

- Width: custom code taken from examples (but no word-wrap in the example)

**Apply live style change:**

- ✅ `graph.update('node1', {style: {fill: 'red'}});`

**✅ Keyboard key mapping:**

**Minimap (with plugin)**

**⚠️ Bundle size:** with a basic example and default configuration on a POC TS built with Vite (2 nodes and 1 edge)

- `dist/assets/index-BU4nR3nI.js` 1,336.55 kB │ gzip: 397.28 kB !

Further investigation is needed to understand how to implement tree-shaking, i.e., using the library without loading all features and enabling only what is necessary.



