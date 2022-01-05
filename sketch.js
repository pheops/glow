var amp;
var button;
var volhistory = [];
//let fft;
var vol;
let iconPause;
let iconPlay;
let paused = true;

var blobs = []

function preload() {
  song = loadSound("assets/modular.mp3");
  iconPause = loadImage("assets/play.png");
  iconPlay = loadImage("assets/pause.png");
}

function setup() {
  let cnv = createCanvas(400, 400); 
  cnv.mousePressed(userStartAudio);
  cnv.style("canvas-container")
  //cnv.mousePressed(toggleSong);  

  amp = new p5.Amplitude();
  //fft = new p5.FFT(0.8, 16);
  
  colorMode(HSB);
  
  //button = createImg('assets/play.png');
  // button.width = 5
  // button.height = 5
 
  // button.style('padding', '5px');
  // button.style('width', '20px');
  // button.mousePressed(toggleSong);

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

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
    button.style('background-color', 'black');
   
  } else {
    song.loop();
 button.style('background-color', 'coral');
  }
}