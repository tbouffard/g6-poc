# POC the G6 library

## Goals

Evaluate:
  - the features of the library
  - the support for TypeScript
  - the bundle size and the tree-shaking capabilities

Legend used in the evaluation:
- ✅ tested feature
- ❓ feature not tested (doc not found, no time, ...)


## G6 v5

**Note**: done on `2024-19-12`

See the sources of the [g6-v5](./g6-v5) poc. Built with Rsbuild 1.0.2.

G6 Documentation for v5 at the time of the test: https://g6.antv.vision/en/docs/manual/introduction

Let's start with the code of the G6 v4 POC. Upgrade guide: see https://g6-next.antv.antgroup.com/en/manual/upgrade.

Bundling documentation: https://g6-next.antv.antgroup.com/en/manual/further-reading/bundle

https://g6-next.antv.antgroup.com/en/manual/feature#-optimized-package-size
> Thanks to the well-modularized design and extension registration mechanism of G6 5.0, modules that are not used will not be packaged into the final build file, reducing the package size. \
Compared to 4.0, the UMD package size has been reduced from 1.8 MB to 0.96 MB, a reduction of nearly 50%.

I see some improvements in the chunks size, but **the overall size is still larger than 1MB**.

### Chunks size

1st attempt: default rendering: Canvas
```
  dist/static/css/index.b1c58531.css      0.00 kB     0.02 kB
  dist/index.html                         0.45 kB     0.28 kB
  dist/static/js/index.590c58db.js        2.5 kB      1.3 kB
  dist/static/js/async/614.ca7956b1.js    21.5 kB     8.2 kB
  dist/static/js/843.3ec3480d.js          280.9 kB    80.9 kB
  dist/static/js/312.80a8251c.js          758.2 kB    223.3 kB

  Total size:  1063.5 kB
  Gzipped size:  313.9 kB
```

2nd attempt: rendering svg (add "@antv/g-svg")
See https://g6-next.antv.antgroup.com/en/manual/further-reading/renderer
```
  dist/static/css/index.b1c58531.css      0.00 kB     0.02 kB
  dist/index.html                         0.45 kB     0.28 kB
  dist/static/js/index.70ba9157.js        2.5 kB      1.3 kB
  dist/static/js/async/614.3723d9c1.js    21.5 kB     8.2 kB
  dist/static/js/843.7b95c801.js          280.9 kB    80.9 kB
  dist/static/js/845.45bc4565.js          803.4 kB    235.9 kB

  Total size:  1108.8 kB
  Gzipped size:  326.6 kB
```

## G6 v4

**Note**: done on `2024-03-21`

See the sources of the [g6-v4](./g6-v4) poc. Built with Vite 5.2.2.

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



