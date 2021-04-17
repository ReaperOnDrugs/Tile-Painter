export default class NG {
    constructor() {

    }

    generate(VERT, HOR, density) {
        let map = new Array(VERT);

        for (let i=0; i<VERT; i++){
            let col = new Array(HOR);
            for (let j=0; j<HOR; j++){
                let random = Math.random() * 100;
                if (random > density) {
                    col[j] = 1;
                }
                else {
                    col[j] = 0;
                }
            }
            map[i] = col;
        }

        return map;
    }
}