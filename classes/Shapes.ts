import { Vector, Vector2 } from "./Vector";

export type Triangle = [Vector, Vector, Vector]
export type Rectangle = [Triangle, Triangle]

export function create2DTriangle(
  x1: number, y1: number,
  x2: number, y2: number,
  x3: number, y3: number,
): Triangle {
  return [new Vector2(x1, y1), new Vector2(x2, y2), new Vector2(x3, y3)]
}

export function create2DRectangle(x: number, y: number, width: number, height: number): Rectangle {
  return [
    [new Vector2(x, y), new Vector2(width, y), new Vector2(x, height)],
    [new Vector2(width, y), new Vector2(width, height), new Vector2(x, height)],
  ]
}

export function create2DSquare(x: number, y: number, size: number): Rectangle {
  return create2DRectangle(x, y, x + size, y + size)
}
