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
    const diffInX = this.start.x - this.end.x;
    const diffInY = this.start.y - this.end.y;
    return Math.sqrt(diffInX ** 2 + diffInY ** 2);
  }

  getSlope(line = this) {
    const diffInX = line.start.x - line.end.x;
    const diffInY = line.start.y - line.end.y;
    return diffInY / diffInX;
  }

  get slope() {
    return this.getSlope();
  }

  isParallelTo(otherObject) {
    if (this.isEqualTo(otherObject)) return false;

    return (
      otherObject instanceof Line && this.slope === this.getSlope(otherObject)
    );
  }
}

module.exports = Line;
