"use strict";

const calc = new Calculator(100);

calc.add(10);
calc.add(10);
calc.sub(20);
calc.sub("wekfmlfm");
calc.set(20);
calc.set("kfmkf");-
calc.add(10);
calc.add("qwe");
calc.get();

function Calculator(base) {
  this.base = base;

  this.add = function (numToAdd) {
    this.base = isNaN(numToAdd) ? this.base : this.base + numToAdd;
  };
  this.sub = function (numToSub) {
    this.base = isNaN(numToSub) ? this.base : this.base - numToSub;
  };
  this.set = function (numToSet) {
    this.base = isNaN(numToSet) ? this.base : numToSet;
  };
  this.get = function () {
    console.log(this.base);
  };
}
