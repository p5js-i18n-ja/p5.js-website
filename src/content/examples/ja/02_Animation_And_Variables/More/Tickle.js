/*
 * @name くすぐり
 * @arialabel 薄い灰色の背景に黒字で「tickle(くすぐったい)」の文字があります。ユーザーがこの文字にカーソルを合わせると、くすぐられるように文字が揺れ動きます。
 * @description カーソルを合わせると「tickle」の文字が揺れます。
 * 時には、スクリーンからくすぐられることもあります。
 */
let message = "tickle",
  font,
  bounds, // テキスト領域の x, y, w, h を保持します。
  fontsize = 60,
  x,
  y; // テキストの x 座標と y 座標です。

function preload() {
  font = loadFont("assets/SourceSansPro-Regular.otf");
}

function setup() {
  createCanvas(710, 400);

  // フォントを設定します。
  textFont(font);
  textSize(fontsize);

  // テキストの幅と高さを取得します。
  bounds = font.textBounds(message, 0, 0, fontsize);
  x = width / 2 - bounds.w / 2;
  y = height / 2 - bounds.h / 2;
}

function draw() {
  background(204, 120);

  // テキストを黒で書き、その領域を取得します。
  fill(0);
  text(message, x, y);
  bounds = font.textBounds(message, x, y, fontsize);

  // マウスが領域内にあるかどうかをチェックし、ある場合はくすぐるように動かします。
  if (
    mouseX >= bounds.x &&
    mouseX <= bounds.x + bounds.w &&
    mouseY >= bounds.y &&
    mouseY <= bounds.y + bounds.h
  ) {
    x += random(-5, 5);
    y += random(-5, 5);
  }
}
