// 円の半径
let radius = 24;

// 長方形の端とキャンバスの端の距離
let edge = 100;

// 円の中心とキャンバスの端の距離
// 円が長方形の端にあるとき
let inner = edge + radius;

function setup() {
  createCanvas(720, 400);
  noStroke();

  // 半径モードを使用して、circle()の3番目のパラメータとして半径を渡します
  ellipseMode(RADIUS);

  // コーナーモードを使用して、長方形のコーナー座標を渡します
  rectMode(CORNERS);

  describe(
    "ピンクの長方形が灰色の背景に描かれています。カーソルはピンクの長方形内で白い円を動かします。",
  );
}

function draw() {
  background(230);

  // 長方形を描画
  fill(237, 34, 93);
  rect(edge, edge, width - edge, height - edge);

  // 長方形に制約された円の座標を計算
  let circleX = constrain(mouseX, inner, width - inner);
  let circleY = constrain(mouseY, inner, height - inner);

  // 円を描画
  fill(255);
  circle(circleX, circleY, radius);
}
