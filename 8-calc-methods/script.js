const calculator = createCalculator(100);

calculator.add(10); // 110 - это текущее значение base
calculator.add(10); // 120
calculator.sub(20); // 100
calculator.sub("jforjf43");

calculator.set(20); // 20
calculator.set("fjeifjiefj");
calculator.add(10); // 30
calculator.add(10); // 40
calculator.add("qwe"); // NaN и значение 40 не менять
calculator.add(100); // 140
console.log(calculator.get()); // 140

function createCalculator(base) {
  return {
    add: (numToAdd) => {
      base = isNaN(numToAdd) ? base : base + numToAdd;
    },
    sub: (numToSub) => {
      base = isNaN(numToSub) ? base : base - numToSub;
    },
    set: (numToSet) => {
      base = isNaN(numToSet) ? base : numToSet;
    },
    get: () => base,
  };
}
