const Point = require("./point");

class Circle {
  constructor(point, radius) {
    this.center = new Point(point.x, point.y);
    this.radius = radius;
  }
}

module.exports = Circle;
