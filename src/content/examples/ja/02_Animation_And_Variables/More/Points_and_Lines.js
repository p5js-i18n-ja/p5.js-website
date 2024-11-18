/*
 * @name 点と線
 * @arialabel 黒い背景に白い正方形の輪郭線の描画します。
 * @description 点や線を使って基本的な形を描くことができます。
 * 変数「d」の値を変えることで形のスケールを調整できます。
 * 4つの変数は「d」の値に基づいて位置を設定します。
 */
function setup() {
  let d = 70;
  let p1 = d;
  let p2 = p1 + d;
  let p3 = p2 + d;
  let p4 = p3 + d;

  // 画面の幅を720ピクセル、高さを400ピクセルに設定します。
  createCanvas(720, 400);
  background(0);
  noSmooth();

  translate(140, 0);

  // 灰色の箱を描画します。
  stroke(153);
  line(p3, p3, p2, p3);
  line(p2, p3, p2, p2);
  line(p2, p2, p3, p2);
  line(p3, p2, p3, p3);

  // 白い点を描画します。
  stroke(255);
  point(p1, p1);
  point(p1, p3);
  point(p2, p4);
  point(p3, p1);
  point(p4, p2);
  point(p4, p4);
}
