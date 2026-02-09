export class Grid {
    constructor(grid) {
        this.cols = grid[0].length;
        this.rows = grid.length;

        this.restartGrid = [];
        this.restartGrid = grid.map(row => [...row]);

        this.grid = [];
        this.grid = grid.map(row => [...row]);
    }

    toString(grid=null) {
        if (!grid)
            grid = this.grid;

        return grid.map(row => row.join('')).join('');
    }

    moveLeft(row, grid=null) {
        if (!grid)
            grid = this.grid;

        grid[row].push(grid[row].shift());
    }

    moveRight(row, grid=null) {
        if (!grid)
            grid = this.grid;

        grid[row].unshift(grid[row].pop());
    }

    moveUp(col, grid=null) {
        if (!grid)
            grid = this.grid;

        const val = grid[0][col];
        
        for (let r=0; r<this.rows-1; r++) {
            grid[r][col] = grid[r+1][col];
        }

        grid[this.rows-1][col] = val;
    }

    moveDown(col, grid=null) {
        if (!grid)
            grid = this.grid;

        const val = grid[this.rows-1][col];
        
        for (let r=this.rows-1; r>0; r--) {
            grid[r][col] = grid[r-1][col];
        }

        grid[0][col] = val;
    }

    shuffle(steps) {
        let tempGrid = this.grid.map(row => [...row]);
        
        let shuffleStates = [this.toString(tempGrid)];

        for (let i=0; i<steps; i++) {
            let ok = false;
            let lastDirection = -1;
            let lastColOrrow = -1;

            while (!ok) {
                const rotateDirection = Math.floor((Math.random() * 1000) + 1) % 4;
                const colOrRow = Math.floor(Math.random() * this.rows);
           
                switch (rotateDirection) {
                    case 0:
                        this.moveDown(colOrRow, tempGrid);
                        break;

                    case 1:
                        this.moveUp(colOrRow, tempGrid);
                        break;

                    case 2:
                        this.moveLeft(colOrRow, tempGrid);
                        break;

                    case 3:
                        this.moveRight(colOrRow, tempGrid);
                        break;
                }

                const newState = this.toString(tempGrid);

                ok = !shuffleStates.includes(newState);

                if (ok) {
                    shuffleStates.push(newState);
                }
            }
        }

        this.grid = tempGrid.map(row => [...row]);
        this.restartGrid = tempGrid.map(row => [...row]);
    }

    restart() {
        this.grid = [];
        this.grid = this.restartGrid.map(row => [...row]);
    }
}
