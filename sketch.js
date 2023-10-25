// Creating main grid container
let gridContainerMain = document.createElement("div");
gridContainerMain.id = "Grid-Main";
gridContainerMain.style.maxWidth = "700px";
gridContainerMain.style.maxHeight = "700px";

// Creating the grid container
let gridContainer = document.createElement("div");
gridContainer.id = "Grid";

// Appending the grid container to the body
document.body.appendChild(gridContainerMain);
gridContainerMain.appendChild(gridContainer);

// Getting references to the slider and its output
let slider = document.getElementById("myRange");
let output = document.getElementById("valueOutput");
output.innerHTML = slider.value; // Setting the initial value

// Creating the initial grid
createBoxes(4);

// Updating the grid as per the slider value
slider.oninput = function() {
    output.innerHTML = this.value;
    updateGrid(this.value);
}

let isMouseDown = false;

// Getting references for color selection modes and clear button
const btnRainbow = document.getElementById("btn1");
const btnEraser = document.getElementById("btn2");
const btnColorPicker = document.getElementById("color-picker2");
const btn3 = document.getElementById("btn3");

// Setting the default color mode
let currentMode = 'color'; 

// Event listeners for setting color modes
btnRainbow.addEventListener('click', function() {
    currentMode = 'rainbow';
});

btnEraser.addEventListener('click', function() {
    currentMode = 'eraser';
});

btnColorPicker.addEventListener('input', function() {
    currentMode = 'color';
});

// Clear all boxes to white color
btn3.addEventListener('click', function() {
    const boxes = document.querySelectorAll(".box");
    boxes.forEach(box => box.style.backgroundColor = "white");
});

// Track mouse button states
document.addEventListener('mousedown', function() {
    isMouseDown = true;
});

document.addEventListener('mouseup', function() {
    isMouseDown = false;
});

// Function to update the grid as per the user input
function updateGrid(numBox) {
    // Remove existing grid
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
    // Create a new grid
    createBoxes(numBox);
}

// Function to create grid boxes
function createBoxes(numBox) {
    const containerWidth = 700;
    let boxSize = (containerWidth / numBox) - 2;

    // Setting grid styles
    gridContainer.style.display = "grid";
    gridContainer.style.gridTemplateRows = `repeat(${numBox}, 1fr)`;
    gridContainer.style.gridTemplateColumns = `repeat(${numBox}, 1fr)`;

    // Creating and adding boxes to the grid
    const totalBoxes = numBox * numBox;
    for (let i = 0; i < totalBoxes; i++) {
        const square = document.createElement('div');
        square.className = 'box';
        square.style.width = `${boxSize}px`;
        square.style.height = `${boxSize}px`;
        gridContainer.appendChild(square);

        // Coloring the boxes based on mode and mouse movement
        square.addEventListener('mousemove', function() {
            if (isMouseDown) {
                switch (currentMode) {
                    case 'rainbow':
                        square.style.backgroundColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
                        break;
                    case 'eraser':
                        square.style.backgroundColor = "white";
                        break;
                    case 'color':
                        square.style.backgroundColor = btnColorPicker.value;
                        break;
                }
                square.classList.add('color-changed');
            }
        });

        // Resetting the 'color-changed' state on mouse up
        square.addEventListener('mouseup', function() {
            square.classList.remove('color-changed');
        });
    }
}
