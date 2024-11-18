function setup() {
  // キャンバスを作成します
  createCanvas(720, 400);

  // 角度モードを度に設定します
  angleMode(DEGREES);

  // テキストの色、サイズ、配置を設定します
  fill(255);
  textSize(20);
  textAlign(CENTER, CENTER);

  // 色モードを色相-彩度-明度（HSB）に設定します
  colorMode(HSB);

  // スクリーンリーダー用の説明を作成します
  describe("キャンバスの中心を回転する線分");
}

function draw() {
  // 背景をクリアします
  background(0);

  // 角度0、30、60、90度をループします
  for (let angle = 0; angle <= 90; angle += 30) {
    // 現在の座標系を保存します
    push();

    // キャンバスの中心に移動し、角度で回転します
    translate(width / 2, height / 2);
    rotate(angle);

    // 角度に基づいて色を設定し、x軸に沿って線を描画します
    stroke(angle + 100, 100, 100);
    strokeWeight(5);
    line(0, 0, 150, 0);

    // 角度を表示します
    strokeWeight(1);
    text(angle, 170, 0);

    // 座標系を復元します
    pop();
  }

  // アニメーションされた線を描画します
  translate(width / 2, height / 2);
  rotate(frameCount);
  stroke(255);
  strokeWeight(5);
  line(0, 0, 150, 0);
}
