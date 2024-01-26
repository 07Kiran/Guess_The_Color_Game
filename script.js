/*global document, setTimeout*/

let numSquares = 6; //default nr of squares
let colors = [];
let pickedColor;
let squares = document.querySelectorAll(".square"); //selects all 6 square divs we have on the site
let colorDisplay = document.getElementById("colorDisplay"); //shows the right answer RGB code
let messageDisplay = document.querySelector("#message"); //shows "try again" or "correct!"
let h1 = document.querySelector("h1");
let resetButton = document.querySelector("#reset");
// Leo let win = document.querySelector("#win");
let modeButtons = document.querySelectorAll(".mode");

init();

function init() {
    setupModeButtons();
    setupSquares();
    reset();
}


function setupModeButtons() {
    for (let i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function () {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "EASY" ? numSquares = 3 : numSquares = 6;
            reset();
        });
    }
}

//BASIC LOGIC: looping through squares to apply color from colors array
function setupSquares() {
    for (let i = 0; i < squares.length; i++) {
        //add listener to click squares
        squares[i].addEventListener("click", function () {
            //grab color of chosen square, save it to a variable
            let clickedColor = this.style.backgroundColor;
            //compare clicked color to pickedColor, see if it matches
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                //turns all other squares to the right answer color
                changeColors(pickedColor);
                //turns logo background right answer color
                colorDisplay.style.backgroundColor = pickedColor;
                resetButton.textContent = "PLAY AGAIN";
            } else {
                this.style.visibility = "hidden";
                messageDisplay.textContent = "Try again!";
            }
        })
    }
}

function reset() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.visibility = "visible"
    }
    colors = generateRandomColors(numSquares);
    //pick new random color from array
    pickedColor = pickColor();
    //change colorDisplay 
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "NEW COLORS"
    colorDisplay.style.backgroundColor = "#373E42";
    messageDisplay.textContent = "";
    //change colors of squares
    for (let i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i]
        } else {
            //hides bottom 3 squares if there is no color generated
            squares[i].style.display = "none";
        }
    }
}

//reset button listener
resetButton.addEventListener("click", function () {
    reset();
})

//function to turn all squares to the right answer color
function changeColors(color) {
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.visibility = "visible";
        squares[i].style.backgroundColor = color;
    }


}

//function to randomly choose right answer color
function pickColor() {
    let random = Math.floor(Math.random() * colors.length) //chooses the right answer randomly from the number of squares
    return colors[random];
}


//gives 1 random RGB format color
function randomColor() {
    //pick a red from 0 to 255
    let r = Math.floor(Math.random() * 256);
    //pick a green from 0 to 255
    let g = Math.floor(Math.random() * 256);
    //pick a blue from 0 to 255
    let b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

//function giving an array of random colors, depending on how many is needed (num= the nr of squares)
function generateRandomColors(num) {
    let arr = []
    //repeat num times (depending on how many squares we have)
    for (let i = 0; i < num; i++) {
        //get random color and push into array
        arr.push(randomColor());
    }
    //return that array
    return arr;
}