let img;
let s = 5;
function preload() {
  img = loadImage("assets/bg.png");
}
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");
  // createCanvas(windowWidth, windowHeight);
}
function draw() {
  background(0);
  img.loadPixels(); //very important
  //image(img, 0, 0, width, height);

  let scaleX = width / img.width;
  let scaleY = height / img.height;

  for (let x = 0; x < img.width; x += s) {
    for (let y = 0; y < img.height; y += s) {
      let i = (x + y * img.width) * 4;
      let r = (img.pixels[i + 0]);
      let g = (img.pixels[i + 1]);
      let b = (img.pixels[i + 2]);
      strokeWeight(0.5)

      fill(r, g, b);

      rect(
        x * scaleX,
        y * scaleY,
        s * scaleX,
        s * scaleY
      );
    }
  }
}







