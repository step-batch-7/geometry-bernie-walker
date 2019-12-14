const { assert } = require("chai");
const Point = require("../src/point");

describe("point", function() {
  it("should create a point for a given coordinates", function() {
    const point = new Point(2, 3);
    assert.deepStrictEqual(point, { x: 2, y: 3 });
  });
});
