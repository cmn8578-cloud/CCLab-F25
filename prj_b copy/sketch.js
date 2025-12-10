let handPose;
let video;
let hands = [];

let options = { maxHands: 1, flipped: false };

let p1 = 0
let p2 = 0
let p3 = 0
let p4 = 0

let x, y; //coordinate of stick 

let img_stick
let mic;

let bubble = []
let n = 9;
let img = [];
let blowing = false;

let midX, midY;



function preload() {
  handPose = ml5.handPose(options);
  img_stick = loadImage("assets/stick.png");
  for (let i = 0; i < n; i++) {
    let filename = 'assets/' + i + '.png'
    let files = loadImage(filename);
    img.push(files);
  }
}

function setup() {
  let canvas = createCanvas(640, 480);
  canvas.id("p5-canvas");
  canvas.parent("p5-canvas-container");

  canvas.mousePressed(userStartAudio);
  // Create the video and hide it
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  // Start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);
  x = random(width);
  y = random(height);

  mic = new p5.AudioIn();
  mic.start();
}

// Callback function for when handPose outputs data
function gotHands(results) {
  // Save the output to the hands variable
  hands = results;
}

function draw() {
  background(220);
  // console.log("x:" + x + ", y:" + y);
  console.log(hands.length)
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);
  // Draw all the tracked hand points
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    p1 = hand.keypoints[4];
    p2 = hand.keypoints[8];
    p3 = hand.keypoints[6];
    p4 = hand.keypoints[3];
  }

  if (abs(p1.x - p2.x) < 30 && abs(p1.y - p2.y) < 30 && hands.length > 0) {
    midX = (p3.x + p4.x) / 2
    midY = (p3.y + p4.y) / 2
    fill(255, 0, 0)
    //move the stick
    x = lerp(x, p3.x, 0.1);
    y = lerp(y, midY, 0.1);

    //create bubbles
    let vol = mic.getLevel();
    if (vol > 0.05 && blowing == false) {
      blowing = true;
      for (let i = 0; i < 6; i++) {
        bubble.push(new Bubble(x, y, random(20, 60), img[bubble.length % 9]));
      }
      // console.log(vol)
    }
    if (vol <= 0.05) {
      blowing = false;
    }

  } else {
    x = lerp(x, -200, 0.1);
  }

  //stick
  push();
  fill(0);
  imageMode(CENTER);
  image(img_stick, x, y + 30, 55, 100);
  pop();

  for (let i = bubble.length - 1; i >= 0; i--) {
    bubble[i].display();
    bubble[i].move();
    if (bubble[i].popBubble() == true) {
      // bubble[i].popSound()
      bubble.splice(i, 1)
    }
  }
  pop();
}

class Bubble {
  constructor(x, y, s, img) {
    this.x = x
    this.y = y
    this.s = s
    this.s0 = s
    this.spY = random(-1.5, 1.5)
    this.spX = random(-1.5, 1.5)
    this.img = img;
  }
  display() {
    push();
    fill(255, 120);
    noStroke();
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.s, this.s)
    pop();
  }
  move() {
    this.y -= this.spY;
    this.x += this.spX;
    this.s += 0.3
  }
  popBubble() {
    if (this.s > this.s0 * 2) {
      return true
    } else {
      return false
    }
  }
}