/*
 * @name ピクセル配列
 * @description マウスを上下にクリック＆ドラッグして信号を制御し、
 * 任意のキーを押し続けると現在読み取っているピクセルを見ることができます。
 * このプログラムは、画像のすべてのピクセルの色を順番に読み取り、
 * この色をウィンドウを埋めるために表示します。
 */

let img;
let direction = 1;
let signal = 0;

function setup() {
  createCanvas(640, 360);
  noFill();
  stroke(255);
  frameRate(30);
  img = loadImage("/assets/sea.jpg");
}

function draw() {
  if (signal > img.width * img.height - 1 || signal < 0) {
    direction = direction * -1;
  }

  if (mouseIsPressed) {
    let mx = constrain(mouseX, 0, img.width - 1);
    let my = constrain(mouseY, 0, img.height - 1);
    signal = my * img.width + mx;
  } else {
    signal += 0.33 * direction;
  }

  let sx = int(signal) % img.width;
  let sy = int(signal) / img.width;
  if (keyIsPressed) {
    set(0, 0, img); // 画像を描画するための高速な方法
    point(sx, sy);
    rect(sx - 5, sy - 5, 10, 10);
  } else {
    let c = img.get(sx, sy);
    background(c);
  }
}
