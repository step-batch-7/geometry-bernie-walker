const { assert } = require("chai");
const Point = require("../src/point");
const Line = require("../src/line");
const Circle = require("../src/circle");

describe("point", function() {
  let point;
  beforeEach(() => {
    point = new Point(2, 3);
  });

  it("should create a point for a given coordinates", function() {
    assert.deepStrictEqual(point, { x: 2, y: 3 });
  });

  describe("toString", function() {
    it("should generate a string representation of the point", function() {
      const actual = point.toString();
      const expected = "[Point @(2,3)]";
      assert.strictEqual(actual, expected);
    });
  });

  describe("visit", function() {
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

  describe("isEqualTo", function() {
    it("should affirm if the two points are equal", function() {
      const equalPoint = new Point(2, 3);
      assert.isTrue(point.isEqualTo(equalPoint));
    });

    it("should decline the equality of two unequal points", function() {
      const unequalPoints = new Point(1, 2);
      assert.isFalse(point.isEqualTo(unequalPoints));
    });

    it("should decline the equality of a non point, despite the same object", function() {
      const nonPoint = { x: 2, y: 3 };
      assert.isFalse(point.isEqualTo(nonPoint));
    });
  });

  describe("clone", function() {
    it("should return the copy of the point", function() {
      const actual = point.clone();
      assert.deepStrictEqual(actual, point);
    });

    it("the returned object must be the copy and not the reference", function() {
      assert.isFalse(point === point.clone());
    });
  });

  describe("isOn", function() {
    let line;
    let circle;
    beforeEach(() => {
      line = new Line({ x: 2, y: 3 }, { x: 6, y: 9 });
      circle = new Circle({ x: 1, y: 2 }, 5);
    });

    it("should affirm if the point is on the given line", function() {
      const point = new Point(4, 6);
      assert.isTrue(point.isOn(line));
    });

    it("should deny if the point is not on the given line", function() {
      const point = new Point(3, 4);
      assert.isFalse(point.isOn(line));
    });

    it("should affirm if the point is on the given Circle", function() {
      const point = new Point(4, 6);
      assert.isTrue(point.isOn(circle));
    });

    it("should deny if the point is on not on the given circle", function() {
      const point = new Point(4, 5);
      assert.isFalse(point.isOn(circle));
    });
  });

  describe("findDistanceTo", function() {
    it("should find the distance to a given point for positive coordinates", function() {
      const point2 = new Point(5, 7);
      const actual = point.findDistanceTo(point2);
      assert.approximately(actual, 5, 0.01);
    });

    it("should find the distance to a given point for negative coordinates", function() {
      const point1 = new Point(2, -3);
      const point2 = new Point(-5, 2);
      const actual = point1.findDistanceTo(point2);
      assert.approximately(actual, 8.602, 0.01);
    });
  });
});
