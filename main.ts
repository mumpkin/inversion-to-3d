import { Engine, Mesh } from './engine/Engine'
import { create2DTriangle } from './engine/Shapes'

const engine: Engine = new Engine(
  document.querySelector('canvas') as HTMLCanvasElement,
  {
    width: (720 / 9) * 16,
    height: 720,
    scale: 0.25,
  }
)

const mesh: Mesh = [create2DTriangle(20, 20, 100, 30, 40, 100)]

engine.addMesh(mesh)

engine.draw()