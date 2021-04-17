export default class DM {
    constructor(){

    }
    singulars(map, cell_count) {
        let si = Array();
        while (1) {
            for (let i=1; i<cell_count.vert-1; i++){
                let row = map[i];
                for (let j=1; j<cell_count.hor-1; j++){
                    let cell = row[j];
                    if (cell == 1){
                        let proxy = map[i-1];
                        let neighbor_floors = 0;
                        neighbor_floors += proxy[j];
                        neighbor_floors += row[j-1];
                        neighbor_floors += row[j+1];
                        proxy = map[i+1];
                        neighbor_floors += proxy[j];
                        if (neighbor_floors <= 1){
                            si.push({row: i, column: j});
                        }
                    }
                }
            }
            if (si.length == 0) {
                return map;
            }
            for (let i=0; i<si.length; i++){
                map[si[i].row][si[i].column] = 0;
                si.splice(0,1);
            }
        }
    }
    scan_area(map, cell_count) {
        let marker_map = map;
        let areas = Array();

        for (let i=1; i<cell_count.vert-1; i++){
            for (let j=1; j<cell_count.hor-1; j++){
                let row = marker_map[i];
                let cell = row[j];
                if (cell == 1){
                    let area = this.dijkstra(i,j, marker_map);
                    areas.push(area);
                    return areas;
                    for (let o=0; o<area.length; o++){
                        let y = area[o].row;
                        let x = area[o].column;
                        marker_map[y][x] = 0;
                    }
                }
            }
        }
        return areas;
    }
    dijkstra(i, j, map) {
        let area_array = Array();
        let processing_array = Array();
        processing_array.push({row: i, column: j});
        while(processing_array.length > 0) {
            let y = processing_array[0].row;
            let x = processing_array[0].column;
            let row = map[y];
            
            area_array.push({row: y, column: x});
            
            let proxy = map[y-1];
            let pr = y-1;
            if (proxy[x] == 1) {
                processing_array.push({row: pr, column: x});
                map[pr][x] = 0;
            }
            let pc = x-1;
            if (row[pc] == 1) {
                processing_array.push({row: y, column: pc});
                map[y][pc] = 0;
            }
            pc = x+1;
            if (row[pc] == 1) {
                processing_array.push({row: y, column: pc});
                map[y][pc] = 0;
            }
            proxy = map[y+1];
            pr = y+1;
            if (proxy[x] == 1) {
                processing_array.push({row: pr, column: x});
                map[pr][x] = 0;
            }
            processing_array.splice(0,1);
        }
        return area_array;
    }
}