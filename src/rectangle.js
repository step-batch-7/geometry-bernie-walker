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
}

module.exports = Rectangle;