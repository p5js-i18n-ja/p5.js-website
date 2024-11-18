/*
 * @name 線形グラデーション
 * @arialabel 背景は左右が白で、中央が黒にグラデーションしています。背景のグラデーション上に2つの長い長方形があります。上の長方形は上辺がオレンジで、下辺が青にグラデーションしています。下の長方形は左側が青で始まり、右側がオレンジにグラデーションしています。
 * @description lerpColor() 関数は、二つの色の間を
 * 補間するのに便利です。
 */
// Constants
const Y_AXIS = 1;
const X_AXIS = 2;
let b1, b2, c1, c2;

function setup() {
  createCanvas(710, 400);

  // 色を定義します。
  b1 = color(255);
  b2 = color(0);
  c1 = color(204, 102, 0);
  c2 = color(0, 102, 153);

  noLoop();
}

function draw() {
  // 背景
  setGradient(0, 0, width / 2, height, b1, b2, X_AXIS);
  setGradient(width / 2, 0, width / 2, height, b2, b1, X_AXIS);
  // 前景
  setGradient(50, 90, 540, 80, c1, c2, Y_AXIS);
  setGradient(50, 190, 540, 80, c2, c1, X_AXIS);
}

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // 上から下へのグラデーションです。
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // 左から右へのグラデーションです。
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}
