let tree = []
let mic;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  // Bigger tree behind
  tree[0] = new Tree(width / 2 + 40, height / 2 + 20, 8, color(40, 120, 20));

  // Smaller tree in front
  tree[1] = new Tree(width / 2 - 40, height / 2 + 40, 6, color(100, 200, 80));

  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(220);




  rectMode(CENTER)
  fill(180, 217, 239)
  rect(width / 2, height - 450, 800, 800)

  fill(49, 104, 52)

  rect(width / 2, height - 50, 800, 100)



  for (let i = 0; i < tree.length; i++) {
    // Draw the BIG tree first (behind)
    tree[i].display();
    tree[i].move();

    // Draw the SMALL tree second (on top → appears in front)
    // tree[1].display();
  }

  push();
  fill(255);
  translate(width / 2, height / 2);


  noStroke();
  for (let angle = 0; angle < 2 * PI; angle += PI / 5) {
    push();
    rotate(angle);
    fill(255);
    circle(100 / 2 - 8, 0, 30);
    pop();
  }

  pop()
}

class Tree {
  constructor(x, y, s, c) {
    this.x = x
    this.y = y
    this.s = s
    this.c = c
  }
  display() {

    noStroke()
    rectMode(CENTER);
    fill(88, 57, 39)
    rect(this.x, this.y + this.s * 7, this.s * 3, this.s * 20);

    fill(this.c)
    circle(this.x, this.y, this.s * 10)
    circle(this.x + this.s * 7, this.y, this.s * 10)
    circle(this.x - this.s * 7, this.y, this.s * 10)
    circle(this.x + this.s * 3, this.y - this.s * 8, this.s * 10)
    circle(this.x - this.s * 3, this.y - this.s * 8, this.s * 10)
    circle(this.x, this.y - this.s * 13, this.s * 5)
  }
  move() {
    // this.angle = sin(frameCount * 0.2) * force;
    let vol = mic.getLevel();                    // read mic inside class
    let force = map(vol, 0, 0.1, 0, 0.3, true);  // turn volume into angle

  }
}