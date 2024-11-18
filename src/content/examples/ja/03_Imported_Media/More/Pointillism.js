/*
 * @name 点描
 * @arialabel 画面上にドットが生成されます。ユーザーのマウスが左に移動するとドットが小さくなり、右に移動すると大きくなります。ドットの色は選択した画像によって変化します。
 * @description Dan Shiffman による作品です。マウスの水平位置によって点のサイズが制御されます。画像のピクセルに応じて色付けされた楕円を使用して、シンプルな点描を作成します。
 * <p><em><span class="small"> この例をローカルで実行するには画像ファイルと実行中の <a href="https://github.com/processing/p5.js/wiki/Local-server">ローカルサーバー</a> が必要です。</span></em></p>
 */
let img;
let smallPoint, largePoint;

function preload() {
  img = loadImage("assets/moonwalk.jpg");
}

function setup() {
  createCanvas(720, 400);
  smallPoint = 4;
  largePoint = 40;
  imageMode(CENTER);
  noStroke();
  background(255);
  img.loadPixels();
}

function draw() {
  let pointillize = map(mouseX, 0, width, smallPoint, largePoint);
  let x = floor(random(img.width));
  let y = floor(random(img.height));
  let pix = img.get(x, y);
  fill(pix, 128);
  ellipse(x, y, pointillize, pointillize);
}
