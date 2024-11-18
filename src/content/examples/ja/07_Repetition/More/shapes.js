/*
 * @name シンプルなシェイプ
 * @arialabel 灰色のキャンバスに4つのピンクの図形（円、長方形、三角形、花）が描かれています。
 * @description この例には、円、四角、三角、花が含まれています。
 */
function setup() {
  // キャンバスを作成します。
  createCanvas(720, 400);
  background(200);

  // 色を設定します。
  fill(204, 101, 192, 127);
  stroke(127, 63, 120);

  // 長方形
  rect(40, 120, 120, 40);
  // 楕円
  ellipse(240, 240, 80, 80);
  // 三角形
  triangle(300, 100, 320, 100, 310, 80);

  // シンプルな花のデザイン
  translate(580, 200);
  noStroke();
  for (let i = 0; i < 10; i++) {
    ellipse(0, 30, 20, 80);
    rotate(PI / 5);
  }
}
