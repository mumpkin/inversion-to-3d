import { Triangle } from './Shapes'
import { Vector2 } from './Vector'

export type Mesh = Triangle[]

export type EngineOptions = Partial<{
  width: number
  height: number
  scale: number
  imageSmoothingEnable: boolean
  imageSmoothingQuality: 'low' | 'medium' | 'high'
}>

export class Engine {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  meshes: Mesh[]

  constructor(canvas: HTMLCanvasElement, options?: EngineOptions) {
    const width = options?.width ?? 100
    const height = options?.height ?? 100
    const scale = options?.scale ?? 1
    const imageSmoothingEnable = options?.imageSmoothingEnable ?? false
    const imageSmoothingQuality = options?.imageSmoothingQuality ?? 'high'

    this.canvas = canvas
    this.canvas.style.width = width.toString() + 'px'
    this.canvas.style.height = height.toString() + 'px'
    this.canvas.width = width * scale
    this.canvas.height = height * scale

    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.ctx.imageSmoothingEnabled = imageSmoothingEnable
    this.ctx.imageSmoothingQuality = imageSmoothingQuality

    this.meshes = []
  }

  addMesh(mesh: Mesh): void {
    this.meshes.push(mesh)
  }

  rasterize(): void {
    this.meshes.forEach((mesh) => {
      mesh.forEach((triangle) => {
        const range = triangle.getRange()
        for (let x = range[0].x; x < range[1].x; x++) {
          for (let y = range[0].y; y < range[1].y; y++) {
            const point = new Vector2(x, y)
            if (triangle.isPointInside(point)) {
              this.ctx.beginPath()
              this.ctx.fillStyle = 'white'
              this.ctx.fillRect(x, y, 1, 1)
            }
          }
        }
      })
    })
  }

  draw(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.rasterize()
    window.requestAnimationFrame(() => this.draw())
  }
}