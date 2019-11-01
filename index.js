const W = 800, H = 800
const VIEW_W = 600, VIEW_H = 600
const vertices = [
  new Vector(-1, 1, 1),
  new Vector(1, 1, 1),
  new Vector(1, -1, 1),
  new Vector(-1, -1, 1),
  new Vector(-1, 1, -1),
  new Vector(1, 1, -1),
  new Vector(1, -1, -1),
  new Vector(-1, -1, -1)
]
let transformedVertices = []
let theta = 0
const triangles = [
  // front side
  [0, 3, 1], [1, 3, 2],
  // back side
  [4, 5, 6], [6, 7, 4],
  // top side
  [1, 5, 0], [0, 5, 4],
  // bottom side
  [3, 7, 2], [7, 6, 2],
  // left side
  [3, 0, 4], [3, 4, 7],
  // right side
  [2, 5, 1], [2, 6, 5]
]
const colors = [
  'white',
  'red', 'green', 'blue',
  'yellow', 'magenta'
]
let canvas = document.getElementsByTagName('canvas')[0]
let ctx = canvas.getContext('2d')

function modelToView(v) {
  let zz = 4 - v.z

  return new Vector(
    (W - VIEW_W) / 2
    + (VIEW_W * (v.x / zz + 1) / 2),
    (H - VIEW_H) / 2
    + (VIEW_H * (1 - v.y / zz) / 2),
    0
  )
}
function ccw(a, b, c) {
  let p = b.minus(a)
      q = c.minus(a)
  return p.cross(q).z > 0
}
function renderTriangle(triangle, color) {
  let [i, j, k] = triangle
  let a = transformedVertices[i],
      b = transformedVertices[j],
      c = transformedVertices[k]
  let aV = modelToView(a),
      bV = modelToView(b),
      cV = modelToView(c)
  if (ccw(aV, bV, cV)) {
    return
  }
  ctx.beginPath()
  ctx.moveTo(aV.x, aV.y)
  ctx.lineTo(bV.x, bV.y)
  ctx.lineTo(cV.x, cV.y)
  ctx.lineTo(aV.x, aV.y)
  ctx.strokeStyle = 'black'
  let eye = new Vector(0, 0, 3)
  let normal = b.minus(a).cross(c.minus(a)).normalize()
  let triangleCenter = a.add(b).add(c).scale(1/3)
  let eyeToTriangle = eye.minus(triangleCenter).normalize()
  let beta = normal.dot(eyeToTriangle)
  if (beta < 0) {
    return
  }
  let intensity = Math.floor(255 * beta)
  ctx.strokeStyle = ctx.fillStyle = 'rgba(' + intensity + ',' + intensity + ',' + intensity + ', 1)'
  ctx.stroke()
  ctx.fill()
}
function integrate() {
  theta += 0.01
  transformedVertices = []
  for (let vertex of vertices) {
    transformedVertices.push(vertex.rotateY(theta).rotateX(0.73 * theta))
  }
}
function render() {
  integrate()
  ctx.clearRect(0, 0, W, H)
  let colorIdx = 0
  for (let triangle of triangles) {
    renderTriangle(triangle, colors[Math.floor(colorIdx / 2)])
    ++colorIdx
  }
  requestAnimationFrame(render)
}

render()
