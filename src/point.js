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

  isEqualTo(otherObject) {
    return (
      otherObject instanceof Point &&
      this.x === otherObject.x &&
      this.y === otherObject.y
    );
  }

  isOn(line) {
    return line.hasPoint(this);
  }
}

module.exports = Point;
