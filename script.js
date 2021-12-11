const INITIAL_NUMBER_OF_CELLS_PER_AXIS = 16;

let sizeBtn = document.querySelector('button.size-btn');

sizeBtn.addEventListener('click', btnClickHandler);

createGrid(INITIAL_NUMBER_OF_CELLS_PER_AXIS);

function createGrid(numberOfCellsPerAxis) {
  let container = document.querySelector('.container');
  for (let i = 0; i < numberOfCellsPerAxis ** 2; i++) {
    /* the numberOfCellsPerAxis is squared to get the total number of
    cells for the grid */
    container.append(createCell(i));
  }
  container.style.gridTemplateColumns = `repeat(${numberOfCellsPerAxis}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${numberOfCellsPerAxis}, 1fr)`;

  function createCell() {
    let div = document.createElement('div');
    div.classList.add('cell');
    div.addEventListener('mouseenter', changeColor);
    return div;
  }
}

function changeColor(e) {
  let cell = e.currentTarget;
  cell.style.backgroundColor =
      "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function btnClickHandler() {
  clearGrid();
  createGrid(getSizeOfGrid());
}

function clearGrid() {
  let cells = Array.from(document.querySelectorAll('div.cell'));
  cells.forEach(cell => {
    cell.removeEventListener('mouseenter', changeColor);
    cell.remove();
  });
}

function getSizeOfGrid() {
  let number;
  while(number < 2 || number > 100 || isNaN(number)) {
    number = parseInt(prompt('How many squares should each side of the grid be? Maximum 100 squares per side.'));
  }
  return number;
}