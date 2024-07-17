const add = function (a, b) {
  return a + b;
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
