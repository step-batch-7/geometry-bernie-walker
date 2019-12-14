class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `[Point @(${this.x},${this.y})]`;
  }

  visit(functionReference) {
    return functionReference(this.x, this.y);
  }

  isEqualTo(otherObject) {
    return (
      otherObject instanceof Point &&
      this.x === otherObject.x &&
      this.y === otherObject.y
    );
  }

  clone() {
    return Object.assign({}, this);
  }
}

module.exports = Point;
