class Point {
  constructor(...places) {
    if (!places.every(v => typeof(v) === "number"))
      throw new TypeError("Every coordinate provided must be a number");

    this.dimension = places.length;
    this.places = places;
  }
}

class CartesianPoint extends Point {
  constructor(...places) {
    super(...places);
  }

  distance(other) {
    if (!(other instanceof CartesianPoint))
      throw new TypeError("`other` must be a CartesianPoint");
    if (other.dimension !== this.dimension)
      throw new RangeError("Dimensions of compared points must be equal");

    for (let sum = 0, pos = 0; pos < this.dimension; ++pos)
      sum += (other.places[pos] - this.places[pos]) ** 2

    return sum ** (1.0 / this.dimension);
  }
}

class 2DCartesianPoint extends CartesianPoint {
  constructor(x, y) {
    super(x, y);
  }
}