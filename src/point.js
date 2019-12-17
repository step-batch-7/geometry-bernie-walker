class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `[Point @(${this.x},${this.y})]`;
  }

  clone() {
    return new Point(this.x, this.y);
  }

  visit(visitor) {
    return visitor(this.x, this.y);
  }

  findDistanceTo(otherPoint) {
    if (!(otherPoint instanceof Point)) return null;
    const diffInX = this.x - otherPoint.x;
    const diffInY = this.y - otherPoint.y;
    return Math.sqrt(diffInX ** 2 + diffInY ** 2);
  }

  isEqualTo(otherObject) {
    return (
      otherObject instanceof Point &&
      this.x === otherObject.x &&
      this.y === otherObject.y
    );
  }

  isOn(figure) {
    return figure.hasPoint(this);
  }
}

module.exports = Point;
