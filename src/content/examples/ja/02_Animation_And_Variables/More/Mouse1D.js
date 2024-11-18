/*
 * @name マウス 1D
 * @arialabel 灰色の背景に、赤紫色の正方形が2つ描かれています。
 * マウスをウィンドウの左側に動かすと、左側の赤紫色の正方形がウィンドウの左半分を埋めるように増え、右側の正方形は消えます。マウスを右側に動かすとその逆になります。
 * @description マウスを左右に動かしてバランスをずらしててみください。
 * 「mouseX」変数が四角形の大きさと色の両方の制御に使われます。
 */
function setup() {
  createCanvas(720, 400);
  noStroke();
  rectMode(CENTER);
}

function draw() {
  background(230);

  let r1 = map(mouseX, 0, width, 0, height);
  let r2 = height - r1;

  fill(237, 34, 93, r1);
  rect(width / 2 + r1 / 2, height / 2, r1, r1);

  fill(237, 34, 93, r2);
  rect(width / 2 - r2 / 2, height / 2, r2, r2);
}
