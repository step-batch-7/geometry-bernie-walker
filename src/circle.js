const Point = require("./point");

class Circle {
  constructor(point, radius) {
    this.center = new Point(point.x, point.y);
    this.radius = radius;
  }

  toString() {
    return `[Circle @(${this.center.x},${this.center.y}) radius ${this.radius}]`;
  }

  get area() {
    return Math.PI * this.radius ** 2;
  }

  get perimeter() {
    return 2 * Math.PI * this.radius;
  }

  isEqualTo(otherCircle) {
    return (
      otherCircle instanceof Circle &&
      this.center.isEqualTo(otherCircle.center) &&
      this.radius == otherCircle.radius
    );
  }
}

module.exports = Circle;
