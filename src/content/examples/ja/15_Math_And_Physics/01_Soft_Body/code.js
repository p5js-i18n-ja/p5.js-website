// 物理計算のための変数を宣言
let centerX = 0.0;
let centerY = 0.0;
let radius = 45;
let rotAngle = -90;
let accelX = 0.0;
let accelY = 0.0;
let deltaX = 0.0;
let deltaY = 0.0;
let springing = 0.0009;
let damping = 0.98;

// 頂点の位置を指定するための変数を宣言
let nodes = 5;
let nodeStartX = [];
let nodeStartY = [];
let nodeX = [];
let nodeY = [];
let angle = [];
let frequency = [];

// 曲線の緊張度を指定するための変数を宣言
let organicConstant = 1.0;

function setup() {
  createCanvas(710, 400);

  // キャンバスの中央から開始
  centerX = width / 2;
  centerY = height / 2;

  // 配列を0で初期化
  for (let i = 0; i < nodes; i++) {
    nodeStartX[i] = 0;
    nodeStartY[i] = 0;
    nodeX[i] = 0;
    nodeY[i] = 0;
    angle[i] = 0;
  }

  // 角のノードの周波数を初期化
  for (let i = 0; i < nodes; i++) {
    frequency[i] = random(5, 12);
  }

  noStroke();
  angleMode(DEGREES);
}

function draw() {
  // フェード効果のためにアルファブレンディングを使用
  background(0, 50);

  // 形状を描画し、移動させる
  drawShape();
  moveShape();
}

function drawShape() {
  // ノードの開始位置を計算
  for (let i = 0; i < nodes; i++) {
    nodeStartX[i] = centerX + cos(rotAngle) * radius;
    nodeStartY[i] = centerY + sin(rotAngle) * radius;
    rotAngle += 360.0 / nodes;
  }

  // 多角形を描画
  curveTightness(organicConstant);
  let shapeColor = lerpColor(color("red"), color("yellow"), organicConstant);
  fill(shapeColor);

  beginShape();
  for (let i = 0; i < nodes; i++) {
    curveVertex(nodeX[i], nodeY[i]);
  }
  endShape(CLOSE);
}

function moveShape() {
  // 中心点を移動
  deltaX = mouseX - centerX;
  deltaY = mouseY - centerY;

  // バネ効果を作成
  deltaX *= springing;
  deltaY *= springing;
  accelX += deltaX;
  accelY += deltaY;

  // 中心を移動
  centerX += accelX;
  centerY += accelY;

  // バネの動きを遅くする
  accelX *= damping;
  accelY *= damping;

  // 全体の加速度に基づいて曲線の緊張度を変更;
  // abs()を使用して加速度の方向に依存しないようにする
  organicConstant = 1 - (abs(accelX) + abs(accelY)) * 0.1;

  // ノードを移動
  for (let i = 0; i < nodes; i++) {
    nodeX[i] = nodeStartX[i] + sin(angle[i]) * (accelX * 2);
    nodeY[i] = nodeStartY[i] + sin(angle[i]) * (accelY * 2);
    angle[i] += frequency[i];
  }
}
