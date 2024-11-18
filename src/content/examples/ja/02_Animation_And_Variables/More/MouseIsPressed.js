/*
 * @name マウス押下
 * @arialabel マウス操作で灰色の背景にピンクの十字が描かれます。マウスをクリックしていると十字の色が白に変更されます。
 * @description マウスを動かしてシェイプを配置します。
 * マウスボタンを押すと、色が反転します。
 */
function setup() {
  createCanvas(720, 400);
  background(230);
  strokeWeight(2);
}

function draw() {
  if (mouseIsPressed) {
    stroke(255);
  } else {
    stroke(237, 34, 93);
  }
  line(mouseX - 66, mouseY, mouseX + 66, mouseY);
  line(mouseX, mouseY - 66, mouseX, mouseY + 66);
}
