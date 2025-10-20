/*
Template for IMA's Creative Coding Lab 

Project A: Generative Creatures
CCLaboratories Biodiversity Atlas 
*/

let x = 200;
let y = 200;
let sp = 0.1;
let s = 20
function setup() {
  let canvas = createCanvas(800, 500);
    canvas.parent("p5-canvas-container");
  colorMode(HSB,100)
  
}

function draw(){
  
  background(255);
  push()
  noFill();
  for(let i=0; i<20; i+=5){
    for (let x = 0; x <= width; x += 15) {
   for (let y = 10; y <= height; y += 70){
     let s = map (noise (x*y), 0, 1, -30, 1)
     let h = map (noise (x*y),0,1,10,100)
     stroke(h,100,70)
    circle(x,y,10+i+s)
  }
    }
  } 
  pop()
  
  //
  x = width*noise(frameCount*0.01);
  y = height*noise(frameCount*0.01);

  
  if(checkMouse()){
    sp = map (mouseX, 0, width, 0.05, 0.3)
    s = map (mouseX, 0, width, 17, 40)
    let h = map (noise(frameCount*0.01), 0, 1, 10, 120)
  fill(h, 100, 100)
  }

  if (mouseIsPressed){
  let h = map (noise(x*0.5), 0, 1, 10, 150)
  fill(h, 100, 100)
  }
   
  push()
  if(keyIsPressed){
  background(255);
  // for(let i=0; i<20; i+=5){
    for (let y = 0; y <= height; y += 5) {
   for (let x = 0+10; x <= width; x += 40){
     let s = map (noise (x*y), 0, 1, -25, 1)
     // let h = map (noise (x*y), 0, 1, 40,60)
     let h = map (noise (x), 0, 1, 10,50)
     noStroke()
    // fill(h,100,100)
          fill(h,30,100)
    circle(x,y,10+s)
  }
    }
  s = s * 2
 
  }
  pop()
  drawCreature(x,y,s,sp)

}

function drawCreature(x,y,s,sp) {
  //body
  
  translate(x, y);
    for(let i=0; i< 5; i++){
    let size = map(i, 0, 4,50, 100); 
    let xCircle = map(i, 0, 4, 150, 0); 
    let yMovement = 50*sin(frameCount*sp + i* sp * 5);
    let legSize = map (i, 0, 4, 40, 70);
      //leg 
      push()
      translate(xCircle, yMovement);
  let angle = sin(frameCount * sp *1.2);
  angle = map(angle, -1, 1, -PI / 15, PI / 15);
  rotate(angle);
  line(0,0, 0, legSize * s * 0.05 );
  line(0, legSize * s * 0.05, -10, legSize * s * 0.05)
      pop()
    circle(xCircle,yMovement, size * s * 0.05)  
    
      //ears
    if(i == 4){
      push();
      let movement = s * 0.1 + 8*sin(frameCount*sp);
      translate(xCircle, yMovement);
      rotate(map(sin(frameCount*sp), -1, 1, -PI/10, PI/10));
      
      line(0-25 * s * 0.05, -30 * s * 0.05, 0-25 * s * 0.05, -80 * s * 0.05 );
      line(0+25 - s * 0.05, 0-30 * s * 0.05, 0+25 * s * 0.05, 0-80 * s * 0.05 );
      
      circle( 0-25 * s * 0.05, 0-80 * s * 0.05, s + movement ); 
      circle( 0+25 * s * 0.05, 0-80 * s * 0.05, s + movement); 
     
      //eyes 
      noFill()
      circle( 0 + 25 * s * 0.05  , 0  , s*2.5); 
      circle( 0-25 * s * 0.05, 0, s*2.5); 
      
      let eyeMovement= 15*sin(frameCount*sp)
      fill(0)
      circle( 0+25 * s * 0.05 + eyeMovement  , 0 + eyeMovement  , s*1.7); 
      circle( 0-25 * s * 0.05 + eyeMovement , 0 + eyeMovement , s*1.7 ); 
      
      pop();
      
    }
  }

}

function checkMouse() {
    let d = dist(mouseX, mouseY,width/2, height/2);
    if (d < 800) {
      return true;
    } else {
      return false;
    }
  }

