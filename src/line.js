class Line {
  constructor(point1, point2) {
    this.A = point1;
    this.B = point2;
  }

  toString() {
    return `two points of the line are A = (${this.A}) and B = (${this.B})`;
  }

  isEqualTo(anotherLine) {
    const isPointOneEqual =
      this.A[0] == anotherLine.A[0] && this.A[1] == anotherLine.A[1];
    const isPointTwoEqual =
      this.B[0] == anotherLine.B[0] && this.B[1] == anotherLine.B[1];

    return isPointOneEqual && isPointTwoEqual;
  }
}

module.exports = Line;
