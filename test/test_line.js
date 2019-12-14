const { assert } = require("chai");
const Line = require("../src/line");

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
      const expected = "Line A(2,1) B(6,4)";
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

    it("should return the x value given y when the point falls inside the segment", function() {
      let actual = myLine.findX(5);
      assert.approximately(actual, 3.333, 0.01);
      actual = myLine.findX(2);
      assert.approximately(actual, 1.333, 0.01);
    });
  });
});
