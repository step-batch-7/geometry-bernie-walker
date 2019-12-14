const { assert } = require("chai");
const Point = require("../src/point");

describe("point", function() {
  it("should create a point for a given coordinates", function() {
    const point = new Point(2, 3);
    assert.deepStrictEqual(point, { x: 2, y: 3 });
  });

  describe("toString", function() {
    const point = new Point(2, 3);

    it("should generate a string representation of the point", function() {
      const actual = point.toString();
      const expected = "[Point @(2,3)]";
      assert.strictEqual(actual, expected);
    });
  });

  describe("visit", function() {
    const point = new Point(2, 3);
    const mul = (a, b) => a * b;
    const add = (a, b) => a + b;

    it("should visit the mul function and return the product", function() {
      const actual = point.visit(mul);
      assert.strictEqual(actual, 6);
    });

    it("should visit the add function and return the sum", function() {
      const actual = point.visit(add);
      assert.strictEqual(actual, 5);
    });
  });
});
