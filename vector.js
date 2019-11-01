class Vector {
  constructor(x, y, z) {
    this.x = x
    this.y = y
    this.z = z
  }
  add(other) {
    return new Vector(
      this.x + other.x,
      this.y + other.y,
      this.z + other.z
    )
  }
  negate() {
    return this.scale(-1)
  }
  minus(other) {
    return this.add(other.negate())
  }
  scale(a) {
    return new Vector(
      a * this.x,
      a * this.y,
      a * this.z
    )
  }
  rotateX(theta) {
    return new Vector(
      this.x,
      Math.cos(theta) * this.y + -Math.sin(theta) * this.z,
      Math.sin(theta) * this.y + Math.cos(theta) * this.z,
    )
  }
  rotateY(theta) {
    return new Vector(
      Math.cos(theta) * this.x + -Math.sin(theta) * this.z,
      this.y,
      Math.sin(theta) * this.x + Math.cos(theta) * this.z,
    )
  }
  rotateZ(theta) {
    return new Vector(
      Math.cos(theta) * this.x + -Math.sin(theta) * this.y,
      Math.sin(theta) * this.x + Math.cos(theta) * this.y,
      this.z
    )
  }
  cross(other) {
    return new Vector(
      this.y * other.z - this.z * other.y,
      this.z * other.x - this.x * other.z,
      this.x * other.y - this.y * other.x
    )
  }
  length() {
    return Math.sqrt(
      this.x * this.x
    + this.y * this.y
    + this.z * this.z
    )
  }
  normalize() {
    return this.scale(1 / this.length())
  }
  dot(other) {
    return this.x * other.x
         + this.y * other.y
         + this.z * other.z
  }
}
