var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
//var width = canvas.innerwidth;
//ctx.canvas.width  = window.innerWidth ;
//ctx.canvas.height = window.innerHeight;

alert(canvas.width);

var cell = function(){
    this.free = true;
    this.initial = false;
    this.final = false;
    this.wall = false;
};

var getColor = function(a_cell){
    if(a_cell.free)
        return "#FFFFFF";
    if(a_cell.wall)
        return "#0000FF";
};

var graph;
var cellSize = 20;

var createNewGraph = function() {
    var h_lim = Math.floor(canvas.height / cellSize);
    var w_lim = Math.floor(canvas.width / cellSize);

    graph = new Array(h_lim);

    for(var h = 0; h < h_lim; ++h){
        graph[h] = new Array(w_lim);
        for(var w = 0; w < w_lim; ++w){
            graph[h][w] = new cell();
        }
    }
};

var getCoordinate = function(x){
    //console.log(x);
    return Math.floor(x / cellSize);
};

var getPoint = function(x){
    return x * cellSize;
}

var drawCell = function(x, y, a_cell){
    if(a_cell.free){
        ctx.strokeRect(x+1, y+1, cellSize-2, cellSize-2);
    } else {
        //alert("Done!")
        ctx.clearRect(x+1, y+1, cellSize-2, cellSize-2);
        ctx.fillStyle = getColor(a_cell);
        ctx.fillRect(x+1, y+1, cellSize-2, cellSize-2);getColor(a_cell)
    }
};

var drawGraph = function(){
    var h_lim = Math.floor(canvas.height / cellSize);
    var w_lim = Math.floor(canvas.width / cellSize);

    for(var h = 0; h < h_lim; ++h){
        for(var w = 0; w < w_lim; ++w){
            drawCell(h*cellSize, w*cellSize, graph[h][w]);
        }
    }
};

var updateCell = function(){

    var boundingRect = canvas.getBoundingClientRect();
    var x = getCoordinate(event.clientX - boundingRect.left);
    var y = getCoordinate(event.clientY - boundingRect.top);

    //console.log(h, " | ", w);

    if(graph[x][y].free){
        graph[x][y].free = false;
        graph[x][y].wall = true;
        drawCell(getPoint(x), getPoint(y), graph[x][y]);
    }
};

createNewGraph();
drawGraph();

canvas.addEventListener("mousedown", updateCell);
