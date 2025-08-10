import { Vector } from './Vector'

export class Point {
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