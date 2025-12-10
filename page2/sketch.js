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
let n = 9
let img = [];
let n1 = 6
let cloud = []
let cloudObj = []
let blowing = false;
let midX, midY;
let tree = []
let me
let worm
let dancer
let crab
let laughingSound;
let poppingSound


function preload() {
  handPose = ml5.handPose(options);
  img_stick = loadImage("assets/stick.png");

  for (let i = 0; i < n; i++) {
    let filename = 'assets/' + i + '.png'
    let files = loadImage(filename);
    img.push(files);
  }
  for (let i = 0; i < n1; i++) {
    let filename1 = 'assets/c' + i + '.png'
    let filesCloud = loadImage(filename1);
    cloud.push(filesCloud);
  }

  laughingSound = loadSound("assets/laugh.mp3");
  poppingSound = loadSound("assets/pop1.MP3");
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

  //mic
  mic = new p5.AudioIn();
  mic.start();

  //characters 
  me = new Me(width * 0.3, height * 0.3, 0.4);
  worm = new Worm(width * 0.7, height * 0.6, 0.5, 0.1, color(150, 80, 200));
  dancer = new Dancer(width * 0.2, height * 0.5, 28);
  crab = new Crab(width * 0.9, height * 0.6, 50)

  //clouds
  for (let i = 0; i < cloud.length; i++) {
    cloudObj.push(new Cloud(-200, random(-40, 60), cloud[i]));
  }
}

// Callback function for when handPose outputs data
function gotHands(results) {
  // Save the output to the hands variable
  hands = results;
}

function draw() {
  // console.log("x:" + x + ", y:" + y);
  //camera
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);
  pop()
  // console.log(hands.length)

  //background
  background(180, 217, 239);
  rectMode(CENTER)
  noStroke()
  fill(49, 104, 52)
  rect(width / 2, height - (height * 0.2), width, height * 0.2)

  //displaying characters
  me.display();
  worm.display()
  worm.move()
  dancer.display();
  dancer.moveHappy();
  crab.display()


  //clouds
  for (let i = 0; i < cloudObj.length; i++) {
    cloudObj[i].display()
    cloudObj[i].move()
    cloudObj[i].moveBack()
  }

  //bubble
  push()
  translate(width, 0);
  scale(-1, 1);
  // Draw all the tracked hand points
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    p1 = hand.keypoints[4];
    p2 = hand.keypoints[8];
    p3 = hand.keypoints[6];
    p4 = hand.keypoints[3];
  }
  if (abs(p1.x - p2.x) < 40 && abs(p1.y - p2.y) < 40 && hands.length > 0) {
    midX = (p3.x + p4.x) / 2
    midY = (p3.y + p4.y) / 2
    fill(255, 0, 0)
    //move the stick
    x = lerp(x, p3.x, 0.2);
    y = lerp(y, midY, 0.2);
    //create bubbles
    let vol = mic.getLevel();
    if (vol > 0.05 && blowing == false) {
      blowing = true;
      for (let i = 0; i < 4; i++) {
        let normalX = width - x;
        bubble.push(new Bubble(normalX, y, random(20, 60), img[bubble.length % 9]));
      }
      console.log(vol)
    }
    if (vol <= 0.05) {
      blowing = false;
    }

  } else {
    x = lerp(x, -200, 0.1);
  }
  pop()

  //stick
  push();
  translate(width, 0)
  scale(-1, 1);
  fill(0);
  imageMode(CENTER);
  image(img_stick, x, y + 30, 55, 100);
  pop();

  for (let i = bubble.length - 1; i >= 0; i--) {
    bubble[i].display();
    bubble[i].move();
    if (bubble[i].popBubble() == true) {
      if (poppingSound.isPlaying() == false) {
        poppingSound.play()
      }
      bubble.splice(i, 1)
    }
  }
  // pop();

  //sad / happy
  if (bubble.length === 0) {
    laughingSound.stop()
    me.moveSad();
    me.x = lerp(me.x, me.x0, 0.05);
    me.y = lerp(me.y, me.y0, 0.05);

    worm.x = lerp(worm.x, worm.x0, 0.01);
    worm.y = lerp(worm.y, worm.y0, 0.01);
    worm.sp = 0.05

    dancer.moveSad();
    dancer.x = lerp(dancer.x, dancer.x0, 0.03);
    dancer.y = lerp(dancer.y, dancer.y0, 0.03);

    crab.move()
    crab.x = lerp(crab.x, crab.x0, 0.03);
    crab.y = lerp(crab.y, crab.y0, 0.03);



  } else if (bubble.length > 0) {
    if (laughingSound.isPlaying() == false) {
      laughingSound.play()
    }
    me.moveHappy();
    let targetX = width - x;
    let targetY = y;
    me.x = lerp(me.x, targetX, 0.1);
    me.y = lerp(me.y, targetY, 0.1);

    let wormTargetX = width - x;
    let wormTargetY = y;
    worm.x = lerp(worm.x, wormTargetX + 200, 0.05);
    worm.y = lerp(worm.y, wormTargetY, 0.05);
    worm.sp = 0.08
    worm.c = color(random(100, 255), random(100, 255), random(100, 255));

    dancer.moveHappy();
    let dancerTargetX = width - x;
    let dancerTargetY = y;
    dancer.x = lerp(dancer.x, dancerTargetX - 50, 0.03);
    dancer.y = lerp(dancer.y, dancerTargetY - 50, 0.03);

    crab.move()
    let crabTargetX = width - x;
    let crabTargetY = y;
    crab.x = lerp(crab.x, crabTargetX + 300, 0.01);
    crab.y = lerp(crab.y, crabTargetY, 0.01);
  }
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
    this.s += 0.2
  }
  popBubble() {
    if (this.s > this.s0 * 1.75) {
      return true
    } else {
      return false
    }
  }
}

