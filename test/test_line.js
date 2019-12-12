const { assert } = require("chai");
const Line = require("../src/line");

describe("line", function() {
  const myLine = new Line({ x: 2, y: 3 }, { x: 3, y: 4 });

  describe("toString", function() {
    it("should display the string representation of the line", function() {
      const actual = myLine.toString();
      const expected = "Line A(2,3) B(3,4)";
      assert.strictEqual(actual, expected);
    });
  });

  describe("isEqualTo", function() {
    const similarLine = new Line({ x: 2, y: 3 }, { x: 3, y: 4 });
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
});
