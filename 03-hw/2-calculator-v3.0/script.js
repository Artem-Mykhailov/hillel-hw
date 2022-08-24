const ACTIONS = ["+", "-", "*", "/", "%", "**"];

main();

function main() {
  const mathAction = getMathAction();
  const num1 = getNumber("1");
  const num2 = getNumber("2");

  if (!isValidMathAction(mathAction)) {
    return alert("Error: you entered a wrong mathematical symbol, try again!");
  }

  if (!isNumValid(num1) || !isNumValid(num2)) {
    return alert(
      "Error: you entered the wrong value for the numbers. Try again!"
    );
  }

  const result = calc(mathAction, num1, num2);

  resultMsg(num1, mathAction, num2, result);
}

function getMathAction() {
  return prompt(
    "Welcome to our calculator based on JavaScript! \nChoose Math Action to calculate your numbers:\n\n1) To add numbers - enter the symbol +\n2) Subtract numbers - enter -\n3) Multiply numbers - enter *\n4) Divide numbers - enter /\n5) The remainder of the division of 2 numbers - enter %\n6) Raise a number to a power - enter **"
  );
}

function getNumber(name) {
  if (name === "2") {
    return Number(
      prompt(
        `Enter your Number ${name}\n*If you choose power conversion, enter the power you want to convert the number to.`
      )
    );
  } else {
    return Number(prompt(`Enter your Number ${name}`));
  }
}

function isValidMathAction(act) {
  return ACTIONS.includes(act);
}
function isNumValid(num) {
  return !isNaN(num);
}

function calc(act, n1, n2) {
  switch (act) {
    case "+":
      return calcSum(n1, n2);
    case "-":
      return calcSub(n1, n2);
    case "*":
      return calcMult(n1, n2);
    case "/":
      return calcDiv(n1, n2);
    case "%":
      return calcRemainder(n1, n2);
    case "**":
      return calcPow(n1, n2);
  }
}

function resultMsg(n1, act, n2, res) {
  return alert(
    `The result of mathematical calculations:\n${n1} ${act} ${n2} = ${res}`
  );
}

function calcSum(a, b) {
  return a + b;
}
function calcSub(a, b) {
  return a - b;
}
function calcMult(a, b) {
  return a * b;
}
function calcDiv(a, b) {
  return a / b;
}
function calcRemainder(a, b) {
  return a % b;
}
function calcPow(a, b) {
  return a ** b;
}
