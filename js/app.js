import NG from "../modules/NOISE.js";
import CA from "../modules/Celular_Automaton.js";
import DM from "../modules/DIJKSTRA.js";

let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let HEIGHT;
let WIDTH;
let Noise;
let Cel;
let Dij;
let cell_count = {
    hor: 60,
    vert: 30
}
let cell_size;
let map;
let areas;

document.getElementById("startScreen").onanimationstart = () => {
    HEIGHT = Math.round(window.innerHeight * 0.8);
    while (HEIGHT % cell_count.vert != 0){
        HEIGHT--;
    }
    WIDTH = HEIGHT * 2;

    canvas.setAttribute("height", HEIGHT);
    canvas.setAttribute("width", WIDTH);
    varInit();
}

function varInit() {
    Noise = new NG();
    Cel = new CA(cell_count.hor,cell_count.vert);
    Dij = new DM();
    cell_size = HEIGHT / cell_count.vert;
    startGame();
}

function startGame() {
    map = Noise.generate(cell_count.vert,cell_count.hor, 55);
    map = Cel.iterate(map);
    edgeFill();
    map = Dij.singulars(map,cell_count);
}
function* tmp() {
    alert("starting render");
    renderMap();
    alert("render over");
    yield;
    alert("starting dijkstra");
    areas = Dij.scan_area(map,cell_count);
    alert("dijkstra over");
    yield;
    console.log(areas);
    color();
}
let gen = tmp();
canvas.addEventListener("click", () => {
    gen.next();
})

function renderMap() {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0,0,WIDTH,HEIGHT);
    ctx.fillStyle = "#000";

    for (let i = 0; i<cell_count.vert; i++){
        let row = map[i];
        for (let j = 0; j<cell_count.hor; j++){
            if (row[j] == 0){
                let posX = j * cell_size;
                let posY = i * cell_size;
                ctx.fillRect(posX, posY, cell_size, cell_size);
            }
        }
    }
}

function edgeFill() {
    for (let i = 0; i<cell_count.hor; i++){
        map[0][i] = 0;
        map[cell_count.vert - 1][i] = 0;
    }
    for (let i = 0; i<cell_count.vert; i++){
        map[i][0] = 0;
        map[i][cell_count.hor - 1] = 0;
    }
}

function color() {
    let colors = ["#FF0000","#00FF00","#0000FF","#FFa500","#FFFF00","#800080","#FF0000","#00FF00","#0000FF","#FFa500","#FFFF00","#800080","#FF0000","#00FF00","#0000FF","#FFa500","#FFFF00","#800080"];
    console.log(areas);
    alert("C");
    for (let i=0; i<areas.length; i++){
        let area_cells = areas[i];
        ctx.fillStyle = colors[i];
        for (let j=0; j<area_cells.length; j++){
            let cell = area_cells[j];
            ctx.fillRect(cell.column * cell_size, cell.row * cell_size, cell_size, cell_size);
        }
    }
}