/*
 * @name 変数
 * @arialabel 黒い背景に、灰色の線で形成された3組の長方形があります。
 * @description 変数は、値を格納するために使用します。
 * この例で、変数の値を変更して構成に影響を与えてみましょう。
 */
function setup() {
  createCanvas(720, 400);
  background(0);
  stroke(153);
  strokeWeight(4);
  strokeCap(SQUARE);

  let a = 50;
  let b = 120;
  let c = 180;

  line(a, b, a + c, b);
  line(a, b + 10, a + c, b + 10);
  line(a, b + 20, a + c, b + 20);
  line(a, b + 30, a + c, b + 30);

  a = a + c;
  b = height - b;

  line(a, b, a + c, b);
  line(a, b + 10, a + c, b + 10);
  line(a, b + 20, a + c, b + 20);
  line(a, b + 30, a + c, b + 30);

  a = a + c;
  b = height - b;

  line(a, b, a + c, b);
  line(a, b + 10, a + c, b + 10);
  line(a, b + 20, a + c, b + 20);
  line(a, b + 30, a + c, b + 30);
}
