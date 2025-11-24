let img;
let cam;
let colorToTrack
let t = 10

function preload() {
  img = loadImage("assets/hokusai.jpg");
}
function mousePressed() {
  cam.loadPixels();
  colorToTrack = cam.get(mouseX, mouseY)
  console.log(colorToTrack)

}
function setup() {
  let canvas = createCanvas(600, 400);
  canvas.parent("p5-canvas-container");
  cam = createCapture(VIDEO);
  cam.hide()
  colorToTrack = color(0, 0, 0)
}

let s = 20

function findColor(input, c, t) {
  let cr = c[0]
  let cg = c[1]
  let cb = c[2]
  let cx = 0
  let cy = 0
  input.loadPixels()
  for (let x = 0; x < input.width; x++) {
    for (let y = 0; y < input.height; y++) {
      let i = (y * input.width + x) * 4;
      let r = input.pixels[i + 0]
      let g = input.pixels[i + 1]
      let b = input.pixels[i + 2]

      if (r > cr - t && g == cg && b == cb) {
        cx = x
        cy = y
        fill(colorToTrack)
        circle(cx, cy, 30);

      }
    }
  }
}
function draw() {
  background(0)
  image(cam, 0, 0)
  findColor(cam, colorToTrack, 5)
  // cam.loadPixels(); //very important
  // for (let x = 0; x < cam.width; x += s) {
  //   for (let y = 0; y < cam.height; y += s) {
  //     let i = (y * img.width + x) * 4;
  //     let r = cam.pixels[i + 0]
  //     let g = cam.pixels[i + 1]
  //     let b = cam.pixels[i + 2]
  //     let br = (r + g + b) / 3 //brightness 
  //     let z = map(br, 0, 255, 500, 0)
  //     push()
  //     translate(-width / 2, -height / 2, z)
  //     fill(r, g, b)
  //     noStroke()
  //     rect(x, y, s)
  //     pop()

  //   }
  // }
  // pop();

  // for (let n = 0; n < 100; n++) {
  //   let x = floor(random(cam.width))
  //   let y = floor(random(cam.height))
  //   let s = random(5, 30)
  //   // console.log(x)
  //   let i = (y * cam.width + x) * 4;
  //   let r = cam.pixels[i + 0]
  //   let g = cam.pixels[i + 1]
  //   let b = cam.pixels[i + 2]

  //   fill(r, g, b)
  //   noStroke()
  //   circle(x, y, s)
  // }

}