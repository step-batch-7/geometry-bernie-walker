const arePointsEqual = function(point1, point2) {
  return point1.x === point2.x && point1.y === point1.y;
};

class Line {
  constructor(entry1, entry2) {
    this.start = { ...entry1 };
    this.end = { ...entry2 };
  }

  toString() {
    return `Line A(${this.start.x},${this.start.y}) B(${this.end.x},${this.end.y})`;
  }

  isEqualTo(anotherLine) {
    return (
      anotherLine instanceof Line &&
      arePointsEqual(this.start, anotherLine.start) &&
      arePointsEqual(this.end, anotherLine.end)
    );
  }
}

module.exports = Line;
