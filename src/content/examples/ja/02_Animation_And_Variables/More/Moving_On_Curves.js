/*
 * @name カーブしながら移動
 * @arialabel 白い円が y = x^4 の曲線上で灰色の画面を移動します。移動の跡が残ります。
 * @frame 720,400
 * @description この例では、円は y = x^4 の曲線上を移動します。
 * マウスをクリックすると、新しい位置に移動します。
 */

let beginX = 20.0; // 初期 x 座標
let beginY = 10.0; // 初期 y 座標
let endX = 570.0; // 終了 x 座標
let endY = 320.0; // 終了 y 座標
let distX; // x 軸方向の移動距離
let distY; // y 軸方向の移動距離
let exponent = 4; // 曲線を決定する指数
let x = 0.0; // 現在の x 座標
let y = 0.0; // 現在の y 座標
let step = 0.01; // パス上の各ステップのサイズ
let pct = 0.0; // 移動した割合（0.0から1.0まで）

function setup() {
  createCanvas(720, 400);
  noStroke();
  distX = endX - beginX;
  distY = endY - beginY;
}

function draw() {
  fill(0, 2);
  rect(0, 0, width, height);
  pct += step;
  if (pct < 1.0) {
    x = beginX + pct * distX;
    y = beginY + pow(pct, exponent) * distY;
  }
  fill(255);
  ellipse(x, y, 20, 20);
}

function mousePressed() {
  pct = 0.0;
  beginX = x;
  beginY = y;
  endX = mouseX;
  endY = mouseY;
  distX = endX - beginX;
  distY = endY - beginY;
}
