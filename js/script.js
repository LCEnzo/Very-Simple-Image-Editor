const grid = document.querySelector("#grid-container");
const slider = document.querySelector(".grid-size-input");
const resetButton = document.querySelector(".reset-button");
const eraserButton = document.querySelector(".eraser-button");
const colorButton = document.querySelector(".color-button");
const colorInput = document.getElementById("color-input");
const rainbowButton = document.querySelector(".rainbow-button");
const darkenButton = document.querySelector(".darken-button");
const lightenButton = document.querySelector(".lighten-button");
const gridSizeLabel = document.querySelector(".grid-size-label");

const rowClass = "row-container";

let cells = null;

let gridSize = 16;

let hoverPaintEnabled = false;
let mousePressedPaintEnabled = true;

const Eraser = 0;
const Color = 1;
let color = "#000000";
const Lighten = 2;
const Darken = 3;
const Rainbow = 4;

let currentTool = Color;

let mouseDown = false;
// return false disables dragging of elements, 
// which was causing a situation where the app is thinking the mouse was pressed while it was 
document.body.onmousedown = function() { if(mouseDown == false) mouseDown = true; return false; };
document.body.onmouseup = function() { if(mouseDown == true) mouseDown = false; };
document.body.addEventListener("drag", (event) => { mouseDown = false; });

function getColor(currentColor, tool = currentTool) {
	if(tool == Eraser) {
		return `#FFF`;
	} 
	else if(tool == Color) {
		return color;
	} 
	else if(tool == Rainbow) {
		let hue = Math.floor(Math.random() * 360) % 360;

		// removes some vomity hues
		if(hue > 30 && hue < 55) {
			hue = Math.floor(Math.random() * 30) % 30;
		} else if(hue > 60 && hue < 73) {
			hue = 73 + Math.floor(Math.random() * (360-73)) % (360-73);
		}

		let lightness = 40 + Math.floor(Math.random() * 21) % 21;

		if(hue >= 55 && hue <= 60 && lightness < 50) lightness += 10;

		return `hsl(${hue}, 100%, ${lightness}%)`;
	} 
	else if(tool == Darken || tool == Lighten) {
		if(Array.isArray(currentColor) && currentColor.length === 3) {
			let adjustment = tool == Darken ? -10 : +10;

			let colorString = 
				"rgb(" + 
				currentColor
					.map(el => {
						el += adjustment;
						if(el < 0) el = 0;
						if(el > 255) el = 255;
						return el;
					})
					.join(",")
				+ ")";

			console.log(`color: ${currentColor}, string: ${colorString}`);

			return colorString;
		}
	} 
	else {
		console.error("Get color invalid tool.");
		return `#FFF`;
	}
}

function cellMouseEnter(event) { 
	let cell = this;
	const cellColorRGB = cell.style.backgroundColor
						.split(/[,()rgb]/)
						.filter(el => el.trim().length > 0)
						.map(el => +el);

	if(hoverPaintEnabled) {
		cell.style["background-color"] = getColor(cellColorRGB, currentTool);
	}
	else if(mousePressedPaintEnabled && mouseDown) {
		cell.style["background-color"] = getColor(cellColorRGB, currentTool);
	}
}

function clickCell(event) {
	if(mousePressedPaintEnabled) {
		let cell = this;

		cell.style["background-color"] = getColor();
	}
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
            cell.style.backgroundColor = "#FFF";

			cell.addEventListener('mouseenter', cellMouseEnter);
			cell.addEventListener('mousedown', clickCell);
			
            row.appendChild(cell);
        }

        grid.appendChild(row);
    }
    
    cells = document.querySelectorAll("#grid-container .cell");
}

function gridSizeLabelUpdate() {
    gridSizeLabel.textContent = `${gridSize} X ${gridSize}`;
}

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

resetButton.addEventListener('click', createGrid);
slider.addEventListener('change', (event) => { gridSize = slider.value; gridSizeLabelUpdate(); });
colorInput.addEventListener('change', (event) => { color = event.currentTarget.value; event.currentTarget.style.backgroundColor = color; currentTool = Color; } );
eraserButton.onclick = function() { currentTool = Eraser};
colorButton.onclick = function() { currentTool = Color };
rainbowButton.onclick = function() { currentTool = Rainbow };
darkenButton.onclick = function() { currentTool = Darken };
lightenButton.onclick = function() { currentTool = Lighten };

gridSizeLabelUpdate()

createGrid();
