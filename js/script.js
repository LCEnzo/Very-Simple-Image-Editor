const grid = document.querySelector("#grid-container");
const slider = document.querySelector(".grid-size-input");
const resetButton = document.querySelector(".reset-button")
const gridSizeLabel = document.querySelector(".grid-size-label");

const rowClass = "row-container";

let cells = null;

let gridSize = 16;

function deleteGrid() {
    let rows = document.querySelectorAll(`.${rowClass}`);

    rows.forEach(row => {
        let cellz = row.childNodes;

        cellz.forEach(cell => {
            row.removeChild(cell);
        });

        grid.removeChild(row);
    });
}

function createGrid() {
    deleteGrid();

    cells = null;

    cellStyle = `box-sizing: border-box;`;

    for(let i = 0; i < gridSize; i++) {
        let row = document.createElement('div');
        row.classList.add(rowClass);

        for(let j = 0; j < gridSize; j++) {
            let cell = document.createElement('div');
            cell.classList.add("cell");
            cell.style = cellStyle;
            row.appendChild(cell);
        }

        grid.appendChild(row);
    }
    
    cells = document.querySelectorAll("#grid-container .cell");
}

function gridSizeLabelUpdate() {
    gridSizeLabel.textContent = `${gridSize} X ${gridSize}`;
}

gridSizeLabelUpdate()

resetButton.addEventListener('click', createGrid);
slider.addEventListener('change' , (event) => { gridSize = slider.value; gridSizeLabelUpdate(); });

createGrid();
