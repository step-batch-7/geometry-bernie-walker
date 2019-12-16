const isCoordinateInsideSegment = function(coordinate, limit1, limit2) {
  const min = Math.min(limit1, limit2);
  const max = Math.max(limit1, limit2);

  return coordinate >= min && coordinate <= max;
};

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

  split() {
    const midPoint = {
      x: (this.endA.x + this.endB.x) / 2,
      y: (this.endA.y + this.endB.y) / 2
    };

    return [
      new this.constructor(this.endA, midPoint),
      new this.constructor(midPoint, this.endB)
    ];
  }

  get length() {
    const diffInX = this.endA.x - this.endB.x;
    const diffInY = this.endA.y - this.endB.y;
    return Math.sqrt(diffInX ** 2 + diffInY ** 2);
  }

  get slope() {
    const diffInX = this.endA.x - this.endB.x;
    const diffInY = this.endA.y - this.endB.y;
    return diffInY / diffInX;
  }

  get intercept() {
    let intercept = this.endA.y - this.endA.x * this.slope;
    if (intercept == Infinity) intercept = NaN;
    return intercept;
  }

  isEqualTo(otherObject) {
    return (
      otherObject instanceof Line &&
      arePointsEqual(this.endA, otherObject.endA) &&
      arePointsEqual(this.endB, otherObject.endB)
    );
  }

  isParallelTo(otherObject) {
    if (this.intercept == otherObject.intercept) return false;

    return otherObject instanceof Line && this.slope === otherObject.slope;
  }

  findX(y) {
    if (!isCoordinateInsideSegment(y, this.endA.y, this.endB.y)) return NaN;
    if (this.slope == Infinity || this.slope == -Infinity) return this.endA.x;
    if (this.slope == 0) return Math.max(this.endA.x, this.endB.x);
    return (y - this.intercept) / this.slope;
  }

  findY(x) {
    if (!isCoordinateInsideSegment(x, this.endA.x, this.endB.x)) return NaN;
    if (this.slope == Infinity || this.slope == -Infinity)
      return Math.max(this.endA.y, this.endB.y);
    return this.slope * x + this.intercept;
  }

  hasPoint(point) {
    return point.x == this.findX(point.y) || point.y == this.findY(point.x);
  }
}

module.exports = Line;
