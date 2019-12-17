const { assert } = require("chai");
const Circle = require("../src/circle");

describe("Circle", function() {
  let circle;

  beforeEach(function() {
    circle = new Circle({ x: 1, y: 2 }, 5);
  });

  it("should produce a circle object with center and radius", function() {
    const expected = { center: { x: 1, y: 2 }, radius: 5 };
    assert.deepStrictEqual(circle, expected);
  });

  describe("toString", function() {
    it("should produce the string implementation of the circle", function() {
      const expected = "[Circle @(1,2) radius 5]";
      assert.strictEqual(circle.toString(), expected);
    });
  });

  describe("isEqualTo", function() {
    it("should affirm the equality of two equal circles", function() {
      const equalCircle = new Circle({ x: 1, y: 2 }, 5);
      assert.isTrue(circle.isEqualTo(equalCircle));
    });

    it("should decline the equality of unequal circles with different radius", function() {
      const unequalCircle = new Circle({ x: 1, y: 2 }, 3);
      assert.isFalse(circle.isEqualTo(unequalCircle));
    });

    it("should decline the equality of two unequal circles with different centers", function() {
      const unequalCircle = new Circle({ x: 2, y: 2 }, 5);
      assert.isFalse(circle.isEqualTo(unequalCircle));
    });

    it("should decline the equality when given input is not a circle", function() {
      const nonCircle = { center: { x: 1, y: 2 }, radius: 5 };
      assert.isFalse(circle.isEqualTo(nonCircle));
    });
  });

  describe("area", function() {
    it("should find the area of the circle", function() {
      assert.approximately(circle.area, 78.539, 0.01);
    });
  });

  describe("perimeter", function() {
    it("should find the perimeter of the given circle", function() {
      assert.approximately(circle.perimeter, 31.418, 0.01);
    });
  });
});
