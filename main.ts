interface Vector {
  getDimension(): number
  x: number
  y: number
}

class Vector2 implements Vector {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  getDimension() {
    return 2
  }
  
  static ZERO(): Vector2 {
    return new Vector2(0, 0)
  }
}

class Point {
  position: Vector

  constructor(position: Vector) {
    this.position = position
  }

  draw(
    ctx: CanvasRenderingContext2D,
    options: {
      scale?: number,
      color?: string,
      radius?: number,
    } = {},
  ): void {
    const defaultOptions = { scale: 1, color: 'black', radius: 2 }
    const { scale, color, radius } =  { ...defaultOptions, ...options }

    const startAngle = 0
    const endAngle = Math.PI * 2
    
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.arc(
      scale ? this.position.x * scale : this.position.x,
      scale ? this.position.y * scale : this.position.y,
      radius,
      startAngle,
      endAngle,
    )
    ctx.fill()
  }
}

function initPoints(maxX: number, maxY: number): Point[] {
  const points: Point[] = []
  for (let x = 0; x <= maxX; x++) {
    for (let y = 0; y <= maxY; y++) {
      const vector = new Vector2(y, x)
      points.push(new Point(vector))
    }
  }
  return points
}

const canvas = document.querySelector('canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

canvas.width = 900
canvas.height = 900

const scale = 30
const points = initPoints(canvas.width / scale, canvas.height / scale)
const center = new Point(new Vector2((canvas.width / scale) / 2, (canvas.height / scale) / 2))
const radiusParameter = 2

points.forEach((point) => point.draw(ctx, { scale: scale }))
center.draw(ctx, { scale: scale, radius: 4, color: 'red' })

ctx.beginPath()
ctx.strokeStyle = 'cyan'
ctx.arc(
  center.position.x * scale,
  center.position.y * scale,
  radiusParameter * scale,
  0,
  Math.PI * 2
)

ctx.stroke()