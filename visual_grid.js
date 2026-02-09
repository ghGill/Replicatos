import { Grid } from "./grid.js";

export class VisualGrid extends Grid {
    constructor(grid, containerId, isfinalGrid, gameManager) {
        super(grid);
        this.containerId = containerId;
        this.isfinalGrid = isfinalGrid;
        this.gridElements = {};

        this.gameManager = gameManager;
    }

    draw() {
        const containerElm = document.getElementById(this.containerId);
        containerElm.innerHTML = '';

        this.windowH = document.getElementById("game").offsetHeight;
        this.cellSize = Math.floor(((this.windowH) * .9)/ (this.rows+ 2));

        let gridRow = null;

        // arrows upper row
        if (!this.isfinalGrid) {
            gridRow = document.createElement("div");
            gridRow.classList.add("grid-row");
            for (let c = 0; c < this.cols+2; c++) {
                let gc = this.arrowCell(((c == 0) || (c == this.cols+1)) ? '' : 'down', c-1);
                gridRow.appendChild(gc);
            }
            containerElm.appendChild(gridRow);
        }

        // grid
        for (let r = 0; r < this.rows; r++) {
            let gridRow = document.createElement("div");
            gridRow.classList.add("grid-row");

            let gc = null;

            if (!this.isfinalGrid) {
                gc = this.arrowCell('right', r);
                gridRow.appendChild(gc);
            }

            for (let c = 0; c < this.cols; c++) {
                gc = this.gridCell(this.grid[r][c]);
                gridRow.appendChild(gc);
                this.gridElements[this.cellId(c, r)] = gc;
            }

            if (!this.isfinalGrid) {
                gc = this.arrowCell('left', r);
                gridRow.appendChild(gc);
            }

            document.getElementById("level-num").innerHTML = this.gameManager.level + 1;

            containerElm.appendChild(gridRow);
        }

        // arrows bottom row
        if (!this.isfinalGrid) {
            gridRow = document.createElement("div");
            gridRow.classList.add("grid-row");
            for (let c = 0; c < this.cols+2; c++) {
                let gc = this.arrowCell(((c == 0) || (c == this.cols+1)) ? '' : 'up', c-1);
                gridRow.appendChild(gc);
            }
            containerElm.appendChild(gridRow);
        }
    }

    gridCell(val) {
        let e = document.createElement("div");
        e.classList.add("grid-cell");
        e.classList.add((val == 1) ? "dark" : "light");
        e.style.width = `${this.cellSize}px`;
        e.style.height = `${this.cellSize}px`;

        return e;
    }

    arrowCell(direction, colOrRow) {
        let e = document.createElement("div");
        if (direction !== '') {
            e.innerHTML = `<i class="fas fa-arrow-${direction}"></i>`;
    
            e.classList.add(direction);
        }
        e.classList.add("grid-cell");
        e.classList.add("arrow-cell");
        e.style.width = `${this.cellSize}px`;
        e.style.height = `${this.cellSize}px`;

        switch (direction) {
            case 'up':
                e.addEventListener("click", () => { this.updateGrid(direction, colOrRow)});
                break;

            case 'down':
                e.addEventListener("click", () => { this.updateGrid(direction, colOrRow)});
                break;

            case 'left':
                e.addEventListener("click", () => { this.updateGrid(direction, colOrRow)});
                break;

            case 'right':
                e.addEventListener("click", () => { this.updateGrid(direction, colOrRow)});
                break;
        }

        return e;
    }

    cellId(c, r) {
        return `${c}-${r}`;
    }

    updateGrid(direction, colOrRow) {
        this.gameManager.disableScreen();
        this.gameManager.playClick();

        switch (direction) {
            case 'up':
                this.rotateUp(colOrRow);
                break;

            case 'down':
                this.rotateDown(colOrRow);
                break;

            case 'left':
                this.rotateLeft(colOrRow);
                break;

            case 'right':
                this.rotateRight(colOrRow);
                break;
        }

        this.gameManager.checkLevelComplete();
    }

    rotateLeft(row) {
        super.moveLeft(row);
        this.refreshRow(row);
    }

    rotateRight(row) {
        super.moveRight(row);
        this.refreshRow(row);
    }

    rotateUp(col) {
        super.moveUp(col);
        this.refreshCol(col);
    }

    rotateDown(col) {
        super.moveDown(col);
        this.refreshCol(col);
    }

    refreshRow(row) {
        for (let c=0; c<this.cols; c++) {
            const key = this.cellId(c, row);
            const cellElm = this.gridElements[key];
            cellElm.classList.remove("dark", "light");

            if (this.grid[row][c] == 0) {
                cellElm.classList.add("light");
            }
            else {
                cellElm.classList.add("dark");
            }
        }
    }

    refreshCol(col) {
        for (let r=0; r<this.rows; r++) {
            const key = this.cellId(col, r);
            const cellElm = this.gridElements[key];
            cellElm.classList.remove("dark", "light");

            if (this.grid[r][col] == 0) {
                cellElm.classList.add("light");
            }
            else {
                cellElm.classList.add("dark");
            }
        }
    }

    getplayedLevel() {
        return this.gameManager.level;
    }

    restart() {
        super.restart();
        for (let r=0; r<this.rows; r++) {
            this.refreshRow(r);
        }
    }
}
