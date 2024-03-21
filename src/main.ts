import './style.css'
import {Graph} from "@antv/g6";




// Define the source data
const data = {
    // The array of nodes
    nodes: [
        {
            id: 'node1',
            x: 100,
            y: 200,
        },
        {
            id: 'node2',
            x: 300,
            y: 200,
        },
    ],
    // The array of edges
    edges: [
        // It is an edge link node1 to node2
        {
            source: 'node1',
            target: 'node2',
        },
    ],
};

// Create an instance of G6.Graph
const graph = new Graph({
    container: 'app', // Assign the id of the graph container
    // The width and the height of the graph
    width: 800,
    height: 500,
    renderer: 'svg',
    modes: {
        default: ['drag-canvas', 'zoom-canvas'],
    }
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
});
// Load data
graph.data(data);
// Render the graph
graph.render();

