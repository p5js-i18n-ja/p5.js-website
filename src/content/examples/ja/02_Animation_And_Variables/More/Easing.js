/*
 * @name イージング
 * @arialabel ピンクの背景に白い円があり、ユーザーがマウス移動するとホバリングしながら円がついてきます。
 * @description マウスを画面全体に動かすと、シンボルが追従します。
 * アニメーションの各フレームを描画する間に、
 * プログラムはシンボルの位置とカーソルの位置の差を計算します。
 * もしその差が 1 ピクセルより大きければ、
 * シンボルは現在の位置からカーソルに向かって
 * 距離の一部（ 0.05 ）だけ移動します。
 */
let x = 1;
let y = 1;
let easing = 0.05;

function setup() {
  createCanvas(720, 400);
  noStroke();
}

function draw() {
  background(237, 34, 93);
  let targetX = mouseX;
  let dx = targetX - x;
  x += dx * easing;

  let targetY = mouseY;
  let dy = targetY - y;
  y += dy * easing;

  ellipse(x, y, 66, 66);
}
