const { assert } = require("chai");
const Rectangle = require("../src/rectangle");

describe("Rectangle", function() {
  let rectangle;
  beforeEach(() => {
    rectangle = new Rectangle({ x: 1, y: 1 }, { x: 5, y: 4 });
  });

  it("should produce an object with four vertices and length and breadth", function() {
    const expected = {
      vertexA: { x: 1, y: 1 },
      vertexB: { x: 5, y: 1 },
      vertexC: { x: 5, y: 4 },
      vertexD: { x: 1, y: 4 },
      l: 4,
      b: 3
    };
    assert.deepStrictEqual(rectangle, expected);
  });

  describe("toString", function() {
    it("should produce the string representation of the rectangle", function() {
      const expected = "[Rectangle (1,1) to (5,4)]";
      assert.strictEqual(rectangle.toString(), expected);
    });
  });

  describe("area", function() {
    it("should calculate the area of rectangle", function() {
      assert.strictEqual(rectangle.area, 12);
    });
  });

  describe("perimeter", function() {
    it("should calculate the perimeter", function() {
      assert.strictEqual(rectangle.perimeter, 14);
    });
  });
});
