import { Vector2 } from './classes/Vector'
import { Point } from './classes/Point'

function initPoints(maxX: number, maxY: number): Point[] {
  const points: Point[] = []
  for (let x = 0; x <= maxX; x++) {
    for (let y = 0; y <= maxY; y++) {
      const vector = new Vector2(x, y)
      points.push(new Point(vector))
    }
  }
  return points
}

const canvas = document.querySelector('canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

canvas.width = 600
canvas.height = 600

const scale: number = 30
const points: Point[] = initPoints(canvas.width / scale, canvas.height / scale)
const center: Point = new Point(new Vector2((canvas.width / scale) / 2, (canvas.height / scale) / 2))
const radiusParameter: number = 4

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  points.forEach((point) => point.position.lerp(point.position.invert(center.position, radiusParameter), 200))
  points.forEach((point) => {
    point.draw(ctx, { scale: scale })
  })
  center.draw(ctx, { scale: scale, radius: 4, color: 'red' })
  ctx.beginPath()
  ctx.lineWidth = 2
  ctx.strokeStyle = 'red'
  ctx.arc(
    center.position.x * scale,
    center.position.y * scale,
    radiusParameter * scale,
    0,
    Math.PI * 2
  )

  ctx.stroke()
  window.requestAnimationFrame(draw)
}

window.requestAnimationFrame(draw)

canvas.addEventListener('click', () => {
  points.forEach((point) => point.position.invert(center.position, radiusParameter))
})