let mySound1;
let mySound2;
let x = 25
let speedX = 5

function preload() {
  mySound1 = loadSound("assets/beat.mp3");
  mySound2 = loadSound("assets/kick.mp3");

}

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("p5-canvas-container");
  mySound1.play();
  mySound2.play();
}

function draw() {
  background(220);

  fill(0)
  circle(x, height / 2, 50)

  x = x + speedX

  if (x > width - 25) {
    speedX = -speedX;
    mySound1.play()
  }

  if (x < 25) {
    speedX = -speedX;
    mySound2.play()
  }

}

// function mousePressed() {
//   if (mySound.isPlaying() == false) {
//     mySound.play(); //only play when it is not played -> prevent sound overlapping
//   } else[
//     mySound.pause //mySound.stop 
//   ]

//   mySound.play(); //put in draw -> repeat -> nightmare 
// }