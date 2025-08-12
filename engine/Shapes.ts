import { Vector, Vector2 } from './Vector'

export class Triangle {
  a: Vector
  b: Vector
  c: Vector

  constructor(a: Vector, b: Vector, c: Vector) {
    this.a = a
    this.b = b
    this.c = c
  }

  getRange(): [Vector, Vector] {
    const minX = Math.min(this.a.x, this.b.x, this.c.x)
    const minY = Math.min(this.a.y, this.b.y, this.c.y)

    const maxX = Math.max(this.a.x, this.b.x, this.c.x)
    const maxY = Math.max(this.a.y, this.b.y, this.c.y)

    return [new Vector2(minX, minY), new Vector2(maxX, maxY)]
  }

  getArea(): number {
    const area = Math.abs(
      (
        this.a.x
        * (this.b.y - this.c.y)
        + this.b.x
        * (this.c.y - this.a.y)
        + this.c.x
        * (this.a.y - this.b.y)
      ) / 2
    )

    return area
  }

  isPointInside(point: Vector): boolean {
    const t1: Triangle = new Triangle(point, this.a, this.b)
    const t2: Triangle = new Triangle(point, this.b, this.c)
    const t3: Triangle = new Triangle(point, this.c, this.a)

    if (t1.getArea() + t2.getArea() + t3.getArea() === this.getArea()) {
      return true
    }

    return false
  }
}

export type Rectangle = [Triangle, Triangle]

export function create2DTriangle(
  x1: number, y1: number,
  x2: number, y2: number,
  x3: number, y3: number,
): Triangle {
  return new Triangle(new Vector2(x1, y1), new Vector2(x2, y2), new Vector2(x3, y3))
}

export function create2DRectangle(x: number, y: number, width: number, height: number): Rectangle {
  return [
    new Triangle(new Vector2(x, y), new Vector2(width, y), new Vector2(x, height)),
    new Triangle(new Vector2(width, y), new Vector2(width, height), new Vector2(x, height)),
  ]
}

export function create2DSquare(x: number, y: number, size: number): Rectangle {
  return create2DRectangle(x, y, x + size, y + size)
}
