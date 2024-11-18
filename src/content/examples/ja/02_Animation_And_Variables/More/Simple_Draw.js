/*
 * @name シンプルな描画
 * @description mouseX、mouseY、pmouseX、pmouseYの値を使ってタッチで画面に描画します。
 */

function setup() {
  createCanvas(displayWidth, displayHeight);
  strokeWeight(10);
  stroke(0);
}

function touchMoved() {
  line(mouseX, mouseY, pmouseX, pmouseY);
  return false;
}
