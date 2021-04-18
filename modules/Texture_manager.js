export default class TM {
    constructor() {
        this.path = "./assets/textures/";
        this.textures = {
            "wall_default": "wall_mid.png",
            "floor": "floor_1.png",
            "c_base": "column_base.png",
            "c_mid": "column_mid.png",
            "c_top": "column_top.png"
        }
    }
    encase(ctx, cell_count, cell_size) {
        let img = new Image();
        img.src = this.path + this.textures.wall_default;
        img.onload = function() {
            for (let i=0; i<cell_count.hor; i++){
                ctx.drawImage(img,i*cell_size,0, cell_size, cell_size);
                ctx.drawImage(img,i*cell_size,(cell_count.vert-1)*cell_size, cell_size, cell_size);
            }
            for (let i=0; i<cell_count.vert; i++){
                ctx.drawImage(img,0,i*cell_size, cell_size, cell_size);
                ctx.drawImage(img,(cell_count.hor-1)*cell_size,i*cell_size, cell_size, cell_size);
            }
        }

    }
    floor(ctx, cell_size, areas) {
        let img = new Image();
        img.src = this.path + this.textures.floor;
        img.onload = function() {
            for (let i=0; i<areas.length; i++){
                let area = areas[i];
                for (let j=0; j<area.length; j++){
                    let x = area[j].column;
                    let y = area[j].row;
                    ctx.drawImage(img,x*cell_size,y*cell_size,cell_size,cell_size)
                }
            }
        }
    }
    pillar(ctx, map, cell_count, cell_size) {
        for (let i=1; i<cell_count.vert-1; i++){
            for (let j=1; j<cell_count.hor; j++){
                if (map[i][j] == 0){
                    let neigh = 0;
                    neigh += map[i-1][j];
                    neigh += map[i+1][j];
                    neigh += map[i][j-1];
                    neigh += map[i][j+1];
                    if (neigh == 4){
                        map[i][j] = 1;
                        let fimg = new Image();
                        fimg.src = this.path + this.textures.floor;
                        fimg.onload = function() {
                            ctx.drawImage(fimg,j*cell_size,i*cell_size,cell_size,cell_size);
                        }
                        let cimg = new Image();
                        cimg.src = this.path + this.textures.c_base;
                        cimg.onload = function() {
                            ctx.drawImage(cimg,j*cell_size,i*cell_size,cell_size,cell_size);
                        }
                        let cimgMID = new Image();
                        cimgMID.src = this.path + this.textures.c_mid;
                        cimgMID.onload = function() {
                            ctx.drawImage(cimgMID,j*cell_size,(i-1)*cell_size,cell_size,cell_size);
                        }
                        let cimgTOP = new Image();
                        cimgTOP.src = this.path + this.textures.c_top;
                        cimgTOP.onload = function() {
                            ctx.drawImage(cimgTOP,j*cell_size,(i-2)*cell_size,cell_size,cell_size);
                        }
                    }
                }
            }
        }
    }
}