const { assert } = require("chai");
const Circle = require("../src/circle");
const Point = require("../src/point");

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

  describe("hasPoint", function() {
    it("should affirm if the given point is on the circle", function() {
      const point = new Point(4, 6);
      assert.isTrue(circle.hasPoint(point));
    });

    it("should deny if the given point is on the circle", function() {
      const point = new Point(4, 5);
      assert.isFalse(circle.hasPoint(point));
    });

    it("should return false when the parameter is not a point", function() {
      const actual = circle.hasPoint({ x: 4, y: 6 });
      assert.isFalse(actual);
    });
  });

  describe("moveTo", function() {
    it("should create a circle with same dimensions at given point", function() {
      const actual = circle.moveTo({ x: 1, y: 1 });
      const expected = { center: { x: 1, y: 1 }, radius: 5 };
      assert.deepStrictEqual(actual, expected);
    });

    it("should be the instance of Circle", function() {
      const result = circle.moveTo({ x: 1, y: 1 });
      assert.isTrue(result instanceof Circle);
    });
  });

  describe("covers", function() {
    it("should affirm when the circle covers the point", function() {
      const point = new Point(2, 4);
      assert.isTrue(circle.covers(point));
    });

    it("should deny when the circle does not cover the point", function() {
      const point = new Point(5, 6);
      assert.isFalse(circle.covers(point));
    });

    it("should affirm if the point is center itself", function() {
      const point = new Point(1, 2);
      assert.isTrue(circle.covers(point));
    });

    it("should deny when the point is on the circumference", function() {
      const point = new Point(4, 6);
      assert.isFalse(circle.covers(point));
    });

    it("should deny when the parameter is not a point", function() {
      const point = { x: 2, y: 2 };
      assert.isFalse(circle.covers(point));
    });
  });
});