// class Tree {
//   constructor(x, y, s, c) {
//     this.x = x
//     this.y = y
//     this.s = s
//     this.c = c
//   }
//   display() {
//     noStroke()
//     rectMode(CENTER);
//     fill(88, 57, 39)
//     rect(this.x, this.y + this.s * 7, this.s * 3, this.s * 20);

//     fill(this.c)
//     circle(this.x, this.y, this.s * 10)
//     circle(this.x + this.s * 7, this.y, this.s * 10)
//     circle(this.x - this.s * 7, this.y, this.s * 10)
//     circle(this.x + this.s * 3, this.y - this.s * 8, this.s * 10)
//     circle(this.x - this.s * 3, this.y - this.s * 8, this.s * 10)
//     circle(this.x, this.y - this.s * 13, this.s * 5)
//   }
// }

class Me {
  constructor(x, y, s) {
    this.x = x;
    this.y = y;
    this.x0 = x;
    this.y0 = y
    this.s = s
    this.sp = 2;

    this.happy = false
    this.angle = 0

    this.armLx1 = width * 0.32;
    this.armLy1 = height * 0.62;
    this.armLx2 = width * 0.30;
    this.armLy2 = height * 0.79;

    this.armRx1 = width * 0.48;
    this.armRy1 = height * 0.62;
    this.armRx2 = width * 0.51;
    this.armRy2 = height * 0.79;
  }
  display() {
    push();
    translate(this.x, this.y);
    scale(this.s);

    // bottom hair
    fill(156, 102, 68);
    noStroke();
    rectMode(CENTER);
    rect(268 - 5, 260, 289, 200);
    // ear
    fill(237, 224, 212);
    circle(375, 200, 57);
    // trousers
    fill(255, 232, 214);
    rect(235, 430, 40, 80); // L
    rect(280, 430, 40, 80); // R

    //Left hand
    push()
    stroke(237, 224, 212);
    fill(237, 224, 212);
    strokeWeight(9);
    translate(this.armLx1, this.armLy1);
    rotate(this.angle);
    line(0, 0, this.armLx2 - this.armLx1, this.armLy2 - this.armLy1);
    circle(this.armLx2 - this.armLx1, this.armLy2 - this.armLy1, 15)
    pop()

    //Right hand
    push();
    stroke(237, 224, 212);
    fill(237, 224, 212);
    strokeWeight(9);
    translate(this.armRx1, this.armRy1);
    rotate(-this.angle);
    line(0, 0, this.armRx2 - this.armRx1, this.armRy2 - this.armRy1);
    circle(this.armRx2 - this.armRx1, this.armRy2 - this.armRy1, 15);
    pop();

    // shirt
    fill(0);
    rect(257, 330, 100, 140);
    // shirt sleeves
    triangle(208, 290, 208, 335, 180, 320); // L
    triangle(288, 270, 338, 320, 307, 330); // R
    // shirt heart
    fill(247, 127, 0);
    triangle(240, 340, 230, 350, 217, 338);
    circle(224, 337, 12);
    circle(235, 337, 12);
    // face
    fill(237, 224, 212);
    ellipse(250, 200, 250, 200);
    // top hair
    fill(156, 102, 68);
    arc(263, 170, 300, 240, PI, 2 * PI);
    // cheeks
    fill(240, 128, 128);
    circle(320, 240, 35); // L
    circle(170, 242, 35); // R
    // eyes
    fill(255);
    circle(185, 202, 45); // L
    circle(300, 202, 45); // R
    fill(0);
    circle(182, 202, 30); // L pupil
    circle(297, 202, 30); // R pupil
    fill(170);
    circle(178, 198, 15); // L grey
    circle(292, 198, 15); // R grey
    fill(255);
    circle(171, 196, 7); // L white
    circle(290, 196, 7); // R white
    // glasses
    noFill();
    stroke(217);
    strokeWeight(4);
    rect(185, 205, 70, 50, 6); // L
    line(220, 180, 265, 180); // bridge
    rect(300, 205, 70, 50, 6); // R
    // nose
    noStroke();
    fill(230, 190, 174);
    triangle(250, 210, 250, 250, 210, 250);

    //mouth
    if (this.happy == true) {
      fill(106, 4, 15);// smile mouth
      arc(255, 260, 60, 55, 0, PI);
      fill(255); // teeth
      rect(255, 265, 35, 10);
      fill(157, 2, 8);// tongue
      arc(255, 285, 25, 15, PI, 2 * PI);
      ellipse(255, 283.5, 25, 6);
    } else {
      fill(100, 0, 0);// sad mouth
      arc(255, 280, 60, 55, PI, 2 * PI);;
      fill(157, 2, 8);// tongue
      arc(255, 280, 35, 25, PI, 2 * PI);
    }
    pop();
  }

