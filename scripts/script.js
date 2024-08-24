/* --------------- Animation Typing --------------------------*/

typeDisplay(['Commencer'], 'start');

function typeDisplay(words, id) {
  let visible = true;
  let vertLine = document.getElementById('vertLine');
  let letterCount = 1;
  let x = 1;
  let waiting = false;
  let target = document.getElementById(id)

  if (vertLine && target) {
    window.setInterval(function () {

      if (waiting === false) {
        target.innerHTML = words[0].substring(0, letterCount)
        letterCount += x;
      }
    }, 120)

    window.setInterval(function () {
      if (visible === true) {
        vertLine.className = 'vertical-line flash'
        visible = false;

      } else {
        vertLine.className = 'vertical-line'

        visible = true;
      }
    }, 400)
  } else {
    return
  }
}

/* ------------- Animation Ecran Calculatrice ------------- */
/* -------------------------------------------------------- */

/* Variables */

const input = document.getElementById("input");
const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const four = document.getElementById("four");
const five = document.getElementById("five");
const six = document.getElementById("six");
const seven = document.getElementById("seven");
const eight = document.getElementById("eight");
const nine = document.getElementById("nine");
const zero = document.getElementById("zero");
const dot = document.getElementById("dot");

const emptyInput = document.getElementById("emptyInput");
const eraseOneNumber = document.getElementById("eraseOneNumber");

const plus = document.getElementById("plus");
const plusAverage = document.getElementById("plusAverage");

const result = document.getElementById("result");
const averageResult = document.getElementById("averageResult");

const marksDisplay = document.getElementById("marksDisplay");
const eraseLastMark = document.getElementById("eraseLastMark");
const eraseAllMark = document.getElementById("eraseAllMark");

const averagesDisplay = document.getElementById("averagesDisplay");
const eraseLastAverage = document.getElementById("eraseLastAverage");
const eraseAllAverage = document.getElementById("eraseAllAverage");

/* fonctions */

function start() {
  input.innerHTML = 0;
}

function type(btn) {
  btn.addEventListener("click", () => {

    let currentInput = input.innerHTML;

    if (btn === dot && currentInput.includes(".")) {
      return;
    }

    let separate = currentInput.split(".");
    if (separate[0].length >= 2 && btn !== dot && separate[0] !== "10" && !currentInput.includes(".")) {
      return;
    }
    if (separate.length > 1 && separate[1].length >= 2) {
      return;
    }

    if (currentInput === "" || currentInput === "0") {
      input.innerHTML = btn.innerHTML;
    } else {
      input.innerHTML += btn.innerHTML;
    }

    let value = parseFloat(input.innerHTML);
    if (value > 100) {
      input.innerHTML = currentInput;
    }

  })
};

function eraseLast() {
  if (input.innerHTML === "0" || input.innerHTML.length === 1) {
    input.innerHTML = 0;
  } else {
    input.innerHTML = input.innerHTML.slice(0, -1);
  }
};
function eraseInput() {
  input.innerHTML = 0;
};

eraseOneNumber.onclick = () => eraseLast();
emptyInput.onclick = () => eraseInput();

/* --------- */

function addMark(gradecategorie, numberscr) {
  let newMark = numberscr.innerHTML;
  let displayList;
  let resultdisplay;
  let currentMarks = JSON.parse(localStorage.getItem(gradecategorie)) || [];

  if (newMark.trim() !== "") {
    currentMarks.push(newMark);
    localStorage.setItem(gradecategorie, JSON.stringify(currentMarks));

    if (gradecategorie === "marks") {
      numberscr.innerHTML = "0";
      displayList = marksDisplay;
      resultdisplay = result;
    } else {
      numberscr.innerHTML = "";
      input.innerHTML = "0";
      marksDisplay.innerHTML = "";
      displayList = averagesDisplay;
      resultdisplay = averageResult;
      localStorage.removeItem("marks");
    }
  }

  updateDisplay(gradecategorie, displayList, resultdisplay);
};

function displayMarks(gradecategorie, displayList) {
  let marks = JSON.parse(localStorage.getItem(gradecategorie)) || [];
  displayList.innerHTML = marks.join(" + ");
}
function getAverage(gradecategorie) {
  let marks = JSON.parse(localStorage.getItem(gradecategorie)) || [];
  if (marks.length === 0) return 0;
  let sum = 0;
  for (const mark of marks) {
    sum += parseFloat(mark);
  }
  return sum / marks.length;
};
function displayAverage(gradecategorie, resultdisplay) {
  let average = getAverage(gradecategorie);
  if (average) {
    resultdisplay.innerHTML = average.toFixed(2);
  }
};

function removeLastMark(gradecategorie) {
  let marks = JSON.parse(localStorage.getItem(gradecategorie)) || [];
  if (marks.length === 1) {
    localStorage.removeItem(gradecategorie);
    marksDisplay.innerHTML = [];
    result.innerHTML = "";
  } else {
    marks.pop();
    localStorage.setItem(gradecategorie, JSON.stringify(marks));

    if (gradecategorie === "marks") {
      displayList = marksDisplay;
      resultdisplay = result;
    } else {
      displayList = averagesDisplay;
      resultdisplay = averageResult;
    }

    updateDisplay(gradecategorie, displayList, resultdisplay);
  }
};
function emptyMarksList(gradecategorie, displayList, resultdisplay) {
  localStorage.removeItem(gradecategorie);
  displayList.innerHTML = [];
  resultdisplay.innerHTML = "";
};

function updateDisplay(gradecategorie, displayList, resultdisplay) {
  displayMarks(gradecategorie, displayList);
  displayAverage(gradecategorie, resultdisplay);
}

plus.onclick = () => addMark("marks", input);
plusAverage.onclick = () => addMark("averages", result);

eraseLastMark.onclick = () => removeLastMark("marks");
eraseAllMark.onclick = () => emptyMarksList("marks", marksDisplay, result);
eraseLastAverage.onclick = () => removeLastMark("averages");
eraseAllAverage.onclick = () => emptyMarksList("averages", averagesDisplay, averageResult);

document.addEventListener('DOMContentLoaded', () => {

  start();

  type(one);
  type(two);
  type(three);
  type(four);
  type(five);
  type(six);
  type(seven);
  type(eight);
  type(nine);
  type(zero);
  type(dot);

  updateDisplay("marks", marksDisplay, result);
  updateDisplay("averages", averagesDisplay, averageResult);
});