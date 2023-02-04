const container = document.getElementById("container");
var row, col;
col = prompt("Give size (x by y): ");
row = col;

function makeRows(rows, cols) {
  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);
  for (c = 0; c < (rows * cols); c++) {
    let cell = document.createElement("div");
    container.appendChild(cell).className = "grid-item";
    cell.addEventListener('click', 
    e => e.target.classList.add('onhover')
    )
  };
};

makeRows(row, col);

