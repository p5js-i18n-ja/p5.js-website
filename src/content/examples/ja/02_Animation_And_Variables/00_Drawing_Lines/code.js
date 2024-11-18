function setup() {
  // キャンバスを作成
  createCanvas(710, 400);

  // 背景を黒に設定
  background(0);

  // 線の幅を設定
  strokeWeight(10);

  // 色モードを色相-彩度-明度（HSB）に設定
  colorMode(HSB);

  // スクリーンリーダー用の説明を設定
  describe('ユーザーがマウスをドラッグすることで描画する空白のキャンバス');
}

function mouseDragged() {
  // マウスの位置に基づいて色を設定し、
  // 前の位置から現在の位置まで線を描画
  let lineHue = mouseX - mouseY;
  stroke(lineHue, 90, 90);
  line(pmouseX, pmouseY, mouseX, mouseY);
}