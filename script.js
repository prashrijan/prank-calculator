// Create a function to get the value out of the button
// Add Event Listener to the buttons when clicked to trigger the function
// Read the value of the button
// Store all values in global varibale
// Create a function that will take the value from global variable and displays in the display element

// Select all the buttons
const buttons = document.querySelectorAll(".button");
const input = document.querySelector(".input");

const operations = ["+", "-", "*", "/", "%"];

let lastOperator = "";

let strToDisplay = "";

const display = (str) => {
  input.innerText = str || "0.00";
};

const slice = () => {
  return strToDisplay.slice(0, -1);
};

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const buttonValue = e.target.innerText;

    if (buttonValue === "AC") {
      strToDisplay = "";
      display(strToDisplay);
      return;
    }

    let lastChar = strToDisplay[strToDisplay.length - 1];

    // calculate if the lastChar is not an operator
    if (buttonValue === "=") {
      if (operations.includes(lastChar)) {
        strToDisplay = slice();
      }
      return calculate();
    }

    if (buttonValue === "C") {
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
  });
});

const calculate = () => {
  if (!strToDisplay) return;

  const result = eval(strToDisplay);
  strToDisplay = result.toString();
  display(result);
};
