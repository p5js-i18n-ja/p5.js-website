/*
 * @name 複数のオブジェクト
 * @arialabel 濃いネイビーの背景にランダムに配置された４つの小さな白い円が、ひとりでに様々な方向に少しずつそわそわと動きます。
 * @description Jitterクラスを作成し、複数のオブジェクトをインスタンス化し、
 * スクリーン上で動かします。
 */

let bug1; // オブジェクトの宣言
let bug2;
let bug3;
let bug4;

function setup() {
  createCanvas(710, 400);
  // オブジェクトの作成
  bug1 = new Jitter();
  bug2 = new Jitter();
  bug3 = new Jitter();
  bug4 = new Jitter();
}

function draw() {
  background(50, 89, 100);
  bug1.move();
  bug1.display();
  bug2.move();
  bug2.display();
  bug3.move();
  bug3.display();
  bug4.move();
  bug4.display();
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
