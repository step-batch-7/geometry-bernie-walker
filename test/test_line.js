const { assert } = require("chai");
const Line = require("../src/line");
const Point = require("../src/point");

describe("Line", function() {
  let line;
  beforeEach(() => {
    line = new Line({ x: 2, y: 1 }, { x: 6, y: 4 });
  });

  it("should produce the desired line object", function() {
    const expected = { endA: { x: 2, y: 1 }, endB: { x: 6, y: 4 } };
    assert.deepStrictEqual(line, expected);
  });

  describe("toString", function() {
    it("should display the string representation of the line", function() {
      const actual = line.toString();
      const expected = "[Line (2,1) to (6,4)]";
      assert.strictEqual(actual, expected);
    });
  });

  describe("isEqualTo", function() {
    it("should accept the equality of similar lines", function() {
      const similarLine = new Line({ x: 2, y: 1 }, { x: 6, y: 4 });
      const actual = line.isEqualTo(similarLine);
      assert.isTrue(actual);
    });

    it("should refuse the equality of non similar lines", function() {
      const nonSimilarLine = new Line({ x: 1, y: 1 }, { x: 1, y: 2 });
      const actual = line.isEqualTo(nonSimilarLine);
      assert.isFalse(actual);
    });

    it("should refuse the equality if given object is not a line", function() {
      const nonLine = { start: { x: 2, y: 1 }, end: { x: 4, y: 2.5 } };
      const actual = line.isEqualTo(nonLine);
      assert.isFalse(actual);
    });
  });

  describe("length", function() {
    it("should calculate the length if coordinates are all positive integers", function() {
      const actual = line.length;
      assert.strictEqual(actual, 5);
    });

    it("should calculate the length when all the coordinates are negative integers", function() {
      line = new Line({ x: -1, y: -2 }, { x: -3, y: -4 });
      const actual = line.length;
      assert.approximately(actual, 2.828, 0.01);
    });

    it("should calculate the length when the coordinates are combination of +/- integer values", function() {
      line = new Line({ x: 2, y: -1 }, { x: -3, y: 4 });
      const actual = line.length;
      assert.approximately(actual, 7.071, 0.01);
    });

    it("the length calculated must be same when the order of coordinates is different", function() {
      line = new Line({ x: -3, y: 4 }, { x: 2, y: -1 });
      const actual = line.length;
      assert.approximately(actual, 7.071, 0.01);
    });
  });

  describe("slope", function() {
    it("should calculate the slope when all the coordinates are positive", function() {
      const actual = line.slope;
      assert.strictEqual(actual, 0.75);
    });

    it("the slope should be same for the same coordinates in different order", function() {
      line = new Line({ x: 6, y: 4 }, { x: 2, y: 1 });
      const actual = line.slope;
      assert.strictEqual(actual, 0.75);
    });

    it("the slope should be zero when the coordinates are equal", function() {
      line = new Line({ x: 6, y: 4 }, { x: 2, y: 4 });
      const actual = line.slope;
      assert.strictEqual(actual, 0);
    });

    it("the slope should be infinity when the abscissas are equal", function() {
      line = new Line({ x: 2, y: 4 }, { x: 2, y: 1 });
      const actual = line.slope;
      assert.strictEqual(actual, Infinity);
    });
  });

  describe("isParallelTo", function() {
    it("should affirm if two lines are parallel", function() {
      const parallelLine = new Line({ x: 1, y: 2 }, { x: 5, y: 5 });
      assert.isTrue(line.isParallelTo(parallelLine));
    });

    it("should decline if two lines are not parallel", function() {
      const nonParallelLines = new Line({ x: 2, y: 2 }, { x: 4, y: 2 });
      assert.isFalse(line.isParallelTo(nonParallelLines));
    });

    it("should decline is the type of one is not Line", function() {
      const nonLine = { start: { x: 2, y: 1 }, end: { x: 4, y: 2.5 } };
      assert.isFalse(line.isParallelTo(nonLine));
    });

    it("should decline if two lines have same intercept", function() {
      const sameInterceptLine = new Line({ x: 2, y: 1 }, { x: 4, y: 2.5 });
      assert.isFalse(line.isParallelTo(sameInterceptLine));
    });

    it("should decline if the line sent is same line", function() {
      assert.isFalse(line.isParallelTo(line));
    });
  });

  describe("findX", function() {
    it("should find the x value given y when the y falls inside the segment", function() {
      const line = new Line({ x: 2, y: 3 }, { x: 6, y: 9 });
      let actual = line.findX(5);
      assert.approximately(actual, 3.333, 0.01);
      actual = line.findX(3.5);
      assert.approximately(actual, 2.333, 0.01);
    });

    it("should return NaN when the y doesn't fall inside the segment", function() {
      const line = new Line({ x: 2, y: 3 }, { x: 6, y: 9 });
      assert.isNaN(line.findX(10));
      assert.isNaN(line.findX(2.9));
    });

    it("should find the value x value for a vertical line", function() {
      const verticalLine = new Line({ x: 2, y: 3 }, { x: 2, y: 5 });
      assert.strictEqual(verticalLine.findX(4), 2);
    });

    it("should find the value of x as the max value of x for a horizontal line", function() {
      let horizontalLine = new Line({ x: 2, y: 3 }, { x: 6, y: 3 });
      assert.strictEqual(horizontalLine.findX(3), 6);
      horizontalLine = new Line({ x: 7, y: 2 }, { x: 4, y: 2 });
      assert.strictEqual(horizontalLine.findX(2), 7);
    });
  });

  describe("findY", function() {
    it("should find the value of y when x falls inside the segment", function() {
      const line = new Line({ x: 2, y: 3 }, { x: 6, y: 9 });
      let actual = line.findY(3);
      assert.approximately(actual, 4.5, 0.01);
      actual = line.findY(4.7);
      assert.approximately(actual, 7.05, 0.01);
    });

    it("should give NaN when the x doesn't fall inside the segment", function() {
      const line = new Line({ x: 2, y: 3 }, { x: 6, y: 9 });
      assert.isNaN(line.findY(6.5));
      assert.isNaN(line.findY(1.9));
    });

    it("should find the value of y as the max value of  y for vertical line", function() {
      let verticalLine = new Line({ x: 1, y: 3 }, { x: 1, y: 6 });
      assert.strictEqual(verticalLine.findY(1), 6);
      verticalLine = new Line({ x: -2, y: 8 }, { x: -2, y: 4 });
      assert.strictEqual(verticalLine.findY(-2), 8);
    });

    it("should find the value of y for a horizontal line", function() {
      let horizontalLine = new Line({ x: 2, y: 3 }, { x: 6, y: 3 });
      assert.strictEqual(horizontalLine.findY(4), 3);
      horizontalLine = new Line({ x: -1, y: -3 }, { x: 3.5, y: -3 });
      assert.strictEqual(horizontalLine.findY(0), -3);
    });
  });

  describe("split", function() {
    it("should split the line in equal halves for positive integers", function() {
      const line = new Line({ x: 2, y: 3 }, { x: 6, y: 9 });
      const expected = [
        { endA: { x: 2, y: 3 }, endB: { x: 4, y: 6 } },
        { endA: { x: 4, y: 6 }, endB: { x: 6, y: 9 } }
      ];
      assert.deepStrictEqual(line.split(), expected);
    });

    it("should split the line in equal halves for negative integers", function() {
      const line = new Line({ x: 2, y: -3 }, { x: -6, y: 9 });
      const expected = [
        { endA: { x: 2, y: -3 }, endB: { x: -2, y: 3 } },
        { endA: { x: -2, y: 3 }, endB: { x: -6, y: 9 } }
      ];
      assert.deepStrictEqual(line.split(), expected);
    });
  });

  describe("intercept", function() {
    it("should give the intercept of the non vertical line", function() {
      let line = new Line({ x: 2, y: 3 }, { x: 5, y: 8 });
      assert.approximately(line.intercept, -0.333, 0.01);
      line = new Line({ x: 3, y: -1 }, { x: -4, y: 6.5 });
      assert.approximately(line.intercept, 2.214, 0.01);
    });

    it("the intercept of the vertical line should be undefined", function() {
      const line = new Line({ x: 2, y: 3 }, { x: 2, y: 9 });
      assert.isNaN(line.intercept);
    });
  });

  describe("hasPoint", function() {
    let line;
    beforeEach(() => {
      line = new Line({ x: 2, y: 3 }, { x: 6, y: 9 });
    });

    it("should affirm if the given point is present on the segment", function() {
      const point = new Point(4, 6);
      assert.isTrue(line.hasPoint(point));
    });

    it("should decline if the given point is not present on the segment", function() {
      const point = new Point(3, 4);
      assert.isFalse(line.hasPoint(point));
    });

    it("should return false the point is outside the segment", function() {
      let point = new Point(1, 1.5);
      assert.isFalse(line.hasPoint(point));
      point = new Point(8, 12);
      assert.isFalse(line.hasPoint(point));
    });

    it("should return false when sent point is not an instance of Point", function() {
      const actual = line.hasPoint({ x: 4, y: 6 });
      assert.isFalse(actual);
    });
  });

  describe("findPointFromStart", function() {
    it("should find a point from start at a given distance", function() {
      const result = line.findPointFromStart(2);
      const actual = result.isEqualTo(new Point(3.6, 2.2));
      assert.isTrue(actual);
    });

    it("should return undefined if the distance is less than the length", function() {
      const result = line.findPointFromStart(6);
      assert.isUndefined(result);
    });

    it("should return undefined if the distance is less than 0", function() {
      const result = line.findPointFromStart(-1);
      assert.isUndefined(result);
    });
  });

  describe("findPointFromEnd", function() {
    it("should find a point from end at a given distance", function() {
      const result = line.findPointFromEnd(3);
      const actual = result.isEqualTo(new Point(3.6, 2.2));
      assert.isTrue(actual);
    });

    it("should return undefined if the distance is less than the length", function() {
      const result = line.findPointFromEnd(6);
      assert.isUndefined(result);
    });

    it("should return undefined if the distance is less than 0", function() {
      const result = line.findPointFromEnd(-1);
      assert.isUndefined(result);
    });
  });
});
