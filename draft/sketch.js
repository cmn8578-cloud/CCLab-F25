let handPose;
let video;
let hands = [];

let options = { maxHands: 1, flipped: false };

let p1 = 0;
let p2 = 0;


function preload() {
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(640, 480);
  // Create the video and hide it
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  // Start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);
}
// Callback function for when handPose outputs data
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

    stroke(255, 0, 0);
    strokeWeight(5);
    line(hand.keypoints[4].x, hand.keypoints[4].y, hand.keypoints[8].x, hand.keypoints[8].y);

    // for (let j = 0; j < hand.keypoints.length; j++) {
    //   let keypoint = hand.keypoints[j];
    //   text(j, keypoint.x, keypoint.y);
    // fill(0, 255, 0);
    // noStroke();
    // circle(keypoint.x, keypoint.y, 10);
  }
  pop();
}





// function setup() {
//   createCanvas(400, 400);

// }

// function draw() {
//   background(0, 20);
//   translate(width / 2, height / 2); // move origin to center
//   push();
//   fill(255, 238, 140);
//   noStroke();
//   for (let angle = 0; angle < 2 * PI; angle += PI / 8) {
//     push();
//     rotate(angle);
//     circle(50, 0, 30); // draw circle 50 pixels from the center
//     pop();
//   }
//   stroke(255, 238, 140)
//   strokeWeight(12)
//   line(0, 50, 0, 150)
//   pop();

// }

