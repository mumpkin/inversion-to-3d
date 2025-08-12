import { create2DSquare, create2DTriangle, Rectangle, Triangle } from './classes/Shapes'
import { Vector2 } from './classes/Vector'

const canvas = document.querySelector('canvas') as HTMLCanvasElement
const resolutionScale = 5
canvas.height = 720 / resolutionScale
canvas.width = (canvas.height / 9) * 16

const ctx = canvas.getContext('2d', { willReadFrequently: true }) as CanvasRenderingContext2D
ctx.imageSmoothingEnabled = false
ctx.imageSmoothingQuality = 'high'

const tri: Triangle = create2DTriangle(20, 20, 100, 30, 40, 100)

function drawTriangleOutline(ctx: CanvasRenderingContext2D, tri: Triangle): void {
  ctx.beginPath()
  ctx.strokeStyle = 'black'
  ctx.moveTo(tri[0].x, tri[0].y)
  ctx.lineTo(tri[1].x, tri[1].y)
  ctx.lineTo(tri[2].x, tri[2].y)
  ctx.closePath()
  ctx.stroke()
}


function triA(tri: Triangle): number {
    const x1 = tri[0].x, y1 = tri[0].y;
    const x2 = tri[1].x, y2 = tri[1].y;
    const x3 = tri[2].x, y3 = tri[2].y;

    const aire = Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2);
    return aire;
}

function rasterise(ctx: CanvasRenderingContext2D, tri: Triangle, color: string = 'black') {
  for (let x = 0; x < canvas.width; x++) {
    for (let y = 0; y < canvas.height; y++) {
      const p = new Vector2(x, y)
      const pt1: Triangle = [p, tri[0], tri[1]]
      const pt2: Triangle = [p, tri[1], tri[2]]
      const pt3: Triangle = [p, tri[2], tri[0]]

      if (triA(pt1) + triA(pt2) + triA(pt3) === triA(tri)) {
        ctx.beginPath()
        ctx.fillStyle = color
        ctx.fillRect(x,y,1,1)
      }
    }
  }
}

const square: Rectangle = create2DSquare(3, 3, 10)

let fps = 0;
let lastFrameTime = performance.now();
let frameCount = 0;
const fpsDisplay = document.querySelector('#frame-count') as HTMLSpanElement
function fillPixel(ctx: CanvasRenderingContext2D): void {
  const currentTime = performance.now();
  frameCount++;
  if (currentTime - lastFrameTime >= 1000) {
    fps = frameCount;
    frameCount = 0;
    lastFrameTime = currentTime;

    fpsDisplay.innerText = fps.toString();
  }

  // --- DRAW ---

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  square.forEach((tri, index) => rasterise(ctx, tri, index % 2 ? 'blue' : 'red'))
  rasterise(ctx, tri)

  // -- END DRAW ---

  window.requestAnimationFrame(() => fillPixel(ctx))
}

window.requestAnimationFrame(() => fillPixel(ctx))