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
});
