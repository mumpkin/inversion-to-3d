import { Vector2 } from './classes/Vector'
import { Point } from './classes/Point'

const canvas = document.querySelector('canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

canvas.width = 1000
canvas.height = 1000
const scale: number = 10

const xInput = document.querySelector('#x-pos') as HTMLInputElement
xInput.min = '0'
xInput.max = (canvas.width / scale).toString()
xInput.value = ((canvas.width / scale) / 2).toString()

const yInput = document.querySelector('#y-pos') as HTMLInputElement
yInput.min = '0'
yInput.max = (canvas.height / scale).toString()
yInput.value = ((canvas.height / scale) / 2).toString()

const radiusInput = document.querySelector('#radius') as HTMLInputElement
radiusInput.min = '0'
radiusInput.max = ((canvas.height / scale)).toString()


function initPoints(maxX: number, maxY: number): Point[] {
  const points: Point[] = []
  for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x <= maxX; x++) {
      const vector = new Vector2(x, y)
      points.push(new Point(vector))
    }
  }
  return points
}

const center: Point = new Point(new Vector2(
  Number(xInput.value),
  Number(yInput.value),
))
let radiusParameter: number = 20

xInput.addEventListener('input', (event) => {
  const target = event.target as HTMLInputElement
  center.position.x = Number(target.value)
})

yInput.addEventListener('input', (event) => {
  const target = event.target as HTMLInputElement
  center.position.y = Number(target.value)
})

radiusInput.addEventListener('input', (event) => {
  const target = event.target as HTMLInputElement
  radiusParameter = Number(target.value)
})

function getIndex(x: number, y: number, width: number): number {
  return y * width + x
}

function drawSquareFromPoints(ctx: CanvasRenderingContext2D, points: Point[], scale: number) {
  points.forEach((_, index) => {
    const width = canvas.width / scale + 1

    const x = index % width
    const y = Math.floor(index / width)

    if (x < width - 1 && y < width - 1) {
      const topLeft = points[getIndex(x, y, width)].position
      const topRight = points[getIndex(x + 1, y, width)].position
      const bottomRight = points[getIndex(x + 1, y + 1, width)].position
      const bottomLeft = points[getIndex(x, y + 1, width)].position
      ctx.beginPath()
      ctx.fillStyle = index % 2 ? 'cyan' : 'darkgray'
      if(
        topLeft.x !== 0  || topLeft.y !== 0 
        || topRight.x !== 0 || topRight.y !== 0
        || bottomLeft.x !== 0 || bottomLeft.y !== 0
        ||bottomRight.x !== 0 || bottomRight.y !== 0
      ) {
        ctx.moveTo(topLeft.x * scale, topLeft.y * scale)
        ctx.lineTo(topRight.x * scale, topRight.y * scale)
        ctx.lineTo(bottomRight.x * scale, bottomRight.y * scale)
        ctx.lineTo(bottomLeft.x * scale, bottomLeft.y * scale)
        ctx.fill()
      }
    }
  })
}
  const points: Point[] = initPoints(canvas.width / scale, canvas.height / scale)
  console.log(points)
function draw() {
  const points: Point[] = initPoints(canvas.width / scale, canvas.height / scale)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  points.forEach((point) => {
    point.position.invert(center.position, radiusParameter)
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
  drawSquareFromPoints(ctx, points, scale)
  window.requestAnimationFrame(draw)
}

window.requestAnimationFrame(draw)