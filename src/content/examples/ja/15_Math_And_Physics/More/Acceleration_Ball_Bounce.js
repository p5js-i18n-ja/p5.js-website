/*
 * @name 加速度とボールのはねかえり
 * @description 加速度Xと加速度Yの値に基づいて楕円を移動させ、キャンバスの端に触れるとはねかえります。
 */

// 位置変数
let x = 0;
let y = 0;

// スピード - ベロシティ
let vx = 0;
let vy = 0;

// 加速
let ax = 0;
let ay = 0;

let vMultiplier = 0.007;
let bMultiplier = 0.6;

function setup() {
  createCanvas(displayWidth, displayHeight);
  fill(0);
}

function draw() {
  background(255);
  ballMove();
  ellipse(x, y, 30, 30);
}

function ballMove() {
  ax = accelerationX;
  ay = accelerationY;

  vx = vx + ay;
  vy = vy + ax;
  y = y + vy * vMultiplier;
  x = x + vx * vMultiplier;

  // キャンバスの端に触れるとはねかえります。
  if (x < 0) {
    x = 0;
    vx = -vx * bMultiplier;
  }
  if (y < 0) {
    y = 0;
    vy = -vy * bMultiplier;
  }
  if (x > width - 20) {
    x = width - 20;
    vx = -vx * bMultiplier;
  }
  if (y > height - 20) {
    y = height - 20;
    vy = -vy * bMultiplier;
  }
}
