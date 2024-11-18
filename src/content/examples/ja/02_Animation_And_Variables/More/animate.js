/*
 * @name アニメーション
 * @arialabel 薄い灰色の背景に、濃い灰色の円が画面下部の中央から登場し、左右に少し動きながら上に移動しています。
 * @description 円が動きます。
 */
// 円がどこにあるのか
let x, y;

function setup() {
  createCanvas(720, 400);
  // 真ん中からスタートします。
  x = width / 2;
  y = height;
}

function draw() {
  background(200);

  // 円を描きます。
  stroke(50);
  fill(100);
  ellipse(x, y, 24, 24);

  // 横軸にランダムにジグザグに動きます。
  x = x + random(-1, 1);
  // 一定速度で上昇します。
  y = y - 1;

  // 画面下部にリセットします。
  if (y < 0) {
    y = height;
  }
}
