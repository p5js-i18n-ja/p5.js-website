/*
 * @name ノイズ・ウェーブ
 * @arialabel ウェーブの形状はパーリンノイズによって生成されています。
 * @description パーリンノイズを使用して波のようなパターンを生成します。
 * オリジナルは Daniel Shiffman のものです。
 */
let yoff = 0.0; // 2つ目の次元のパーリンノイズ

function setup() {
  createCanvas(710, 400);
}

function draw() {
  background(51);

  fill(255);
  // 波の位置を使って、多角形を描きます。
  beginShape();

  let xoff = 0; // オプション #1: 2D ノイズ
  // let xoff = yoff; // オプション #2: 1D ノイズ

  // 水平方向のピクセル数を超えるまで、反復処理をします。
  for (let x = 0; x <= width; x += 10) {
    // ノイズに従ってy値を計算し、マッピングします。

    // オプション #1: 2D ノイズ
    let y = map(noise(xoff, yoff), 0, 1, 200, 300);

    // オプション #2: 1D ノイズ
    // let y = map(noise(xoff), 0, 1, 200,300);

    // 頂点を設定する
    vertex(x, y);
    // ノイズ用に x次元の値を増加させます。
    xoff += 0.05;
  }
  // ノイズ用に y次元の値を増加させます。
  yoff += 0.01;
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}
