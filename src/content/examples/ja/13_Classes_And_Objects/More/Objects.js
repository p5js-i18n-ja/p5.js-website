/*
 * @name オブジェクト
 * @arialabel 濃いネイビーの背景に小さな白い円が、ひとりでに様々な方向に少しずつそわそわと動きます。
 * @description Jitterクラスを作成し、オブジェクトをインスタンス化し、
 * スクリーン上で動かします。
 * Casey Reas と Ben Fry の Processing 入門からの移植です。
 */

let bug; // オブジェクトの宣言

function setup() {
  createCanvas(710, 400);
  // オブジェクトの作成
  bug = new Jitter();
}

function draw() {
  background(50, 89, 100);
  bug.move();
  bug.display();
}

// ジッターclass
class Jitter {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.diameter = random(10, 30);
    this.speed = 1;
  }

  move() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  }

  display() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}
