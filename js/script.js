const grid = document.querySelector("#grid-container");
let cells = null;

let sizeOfGrid = 16;

let cellStyle = `color: white; 
background-color: white; 
width: ${100.0/sizeOfGrid}%;
border: 1px solid black;
margin: 0;
padding: 0;
flex: 1 1 auto;`;

for(let i = 0; i < sizeOfGrid; i++) {
    for(let j = 0; j < sizeOfGrid; j++) {
        let cell = document.createElement('div');
        cell.style = cellStyle;
        grid.appendChild(cell);
    }
}

cells = document.querySelectorAll("#grid-container .cell");
