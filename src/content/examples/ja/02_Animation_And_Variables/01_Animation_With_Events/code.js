// 円の水平方向の位置を表す変数を宣言
let x = 25;

function setup() {
  // キャンバスを作成
  createCanvas(720, 400);

  // 色モードを色相-彩度-明度（HSB）に設定
  colorMode(HSB);

  // テキストサイズを設定
  textSize(20);

  // アニメーションは開始しない
  noLoop();
}

function draw() {
  // 背景をクリア
  background(0);

  // フレームカウントによって決まる色相で円を描画
  fill(x / 3, 90, 90);
  circle(x, height / 2, 50);

  // x変数を5増加させる
  x += 5;

  // 円が右側から外れたら位置をリセット
  if (x > width + 25) {
    x = -25;
  }

  describe("右に移動する円");
}

function mousePressed() {
  // アニメーションループを開始/停止
  if (isLooping()) {
    noLoop();
  } else {
    loop();
  }
}

function keyPressed() {
  // 1フレーム描画
  redraw();
}