  moveSad() {
    this.happy = false;
    this.angle = map(sin(frameCount * 0.05), -1, 1, -PI / 20, PI / 20);
  }

  moveHappy() {
    this.happy = true;
    let offset = map(sin(frameCount * 0.1), -1, 1, -5, 5);
    this.y = this.y0 + offset;
    this.angle = map(sin(frameCount * 0.1), -1, 1, -PI / 20, PI / 20);
  }
}

class Worm {
  constructor(x, y, s, sp, c) {
    this.x = x;
    this.y = y;
    this.x0 = x
    this.y0 = y
    this.s = s;
    this.sp = sp;
    this.c = c
    this.yMovements = [];// animation
    this.angle = 0;
    this.movement = 0;
    this.eyeMovement = 0;

    for (let i = 0; i < 5; i++) {
      this.yMovements[i] = 0;
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    scale(this.s);

    for (let i = 0; i < 5; i++) {
      let size = map(i, 0, 4, 50, 100);
      let xCircle = map(i, 0, 4, 150, 0);
      let yMovement = this.yMovements[i];
      let legSize = map(i, 0, 4, 40, 70);
      stroke(0);
      strokeWeight(1);
      fill(this.c);

      //leg
      push();
      translate(xCircle, yMovement);
      rotate(this.angle);
      stroke(0);
      strokeWeight(1);
      line(0, 0, 0, legSize);
      line(0, legSize, -10, legSize);
      pop();

      // body
      circle(xCircle, yMovement, size);

      //ears
      if (i == 4) {
        push();
        let movement = 15 + this.movement;
        translate(xCircle, yMovement);
        rotate(map(sin(frameCount * this.sp), -1, 1, -PI / 10, PI / 10));
        stroke(0);
        strokeWeight(1);
        fill(this.c);
        line(0 - 25, -30, 0 - 25, -80);
        line(0 + 25, -30, 0 + 25, -80);
        circle(0 - 25, -80, movement);
        circle(0 + 25, -80, movement);

        //eyes
        noFill();
        stroke(0);
        strokeWeight(1);
        circle(0 + 25, 0, 40);
        circle(0 - 25, 0, 40);
        fill(0);
        circle(0 + 25 + this.eyeMovement, 0 + this.eyeMovement, 30);
        circle(0 - 25 + this.eyeMovement, 0 + this.eyeMovement, 30);

        pop();
      }
    }
    pop(); // End the worm's isolated drawing space
  }
  move() {
    for (let i = 0; i < 5; i++) {
      this.yMovements[i] = 50 * sin(frameCount * this.sp + i * this.sp * 5);
    }
    let angleSin = sin(frameCount * this.sp * 1.2);
    this.angle = map(angleSin, -1, 1, -PI / 15, PI / 15);
    this.movement = 5 * sin(frameCount * this.sp);
    this.eyeMovement = 10 * sin(frameCount * this.sp);
  }
}

class Cloud {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.y0 = y
    this.img = img;
    this.sp = random(0.5, 3); // Random speed for movement
    this.spCloud = random(0.02, 0.2);

  }
  display() {
    push();
    image(this.img, this.x, this.y, 150, 150); // Adjust size as needed
    pop();
  }
  move() {
    this.x += this.sp;
    this.y = this.y0 + sin(frameCount * this.spCloud);

  }
  moveBack() {
    if (this.x > width) {
      this.x = -200
      this.y = random(-40, 60); // Random y position at top
      this.sp = random(0.5, 3)
      this.y0 = this.y
      this.spCloud = random(0.02, 0.2);
    }
  }
}

