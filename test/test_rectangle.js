const { assert } = require("chai");
const Rectangle = require("../src/rectangle");
const Point = require("../src/point");

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

  describe("isEqualTo", function() {
    it("should affirm the equality of equal rectangles", function() {
      const equalRectangle = new Rectangle({ x: 1, y: 1 }, { x: 5, y: 4 });
      assert.isTrue(rectangle.isEqualTo(equalRectangle));
    });
  });

  it("should deny the equality of unequal rectangles", function() {
    const nonEqualRectangle = new Rectangle({ x: 1, y: 2 }, { x: 3, y: 4 });
    assert.isFalse(rectangle.isEqualTo(nonEqualRectangle));
  });

  it("should deny the equality if the parameter is not a rectangle", function() {
    const nonRectangle = {
      vertexA: { x: 1, y: 1 },
      vertexB: { x: 5, y: 1 },
      vertexC: { x: 5, y: 4 },
      vertexD: { x: 1, y: 4 },
      l: 4,
      b: 3
    };
    assert.isFalse(rectangle.isEqualTo(nonRectangle));
  });

  describe("hasPoint", function() {
    it("should affirm if the point is present on the rectangle", function() {
      const point = new Point(1, 2);
      assert.isTrue(rectangle.hasPoint(point));
    });

    it("should decline if the point is not present on the rectangle", function() {
      const point = new Point();
      assert.isFalse(rectangle.hasPoint(point));
    });

    it("should decline if the parameter is not a point", function() {
      const point = { x: 1, y: 2 };
      assert.isFalse(rectangle.hasPoint(point));
    });
  });
});
