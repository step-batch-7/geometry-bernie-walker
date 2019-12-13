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
    it("should calculate the length of the line for all positive coordinates", function() {
      const actual = myLine.length;
      assert.strictEqual(actual, 5);
    });
  });
});
