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
                if (marker_map[i][j] == 1){
                    console.time("a");
                    let area = this.dijkstra(i,j, marker_map);
                    areas.push(area);
                    for (let o=0; o<area.length; o++){
                        let y = area[o].row;
                        let x = area[o].column;
                        marker_map[y][x] = 0;
                    }
                    //return areas;
                    alert("area mapped");
                    console.timeEnd("a");
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
            
            if (map[y][x] == 1){
                area_array.push({row: y, column: x});
                map[y][x] = 0;
            }

            if (map[y-1][x] == 1){
                processing_array.push({row: y-1, column: x});
            }
            if (map[y+1][x] == 1){
                processing_array.push({row: y+1, column: x});
            }
            if (map[y][x-1] == 1){
                processing_array.push({row: y, column: x-1});
            }
            if (map[y][x+1] == 1){
                processing_array.push({row: y, column: x+1});
            }
            processing_array.splice(0,1);
        }
        return area_array;
    }
}