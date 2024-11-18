// 円の位置と色のための変数を宣言します

let circleX;
let circleY;
let circleColor;

function setup() {
  createCanvas(710, 400);

  // 円の初期位置と色を設定します
  setPositionAndColor();

  describe(
    "ユーザーがキャンバスをクリックすると、位置と色がランダムに変わる円。",
  );
}

function setPositionAndColor() {
  // 位置をランダムな値に設定します（キャンバス内）
  circleX = random(0, width);
  circleY = random(0, height);

  // R、G、Bを範囲(100, 256)のランダムな値に設定します
  circleColor = color(random(100, 256), random(100, 256), random(100, 256));
}

function draw() {
  background(10);

  // (x,y)の位置に色cで円を描画します
  fill(circleColor);
  circle(circleX, circleY, 100);
}

function mousePressed() {
  // マウスが押されたときに（再）設定します
  setPositionAndColor();
}
