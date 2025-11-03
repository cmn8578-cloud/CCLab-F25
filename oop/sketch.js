let cloud;

function setup() {
  //createCanvas(400, 400);
  let canvas = createCanvas(800, 400);
  canvas.parent("p5-canvas-container");
  x = width / 2;
  y = height / 2;
  cloud = new Cloud();
}

function draw() {
  background(220);
  cloud.show();
  cloud.move();

}

class Cloud {
  //constructor is like the setup
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.s = 100;
  }
  //what the cloud will do
  show() {
    push();
    translate(this.x, this.y);

    //arms left 
    beginShape();
    let lineLength = this.s * 0.5;
    noFill();
    for (let i = -lineLength * 2; i <= lineLength; i += lineLength / 20) {
      strokeWeight(this.s * 0.1);
      let v = this.s * 0.1 * sin(frameCount * 0.1 - i / (this.s * 0.1));
      vertex(i, v);
    }
    endShape();

    //arms right 
    push();
    scale(-1, 1);
    beginShape();
    lineLength = this.s * 0.5;
    noFill();
    for (let i = -lineLength * 2; i <= lineLength; i += lineLength / 20) {
      strokeWeight(this.s * 0.1);
      let v = this.s * 0.1 * sin(PI + frameCount * 0.1 - i / (this.s * 0.1));
      vertex(i, v);
    }
    endShape();
    pop();

    //main body
    noStroke();
    fill(255);
    circle(0, 0, this.s);
    //circles around the body
    for (let a = 0; a < 2 * PI; a += PI / 6) {
      push();
      rotate(a);
      circle(this.s * 0.5, this.s * 0.3, this.s * 0.5);
      pop();
    }

    //face
    fill(0);
    circle(-this.s * 0.3, 0, this.s * 0.05);
    circle(this.s * 0.3, 0, this.s * 0.05);
    arc(0, 0, this.s * 0.3, this.s * 0.3, 0, PI);
    pop();
  }

  move() {
    this.y = width / 2 + 30 * sin(frameCount * 0.1);
    this.x = height / 2 + 30 * cos(frameCount * 0.1);
    this.s = map(sin(frameCount * 0.05), -1, 1, 50, 100);

  }
}




// function move() {
//   y = height * noise(frameCount * 0.01);
// }

// function drawCloud(u, v, s) {
//   push();
//   translate(u, v);
//   noStroke();
//   circle(0, 0, s);
//   //circles around the body
//   for (let a = 0; a < 2 * PI; a += PI / 6) {
//     push();
//     rotate(a);
//     circle(s * 0.5, s * 0.3, s * 0.5);
//     pop();
//   }
//   //face
//   fill(0);
//   circle(-s * 0.3, 0, s * 0.05);
//   circle(s * 0.3, 0, s * 0.05);
//   arc(0, 0, s * 0.3, s * 0.3, 0, PI);
//   pop();
// }


