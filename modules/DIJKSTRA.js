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
        let marker_map = Array();
        marker_map = JSON.parse(JSON.stringify(map));
        let areas = Array();

        for (let i=1; i<cell_count.vert-1; i++){
            for (let j=1; j<cell_count.hor-1; j++){
                if (marker_map[i][j] == 1){
                    let area = this.dijkstra(i,j, marker_map);
                    areas.push(area);
                }
            }
        }
        return areas;
    }
    dijkstra(i, j, map) {
        let area_array = Array();
        let queue = Array();
        queue.push({"row": i, "column": j});

        while (queue.length) {
            let current = queue.shift();
            let x = current.column;
            let y = current.row;

            if (map[y][x] == 1){
                area_array.push({"row": y, "column": x})
                map[y][x] = 0;

                if (map[y-1][x] == 1) {
                    queue.push({"row": y-1, "column": x});
                }
                if (map[y+1][x] == 1){
                    queue.push({"row": y+1, "column": x});
                }
                if (map[y][x-1] == 1){
                    queue.push({"row": y, "column": x-1});
                }
                if (map[y][x+1] == 1){
                    queue.push({"row": y, "column": x+1});
                }
            }
        }

        return area_array;
    }
}