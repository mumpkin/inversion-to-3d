export interface Vector {
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

  static ZERO(): Vector2 {
    return new Vector2(0, 0)
  }
}

export class Vector3 extends Vector2 {
  z: number

  constructor(x: number, y: number, z: number) {
    super(x, y)
    this.z = z
  }

  static ZERO(): Vector3 {
    return new Vector3(0, 0, 0)
  }
}
