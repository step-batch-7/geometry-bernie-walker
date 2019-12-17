const Point = require("./point");

class Rectangle {
  constructor(pointA, pointC) {
    this.vertexA = new Point(pointA.x, pointA.y);
    this.vertexB = new Point(pointC.x, pointA.y);
    this.vertexC = new Point(pointC.x, pointC.y);
    this.vertexD = new Point(pointA.x, pointC.y);
    this.l = this.vertexA.findDistanceTo(this.vertexB);
    this.b = this.vertexB.findDistanceTo(this.vertexC);
  }

  get area() {
    return this.l * this.b;
  }

  get perimeter() {
    return 2 * (this.l + this.b);
  }

  toString() {
    return `[Rectangle (${this.vertexA.x},${this.vertexA.y}) to (${this.vertexC.x},${this.vertexC.y})]`;
  }

  isEqualTo(rectangle) {
    const vertices = ["vertexA", "vertexB", "vertexC", "vertexD"];

    if (!rectangle instanceof Rectangle) return false;

    for (let vertex of vertices) {
      if (!this[vertex].isEqualTo(rectangle[vertex])) return false;
    }

    return true;
  }
}

module.exports = Rectangle;
