function setup() {
  createCanvas(400, 400);

}

function draw() {
  background(0, 20);
  translate(width / 2, height / 2); // move origin to center
  push();
  fill(255, 238, 140);
  noStroke();
  for (let angle = 0; angle < 2 * PI; angle += PI / 8) {
    push();
    rotate(angle);
    circle(50, 0, 30); // draw circle 50 pixels from the center
    pop();
  }
  stroke(255, 238, 140)
  strokeWeight(12)
  line(0, 50, 0, 150)
  pop();

}

