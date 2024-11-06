const buttons = document.querySelectorAll(".button");
const display = document.querySelector(".input");

let strToDisplay = "";
let lastOperator = "";
let operators = ["+", "-", "/", "*", "%"];

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
    let result = eval(str);
    strToDisplay = result;
    appendToDisplay(strToDisplay);
    return result;
  } catch (error) {
    alert("Invalid Expression");
  }
};

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const val = button.innerText;
    let lastChar = strToDisplay[strToDisplay.length - 1];

    if (val === "AC") {
      clearDisplay();
      return;
    }

    if (val === "C") {
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

    if (val === "=") {
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
  });
});
