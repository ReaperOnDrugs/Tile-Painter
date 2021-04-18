import NG from "../modules/NOISE.js";
import CA from "../modules/Celular_Automaton.js";
import DM from "../modules/DIJKSTRA.js";
import TM from "../modules/Texture_manager.js";

let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let HEIGHT;
let WIDTH;
let Noise;
let Cel;
let Dij;
let Tex;
let cell_count = {
    hor: 60,
    vert: 30
}
let cell_size;
let map;
let areas;
let min_area = 15;

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
    Tex = new TM();
    cell_size = HEIGHT / cell_count.vert;
    gen.next();
    //startGame();
}

function startGame() {
    map = Noise.generate(cell_count.vert,cell_count.hor, 55);
    map = Cel.iterate(map);
    edgeFill();
    map = Dij.singulars(map,cell_count);
}
function* tmp() {
    map = Noise.generate(cell_count.vert,cell_count.hor, 55);
    renderMap();
    yield;
    map = Cel.iterate(map);
    renderMap();
    yield;
    edgeFill();
    renderMap();
    yield;
    map = Dij.singulars(map,cell_count);
    renderMap();
    yield;
    areas = Dij.scan_area(map,cell_count);
    color();
    yield;
    areaCheckSize();
    renderMap();
    color();
    yield;
    Tex.encase(ctx,cell_count,cell_size);
    yield;
    Tex.floor(ctx, cell_size, areas);
    yield;
    Tex.pillar(ctx, map, cell_count, cell_size);
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
    let colors = ["red","blue","lightgreen","yellow","brown","purple","cyan","pink","gray","magenta","darkgreen","darkred"];
    for (let i=0; i<areas.length; i++){
        let area_cells = areas[i];
        ctx.fillStyle = colors[i];
        for (let j=0; j<area_cells.length; j++){
            let cell = area_cells[j];
            ctx.fillRect(cell.column * cell_size, cell.row * cell_size, cell_size, cell_size);
        }
    }
}

function areaCheckSize() {
    for (let i=areas.length-1; i>=0; i--){
        if (areas[i].length < min_area){
            areaDelete(areas[i]);
            areas.splice(i,1);
        }
    }
}
function areaDelete(area){
    for (let i=0; i<area.length; i++){
        let x = area[i].column;
        let y = area[i].row;
        map[y][x] = 0;
    }
}

/*function drawChest() {
    let img = document.createElement("img")
    img.src = "./assets/textures/wall-mid.png";
    img.onload = function() {
        ctx.drawImage(img,1,1,cell_size,cell_size);
    }
}
function drawChest2() {
    let img = document.createElement("img")
    img.src = "./chest.png";
    img.onload = function() {
        ctx.translate(cell_size*1.5,cell_size*1.5);
        ctx.rotate(90*Math.PI/180);
        ctx.translate(-cell_size*1.5,-cell_size*1.5);
        ctx.drawImage(img,cell_size,cell_size,cell_size,cell_size);
    }
}*/