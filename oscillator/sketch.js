// let osc;
// let envelope;
let n = 30;
let b = []

function setup() {
  let canvas = createCanvas(500, 800);
  canvas.parent("p5-canvas-container");

  // osc = new p5.TriOsc(); //SinOsc, SqrOsc, SawOsc 
  // envelope = new p5.Env();
  // envelope.setADSR(0.01, 0.5, 0.1, 0.5); //go from 0 to 1s
  // osc.start();

  //when bubble appears on canvas right away 
  // for (let i = 0; i < n; i++) {
  //   b[i] = new Bubble();
  // }

}

function draw() {
  background(220);
  // if (mouseIsPressed) {

  // } else {
  //   // osc.amp(0, 0.1);
  // }

  for (let i = b.length - 1; i >= 0; i--) { //splice backward to check everything, not missing
    if (b[i].isOut()) {
      b.splice(i, 1);
    }
  }

  for (let i = 0; i < b.length; i++) { //not using i<n bc when splicing 1 -> not 30 anymore -> break code -> use length
    b[i].update();
    b[i].display();
    b[i].playSound();
  }

  if (mouseIsPressed) {
    b.push(new Bubble(mouseX, mouseY));
  }
}


// function mousePressed() {
//   fill(0);
//   circle(mouseX, mouseY, 50);
//   let f = map(mouseX, 0, width, 80, 800); //pitch, freq
//   osc.freq(f);
//   // osc.amp(1, 0.1); //change volume (when using envelope-> no osc.amp)
//   osc.start();
//   envelope.play(osc)

// }

class Bubble {
  constructor(x, y) {
    this.x = x //random(width)
    this.y = y //random(height, 2 * height)
    this.s = random(5, 50)
    this.speedY = map(this.s, 5, 50, 5, 1)
    this.osc = new p5.TriOsc();
    let t1 = 0.01; //attack time in seconds
    let t2 = 0.05; //attack level 0.0 to 1.0
    let t3 = 0.3; //decay time in seconds
    let t4 = 0.01; //decay level 
    this.env = new p5.Env()
    this.env.setADSR(t1, t2, t3, t4);
    this.f = map(this.s, 5, 50, 1700, 40) //bubble has freq according to the size 
    this.osc.freq(this.f)
  }

  display() {
    fill(255, 100);
    noStroke();
    circle(this.x, this.y, this.s)
  }

  update() {
    this.y -= this.speedY
  }

  playSound() {
    if (this.y < this.s / 2) {
      this.osc.start();
      this.env.play(this.osc);
    }
  }

  isOut() {
    if (this.y < this.s / 2) {
      return true;
    } else {
      return false;
    }
  }



}