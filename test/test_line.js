const { assert } = require("chai");
const Line = require("../src/line");
const Point = require("../src/point");

describe("line", function() {
  it("should produce the desired line object", function() {
    const myLine = new Line({ x: 2, y: 1 }, { x: 6, y: 4 });
    const expected = { endA: { x: 2, y: 1 }, endB: { x: 6, y: 4 } };
    assert.deepStrictEqual(myLine, expected);
  });

  describe("toString", function() {
    const myLine = new Line({ x: 2, y: 1 }, { x: 6, y: 4 });
    it("should display the string representation of the line", function() {
      const actual = myLine.toString();
      const expected = "[Line (2,1) to (6,4)]";
      assert.strictEqual(actual, expected);
    });
  });

  describe("isEqualTo", function() {
    const myLine = new Line({ x: 2, y: 1 }, { x: 6, y: 4 });
    const similarLine = new Line({ x: 2, y: 1 }, { x: 6, y: 4 });
    const nonSimilarLine = new Line({ x: 1, y: 1 }, { x: 1, y: 2 });
    const nonLine = { start: { x: 2, y: 1 }, end: { x: 4, y: 2.5 } };

    it("should accept the equality of similar lines", function() {
      const actual = myLine.isEqualTo(similarLine);
      assert.isTrue(actual);
    });

    it("should refuse the equality of non similar lines", function() {
      const actual = myLine.isEqualTo(nonSimilarLine);
      assert.isFalse(actual);
    });

    it("should refuse the equality if given object is not a line", function() {
      const actual = myLine.isEqualTo(nonLine);
      assert.isFalse(actual);
    });
  });

  describe("length", function() {
    it("should calculate the length if coordinates are all positive integers", function() {
      const myLine = new Line({ x: 2, y: 1 }, { x: 6, y: 4 });
      const actual = myLine.length;
      assert.strictEqual(actual, 5);
    });

    it("should calculate the length when all the coordinates are negative integers", function() {
      const line = new Line({ x: -1, y: -2 }, { x: -3, y: -4 });
      const actual = line.length;
      assert.approximately(actual, 2.828, 0.01);
    });

    it("should calculate the length when the coordinates are combination of +/- integer values", function() {
      let line = new Line({ x: 2, y: -1 }, { x: -3, y: 4 });
      let actual = line.length;
      assert.approximately(actual, 7.071, 0.01);
    });

    it("the length calculated must be same when the order of coordinates is different", function() {
      line = new Line({ x: -3, y: 4 }, { x: 2, y: -1 });
      actual = line.length;
      assert.approximately(actual, 7.071, 0.01);
    });
  });

  describe("slope", function() {
    it("should calculate the slope when all the coordinates are positive", function() {
      const line = new Line({ x: 2, y: 1 }, { x: 6, y: 4 });
      const actual = line.slope;
      assert.strictEqual(actual, 0.75);
    });

    it("the slope should be same for the same oordinates in different order", function() {
      const line = new Line({ x: 6, y: 4 }, { x: 2, y: 1 });
      const actual = line.slope;
      assert.strictEqual(actual, 0.75);
    });

    it("the slope should be zero when the oordinates are equal", function() {
      const line = new Line({ x: 6, y: 4 }, { x: 2, y: 4 });
      const actual = line.slope;
      assert.strictEqual(actual, 0);
    });

    it("the slope should be infinity when the absisscas are equal", function() {
      const line = new Line({ x: 2, y: 4 }, { x: 2, y: 1 });
      const actual = line.slope;
      assert.strictEqual(actual, Infinity);
    });
  });

  describe("isParallelTo", function() {
    const myLine = new Line({ x: 2, y: 1 }, { x: 6, y: 4 });

    it("should affirm if two lines are parallel", function() {
      const parallelLine = new Line({ x: 2, y: 1 }, { x: 4, y: 2.5 });
      assert.isTrue(myLine.isParallelTo(parallelLine));
    });

    it("should decline if two lines are not parallel", function() {
      const nonParallelLines = new Line({ x: 2, y: 2 }, { x: 4, y: 2 });
      assert.isFalse(myLine.isParallelTo(nonParallelLines));
    });

    it("should decline is the type of one is not Line", function() {
      const nonLine = { start: { x: 2, y: 1 }, end: { x: 4, y: 2.5 } };
      assert.isFalse(myLine.isParallelTo(nonLine));
    });

    it("should decline if the line sent is same line", function() {
      assert.isFalse(myLine.isParallelTo(myLine));
    });
  });

  describe("findX", function() {
    const myLine = new Line({ x: 2, y: 3 }, { x: 6, y: 9 });

    it("should find the x value given y when the y falls inside the segment", function() {
      let actual = myLine.findX(5);
      assert.approximately(actual, 3.333, 0.01);
      actual = myLine.findX(3.5);
      assert.approximately(actual, 2.333, 0.01);
    });

    it("should return NaN when the y doesn't fall inside the segment", function() {
      assert.isNaN(myLine.findX(10));
      assert.isNaN(myLine.findX(2.9));
    });

    it("should find the value x value for a vertical line", function() {
      const line = new Line({ x: 2, y: 3 }, { x: 2, y: 5 });
      assert.strictEqual(line.findX(4), 2);
    });

    it("should find the value of x as the max value of x for a horizontal line", function() {
      let line = new Line({ x: 2, y: 3 }, { x: 6, y: 3 });
      assert.strictEqual(line.findX(3), 6);
      line = new Line({ x: 7, y: 2 }, { x: 4, y: 2 });
      assert.strictEqual(line.findX(2), 7);
    });
  });

  describe("findY", function() {
    const myLine = new Line({ x: 2, y: 3 }, { x: 6, y: 9 });

    it("should find the value of y when x falls inside the segment", function() {
      let actual = myLine.findY(3);
      assert.approximately(actual, 4.5, 0.01);
      actual = myLine.findY(4.7);
      assert.approximately(actual, 7.05, 0.01);
    });

    it("shuold give NaN when the x doesn't fall inside the segment", function() {
      assert.isNaN(myLine.findY(6.5));
      assert.isNaN(myLine.findY(1.9));
    });

    it("shuould find the value of y as the max value of  y for vertical line", function() {
      let line = new Line({ x: 1, y: 3 }, { x: 1, y: 6 });
      assert.strictEqual(line.findY(1), 6);
      line = new Line({ x: -2, y: 8 }, { x: -2, y: 4 });
      assert.strictEqual(line.findY(-2), 8);
    });

    it("should find the value of y for a horizontal line", function() {
      let line = new Line({ x: 2, y: 3 }, { x: 6, y: 3 });
      assert.strictEqual(line.findY(4), 3);
      line = new Line({ x: -1, y: -3 }, { x: 3.5, y: -3 });
      assert.strictEqual(line.findY(0), -3);
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
      assert.isUndefined(line.intercept);
    });
  });

  describe("hasPoint", function() {
    const myLine = new Line({ x: 2, y: 3 }, { x: 6, y: 9 });

    it("should affirm if the given point is present on the segment", function() {
      const point = new Point(4, 6);
      assert.isTrue(myLine.hasPoint(point));
    });

    it("shuold decline if the given point is not present on the segment", function() {
      const point = new Point(3, 4);
      assert.isFalse(myLine.hasPoint(point));
    });
  });
});
