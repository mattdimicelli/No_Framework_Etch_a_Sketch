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
  if ('darkness' in cell) {
    makeCellDarker();
  }
  else if (!('darkness' in cell)) {
    randomlyColorCell();
  }
  function makeCellDarker() {
    /* shade the cell darker 10%, stopping when black */
    if (cell.darkness === 11) return;
    const darker = cell.lightnessL - (cell.darkness * cell.oneShadeDarker);
    const newHSL = `${cell.truncatedHSL} ${darker}%`;
    cell.style.backgroundColor = newHSL;
    cell.darkness++;
  }
  function randomlyColorCell() {
    cell.darkness = 1;
    cell.lightnessL = generateRandomPercentage();
    cell.truncatedHSL = generateTruncatedRandomHSL();
    cell.style.backgroundColor = generateCompleteRandomHSL(cell.truncatedHSL, cell.lightnessL);
    cell.oneShadeDarker = cell.lightnessL / 10;  
    function generateCompleteRandomHSL(truncatedHSL, lightness) {
      return `${truncatedHSL} ${lightness}%`;
    }
    function generateRandomPercentage() {
      return Math.floor(Math.random() * 101);
    }
    function generateTruncatedRandomHSL() {
      return `hsl(${generateRandomHue()}, ${generateRandomPercentage()}%,`;

      function generateRandomHue() {
        return Math.floor(Math.random() * 361);
      }
    }
  }
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