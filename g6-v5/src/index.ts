import './index.css';
import {Graph, type GraphData} from "@antv/g6";
import { Renderer } from '@antv/g-svg';
// no impact on the tree-shaking
// import {Graph, type GraphData, Util} from "@antv/g6/es";

document.querySelector('#root')!.innerHTML = `
<div class="content">
  <h1>@antv/G6 v5 POC with Rsbuild + TypeScript</h1>
  <div id="app"></div>
</div>
`;


// TODO from v4
// copied from https://g6.antv.vision/en/examples/item/label/#labelLen1
// const fittingString = (str: string, maxWidth: number, fontSize: number) => {
//     let currentWidth = 0;
//     let res = str;
//     const pattern = new RegExp('[\u4E00-\u9FA5]+'); // distinguish the Chinese charactors and letters
//     str.split('').forEach((letter, i) => {
//         if (currentWidth > maxWidth) return;
//         if (pattern.test(letter)) {
//             // Chinese charactors
//             currentWidth += fontSize;
//         } else {
//             // get the width of single letter according to the fontSize
//             currentWidth += Util.getLetterWidth(letter, fontSize);
//         }
//         if (currentWidth > maxWidth) {
//             res = `${str.substr(0, i)}\n${str.substr(i)}`;
//         }
//     });
//     return res;
// };


// Define the source data
// const data: GraphData = {
//     // The array of nodes
//     nodes: [
//         {
//             id: 'node1',
//             x: 100,
//             y: 200,
//             label: 'node1', // default config
//         },
//         {
//             id: 'node2',
//             x: 300,
//             y: 200,
//             // label: {
//             //     // text: 'node2',
//             //     fontStyle: 'italic',
//             //     textAlign: 'center',
//             //     // verticalAlign: 'bottom',
//             //     fill: 'red',
//             // },
//             label: 'node2 which is very long and should be ellipsis',
//             labelCfg: {
//                 autoRotate: true,
//                 position: 'bottom',
//                 offset: 25,
//                 maxLength: 10, // ellipsis
//                 style: {
//                     background: {
//                         // fill: '#ffffff',
//                         stroke: '#000000',
//                         padding: [2, 2, 2, 2],
//                         radius: 2,
//                     },
//                     fill: 'red',
//                     fontStyle: "italic",
//                     // position: 'top', // this property is not used
//                     textAlign: 'center',
//                     textBaseline: 'top',
//                 },
//             },
//             style: {
//                 shadowBlur: 50,
//                 shadowColor: 'red',
//             }
//         },
//     ],
//     // The array of edges
//     edges: [
//         // It is an edge link node1 to node2
//         {
//             source: 'node1',
//             target: 'node2',
//             startPoint: {x: 150, y: 280},
//             controlPoints: [{x: 150, y: 250}, {x: 150, y: 450}, {x: 250, y: 250}]
//         },
//     ],
// };

const data: GraphData  = {
    nodes: [
        { id: 'node-1', style: { x: 50, y: 50 }, label: 'node-1' },
        { id: 'node-2', style: { x: 150, y: 50 } },
                {
            id: 'node1',
            x: 100,
            y: 200,
            label: 'node1', // default config
        },
    ],
    edges: [{ source: 'node-1', target: 'node-2' }],
};


// Create an instance of G6.Graph
const graph= new Graph({
    container: 'app', // Assign the id of the graph container
    // The width and the height of the graph
    width: 800,
    height: 500,
    // TODO from v4
    // https://g6-next.antv.antgroup.com/en/manual/feature#-multi-renderer-support
    // renderer: 'svg',
    renderer: () => new Renderer(),
    // modes: {
    //     default: ['drag-canvas', 'zoom-canvas'],
    // }
    behaviors: ['drag-canvas', 'zoom-canvas'],
    // TODO from v4
    // hide labels when doing navigation
    // modes: {
    //     default: [
    //         "drag-node",
    //         // 'drag-node-with-group',
    //         {
    //             type: "drag-canvas",
    //             enableOptimize: true // enable the optimize to hide the shapes beside nodes' keyShape
    //         },
    //         {
    //             type: "zoom-canvas",
    //             enableOptimize: true // enable the optimize to hide the shapes beside nodes' keyShape
    //         }
    //     ]
    // }
    // new v5
    plugins: ['grid-line'],
});
// Load data
graph.setData(data);
// Render the graph
graph.render().then(r => console.log('rendered', r));


// TODO what is the diff with updateItem?
// graph.update('node1', {
//     style: {fill: 'red'}, label: 'node1 updated', labelCfg: {
//         style: {
//             shadowBlur: 10,
//         }
//     }
// });
// no fill
// graph.update('node1', {style: {fill: undefined}});

// graph.focusItem('node2', true);


const globalFontSize = 12
// graph.addItem('node', {
//     label: fittingString('new node very long and should be split', 80, globalFontSize),
//     // label: 'new node very long and should be split',
//     x: 500, y: 250, id: 'node3', labelCfg: {
//         refX: 510, refY: 240
//     }
// });
// graph.addItem('edge', {source: 'node2', target: 'node3', id: 'edge3'});
