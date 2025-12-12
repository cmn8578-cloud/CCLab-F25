let img;
let right = false;
let left = false;
let x1, x2;
let delta = 0;
let speedX = 1;
let scaleFactor = 0.5;
function preload() {
  img = loadImage("assets/kids2.png");
  img1 = loadImage("assets/m.png");
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");
  x1 = 0;
  x2 = -windowWidth;
  // x2 = -2 * img.width;
}
function draw() {
  background(239, 235, 226);

  push()
  imageMode(CENTER)
  image(img1, width / 2, 100, 500, 200);
  pop()

  image(img, x1, 170, windowWidth, img.height * windowWidth / img.width);
  image(img, x2, 170, windowWidth, img.height * windowWidth / img.width);
  // image(img, x2, 170);
  // pop();


  if (mouseIsPressed) {
    delta = 2 * (mouseX - pmouseX);
  }
  x1 = lerp(x1, x1 + delta, 0.1);
  x2 = lerp(x2, x2 + delta, 0.1);

  if (delta > 0) {
    delta = delta - 0.5; //move right
    right = true;
    left = false;

  } else if (delta < 0) {
    delta = delta + 0.5; //move left
    right = false;
    left = true;
  }
  else {
    delta = 0;
    right = false;
    left = false;
  }
  if (right) {
    if (x1 > width) {
      x1 = x2 - width;
    }
    if (x2 > width) {
      x2 = x1 - width;
    }
  }

  if (left) {
    if (x1 < 0) {
      x2 = x1 + width;
    }
    if (x2 < 0) {
      x1 = x2 + width;
    }
  }

}




// let handPose;
// let video;
// let hands = [];

// let options = { maxHands: 1, flipped: false};


// function preload() {
//   handPose = ml5.handPose(options);
// }
// function setup() {
//   createCanvas(640, 480);
//   // Create the video and hide it
//   video = createCapture(VIDEO);
//   video.size(640, 480);
//   video.hide();
//   // Start detecting hands from the webcam video
//   handPose.detectStart(video, gotHands);
// }
// // Callback function for when handPose outputs data
// function gotHands(results) {
//   // Save the output to the hands variable
//   hands = results;
// }

// function draw() {
//   background(220);
//   push();
//   translate(width, 0);
//   scale(-1,1);
//   image(video, 0, 0, width, height);
//   // Draw all the tracked hand points
//   for (let i = 0; i < hands.length; i++) {
//     let hand = hands[i];
//     for (let j = 0; j < hand.keypoints.length; j++) {
//       let keypoint = hand.keypoints[j];
//       text(j, keypoint.x, keypoint.y);
//       // fill(0, 255, 0);
//       // noStroke();
//       // circle(keypoint.x, keypoint.y, 10);
//     }
//   }
//   pop();
// }


