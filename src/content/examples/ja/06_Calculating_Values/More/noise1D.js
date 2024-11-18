/*
 * @name ノイズ 1D
 * @arialabel パーリンノイズに基づき、白い円が左右に動きます。
 * @description 1次元パーリンノイズを使って位置を割り当てます。
 */
let xoff = 0.0;
let xincrement = 0.01;

function setup() {
  createCanvas(710, 400);
  background(0);
  noStroke();
}

function draw() {
  // アルファブレンドされた背景を作成します。
  fill(0, 10);
  rect(0, 0, width, height);

  //let n = random(0,width);  // ノイズの代わりに次の行を試してみましょう。

  // xoff と、ウィンドウの幅に基づいてスケールされた
  // ノイズ値を取得します。
  let n = noise(xoff) * width;

  // 各サイクルで、xoffをインクリメントします。
  xoff += xincrement;

  // パーリンノイズで生成された値で楕円を描きます。
  fill(200);
  ellipse(n, height / 2, 64, 64);
}
