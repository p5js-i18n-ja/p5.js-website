/*
 * @name ランダム・ガウシアン
 * @arialabel 半透明の白い円が左右に何度も重なって描かれ、白い筋ができます。
 * @frame 720,400
 * @description このスケッチは、ガウス分布のランダムな数値に結びつけられた x および y の位置で楕円を描きます。
 * <br><br><small><em>この例は、Processingウェブサイトの <a href="https://processing.org/examples/randomgaussian.html">Random Gaussian の例</a>
 * を移植したものです。</em></small>
 */

function setup() {
  createCanvas(720, 400);
  background(0);
}

function draw() {
  // 平均 0、標準偏差 1.0 のガウス分布の乱数を取得します。
  let val = randomGaussian();

  let sd = 60; // 標準偏差の定義
  let mean = width / 2; // 平均値を定義（X軸に沿った画面の真ん中）
  let x = val * sd + mean; // ガウス乱数を標準偏差と平均でスケーリングします。

  noStroke();
  fill(255, 10);
  ellipse(x, height / 2, 32, 32); // 「通常の」ランダムな位置に楕円を描きます。
}
