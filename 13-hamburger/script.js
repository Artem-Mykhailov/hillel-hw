"use strict";

Hamburger.SMALL_SIZE = {
  price: 50,
  callories: 20,
};
Hamburger.MEDIUM_SIZE = {
  price: 75,
  callories: 30,
};
Hamburger.LARGE_SIZE = {
  price: 100,
  callories: 40,
};
Hamburger.CHEESE_TOPPING = {
  price: 10,
  callories: 20,
};
Hamburger.SALAD_TOPPING = {
  price: 20,
  callories: 5,
};
Hamburger.POTATO_TOPPING = {
  price: 15,
  callories: 10,
};
Hamburger.FLAVORING_TOPPING = {
  price: 15,
  callories: 0,
};
Hamburger.MAYO_TOPPING = {
  price: 20,
  callories: 5,
};

Hamburger.prototype.addTopping = function (topping) {
  this.price += topping.price;
  this.callories += topping.callories;
};
Hamburger.prototype.getPrice = function () {
  return this.price;
};
Hamburger.prototype.getCallories = function () {
  return this.callories;
};

const hamburger = new Hamburger(Hamburger.MEDIUM_SIZE);

hamburger.addTopping(Hamburger.POTATO_TOPPING);
hamburger.addTopping(Hamburger.FLAVORING_TOPPING);
hamburger.addTopping(Hamburger.FLAVORING_TOPPING);
hamburger.addTopping(Hamburger.CHEESE_TOPPING);
hamburger.addTopping(Hamburger.MAYO_TOPPING);

console.log(`Price with sauce: ${hamburger.getPrice()}`);
console.log(`Callories with sauce: ${hamburger.getCallories()}`);

function Hamburger(size) {
  this.price = size.price;
  this.callories = size.callories;
}
