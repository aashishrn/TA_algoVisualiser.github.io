var canvas = document.getElementById("main_plain");
var ctx = canvas.getContext("2d");

var st = window.innerHeight;
st = st - document.getElementById('navbarDiv mx-5').offsetHeight;
st = st - document.getElementById('mainTable').offsetHeight;
canvas.height = st;
canvas.width = window.innerWidth;
var cellSize = 20;

alert(canvas.width);

var getCoordinate = function(x){
    //console.log(x);
    return Math.floor(x / cellSize);
};

var getPoint = function(x){
    return x * cellSize;
}

var Cell = function(y, x){
    this.free = true;
    this.initial = false;
    this.final = false;
    this.wall = false;
    this.yPos = y;
    this.xPos = x;
};

Cell.prototype.getColor = function(){
    if(this.initial)
        return "#B30000";
    if(this.final)
        return "#330000";
    if(this.free)
        return "#FFFFFF";
    if(this.wall)
        return "#0000FF";
};

Cell.prototype.drawCell = function(){
    //console.log(this.yPos, this.xPos);
    if(this.initial || this.final || this.wall){
        ctx.clearRect(this.xPos*cellSize+1, this.yPos*cellSize+1, cellSize-2, cellSize-2);
        ctx.fillStyle = this.getColor();
        ctx.fillRect(this.xPos*cellSize+1, this.yPos*cellSize+1, cellSize-2, cellSize-2);
    }
    else{
        ctx.clearRect(this.xPos*cellSize+1, this.yPos*cellSize+1, cellSize-2, cellSize-2);
        ctx.strokeStyle = "#000000";
        ctx.strokeRect(this.xPos*cellSize, this.yPos*cellSize, cellSize, cellSize);
    }
};

var updateCellAtPoint = function(){
    var boundingRect = canvas.getBoundingClientRect();
    var x = getCoordinate(event.clientX - boundingRect.left);
    var y = getCoordinate(event.clientY - boundingRect.top);

    G.graph[y][x].updateCell();
}

Cell.prototype.updateCell = function(){
    //console.log(h, " | ", w);
    if(this.initial || this.final)
        return null;
    //console.log(this.yPos, this.xPos);
    if(this.free){
        this.free = false;
        this.wall = true;
        this.drawCell();
    } else {
        this.free = true;
        this.wall = false;
        this.drawCell();
    }
};

var Primary_Graph = function(){
    var graph;
};

Primary_Graph.prototype.createNewGraph = function() {
    var h_lim = Math.floor(canvas.height / cellSize);
    var w_lim = Math.floor(canvas.width / cellSize);

    this.graph = new Array(h_lim);

    for(var h = 0; h < h_lim; ++h){
        this.graph[h] = new Array(w_lim);
        for(var w = 0; w < w_lim; ++w){
            this.graph[h][w] = new Cell(h, w);
        }
    }
    this.graph[Math.floor(h_lim/2)][Math.floor(w_lim/4)].initial = true;
    this.graph[Math.floor(h_lim/2)][Math.floor(3*w_lim/4)].final = true;
    this.graph[Math.floor(h_lim/2)][Math.floor(w_lim/4)].free = false;
    this.graph[Math.floor(h_lim/2)][Math.floor(3*w_lim/4)].free = false;

};

Primary_Graph.prototype.drawGraph = function(){
    var h_lim = Math.floor(canvas.height / cellSize);
    var w_lim = Math.floor(canvas.width / cellSize);

    //console.log(h_lim, canvas.height, w_lim, canvas.width);
    //console.log(this.graph[0][0]);
    for(var h = 0; h < h_lim; ++h){
        for(var w = 0; w < w_lim; ++w){
            this.graph[h][w].drawCell();
        }
    }
};

var G = new Primary_Graph();
G.createNewGraph();
G.drawGraph();

canvas.addEventListener("mousedown", updateCellAtPoint);

