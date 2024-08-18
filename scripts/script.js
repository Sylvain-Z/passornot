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
function eraseInput() {
  emptyInput.addEventListener("click", () => {
    input.innerHTML = 0;

    updateDisplay();
  })
};
function eraseLast() {
  eraseOneNumber.addEventListener("click", () => {
    if (input.innerHTML === "0" || input.innerHTML.length === 1) {
      input.innerHTML = 0;
    } else {
      input.innerHTML = input.innerHTML.slice(0, -1);
    }

    updateDisplay();
  })
};

/* --------- */

function addMark() {
  plus.addEventListener("click", () => {
    let newMark = input.innerHTML;
    let currentMarks = JSON.parse(localStorage.getItem("marks")) || [];
    if (newMark.trim() !== "") {
      currentMarks.push(newMark);
      localStorage.setItem("marks", JSON.stringify(currentMarks));
      input.innerHTML = "";
    }

    updateDisplay();
  })
};
function displayMarks() {
  let marks = JSON.parse(localStorage.getItem("marks")) || [];
  marksDisplay.innerHTML = marks.join(" + ");
}
function getAverage() {
  let marks = JSON.parse(localStorage.getItem("marks")) || [];
  let sum = 0;
  for (const mark of marks) {
    sum += parseFloat(mark);
  }
  return sum / marks.length;
};
function displayAverage() {
  let average = getAverage();
  if (average) {
    result.innerHTML = average.toFixed(2);
  }
};
function removeLastMark() {
  eraseLastMark.addEventListener("click", () => {
    let marks = JSON.parse(localStorage.getItem("marks")) || [];
    if (marks.length === 1) {
      localStorage.removeItem("marks");
      marksDisplay.innerHTML = [];
      result.innerHTML = "";
    } else {
      marks.pop();
      localStorage.setItem("marks", JSON.stringify(marks));

      updateDisplay();
    }
  })
};
function emptyMarksList() {
  eraseAllMark.addEventListener("click", () => {
    localStorage.removeItem("marks");

    marksDisplay.innerHTML = [];
    result.innerHTML = "";
  })
};

/* --------- */

function addAverage() {
  plusAverage.addEventListener("click", () => {
    let newAverage = result.innerHTML;
    let currentAverages = JSON.parse(localStorage.getItem("averages")) || [];
    if (newAverage.trim() !== "") {
      currentAverages.push(newAverage);
      localStorage.setItem("averages", JSON.stringify(currentAverages));
      input.innerHTML = "";
      result.innerHTML = "";
      localStorage.removeItem("marks");
    }

    updateDisplay();
  })
};
function displayAverages() {
  let averages = JSON.parse(localStorage.getItem("averages")) || [];
  averagesDisplay.innerHTML = averages.join(" + ");
}
function getAveragesAverage() {
  let averages = JSON.parse(localStorage.getItem("averages")) || [];
  let sum = 0;
  for (const average of averages) {
    sum += parseFloat(average);
  }
  return sum / averages.length;
};
function displayAveragesAverage() {
  let averagesAverage = getAveragesAverage();
  if (averagesAverage) {
    averageResult.innerHTML = averagesAverage.toFixed(2);
  }
};
function removeLastAverage() {
  eraseLastAverage.addEventListener("click", () => {
    let averages = JSON.parse(localStorage.getItem("averages")) || [];
    if (averages.length === 1) {
      localStorage.removeItem("averages");
      averagesDisplay.innerHTML = [];
      averageResult.innerHTML = "";
    } else {
      averages.pop();
      localStorage.setItem("averages", JSON.stringify(averages));

      updateDisplay();
    }
  })
};
function emptyAveragesList() {
  eraseAllAverage.addEventListener("click", () => {
    localStorage.removeItem("averages");

    averagesDisplay.innerHTML = [];
    averageResult.innerHTML = "";
  })
};

function updateDisplay() {
  displayMarks();
  displayAverage();
  displayAverages();
  displayAveragesAverage();
}

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

  eraseInput();
  eraseLast();

  addMark();
  getAverage();

  emptyMarksList();
  removeLastMark();

  addAverage();
  getAveragesAverage();

  removeLastAverage();
  emptyAveragesList();

  updateDisplay();
});