// Create a function to get the value out of the button
// Add Event Listener to the buttons when clicked to trigger the function
// Read the value of the button
// Store all values in global varibale
// Create a function that will take the value from global variable and displays in the display element

// Select all the buttons
const buttons = document.querySelectorAll(".button");
const input = document.querySelector(".input");

const operations = ["+", "-", "*", "/", "%"];

let strToDisplay = "";

const display = (str) => {
  input.innerText = str || "0.00";
};

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const buttonValue = e.target.innerText;

    if (buttonValue === "AC") {
      strToDisplay = "";
      display(strToDisplay);
      return;
    }

    if (buttonValue === "=") {
      const lastChar = strToDisplay[strToDisplay.length - 1];

      if (operations.includes(lastChar)) {
        strToDisplay = strToDisplay.slice(0, -1);
      }
      return calculate();
    }

    if (buttonValue === "C") {
      strToDisplay = strToDisplay.slice(0, -1);
      return display(strToDisplay);
    }

    let lastChar = strToDisplay[strToDisplay.length - 1];

    if (operations.includes(lastChar)) {
      if (operations.includes(buttonValue)) {
        strToDisplay = strToDisplay.slice(0, -1);
      }
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
