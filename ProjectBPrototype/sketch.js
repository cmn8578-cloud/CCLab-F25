let mic;
let bubble = []
let img

function preload() {
  img = loadImage("assets/me1.png");
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(220);
  if (mic.getLevel() > 0.003) {
    bubble.push(new Bubble(width / 2, 400, random(20, 50)))
  }
  for (let i = bubble.length - 1; i >= 0; i--) {
    bubble[i].display();
    bubble[i].update();
  }
  console.log(mic.getLevel())

}


class Bubble {
  constructor(x, y, s) {
    this.x = x
    this.y = y
    this.s = s
    this.s0 = s
    this.vy = random(1, 5);
    this.vx = random(-3, 3);
  }

  display() {
    noStroke()
    fill(255, 50)
    circle(this.x, this.y, this.s)
    if (this.s > this.s0 * 1.5) {
      image(img, this.x, this.y, 50, 50)
    }

  }

  update() {
    this.x += this.vx
    this.y -= this.vy
    this.s += 0.05
    if (this.s > this.s0 * 1.5) {
      this.s = 0
    }
  }
}






// let mic;
// let bubble = []
// let img = []

// function preload() {
//   img.push(loadImage("assets/me1.png"));
//   img.push(loadImage("assets/me2.jpg"));
//   img.push(loadImage("assets/me3.jpg"))
//   img.push(loadImage("assets/me4.jpg"));
//   img.push(loadImage("assets/me5.png"));
//   img.push(loadImage("assets/me6.JPEG"));
//   img.push(loadImage("assets/me7.JPEG"));
//   img.push(loadImage("assets/me8.JPEG"));
// }

// function setup() {
//   let canvas = createCanvas(800, 500);
//   canvas.parent("p5-canvas-container");
//   mic = new p5.AudioIn();
//   mic.start();
// }

// function draw() {
//   background(220);
//   if (mic.getLevel() > 0.01) {
//     bubble.push(new Bubble(width / 2, 400, random(20, 50)))
//   }
//   for (let i = bubble.length - 1; i >= 0; i--) {
//     bubble[i].display();
//     bubble[i].update();
//     if (bubble[i].isOut() == true) {
//       bubble.splice(i, 1);
//     }
//   }
// }

// class Bubble {
//   constructor(x, y, s) {
//     this.x = x
//     this.y = y
//     this.s = s
//     this.s0 = s
//     this.vx = random(-2, 2);
//     this.vy = random(-2, 2);
//     this.img = []
//   }

//   display() {
//     noStroke()
//     fill(255, 50)
//     if (this.s > 0) {
//       circle(this.x, this.y, this.s)
//     } else {
//       imageMode(CENTER)
//       image(this.img, this.x, this.y, 50, 50)
//     }
//   }

//   update() {
//     this.x += this.vx
//     this.y -= this.vy
//     if (this.s < this.s0 * 1.5) {
//       this.s += 0.2
//     } else if (this.s >= this.s0 * 1.5) {
//       this.s = 0
//       this.img = random(img)
//     }
//   }

//   isOut() {
//     if (this.x > width + this.s * 2 || this.y > height + this.s) {
//       return true
//     } else {
//       return false
//     }
//   }
// }



