const buttons = document.querySelectorAll(".button");
const display = document.querySelector(".input");

let strToDisplay = "";
let lastOperator = "";
let operators = ["+", "-", "/", "*", "%"];
let prankAudio = new Audio("./assets/prank-sound.mp3");

const appendToDisplay = (str) => {
  return (display.innerText = str || "0.00");
};

const clearDisplay = () => {
  strToDisplay = "";
  return appendToDisplay(strToDisplay);
};

const removeLastChar = (str) => {
  return str.slice(0, -1);
};

const calculate = (str) => {
  try {
    let randomVal = generateRandomNumber();

    let result = eval(str) + randomVal;

    if (isNaN(result)) return;
    if (randomVal > 0) {
      display.classList.add("prank");
      prankAudio.play();
    }
    strToDisplay = result.toString();
    appendToDisplay(strToDisplay);
    return result;
  } catch (error) {
    alert("Invalid Expression");
  }
};

const generateRandomNumber = () => {
  let randomNum = Math.floor(Math.random() * 10);

  return randomNum < 5 ? randomNum : 0;
};

const allOperations = (val) => {
  display.classList.remove("prank");
  9;
  let lastChar = strToDisplay[strToDisplay.length - 1];
  if (val === "AC" || val === "Delete12") {
    clearDisplay();
    return;
  }

  if (val === "C" || val == "Backspace") {
    strToDisplay = removeLastChar(strToDisplay);
    appendToDisplay(strToDisplay);
    return;
  }

  if (operators.includes(lastChar)) {
    lastOperator = lastChar;
    if (operators.includes(val)) {
      strToDisplay = removeLastChar(strToDisplay);
    }
  }

  if (val === "=" || val === "Enter") {
    if (operators.includes(lastChar)) {
      strToDisplay = removeLastChar(strToDisplay);
    }

    return calculate(strToDisplay);
  }

  if (val === ".") {
    let lastOperatorIndex = strToDisplay.lastIndexOf(lastOperator);
    let lastNumberSet = strToDisplay.slice(lastOperatorIndex + 1);

    if (lastNumberSet.includes(".")) return;

    if (!lastOperator && strToDisplay.includes(".")) return;
  }
  strToDisplay += val;
  appendToDisplay(strToDisplay);
};

document.addEventListener("keydown", (e) => {
  const val = e.key;
  const calculatorKeys = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "+",
    "-",
    "*",
    "/",
    "%",
    "Enter",
    "Backspace",
    "Delete",
    ".",
  ];

  if (!calculatorKeys.includes(val)) return;

  allOperations(val);
});

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonValue = button.innerText;

    allOperations(buttonValue);
  });
});
