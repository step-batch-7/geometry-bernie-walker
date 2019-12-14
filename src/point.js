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
}

module.exports = Point;
