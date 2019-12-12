const arePointsEqual = function(point1, point2) {
  return point1.x === point2.x && point1.y === point1.y;
};

class Line {
  constructor(entry1, entry2) {
    this.endA = entry1;
    this.endB = entry2;
  }

  toString() {
    return `Line A(${this.endA.x},${this.endA.y}) B(${this.endB.x},${this.endB.y})`;
  }

  isEqualTo(anotherLine) {
    return (
      anotherLine instanceof Line &&
      arePointsEqual(this.endA, anotherLine.endA) &&
      arePointsEqual(this.endB, anotherLine.endB)
    );
  }
}

module.exports = Line;
