/* TODO: 
  - sign button, done 
  - modulo button, 
  - and decimal button
*/
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

/** HELPER VARS */
let toDisplay = "";
let cutOffbyNegSign = "";
let isSolutionOnDisplay = false;

/** VARS FOR CURRENT OPERATION (operator variables)*/
let firstOperand = null;
let currOperator = null;
let secondOperand = null;

/** FUNCTIONS */
function sliced(value) {
  string = value.toString(); //in case it's not a string
  return string.slice(0, 10);
  // calculator screen can fit 10 digits
}
function appendDisplay(newDigit) {
  toDisplay += newDigit;
  display.textContent = toDisplay;
}
function updateDisplay(newNum) {
  toDisplay = sliced(newNum);
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
      updateDisplay(value);
      isSolutionOnDisplay = false;
    } else {
      if (display.textContent.length < 10) {
        if (value == 0 && display.textContent == "0") {
          return;
        }
        appendDisplay(value);
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
    let solution = operate(currOperator, firstOperand, secondOperand);
    if (!isFinite(solution)) {
      solution = ";|";
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
    if (current_display.length >= 10) {
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
  
  */
});
