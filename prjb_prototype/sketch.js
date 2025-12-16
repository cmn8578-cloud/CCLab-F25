let bubble = [];
let mic;
let img;

function preload() {
  img = loadImage("assets/me.png");
}

function setup() {
  let canvas = createCanvas(640, 480);
  canvas.id("p5-canvas");
  canvas.parent("p5-canvas-container");
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(220);

  let vol = mic.getLevel();

  if (vol > 0.05) {
    bubble.push(new Bubble(width / 2, height / 2, random(10, 50)));
  }
  for (let i = bubble.length - 1; i >= 0; i--) {
    bubble[i].display();
    bubble[i].move();

    if (bubble[i].ispop() === true) {
      bubble.splice(i, 1);
    }
  }
}

class Bubble {
  constructor(x, y, s) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.s0 = s;
    this.spY = random(-2, 2);
    this.spX = random(-2, 2);
  }

  display() {
    fill(255, 120);
    noStroke();
    if (this.s > this.s0 * 2) {
      imageMode(CENTER);
      image(img, this.x, this.y, 50, 50);
    } else {
      circle(this.x, this.y, this.s);
    }
  }

  move() {
    this.y -= this.spY;
    this.x += this.spX;
    this.s += 0.2;
  }

  ispop() {
    if (this.s > this.s0 * 2.5) {
      return true;
    } else {
      return false;
    }
  }
}
