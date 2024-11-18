/*
 * @name マウス 2D
 * @arialabel 灰色の背景に、赤紫色の正方形が2つ描かれています。
 * マウスを左に動かすと、正方形は左方向に回転し、マウスを右に動かすと、その逆に回転します。
 * @description マウスを動かすと、各ボックスの位置や大きさが変化します。
 */
function setup() {
  createCanvas(720, 400);
  noStroke();
  rectMode(CENTER);
}

function draw() {
  background(230);
  fill(244, 122, 158);
  rect(mouseX, height / 2, mouseY / 2 + 10, mouseY / 2 + 10);
  fill(237, 34, 93);
  let inverseX = width - mouseX;
  let inverseY = height - mouseY;
  rect(inverseX, height / 2, inverseY / 2 + 10, inverseY / 2 + 10);
}
