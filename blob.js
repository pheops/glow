
class Blob {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    let angle = random(0, 2 * PI);
    this.xspeed = random(2, 5) * Math.cos(angle);
    this.yspeed = random(2, 4) * Math.sin(angle);
    this.r = random(50, 200);
  }

  update() {
    
      vol = map(amp.getLevel(), 0, 1, .1, 30);  
      console.log(vol);
    

    this.x += this.xspeed * vol //(2 * Math.sin(vol));
    this.y += this.yspeed * vol //(5 * Math.cos(vol));//+ (vol*100 * Math.sin(angle));

    if (this.x  > width || this.x < 0) this.xspeed *= -1;
    if (this.y  > height || this.y < 0) this.yspeed *= -1;
  }

  show() {
    noFill();
    stroke(0);
    strokeWeight(4);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }
}