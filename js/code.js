function createDivwithID(id) {
  const div = document.createElement("div");
  div.setAttribute("id", id);
  div.classList.add("square");
  return div;
}

const container = document.querySelector("#container");
createAndAppend256Divs();
const squares = document.querySelectorAll(".square");
squares.forEach((square) => {
  square.addEventListener("mouseenter", () => {
    square.classList.toggle("hovered");
  });
});

function createAndAppend256Divs() {
  for (let i = 1; i <= 256; i++) {
    const div = createDivwithID(i);
    container.appendChild(div);
  }
}
