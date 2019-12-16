const { assert } = require("chai");
const Circle = require("../src/circle");

describe("Circle", function() {
  it("should produce a circle object with center and radius", function() {
    const actual = new Circle({ x: 1, y: 2 }, 5);
    const expected = { center: { x: 1, y: 2 }, radius: 5 };
    assert.deepStrictEqual(actual, expected);
  });

  describe("toString", function() {
    it("should produce the string implementation of the circle", function() {
      const circle = new Circle({ x: 1, y: 2 }, 5);
      const expected = "[Circle @(1,2) radius 5]";
      assert.strictEqual(circle.toString(), expected);
    });
  });
});
