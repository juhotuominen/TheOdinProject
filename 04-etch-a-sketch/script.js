
const canvas = document.getElementById('canvas');
let randomColors = false;
let modern = false;

//Function for grid
function createGrid(rows, cols) {
    canvas.style['grid-template-columns'] = `repeat(${rows}, 1fr)`;
    canvas.style['grid-template-rows'] = `repeat(${cols}, 1fr)`;
    for (let i = 0; i < rows * cols; i++) {
        let cell = document.createElement('div');
        // Change color when mouse hover
        cell.addEventListener("mouseenter", colorCell);
        cell.addEventListener("touchstart", colorCell);
        canvas.appendChild(cell).className = 'cell';
    }

}
function colorCell(e) {
    if (randomColors) {
        //Random RGB value.
        e.target.style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)},
        ${Math.floor(Math.random() * 256)},
        ${Math.floor(Math.random() * 256)}`
    }
    else if (modern) {
        choseShade(e);
    } else {
        e.target.style['background-color'] = 'black';
    }
}
createGrid(16, 16);

function clearGrid() {
    let cells = document.getElementsByClassName('cell');
    cells = Array.from(cells);
    // set each cell to white
    cells.forEach((cells) => {
        cells.style.backgroundColor = "white";
        cells.style.opacity = "1.1";
    })
}

// Create functions for buttons
document.getElementById("clearGrid").addEventListener('click', (e) => {
    clearGrid();
    randomColors = false;
    modern = false;
    random_colors.classList.remove('active');
    modern_btn.classList.remove('active');
});
const gridSize = document.querySelector('#choseGridSize');
gridSize.addEventListener('click', (e) => {
    let size = prompt("Select a grid size. Must be no greater than 100.", "16")
    if (size > 100) {
        return null;
    }
    createGrid(size, size);
    clearGrid();
});
const random_colors = document.querySelector('#randomColors');
random_colors.addEventListener('click', e => {
    clearGrid();
    random_colors.classList.add('active');
    modern_btn.classList.remove('active');
    modern = false;
    randomColors ? randomColors = false : randomColors = true;
})
const modern_btn = document.querySelector('#modern')
modern_btn.addEventListener('click', e => {
    clearGrid();
    random_colors.classList.remove('active');
    modern_btn.classList.add('active');
    randomColors = false;
    modern ? modern = false : modern = true;
})

//function for different shades
function choseShade(e) {
    e.target.style.backgroundColor = "black";
    let currOpacity = e.target.style.opacity;
    if (currOpacity > 1) {
        e.target.style.opacity = 0.2;
        return null;
    }
    else if (currOpacity < 1) {
        e.target.style.opacity = (parseFloat(currOpacity) + 0.2);
    }
}
