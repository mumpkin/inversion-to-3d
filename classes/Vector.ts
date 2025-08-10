export interface Vector {
  getDimension(): number
  translate(vector: Vector): void
  invert(center: Vector, radius: number): void
  normalized(): Vector
  length(): number
  distanceTo(vector: Vector): number
  directionTo(vector: Vector): Vector
  x: number
  y: number
}

export class Vector2 implements Vector {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  getDimension(): number {
    return 2
  }

  length(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
  }

  normalized(): Vector2 {
    const norm = this.length()

    if (norm === 0) {
      throw new Error("The vector cannot be normalized because its norm is zero")
    }

    const normalizedVector = new Vector2(this.x / norm, this.y / norm)
    return normalizedVector
  }

  distanceTo(target: Vector2): number {
    const dx = target.x - this.x
    const dy = target.y - this.y
    const vector = new Vector2(dx, dy)

    return vector.length()
  }

  directionTo(target: Vector2): Vector2 {
    const vector = new Vector2(target.x - this.x, target.y - this.y)
    const length = vector.length()

    if (length === 0) {
      return new Vector2(0, 0)
    }

    vector.x /= length
    vector.y /= length

    return vector
  }

  translate(vector: Vector2): void {
    this.x += vector.x
    this.y += vector.y
  }

  invert(center: Vector2, radius: number): void {
    const distance = this.distanceTo(center)

    if (distance !== 0) {
      const scale = (radius * radius) / (distance * distance);

      this.x = center.x + scale * (this.x - center.x)
      this.y = center.y + scale * (this.y - center.y)
    }
  }

  static ZERO(): Vector2 {
    return new Vector2(0, 0)
  }
}