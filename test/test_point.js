const { assert } = require("chai");
const Point = require("../src/point");

describe("point", function() {
  it("should create a point for a given coordinates", function() {
    const point = new Point(2, 3);
    assert.deepStrictEqual(point, { x: 2, y: 3 });
  });

  describe("toString", function() {
    const point = new Point(2, 3);

    it("should generate a string representation of the point", function() {
      const actual = point.toString();
      const expected = "[Point @(2,3)]";
      assert.strictEqual(actual, expected);
    });
  });
});
