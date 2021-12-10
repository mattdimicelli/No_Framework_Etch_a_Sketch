let numberOfCellsPerAxis = 16;

let container = document.querySelector('.container');
let sizeBtn = document.querySelector('button.size-btn');

sizeBtn.addEventListener('click', btnClickHandler);

createGrid(numberOfCellsPerAxis);

function createGrid(numberOfCellsPerAxis) {
  for (let i = 0; i < numberOfCellsPerAxis ** 2; i++) {
    container.append(createCell(i));
  }
  container.style.gridTemplateColumns = `repeat(${numberOfCellsPerAxis}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${numberOfCellsPerAxis}, 1fr)`;

  function createCell(id) {
    let div = document.createElement('div');
    div.id = id;
    div.classList.add('cell');
    return div;
  }
}

function btnClickHandler() {
  clearGrid();
  createGrid(getSizeOfGrid());
}

function clearGrid() {
  let cells = Array.from(document.querySelectorAll('cell'));
  cells.forEach(cell => cell.remove());
}

function getSizeOfGrid() {
  return parseInt(prompt("How many squares should each side of the grid be?"));
}


// function createDivwithID(id) {
//   const div = document.createElement("div");
//   div.setAttribute("id", id);
//   div.classList.add("square");
//   return div;
// }

// let numofDivs = 256;
// const container = document.querySelector("#container");
// appendDivs(numofDivs);
// changeColorUponHovering();
// const button = document.createElement("button");
// button.textContent = "Click Me";
// button.setAttribute("id", "mainButton");
// const body = document.querySelector("body");
// body.insertBefore(button, container);
// button.addEventListener("click", () => {
//   clearScreen();
//   setSizeofSidedofGrid(getDesiredSizeofGrid());
//   changeColorUponHovering();
// });

// function changeColorUponHovering() {
//   const squares = document.querySelectorAll(".square");
//   squares.forEach((square) => {
//     square.addEventListener("mouseenter", () => {
//       square.style.backgroundColor =
//         "#" + Math.floor(Math.random() * 16777215).toString(16);
//     });
//   });
// }

// function appendDivs(x) {
//   for (let i = 1; i <= x; i++) {
//     const div = createDivwithID(i);
//     container.appendChild(div);
//   }
// }

// function clearScreen() {
//   const squares = document.querySelectorAll(".square");
//   squares.forEach((square) => {
//     container.removeChild(square);
//   });
// }

// function getDesiredSizeofGrid() {
//   let size = prompt("How many squares should each side of the grid be?");
//   return parseInt(size);
// }

// function setSizeofSidedofGrid(x) {
//   container.style["grid-template-columns"] = `repeat(${x}, 1fr)`;
//   container.style["grid-template-rows"] = `repeat(${x}, 1fr)`;
//   //Calls appendDivs(), which in turn calls function to create the divs (x**2 divs)
//   appendDivs(x * x);
// }
