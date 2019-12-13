const arePointsEqual = function(point1, point2) {
  return point1.x === point2.x && point1.y === point1.y;
};

class Line {
  constructor(pointA, pointB) {
    this.start = { x: pointA.x, y: pointA.y };
    this.end = { x: pointB.x, y: pointB.y };
  }

  toString() {
    return `Line A(${this.start.x},${this.start.y}) B(${this.end.x},${this.end.y})`;
  }

  isEqualTo(otherObject) {
    return (
      otherObject instanceof Line &&
      arePointsEqual(this.start, otherObject.start) &&
      arePointsEqual(this.end, otherObject.end)
    );
  }

  get length() {
    const differenceInX = this.start.x - this.end.x;
    const differenceInY = this.start.y - this.end.y;
    return Math.sqrt(differenceInX ** 2 + differenceInY ** 2);
  }

  getSlope(line) {
    const differenceInX = line.start.x - line.end.x;
    const differenceInY = line.start.y - line.end.y;
    return differenceInY / differenceInX;
  }

  get slope() {
    return this.getSlope(this);
  }

  isParallelTo(otherObject) {
    if (this.isEqualTo(otherObject)) return false;

    return (
      otherObject instanceof Line && this.slope === this.getSlope(otherObject)
    );
  }
}

module.exports = Line;
