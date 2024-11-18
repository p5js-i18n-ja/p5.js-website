/*
 * @name バウンス
 * @arialabel 灰色の背景の上に、白い円が動いています。ウィンドウの端にぶつかると、方向が変わります。
 * @frame 720,400
 * @description ウィンドウの端に図形がぶつかると、進行方向が反転します。
 */

let rad = 60; // 図形の幅
let xpos, ypos; // 図形の開始位置

let xspeed = 2.8; // 図形の速度
let yspeed = 2.2; // 図形の速度

let xdirection = 1; // 左または右
let ydirection = 1; // 上から下へ

function setup() {
  createCanvas(720, 400);
  noStroke();
  frameRate(30);
  ellipseMode(RADIUS);
  // 図形の開始位置を設定します。
  xpos = width / 2;
  ypos = height / 2;
}

function draw() {
  background(102);

  // 図形の位置を更新します。
  xpos = xpos + xspeed * xdirection;
  ypos = ypos + yspeed * ydirection;

  // 画面の境界を超えるかどうかをテストします。
  // もし逆方向である場合、-1をかけて方向を反転します。
  if (xpos > width - rad || xpos < rad) {
    xdirection *= -1;
  }
  if (ypos > height - rad || ypos < rad) {
    ydirection *= -1;
  }

  // 図形を描きます。
  ellipse(xpos, ypos, rad, rad);
}
