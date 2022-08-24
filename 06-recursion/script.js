const numbers = [1, 20, -5, 40, 15, 150, 431, 46];
const numbersLength = numbers.length;

console.log(calcFactorial(8));
console.log(findMax(numbers, numbersLength));

// ЗАДАЧА 1 (Факториал)

function calcFactorial(number) {
  return number === 0 ? 1 : number * calcFactorial(number - 1);
}

//Задача 2 (Максимум из массива)

function findMax(arr, length) {
  let max;
  if (length === 1) {
    max = arr[0];
  } else {
    max =
      arr[length] > findMax(arr, length - 1)
        ? arr[length]
        : findMax(arr, length - 1);
  }

  return max;
}
