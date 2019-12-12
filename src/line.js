class Line {
  constructor(point1, point2) {
    this.A = point1;
    this.B = point2;
  }

  toString() {
    return `two points of the line are A = (${this.A}) and B = (${this.B})`;
  }
}

module.exports = Line;