class Dancer {
  constructor(startX, startY, s) {
    this.x = startX;
    this.y = startY;
    this.x0 = startX;
    this.y0 = startY;
    this.s = s;
    this.sHappy = this.s * 2
    this.sSad = s
    this.angle = 0;
    this.speed = 2;
    this.happy = false
  }
  display() {
    push();
    translate(this.x, this.y);

    //arms
    stroke(255);
    strokeWeight(3);
    line(-this.s * 0.25, this.s * 0.9, -this.s * 0.7, this.s * 0.6 + 20 * sin(frameCount * 0.05));
    line(
      this.s * 0.25,
      this.s * 0.9,
      this.s * 0.7,
      this.s * 0.6 + 20 * sin(frameCount * 0.05)
    );

    push();
    fill(255);
    translate(-this.s * 0.7, this.s * 0.6);
    circle(0, 0 + 20 * sin(frameCount * 0.05), this.s * 0.1);
    pop();

    push();
    fill(255);
    translate(this.s * 0.7, this.s * 0.6);
    circle(0, 0 + 20 * sin(frameCount * 0.05), this.s * 0.1);
    pop();

    //leg
    fill(255);
    strokeWeight(3);
    stroke(255);

    this.angle = sin(frameCount * 0.05);
    this.angle = map(this.angle, -1, 1, -PI / 10, PI / 3);

    line(-this.s * 0.15, this.s * 1.1, -this.s * 0.15, this.s * 1.5);

    push();
    translate(-this.s * 0.15, this.s * 1.5);
    rotate(this.angle);
    line(0, 0, this.s * 0.15, this.s * 0.1);
    circle(this.s * 0.15, this.s * 0.1, this.s * 0.1);
    pop();

    line(this.s * 0.15, this.s * 1.1, this.s * 0.15, this.s * 1.5);

    push();
    translate(this.s * 0.15, this.s * 1.5);
    rotate(-this.angle);
    line(0, 0, this.s * 0.15, this.s * 0.1);
    circle(this.s * 0.15, this.s * 0.1, this.s * 0.1);
    pop();

    //pop();

    //body
    fill(255, 179, 0);
    noStroke();
    arc(0, this.s * 1.2, this.s * 0.7, this.s * 2, PI, 0);

    //head
    push();
    this.angle = 10 * sin(frameCount * 0.05);
    this.angle = map(this.angle, -1, 1, -PI / 10, PI / 10);
    rotate(this.angle);
    noStroke();
    fill(254, 27, 28);

    for (let a = 0; a < 2 * PI; a += PI / 8) {
      push();
      rotate(a);
      circle(this.s * 0.5, 0, this.s * 0.5);
      pop();
    }
    circle(0, 0, this.s);

    pop();

    if (this.happy == true) {
      //face
      fill(255);//eyes white
      noStroke();
      ellipse(this.s * -0.2, 0, this.s * 0.4, this.s * 0.6);
      ellipse(this.s * 0.2, 0, this.s * 0.4, this.s * 0.6);
      fill(0);//eyes
      let eye = 15 * sin(frameCount * 0.05);
      let y_eye = constrain(eye, -this.s * 0.15, this.s * 0.15);
      circle(-this.s * 0.2, y_eye, this.s * 0.3);
      circle(this.s * 0.2, y_eye, this.s * 0.3);
      noFill();//mouth
      strokeWeight(2);
      stroke(0);
      ellipse(0, this.s * 0.4, this.s * 0.1, this.s * 0.2)
      pop();
    } else {
      noFill();//sad face
      strokeWeight(2);
      stroke(0);
      arc(this.s * -0.3, 0, this.s * 0.4, this.s * 0.5, 0, PI);
      arc(this.s * 0.3, 0, this.s * 0.4, this.s * 0.5, 0, PI);
    }
    pop()
  }

