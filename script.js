/* TODO: 
  - add keyboard supprt
  - backspace button?
*/
const MAX_LENGTH = 15;

const add = function (a, b) {
  return Number(a) + Number(b);
};
const subtract = function (a, b) {
  return a - b;
};
const multiply = function (a, b) {
  return a * b;
};
const divide = function (a, b) {
  return a / b;
};

function operate(operator, operand1, operand2) {
  if (operator == "+") {
    return add(operand1, operand2);
  }
  if (operator == "-") {
    return subtract(operand1, operand2);
  }
  if (operator == "/") {
    return divide(operand1, operand2);
  }
  if (operator == "*") {
    return multiply(operand1, operand2);
  }
}

/** REFERENCES TO ELEMENTS */
let display = document.querySelector(".display");
let equalButton = document.querySelector(".equals");
let numButtons = document.querySelectorAll(".number");
let operatorButtons = document.querySelectorAll(".operator");
let clearButton = document.querySelector(".clear");
let signButton = document.querySelector(".sign");
let decimalButton = document.querySelector(".decimal");
let moduloButton = document.querySelector(".modulo");

/** HELPER VARS */
let toDisplay = "";
let cutOffbyNegSign = "";
let isSolutionOnDisplay = false;

/** VARS FOR CURRENT OPERATION (operator variables)*/
let firstOperand = null;
let currOperator = null;
let secondOperand = null;

/** FUNCTIONS */
function roundToTenDigits(value) {
  // if (value.toString().includes("e")) {
  //   return "😵‍💫😵‍💫😵‍💫"; //number too big
  // }

  // number could be too big for the screen and/or have an e in it
  /**
   * if value.toString().length > 10
   *  - if it has an e:
   *    -
   *  - else:
   *    - give it an e. Number(value).toPrecision(5) base=5, exp=5
   *    -
   */
  res = value.toString();
  if (res.length > MAX_LENGTH) {
    base_length = MAX_LENGTH - 6; //5 for the exponent (e+255) and 1 for the decimal
    res = Number(res).toPrecision(base_length).toString();
  }
  return res;
}

function appendDisplay(newDigit) {
  toDisplay += newDigit;
  display.textContent = toDisplay;
}
function updateDisplay(newNum) {
  toDisplay = roundToTenDigits(newNum);
  display.textContent = toDisplay;
}
function clearDisplay() {
  toDisplay = "";
  cutOffbyNegSign = "";
  display.textContent = "0";
}
function resetAllOperatorVars() {
  firstOperand = null;
  currOperator = null;
  secondOperand = null;
}

/** EVENT HANDLERS */
clearButton.addEventListener("click", (event) => {
  clearDisplay();
  resetAllOperatorVars();
  isSolutionOnDisplay = false;
});

numButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    let value = event.target.textContent;
    if (isSolutionOnDisplay) {
      // If a solution is currently displayed, start fresh with the new value
      updateDisplay(value);
      isSolutionOnDisplay = false;
    } else {
      // If the display is empty and the value is not zero, append the value
      if (toDisplay === "" && value !== "0") {
        appendDisplay(value);
      } else if (display.textContent.length < MAX_LENGTH) {
        // If the display has less than 10 characters, append the value
        if (!(value === "0" && Number(display.textContent) === 0)) {
          // Prevent appending multiple zeros to a lone zero
          appendDisplay(value);
        }
      }
    }
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    if (!firstOperand) {
      firstOperand = display.textContent;
    } else {
      //user is trying to do a second operation
      //do the first operation before grabbing the new one
      secondOperand = display.textContent;
      firstOperand = operate(currOperator, firstOperand, secondOperand);
      secondOperand = null;
      updateDisplay(firstOperand);
    }
    currOperator = event.target.textContent;

    toDisplay = "";
  });
});
equalButton.addEventListener("click", (event) => {
  secondOperand = display.textContent;
  if (firstOperand && secondOperand && currOperator) {
    let solution;
    if (Number(secondOperand) == 0 && currOperator == "/") {
      // catch divide by zero
      solution = "😂😂😐😐😐";
    } else {
      solution = operate(currOperator, firstOperand, secondOperand);
    }
    updateDisplay(solution);
    resetAllOperatorVars();
    isSolutionOnDisplay = true;
  }
});
// sign button
signButton.addEventListener("click", (event) => {
  /*
    - if first character in toDisplay is not '-'
      - check length of current display.
      - if it's 10:
        - save last digit (will be cut off)
      - append '-' to front
      - update display (should automatically slice the string)
    - else (has negative sign)
      - remove '-'
      - if there was a cut off digit, append it
      - update display
  */

  // ignore if display is 0
  current_display = display.textContent;
  if (current_display == "0") {
    return;
  }

  if (current_display[0] != "-") {
    // add negative sign
    if (current_display.length >= MAX_LENGTH) {
      cutOffbyNegSign = current_display.at(-1);
    }
    updateDisplay("-" + current_display);
  } else {
    // remove negative sign
    newDisplay = current_display.slice(1) + cutOffbyNegSign;
    updateDisplay(newDisplay);
  }
});
decimalButton.addEventListener("click", (event) => {
  /*
  if the display does not already has a decimal point, append "."
  */
  //  TODO:
  //  is solution on dislplay check
  // dispaly >= 10 check
  if (display.textContent.includes(".")) {
    return;
  }
  if (isSolutionOnDisplay) {
    updateDisplay("0.");
    isSolutionOnDisplay = false;
  } else {
    if (toDisplay === "") {
      appendDisplay("0.");
    } else if (display.textContent.length < MAX_LENGTH) {
      // if (value == 0 && display.textContent == "0") {
      //   return;
      // }
      appendDisplay(".");
    }
  }
});

moduloButton.addEventListener("click", (event) => {
  /**
   * divide the displayed number by 100
   * display it
   */
  if (Number(display.textContent) != "0") {
    let current_display = Number(display.textContent);
    updateDisplay(current_display / 100);
  }
});
