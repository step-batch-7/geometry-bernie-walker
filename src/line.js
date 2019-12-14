const arePointsEqual = function(point1, point2) {
  return point1.x === point2.x && point1.y === point1.y;
};

class Line {
  constructor(pointA, pointB) {
    this.endA = { x: pointA.x, y: pointA.y };
    this.endB = { x: pointB.x, y: pointB.y };
  }

  toString() {
    return `[Line (${this.endA.x},${this.endA.y}) to (${this.endB.x},${this.endB.y})]`;
  }

  get length() {
    const diffInX = this.endA.x - this.endB.x;
    const diffInY = this.endA.y - this.endB.y;
    return Math.sqrt(diffInX ** 2 + diffInY ** 2);
  }

  getSlope(line = this) {
    const diffInX = line.endA.x - line.endB.x;
    const diffInY = line.endA.y - line.endB.y;
    return diffInY / diffInX;
  }

  get slope() {
    return this.getSlope();
  }

  isEqualTo(otherObject) {
    return (
      otherObject instanceof Line &&
      arePointsEqual(this.endA, otherObject.endA) &&
      arePointsEqual(this.endB, otherObject.endB)
    );
  }

  isParallelTo(otherObject) {
    if (this.isEqualTo(otherObject)) return false;

    return (
      otherObject instanceof Line && this.slope === this.getSlope(otherObject)
    );
  }

  findX(y) {
    const yPart = (y - this.endA.y) / this.slope;
    return yPart + this.endA.x;
  }
}

module.exports = Line;
