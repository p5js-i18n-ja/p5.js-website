// グローバル変数を定義します: img, offset, および easing。
// 透明な画像をカーソル位置に合わせて移動させるために、
// offsetを0に、easingを0.05に設定します。
let img;
let offset = 0;
let easing = 0.05;

function preload() {
  // キャンバスのアセットディレクトリから下の画像を読み込みます。
  img = loadImage("/assets/moonwalk.jpg");
}

function setup() {
  describe(
    "背景に惑星上の宇宙飛行士がいて、その上にユーザーのマウスの水平方向に動く、やや透明なこの画像があります。",
  );

  createCanvas(720, 400);
}

function draw() {
  // 下の画像を完全な不透明度で表示します。
  tint(255, 255);
  image(img, 0, 0);

  // dxを、上の画像がカーソルとともに動く速度として定義します。
  // offset変数は画像の動きを遅らせます。
  let dx = mouseX - img.width / 2 - offset;
  offset += dx * easing;

  // 上の画像を半分の不透明度で表示します。
  tint(255, 127);
  image(img, offset, 0);
}
