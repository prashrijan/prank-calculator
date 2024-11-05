const buttons = document.querySelectorAll(".button");
const input = document.querySelector(".input");

const operations = ["+", "-", "*", "/", "%"];

let lastOperator = "";

let strToDisplay = "";
const audio = new Audio("./assets/aa.wav");

const calcOperations = (buttonValue) => {
  if (buttonValue === "AC") {
    strToDisplay = "";
    display(strToDisplay);
    return;
  }

  let lastChar = strToDisplay[strToDisplay.length - 1];

  // calculate if the lastChar is not an operator
  if (buttonValue === "=" || buttonValue === "Enter") {
    if (operations.includes(lastChar)) {
      strToDisplay = slice();
    }
    return calculate();
  }

  if (buttonValue === "C" || buttonValue === "Backspace") {
    strToDisplay = slice();
    return display(strToDisplay);
  }

  // if the pressed value is operator change the last operator and if the last char is again a operator than slice it
  if (operations.includes(buttonValue)) {
    lastOperator = buttonValue;
    if (operations.includes(lastChar)) {
      strToDisplay = slice();
    }
  }

  if (buttonValue === ".") {
    // get the last opertor index
    let lastOperatorIndex = strToDisplay.lastIndexOf(lastOperator);

    // slice the number set from last opertor index to the end
    let lastNumberSet = strToDisplay.slice(lastOperatorIndex + 1);

    if (lastNumberSet.includes(".")) return;

    if (!lastOperator && strToDisplay.includes(".")) return;
  }

  strToDisplay += buttonValue;
  display(strToDisplay);
};

const display = (str) => {
  input.innerText = str || "0.00";
};

const slice = () => {
  return strToDisplay.slice(0, -1);
};

const calculate = () => {
  try {
    if (!strToDisplay) return;

    const randomValue = randomNumber();

    const result = eval(strToDisplay) + randomValue;

    console.log(randomValue);
    if (randomValue > 0) {
      audio.play();
      input.classList.add("prank");
    }
    strToDisplay = result.toString();
    display(result);
  } catch (error) {
    alert("Invalid Expression");
  }
};

const randomNumber = () => {
  const num = Math.floor(Math.random() * 10);

  return num < 5 ? num : 0;
};

document.addEventListener("keydown", (e) => {
  const val = e.key;
  const ignoredKeys = [
    "Shift",
    "Control",
    "Alt",
    "Meta",
    "CapsLock",
    "Tab",
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "Home",
    "End",
    "PageUp",
    "PageDown",
    "Escape",
    "Delete",
    "Insert",
    "ContextMenu",
    "F1",
    "F2",
    "F3",
    "F4",
    "F5",
    "F6",
    "F7",
    "F8",
    "F9",
    "F10",
    "F11",
    "F12",
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "'",
    '"',
    ">",
    "<",
    "?",
    "|",
  ];

  if (e.code.includes("Key") || ignoredKeys.includes(val)) return;
  calcOperations(val);
});

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const buttonValue = e.target.innerText;

    input.classList.remove("prank");
    calcOperations(buttonValue);
  });
});
