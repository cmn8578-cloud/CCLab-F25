// CCLab Mini Project - 9.R Particle World Template

let NUM_OF_PARTICLES = 30; // Decide the initial number of particles.
let MAX_OF_PARTICLES = 500; // Decide the maximum number of particles.

let particles = [];
let mic;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  colorMode(HSB, 360, 100, 100);
  // generate particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(width), random(height), random(30, 100));
  }

  mic = new p5.AudioIn();
  mic.start();


}

function draw() {
  background(190, 29, 96);

  // consider generating particles in draw(), using Dynamic Array

  // update and display
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.display();
  }



  // limit the number of particles
  if (particles.length > MAX_OF_PARTICLES) {
    particles.splice(0, 1); // remove the first (oldest) particle
  }



}

class Particle {
  // constructor function
  constructor(startX, startY, s) {
    // properties (variables): particle's characteristics
    this.x = startX;
    this.y = startY;
    this.y0 = startY;
    this.dia = 30;
    this.s = s
    this.h = random(0, 45)
    this.sat = random(90, 100)
    this.bright = random(90, 100)
    this.speedX = map(this.s, 30, 100, 1, 0.1);
    this.speedY = map(this.s, 30, 100, 0.02, 0.005);



  }
  // methods (functions): particle's behaviors
  update() {
    // (add) 

    let f = map(mic.getLevel(), 0, 1, 1, 40);
    this.x += this.speedX * f;
    this.y = this.y0 + this.s * sin(frameCount * this.speedY);


    if (this.x > width + this.s * 2) {
      this.x = random(-width, -width * 0.3);
      this.y = random(height);
      this.y0 = this.y;
      this.s = random(40, 120);
      this.speedX = map(this.s, 30, 100, 3, 0.5);
      this.speedY = map(this.s, 30, 100, 0.02, 0.005);
      this.h = random(15, 45)
      this.sat = random(90, 100)
      this.bright = random(90, 100)
    }
  }

  display() {
    // particle's appearance
    push();
    translate(this.x, this.y);

    // line(0, 0, 200, 50)

    //hands
    this.swing = sin(frameCount * 0.05);
    this.swing = map(this.swing, -1, 1, -PI / 30, PI / 6);

    this.swing1 = sin(frameCount * 0.05);
    this.swing1 = map(this.swing1, -1, 1, PI / 6, -PI / 30);

    for (let angle = 5 / 3 * PI; angle < 2 * PI; angle += PI / 7) {
      push();
      rotate(angle);
      // push()
      rotate(this.swing)
      line(0, 0, this.s, 0);
      push();
      translate(this.s, 0);
      // rotate(this.swing); // use the animated angle here
      line(0, 0, 0, this.s * 0.2);
      pop();
      // pop()
      pop();

    }

    for (let angle = PI; angle < 4 / 3 * PI; angle += PI / 7) {
      push();
      rotate(angle);
      // push()
      rotate(this.swing1)
      line(0, 0, this.s, 0);
      push();
      translate(this.s, 0);
      // rotate(this.swing); // use the animated angle here
      line(0, 0, 0, -this.s * 0.2);
      pop();
      // pop()
      pop();

    }

    //eyes
    strokeWeight(this.s * 0.05)
    stroke(this.h, this.sat, this.bright)
    line(-this.s * 0.2, 0, -this.s * 0.2, -this.s * 0.9)
    line(this.s * 0.2, 0, this.s * 0.2, -this.s * 0.9)

    push()
    this.eyeY = this.s * 0.05 * sin(frameCount * 0.1);
    this.eyeX = this.s * 0.05 * cos(frameCount * 0.1)
    strokeWeight(1)
    stroke(0)
    circle(this.s * 0.2, -this.s * 0.9, this.s * 0.3)
    circle(-this.s * 0.2, -this.s * 0.9, this.s * 0.3)
    fill(0)
    circle(this.s * 0.2 + this.eyeX, -this.s * 0.9 + this.eyeY, this.s * 0.15)
    circle(-this.s * 0.2 + this.eyeX, -this.s * 0.9 + this.eyeY, this.s * 0.15)

    pop()

    //body
    fill(this.h, this.sat, this.bright)
    stroke(0)
    strokeWeight(1)
    ellipse(0, 0, this.s * 1.5, this.s * 0.75);
    // fill(186, 0, 0)
    arc(0, 0, this.s * 0.5, this.s * 0.5, 0, PI)

    pop();
  }
}


