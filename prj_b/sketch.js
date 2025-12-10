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

function preload() {
  handPose = ml5.handPose(options);
  img_stick = loadImage("assets/stick.png");

}
function setup() {
  createCanvas(640, 480);
  // Create the video and hide it
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  // Start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);
  x = random(width);
  y = random(height);
}


function gotHands(results) {
  // Save the output to the hands variable
  hands = results;
}

function draw() {
  background(220);

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

    stroke(255, 0, 0);
    strokeWeight(5);
    line(hand.keypoints[4].x, hand.keypoints[4].y, hand.keypoints[8].x, hand.keypoints[8].y);
    line(hand.keypoints[6].x, hand.keypoints[6].y, hand.keypoints[3].x, hand.keypoints[3].y);
  }
  let midX = (p3.x + p4.x) / 2;
  let midY = (p3.y + p4.y) / 2;

  let d1 = dist(p1.x, p1.y, p2.x, p2.y);
  let d2 = dist(p3.x, p3.y, p4.x, p4.y); //>70
  // console.log(d2);
  fill(0);
  imageMode(CENTER);
  image(img_stick, x - 15, y + 30, 55, 100);
  if (d1 > 5) {
    if (d2 > 70) {
      x = lerp(x, midX, 0.1);
      y = lerp(y, midY, 0.1);
    }
  }
  pop();
}

