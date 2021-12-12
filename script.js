const INITIAL_NUMBER_OF_CELLS_PER_AXIS = 16;

let sizeBtn = document.querySelector('button.size-btn');

sizeBtn.addEventListener('click', btnClickHandler);

createGrid(INITIAL_NUMBER_OF_CELLS_PER_AXIS);

function createGrid(numberOfCellsPerAxis) {
  let container = document.querySelector('.container');
  for (let i = 0; i < numberOfCellsPerAxis ** 2; i++) {
    /* the numberOfCellsPerAxis is squared to get the total number of
    cells for the grid */
    container.append(createCell());
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
  if ('shade' in cell) {
    /* cell has been previously shaded darker on a spectrum leading to black.
    continue to shade the cell darker until it is black */
    
  } else if (!('shade' in cell)) {
    console.log(getComputedStyle(cell).backgroundColor);
    const REGEX = /rgb\((?:([0-9]{1,2}|1[0-9]{1,2}|2[0-4][0-9]|25[0-5]), ?)(?:([0-9]{1,2}|1[0-9]{1,2}|2[0-4][0-9]|25[0-5]), ?)(?:([0-9]{1,2}|1[0-9]{1,2}|2[0-4][0-9]|25[0-5]))\)/;
    const cellRGB = getComputedStyle(cell).backgroundColor.match(REGEX);
    const r = +cellRGB[1];
    const g = +cellRGB[2];
    const b = +cellRGB[3];
    const lightness = rgbToLightness(r,g,b);
    console.log(lightness);
    
    function rgbToLightness(r,g,b) {
      return 1/2 * (Math.max(r,g,b) + Math.min(r,g,b));
    } 
  }
  // cell.style.backgroundColor =
  //     "#" + Math.floor(Math.random() * 16777215).toString(16);
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