export default class CA {
    constructor(MW,MH) {
        this.TileCount = {
            "width" : MW,
            "height" : MH
        }
    }

    iterate(map) {
        let old_map = map;
        let iteration = [];
        
        for (let i=0; i<old_map.length; i++){
            let row = old_map[i];
            let iter_row = [];
            for (let j=0; j<row.length; j++){
                let neighbours = 0;
                for (let y=i-1; y<=i+1; y++){
                    let nRow = old_map[y];
                    for (let x=j-1; x<=j+1; x++){
                        if (this.inBounds(x,y)){
                            if ((x!=j) || (y!=i)){
                                if (nRow[x] == 0){
                                    neighbours++;
                                }
                            }
                        }
                        else {
                            neighbours++;
                        }
                    }
                }
                if ((neighbours > 4) || (neighbours == 0)){
                    iter_row.push(0);
                }
                else {
                    iter_row.push(1);
                }
            }
            iteration.push(iter_row);
        }
        return iteration;
    }
    inBounds(x,y) {
        if ((x<0) || (y<0) || (x>=this.TileCount.width) || (y>=this.TileCount.height)) {
            return false;
        } else {
            return true;
        }
    }
}