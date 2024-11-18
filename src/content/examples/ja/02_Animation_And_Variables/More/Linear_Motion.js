/*
 * @name 線型
 * @arialabel 黒い背景に、画面の下から上に向かって x 軸に水平な白い線が移動しています。
 * @frame 720,400
 * @description 変数を変更して移動する線を作成します。
 * 線がウィンドウの端から出ると、
 * 変数は0に設定され、線が画面の下部に戻ります。
 */

let a;

function setup() {
  createCanvas(720, 400);
  stroke(255);
  a = height / 2;
}

function draw() {
  background(51);
  line(0, a, width, a);
  a = a - 0.5;
  if (a < 0) {
    a = height;
  }
}