  moveHappy() {
    this.happy = true
    this.s = lerp(this.s, this.sHappy, 0.1)
    this.angle = sin(frameCount * 0.05);
    this.angle = map(this.angle, -1, 1, -PI / 10, PI / 20);
    this.y += sin(frameCount * 0.1)
    push();
    translate(this.x, this.y);
    pop();
  }

  moveSad() {
    this.happy = false
    this.s = lerp(this.s, this.sSad, 0.1)
    this.angle = sin(frameCount * 0.05);
    this.angle = map(this.angle, -1, 1, -PI / 10, PI / 20);
    this.y += 0.75 * sin(frameCount * 0.1)
    push();
    translate(this.x, this.y);
    pop();
  }

}

class Crab {
  // constructor function
  constructor(startX, startY, s) {
    // properties (variables): particle's characteristics
    this.x = startX;
    this.y = startY;
    this.x0 = startX;
    this.y0 = startY;
    this.dia = 30;
    this.s = s
    this.h = random(0, 45)
    this.sat = random(90, 100)
    this.bright = random(90, 100)
    this.speedX = map(this.s, 30, 100, 1, 0.1);
    this.speedY = map(this.s, 30, 100, 0.02, 0.005);
    this.happy = false
  }
  // methods (functions): particle's behaviors

  move() {
    this.y = this.y0 + 10 * sin(frameCount * 0.1);

  }

  display() {

    push();

    translate(this.x, this.y);
    //eyes
    strokeWeight(this.s * 0.05)
    stroke(0)
    line(-this.s * 0.2, 0, -this.s * 0.2, -this.s * 0.9)
    line(this.s * 0.2, 0, this.s * 0.2, -this.s * 0.9)

    push()
    this.eyeY = this.s * 0.05 * sin(frameCount * 0.1);
    this.eyeX = this.s * 0.05 * cos(frameCount * 0.1)
    strokeWeight(1)
    stroke(0)
    fill(255, 128, 0)
    circle(this.s * 0.2, -this.s * 0.9, this.s * 0.3)
    circle(-this.s * 0.2, -this.s * 0.9, this.s * 0.3)
    fill(0)
    circle(this.s * 0.2 + this.eyeX, -this.s * 0.9 + this.eyeY, this.s * 0.15)
    circle(-this.s * 0.2 + this.eyeX, -this.s * 0.9 + this.eyeY, this.s * 0.15)
    pop()

    //hands
    this.swing = sin(frameCount * 0.05);
    this.swing = map(this.swing, -1, 1, -PI / 30, PI / 6);
    this.swing1 = sin(frameCount * 0.05);
    this.swing1 = map(this.swing1, -1, 1, PI / 6, -PI / 30);
    for (let angle = 5 / 3 * PI; angle < 2 * PI; angle += PI / 7) {
      push();
      stroke(0)
      rotate(angle);
      rotate(this.swing)
      line(0, 0, this.s, 0);
      push();
      translate(this.s, 0);
      line(0, 0, 0, this.s * 0.2);
      pop();
      pop();

    }
    for (let angle = PI; angle < 4 / 3 * PI; angle += PI / 7) {
      push();
      stroke(0)
      rotate(angle);
      rotate(this.swing1)
      line(0, 0, this.s, 0);
      push();
      translate(this.s, 0);
      line(0, 0, 0, -this.s * 0.2);
      pop();
      pop();
    }

    //body
    fill(255, 75, 51)
    stroke(0)
    strokeWeight(1)
    ellipse(0, 0, this.s * 1.5, this.s * 0.75);
    arc(0, 0, this.s * 0.5, this.s * 0.5, 0, PI)

    pop();


  }






}


