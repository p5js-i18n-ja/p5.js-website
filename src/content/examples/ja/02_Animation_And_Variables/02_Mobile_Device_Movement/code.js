function setup() {
  describe(
    "モバイルデバイス専用: デバイスの動きに基づいて移動し、サイズが変わる白い円と黒い背景。",
  );

  // キャンバスをデバイスのビューポートの幅と高さに設定
  createCanvas(displayWidth, displayHeight);
  background(0);
}

function deviceMoved() {
  // デバイスが動いたとき、円の位置とサイズを描画
  // デバイスの動きに基づいています。

  // x軸の加速度をキャンバスの幅にマッピング
  let x = map(accelerationX, -10, 10, 0, width);

  // y軸の加速度をキャンバスの高さにマッピング
  let y = map(accelerationY, -10, 10, 0, height);

  // z軸の加速度をサイズ10-100にマッピング
  let diameter = map(accelerationZ, -10, 10, 10, 100);

  // アルファ値を使用して以前に描画された円をフェードアウト
  background(0, 64);
  noStroke();
  circle(x, y, diameter);
}
