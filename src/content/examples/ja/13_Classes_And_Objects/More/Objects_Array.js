/*
 * @name オブジェクトの配列
 * @arialabel 濃いネイビーの背景にランダムに配置された複数の大小の白い円が、ひとりでに様々な方向に少しずつそわそわと動きます。
 * @description Jitterクラスを作成し、複数のオブジェクトをインスタンス化し、
 * スクリーン上で動かします。
 */

let bugs = []; // Jitterオブジェクトの配列

function setup() {
  createCanvas(710, 400);
  // オブジェクトの作成
  for (let i = 0; i < 50; i++) {
    bugs.push(new Jitter());
  }
}

function draw() {
  background(50, 89, 100);
  for (let i = 0; i < bugs.length; i++) {
    bugs[i].move();
    bugs[i].display();
  }
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
