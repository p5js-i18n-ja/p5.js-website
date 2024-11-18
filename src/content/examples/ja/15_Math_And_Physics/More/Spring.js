/*
 * @name スプリング
 * @arialabel 灰色の背景に黒い縦長の長方形があり、上に薄い灰色の横長の長方形が載っています。ユーザーは横長の長方形を上下に動かすことができます。横長の長方形を離すと、システムはスプリングのように動き、横長の長方形が上下に動くにつれて縦長の長方形が伸縮します。
 * @frame 710, 400
 * @description 水平バーをクリックし、ドラッグして離すと、スプリングが起動します。
 */
// 上部バーのスプリング描画定数
let springHeight = 32,
  left,
  right,
  maxHeight = 200,
  minHeight = 100,
  over = false,
  move = false;

// スプリングシミュレーション定数
let M = 0.8, // 質量
  K = 0.2, // スプリング定数
  D = 0.92, // ダンピング
  R = 150; // 安定位置

// スプリングシミュレーション変数
let ps = R, // 位置
  vs = 0.0, // 速度
  as = 0, // 加速度
  f = 0; // 力

function setup() {
  createCanvas(710, 400);
  rectMode(CORNERS);
  noStroke();
  left = width / 2 - 100;
  right = width / 2 + 100;
}

function draw() {
  background(102);
  updateSpring();
  drawSpring();
}

function drawSpring() {
  // ベースを描画します。
  fill(0.2);
  let baseWidth = 0.5 * ps + -8;
  rect(width / 2 - baseWidth, ps + springHeight, width / 2 + baseWidth, height);

  // 色を設定し、上部バーを描画します。
  if (over || move) {
    fill(255);
  } else {
    fill(204);
  }

  rect(left, ps, right, ps + springHeight);
}

function updateSpring() {
  // スプリングの位置を更新します。
  if (!move) {
    f = -K * (ps - R); // f=-ky
    as = f / M; // 加速度（f=ma == a=f/m）を設定します。
    vs = D * (vs + as); // 速度を設定します。
    ps = ps + vs; // 位置を更新します。
  }

  if (abs(vs) < 0.1) {
    vs = 0.0;
  }

  // マウスが上部バーの上にあるかどうかをテストします。
  if (
    mouseX > left &&
    mouseX < right &&
    mouseY > ps &&
    mouseY < ps + springHeight
  ) {
    over = true;
  } else {
    over = false;
  }

  // 上部バーの位置を設定し、制約をかけます。
  if (move) {
    ps = mouseY - springHeight / 2;
    ps = constrain(ps, minHeight, maxHeight);
  }
}

function mousePressed() {
  if (over) {
    move = true;
  }
}

function mouseReleased() {
  move = false;
}
