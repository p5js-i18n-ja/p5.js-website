/*
 * @name 数値
 * @arialabel 黒い画面の上半分に1本の白い垂直線、下半分にも1本の白い垂直線があります。両方の線は、画面の左から右に移動します。上の垂直線の方が下の垂直線よりも速く移動します。
 * @frame 720,400
 * @description 数値（Number）は小数点をもつ形式とない形式の
 * どちらでも書くことができます。
 * integer（一般的には int と呼ばれます）は整数で、小数点のない数値です。
 * float は浮動小数点数で、つまり小数点をもつ数値です。
 */
let a = 0; // Number 型のグローバル変数「a」を作成します。
let b = 0; // Number 型のグローバル変数「b」を作成します。

function setup() {
  createCanvas(720, 400);
  stroke(255);
}

function draw() {
  background(0);

  a = a + 1; // a を integer 型の数値で加算します。
  b = b + 0.2; // b を float 型の数値で加算します。
  line(a, 0, a, height / 2);
  line(b, height / 2, b, height);

  if (a > width) {
    a = 0;
  }
  if (b > width) {
    b = 0;
  }
}
