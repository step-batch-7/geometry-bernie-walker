const { assert } = require("chai");
const Line = require("../src/line");

describe("line", function() {
  const myLine = new Line([2, 3], [3, 4]);

  describe("toString", function() {
    it("should display the string representation of the line", function() {
      const actual = myLine.toString();
      const expected = `two points of the line are A = (2,3) and B = (3,4)`;
      assert.strictEqual(actual, expected);
    });
  });
});
