const { assert } = require("chai");
const Line = require("../src/line");

describe("line", function() {
  const myLine = new Line({ x: 2, y: 1 }, { x: 6, y: 4 });

  it("should produce the desired line object", function() {
    const expected = { start: { x: 2, y: 1 }, end: { x: 6, y: 4 } };
    assert.deepStrictEqual(myLine, expected);
  });

  describe("toString", function() {
    it("should display the string representation of the line", function() {
      const actual = myLine.toString();
      const expected = "Line A(2,1) B(6,4)";
      assert.strictEqual(actual, expected);
    });
  });

  describe("isEqualTo", function() {
    const similarLine = new Line({ x: 2, y: 1 }, { x: 6, y: 4 });
    const nonSimilarLine = new Line({ x: 1, y: 1 }, { x: 1, y: 2 });

    it("should accept the equality of similar lines", function() {
      const actual = myLine.isEqualTo(similarLine);
      assert.isTrue(actual);
    });

    it("should refuse the equality of non similar lines", function() {
      const actual = myLine.isEqualTo(nonSimilarLine);
      assert.isFalse(actual);
    });
  });

  describe("length", function() {
    it("should calculate the length if coordinates are all positive integers", function() {
      const actual = myLine.length;
      assert.strictEqual(actual, 5);
    });

    it("should calculate the length when all the coordinates are negative integers", function() {
      const line = new Line({ x: -1, y: -2 }, { x: -3, y: -4 });
      const actual = line.length;
      assert.approximately(actual, 2.828, 0.01);
    });

    it("should calculate the lengt when the coordinates are combination of +/- integer values", function() {
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
});
