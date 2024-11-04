const buttons = document.querySelectorAll(".button");
const input = document.querySelector("input");

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.textContent === "AC") {
      input.value = "";
    } else if (e.target.textContent === "C") {
      input.value = input.value.slice(0, -1);
    } else {
      input.value += e.target.textContent;
    }
  });
});
