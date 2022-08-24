const ACTIONS = ["+", "-", "*", "/"];
const mathAction = getMathAction();
const QUANTITY = getQuantity();
const NUMBERS = getOperands(QUANTITY);
const result = calc(mathAction, NUMBERS);

resultMsg(mathAction, NUMBERS, result);

function getMathAction() {
  let act;
  do {
    act = prompt(
      "Welcome to our calculator based on JavaScript! \nChoose Math Action to calculate your numbers:\n\n1) To add numbers - enter the symbol +\n2) Subtract numbers - enter -\n3) Multiply numbers - enter *\n4) Divide numbers - enter /"
    );
  } while (!isValidMathAction(act));
  return act;
}

function getQuantity() {
  let quantity;
  do {
    quantity = prompt(
      "Enter the quantity of Numbers you want to calculate (Should be more than 1 and less than 5!)"
    );
  } while (isValidQuantity(quantity));
  return quantity;
}

function getOperands(operands) {
  let numbers = [];
  for (let i = 1; i <= operands; i++) {
    numbers.push(getNumber(i));
  }
  return numbers;
}

function calc(act, nums) {
  let res = nums[0];

  for (i = 1; i < nums.length; i++) {
    switch (act) {
      case "+":
        res += nums[i];
        break;
      case "-":
        res -= nums[i];
        break;
      case "*":
        res *= nums[i];
        break;
      case "/":
        res /= nums[i];
        break;
    }
  }
  return res;
}

function resultMsg(act, nums, res) {
  return alert(
    `The result of mathematical calculations:\n${nums.join(
      ` ${act} `
    )} = ${res}`
  );
}

function isValidMathAction(act) {
  return ACTIONS.includes(act);
}

function isValidQuantity(quantity) {
  if (quantity > 1 && quantity < 5) {
    return false;
  } else return true;
}

function getNumber(name) {
  let number;
  do {
    number = Number(prompt(`Enter your Number ${name}`));
  } while (!isNumValid(number));
  return number;
}

function isNumValid(num) {
  return !isNaN(num);
}
