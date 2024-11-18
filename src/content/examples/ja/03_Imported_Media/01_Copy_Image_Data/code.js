// グローバル変数を定義: bottomImg と topImg
let bottomImg, topImg;

function preload() {
  // キャンバスのアセットディレクトリから画像をプリロード
  // bottomImg はカラーの写真で、
  // topImg は白黒の写真です
  bottomImg = loadImage("/assets/parrot-color.png");
  topImg = loadImage("/assets/parrot-bw.png");
}

function setup() {
  describe(
    "オウムの白黒写真。キャンバス上でドラッグすると、写真に色が追加されます。",
  );

  createCanvas(720, 400);

  // カーソルを隠し、ペイントブラシの画像に置き換えます
  noCursor();
  cursor("/assets/brush.png", 20, -10);

  // 上の画像（白黒画像）を読み込む
  image(topImg, 0, 0);
}

function mouseDragged() {
  // copy() 関数を使用して、カーソルをドラッグすると
  // 下の画像を上の画像にコピーします
  copy(bottomImg, mouseX, mouseY, 20, 20, mouseX, mouseY, 20, 20);
}
