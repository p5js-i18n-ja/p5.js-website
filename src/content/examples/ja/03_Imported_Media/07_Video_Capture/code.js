// デバイスのウェブカメラからのビデオキャプチャを説明します。
let capture;

function setup() {
  describe("デバイスのウェブカメラからのビデオキャプチャ。");
  createCanvas(720, 400);

  // createCapture() 関数を使用してデバイスの
  // カメラにアクセスし、ビデオのキャプチャを開始します。
  capture = createCapture(VIDEO);

  // キャプチャフレームをキャンバスの半分の大きさにします。
  capture.size(360, 200);

  // capture.hide() を使用して createCapture() で作成された
  // p5.Element オブジェクトを削除します。ビデオは代わりに
  // draw() で画像として描画されます。
  capture.hide();
}

function draw() {
  // 背景をグレーに設定します。
  background(51);

  // 逆フィルターを適用したキャンバス上に
  // 結果のビデオキャプチャを描画します。
  image(capture, 0, 0, 360, 400);
  filter(INVERT);
}
