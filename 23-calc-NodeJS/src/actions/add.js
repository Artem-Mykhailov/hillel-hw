const Add = function add(a, b) {
  this.a = a;
  this.b = b;
  return this.a + this.b;
};

module.exports = Add;
