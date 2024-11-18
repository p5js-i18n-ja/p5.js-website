/*
 * @name インタラクティブ 1
 * @arialabel 濃い灰色の背景の真ん中に円があり、クリックすると色が変わります。
 * @frame 720,425
 * @description クリックすると円の色が変わります。
 */

// 赤、緑、青の色の変数
let r, g, b;

function setup() {
  createCanvas(720, 400);
  // 色をランダムに選びます。
  r = random(255);
  g = random(255);
  b = random(255);
}

function draw() {
  background(127);
  // 円を描きます。
  strokeWeight(2);
  stroke(r, g, b);
  fill(r, g, b, 127);
  ellipse(360, 200, 200, 200);
}

// ユーザーがマウスをクリックしたとき
function mousePressed() {
  // マウスが円の中に入っているかどうかをチェックします。
  let d = dist(mouseX, mouseY, 360, 200);
  if (d < 100) {
    // 新しく色をランダムに選びます。
    r = random(255);
    g = random(255);
    b = random(255);
  }
}
