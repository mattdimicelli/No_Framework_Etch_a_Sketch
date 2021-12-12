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
  if ('shadesDarker' in cell) {
    /* cell has been previously given a random background color.
    now shade the cell darker 10%, stopping when black */
    if (cell.shadesDarker === 9) return;
    
    const darker = cell.lightness - (cell.shadesDarker * cell.oneShade);
 
    const newHSL = `hsl(${cell.h}, ${cell.s}%, ${darker}%)`;
    cell.style.backgroundColor = newHSL;
    cell.shadesDarker++;
  } else if (!('shadesDarker' in cell)) {
    cell.shadesDarker = 0;
    // create a random HSL value
    cell.h = generateRandomHue;
    cell.s = s * 100;
    cell.lightness = l * 100;
    cell.oneShade = cell.lightness / 10;  // 'one shade' is 10% (darker) than the original 'lightness'
    function generateRandomHue() {
      
    }
  }
    
    function rgbToLightness(r,g,b) {
      return 1/2 * (Math.max(r,g,b) + Math.min(r,g,b));
    } 

    function rgbToHsl(r, g, b) {
      r /= 255, g /= 255, b /= 255;
    
      var max = Math.max(r, g, b), min = Math.min(r, g, b);
      var h, s, l = (max + min) / 2;
    
      if (max == min) {
        h = s = 0; // achromatic
      } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
    
        h /= 6;
      }
    
      return [ h, s, l ];
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