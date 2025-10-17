function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
}

function draw() {
  background(220);
  drawEars(0, 0, 100, 20, 0.3);
  drawEars(-50, 0, 100, 20, 0.3);
}

function drawEars(x, y, sVertex, sCircle, sp) {
  push();
  translate(width / 2, height / 2);
  beginShape();
  for (let i = 0; i < sVertex; i++) {
    let v = i + 10 * sin(frameCount * sp);
    vertex(x, y + v); //y + v
  }
  endShape();
  let spCircle = 10 * sin(frameCount * sp);
  circle(x, y + spCircle, sCircle); 
  pop();
}
