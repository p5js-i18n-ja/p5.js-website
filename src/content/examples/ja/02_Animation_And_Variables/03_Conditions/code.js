// 位置変数
let circlePositionX = 200;
let circlePositionY = 200;

// 速度変数
let circleSpeedX = 2;
let circleSpeedY = 3;

// 半径変数
let circleRadius = 25;

// 色相変数
let circleHue = 0;

function setup() {
  // 400x400のキャンバスを作成
  createCanvas(400, 400);

  // キャンバスを白で覆う
  background(255);

  // 半径を使用して楕円を描画
  ellipseMode(RADIUS);

  // キャンバスの両側に長方形を描画
  noStroke();
  fill(128);
  rect(0, 0, 100, height);
  rect(300, 0, 100, height);

  // 円の軌跡の色に対して色相・彩度・明度を使用
  colorMode(HSB);

  // ストロークの重さを4ユニットに設定
  strokeWeight(4);

  // スクリーンリーダー用の説明を作成
  describe(
    "円はキャンバスの中心から始まります。ユーザーがマウスを押し続けると、円はキャンバス内を跳ね回り、その内部は黒と白の間で切り替わり、輪郭は色の間でフェードし、虹の軌跡を残します。",
  );
}

function draw() {
  // 現在の色相を使用してストロークの色を設定
  stroke(circleHue, 80, 90);

  // 円のx位置が100と300の間にある場合
  if (circlePositionX >= 100 && circlePositionX <= 300) {
    // 塗りつぶしの色を黒に設定
    fill(0);

    // それ以外の場合
  } else {
    // 塗りつぶしの色を白に設定
    fill(255);
  }

  // 現在の位置に円を描画
  circle(circlePositionX, circlePositionY, circleRadius);

  // マウスが押されている場合、スケッチをアニメーション化
  if (mouseIsPressed === true) {
    // 円の位置に速度を加えて移動させる
    circlePositionX = circlePositionX + circleSpeedX;
    circlePositionY = circlePositionY + circleSpeedY;

    // 色相を1増加させる
    circleHue = circleHue + 1;
  }

  // 色相が最大値に達した場合
  if (circleHue >= 360) {
    // 色相を0にリセット
    circleHue = 0;
  }

  // 円が左または右の端を超えた場合
  if (
    circlePositionX < circleRadius ||
    circlePositionX > width - circleRadius
  ) {
    // 水平速度を反転
    circleSpeedX = -circleSpeedX;
  }

  // 円が上または下の端を超えた場合
  if (
    circlePositionY < circleRadius ||
    circlePositionY > height - circleRadius
  ) {
    // 垂直速度を反転
    circleSpeedY = -circleSpeedY;
  }
}