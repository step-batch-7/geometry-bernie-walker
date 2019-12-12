const { assert } = require("chai");
const Line = require("../src/line");

describe("line", function() {
  const myLine = new Line([2, 3], [3, 4]);
  const similarLine = new Line([2, 3], [3, 4]);
  const nonSimilarLine = new Line([1, 1], [1, 2]);

  describe("toString", function() {
    it("should display the string representation of the line", function() {
      const actual = myLine.toString();
      const expected = `two points of the line are A = (2,3) and B = (3,4)`;
      assert.strictEqual(actual, expected);
    });
  });

  describe("isEqualTo", function() {
    const similarLine = new Line([2, 3], [3, 4]);
    const nonSimilarLine = new Line([1, 1], [1, 2]);

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
