console.log('Hello from example.js');

const graph = document.getElementById('graph');
Plotly.newPlot(graph, [{
    x: data.x,
    y: data.y,
    type: 'scatter'
}]);