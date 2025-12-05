let bubble = []
let mic;
let n = 9;
let img = [];
let mySound
let tree = []
let myCharacter
let myCreature;


function preload() {
  //img = loadImage("assets/0.png");
  for (let i = 0; i < n; i++) {
    let filename = 'assets/' + i + '.png'
    let files = loadImage(filename);
    img.push(files);
  }

  img1 = loadImage("assets/stick.png");


  mySound = loadSound("assets/pop.mp3")
  mySound1 = loadSound("assets/children.mp3")
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  canvas.mousePressed(userStartAudio);
  mic = new p5.AudioIn();
  mic.start();
  // for (let i = 0; i < 20; i++) {
  //   bubble[i] = new Bubble(width / 2, height / 2, random(10, 50), img[i % 4]);
  // }
  tree[0] = new Tree(width / 2 + 250, height / 2 + 40, 8, color(40, 120, 20));
  tree[1] = new Tree(width / 2 + 310, height / 2 + 100, 6, color(100, 200, 80));

  myCharacter = new Character(200, 100, 0.5); // x, y, scale
  // myCreature = new Creature(200, 200, 1); // position + scale
}


function draw() {
  background(220);

  //tree
  rectMode(CENTER)
  fill(180, 217, 239)
  rect(width / 2, height - 450, 800, 800)
  fill(49, 104, 52)
  rect(width / 2, height - 50, 800, 100)
  for (let i = 0; i < tree.length; i++) {
    tree[i].display();
    tree[i].move();
  }

  //bubble
  let vol = mic.getLevel();
  if (vol > 0.05) {
    bubble.push(new Bubble(mouseX, mouseY, 50, img[bubble.length % 9]));
    if (mySound1.isPlaying() == false) {
      mySound1.loop();
    }
  }
  for (let i = bubble.length - 1; i >= 0; i--) {
    bubble[i].display();
    bubble[i].move();
    if (bubble[i].popBubble() == true) {
      bubble[i].popSound()
      bubble.splice(i, 1)
    }
  }

  //bubble stick
  // push();
  // translate(width / 2, height / 2);
  // fill(255, 238, 140);
  // noStroke();
  // for (let angle = 0; angle < TWO_PI; angle += PI / 8) {
  //   push();
  //   rotate(angle);
  //   circle(50, 0, 30);
  //   pop();
  // }
  // stroke(255, 238, 140);
  // strokeWeight(12);
  // line(0, 50, 0, 150);
  // pop();

  imageMode(CENTER)
  image(img1, mouseX, mouseY, 300, 170)

  myCharacter.display();
  // myCreature.display();

}

class Bubble {
  constructor(x, y, s, img) {
    this.x = x
    this.y = y
    this.s = s
    this.s0 = s
    this.spY = random(-1.5, 1.5)
    this.spX = random(-1.5, 1.5)
    this.pop = false
    this.img = img;
    // this.osc = new p5.Oscillator('sine');
    // this.f = map(this.s, 5, 50, 800, 40);
    // let t1 = 0.01; // attack time in seconds
    // let l1 = 0.7; // attack level 0.0 to 1.0
    // let t2 = 0.1; // decay time in seconds
    // let l2 = 0.01; // decay level  0.0 to 1.0
    // this.env = new p5.Envelope(t1, l1, t2, l2);
  }
  display() {
    fill(255, 120);
    noStroke();
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.s * 2, this.s * 1.2)

    if (mySound.isPlaying() == false) {
      mySound.play();
    }
    // circle(this.x, this.y, this.s);
    // if (this.s < this.s0 * 1.5) {
    //   circle(this.x, this.y, this.s);
    // } else if (this.s > this.s0 * 1.5) {
    //   imageMode(CENTER);
    //   image(this.img, this.x, this.y, this.s, this.s)
    // }
  }
  move() {
    this.y -= this.spY;
    this.x += this.spX;
    this.s += 0.4
  }
  popBubble() {
    if (this.s > this.s0 * 2) {
      return true
    } else {
      return false
    }
  }
  // popSound() {
  //   if (this.s > this.s0 * 2) {
  //     this.osc.start();
  //     this.osc.freq(this.f);
  //     this.env.play(this.osc);
  //   }
  // }

  popSound() {
    if (this.s > this.s0 * 2) {
      if (mySound.isPlaying() == false) {
        mySound.play();
      }
    }
  }
}

class Tree {
  constructor(x, y, s, c) {
    this.x = x
    this.y = y
    this.s = s
    this.c = c
  }
  display() {

    noStroke()
    rectMode(CENTER);
    fill(88, 57, 39)
    rect(this.x, this.y + this.s * 7, this.s * 3, this.s * 20);

    fill(this.c)
    circle(this.x, this.y, this.s * 10)
    circle(this.x + this.s * 7, this.y, this.s * 10)
    circle(this.x - this.s * 7, this.y, this.s * 10)
    circle(this.x + this.s * 3, this.y - this.s * 8, this.s * 10)
    circle(this.x - this.s * 3, this.y - this.s * 8, this.s * 10)
    circle(this.x, this.y - this.s * 13, this.s * 5)
  }
  move() {
    // this.angle = sin(frameCount * 0.2) * force;
    let vol = mic.getLevel();                    // read mic inside class
    let force = map(vol, 0, 0.1, 0, 0.3, true);  // turn volume into angle

  }
}

class Character {

  constructor(x, y, scale = 1) {
    this.x = x;       // x position
    this.y = y;       // y position
    this.s = scale;   // scale factor
  }

  display() {
    push();
    translate(this.x, this.y);
    scale(this.s); // apply scaling
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

    // mouth
    fill(106, 4, 15);
    arc(255, 260, 60, 55, 0, PI);

    // teeth
    fill(255);
    rect(255, 265, 35, 10);

    // tongue
    fill(157, 2, 8);
    arc(255, 285, 25, 15, PI, 2 * PI);
    ellipse(255, 283.5, 25, 6);

    pop();

  }
}


