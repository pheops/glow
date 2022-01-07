
/*
YOUR SKETCH GOES HERE
*/
//TEMPLATE VARIABLES/////////
let cnv;
let zoomBy = 1;
let xOffset = 0;
let yOffset = 0;
let mx = 0;
let my = 0;

let w = 400;
let h = 400;

//SKETCH VARIABLES
var amp;
var button;
var volhistory = [];
//let fft;
var vol;
let iconPause;
let iconPlay;
let paused = true;

var blobs = []

//PRELOAD
function preload() {
  song = loadSound("assets/modular.mp3");
  iconPause = loadImage("assets/play.png");
  iconPlay = loadImage("assets/pause.png");
}





function setup() {
  //TEMPLATE SETUP
  cnv = createCanvas(w, h);
  cnv.parent('sketch-holder');
  frameRate(30);    
  windowResized();
  //TEMPLATE SETUP

  colorMode(HSB);
  cnv.mousePressed(userStartAudio);

  amp = new p5.Amplitude();

  iconPause.loadPixels();
  iconPlay.loadPixels();

  // start paused
  pauseToggle();
  

  for (i = 0; i < 10; i++) blobs.push(new Blob(random(0,width), (random(200,height))));

}


function pauseToggle() {

  paused = !paused;

  if(paused) {
    song.loop();
    //noLoop();
  } else {
    song.pause();
    // loop();
    // deltaTime = 0;
  }
}

function drawPlayButton() {
  let speaker = speakerImage();
  //tint(255, 255, 255, 100);
  image(speaker, width-20, height - 20, speaker.width / 3, speaker.height / 3);
}

function mouseClicked() {
  userStartAudio();
  pauseToggle();
  
}



function speakerImage() {
  if(paused)
    return iconPlay;
  else
    return iconPause;
}


function draw() {
  // background(250)
  // ellipse(w/2,h/2,50,50);
  // line(0,my,h,my);
  // line(mx,0,mx,w);

  background(31);
  
  loadPixels();
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      let sum = 0;
      for (i = 0; i < blobs.length; i++) {
        let xdif = x - blobs[i].x;
        let ydif = y - blobs[i].y;
        let d = sqrt((xdif * xdif) + (ydif * ydif)) ;
        sum += 10 * blobs[i].r / d;
      }
      
      set(x, y, color(constrain(sum, 0, 50), constrain(sum, 0, 150), constrain(sum, 0, 150)));
    }
  }
  updatePixels();

  for (i = 0; i < blobs.length; i++) {
    blobs[i].update();
  //blobs[i].show();
  }


  drawPlayButton();

}

// function mouseClicked() {
//  mx = winMouseX / zoomBy - xOffset / zoomBy;
//  my = winMouseY / zoomBy - yOffset / zoomBy;

// }

// function mouseDragged() {
//  mx = winMouseX / zoomBy - xOffset / zoomBy;
//  my = winMouseY / zoomBy - yOffset / zoomBy;
// }

// function mouseMoved() {
//  mx = winMouseX / zoomBy - xOffset / zoomBy;
//  my = winMouseY / zoomBy - yOffset / zoomBy;
// }



function windowResized() {
  //zoomBy = (windowWidth / windowHeight + w/h < windowHeight / windowWidth) ? windowWidth / w : windowHeight / h;
  zoomBy = windowWidth > windowHeight ? windowHeight / (h+30) : windowWidth / (w+30);
  cnv.style("zoom", zoomBy);
  xOffset = document.getElementById("sketch-holder").offsetLeft;
  yOffset = document.getElementById("sketch-holder").offsetTop;

}
