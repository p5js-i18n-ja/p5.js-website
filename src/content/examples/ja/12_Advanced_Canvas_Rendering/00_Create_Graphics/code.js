// Define graphic as a global variable. This variable
// will be the offscreen buffer.
let graphic;

function setup() {
  describe(
    "黒いキャンバスの中央に非常に暗い灰色の矩形があります。カーソルがキャンバスの上にあるとき、白い円がキャンバスの黒い部分を追いかけますが、暗い灰色の矩形の上では追いかけません。",
  );
  createCanvas(720, 400);

  // キャンバス内に配置されるグラフィックを作成します。
  graphic = createGraphics(405, 250);
}

function draw() {
  // キャンバスを覆う黒い矩形を作成します。
  // 矩形を黒にし、アルファ値を12に設定して
  // カーソルを追いかける白い円が徐々に背景にフェードします。
  background(0, 12);

  // カーソルがキャンバスの上にあるときに追いかける円を作成します。
  fill(255);
  noStroke();
  ellipse(mouseX, mouseY, 60, 60);

  // バッファに暗い灰色の背景を与えます。
  // バッファ内の形状には塗りつぶしがありません。
  graphic.background(51);
  graphic.noFill();

  // カーソルがオフスクリーンバッファの上にあるとき、
  // キャンバスの上にカーソルがあるときに描かれる円を複製します。
  // バッファ領域内では、円のアウトラインのみを表示します。
  graphic.stroke(255);
  graphic.ellipse(mouseX - 150, mouseY - 75, 60, 60);

  // バッファを画面に描画します。
  image(graphic, 150, 75);
}
