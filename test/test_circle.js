const { assert } = require("chai");
const Circle = require("../src/circle");

describe("Circle", function() {
  it("should produce a circle object with center and radius", function() {
    const actual = new Circle({ x: 1, y: 2 }, 5);
    const expected = { center: { x: 1, y: 2 }, radius: 5 };
    assert.deepStrictEqual(actual, expected);
  });
});
