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
}

module.exports = Line;
