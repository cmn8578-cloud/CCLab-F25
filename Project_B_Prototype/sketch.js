let bubble = []
let mic
let img

function preload() {
  img = loadImage("assets/me.png")
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  for (let i = 0; i < 5; i++) {
    let x = width / 2
    let y = 400
    bubble.push(new Bubble(x, y))
  }
  mic = new p5.AudioIn()
  mic.start()
}

function draw() {
  background(220);
  for (let i = 0; i < bubble.length; i++) {
    bubble[i].display()
    bubble[i].move()
  }
}

class Bubble {
  constructor(x, y) {
    this.x = x
    this.y = y

    this.inX = x
    this.inY = y

    this.s = random(10, 50)

    this.spX = random(-2, 2)
    this.spY = random(-2, 2)
  }

  display() {
    if (this.s == 0) {
      imageMode(CENTER)
      image(img, this.x, this.y, 50, 60)
    } else {
      circle(this.x, this.y, this.s)
    }

  }

  move() {
    let d = dist(this.x, this.y, this.inX, this.inY)
    this.s = map(d, 0, 200, 20, 60)

    if (mic.getLevel() >= 0.02) {
      this.y -= random(0, 5)
      this.x += random(-2, -0.5)
    }

    if (this.s >= 60) {
      this.s = 0
      this.x += this.spX
      this.y += this.spY
    }

    // if (this.x < 0 || this.x > width) {
    //   this.spX = -this.spX
    // }

    // if (this.y < 0 || this.y > height) {
    //   this.spY = -this.spY
    // }


    console.log(mic.getLevel())

  }
}