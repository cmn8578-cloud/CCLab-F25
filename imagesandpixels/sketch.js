let img;
let img2;
let vid;
let cam;
let f = []
function preload() {
  img = loadImage("assets/sprite.png")
  img2 = loadImage("assets/hokusai.jpg")
  // vid = createVideo("assets/videoweb2.mp4");
}

function setup() {
  let canvas = createCanvas(640, 480);
  canvas.parent("p5-canvas-container");
  // noCursor();
  background(0);
  // vid.loop();
  // vid.hide()

  cam = createCapture(VIDEO)
  cam.hide()

}

let s = 50
function draw() {
  background(0)
  for (let x = 0; x < cam.width; x += s) {
    for (let y = 0; y < cam.height; y += s) {
      let d = dist(mouseX, mouseY, x, y)
      let maxVal = dist(0, 0, width, height)
      let new_s = map(d, 0, maxVal, 1, 2 * s)
      let c = cam.get(x, y)
      fill(c)
      noStroke()
      rect(x, y, new_s, new_s)
    }
  }
}

class Face {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.speedX = random(-3, 3)
    this.speedY = random(-3, 3)
    this.s = random(2, 50)
  }

  display() {
    push()
    blendMode(ADD)
    tint(220, 120, 10, 40)
    imageMode(CENTER);
    image(img, this.x, this.y, this.s, this.s);
    pop()
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY
  }
}