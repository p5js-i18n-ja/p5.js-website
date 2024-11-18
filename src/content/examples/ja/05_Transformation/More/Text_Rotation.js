/*
 * @name テキストの回転
 * @arialabel 黒い背景に3本の白い線があります。 45度、270度、そして時計回りに回転する線が1本あり、回転に伴って度数表示が変わります。
 * @description 画面に文字を描き、さまざまな角度で回転させます。
 * <br><br><small><em>この例は、Processingウェウブサイトの <a href="https://processing.org/examples/textrotation.html">テキスト回転の例</a>
 * を移植したものです。
 * </em></small>
 */

let font,
  fontsize = 32;

let angleRotate = 0.0;

function setup() {
  createCanvas(710, 400);
  background(0);

  // assets ディレクトリに保存されている .ttf や .otf フォントは、
  // setup() と draw() が呼ばれる前に確実に読み込みます。
  font = loadFont("assets/SourceSansPro-Regular.otf");

  // テキストの特徴を設定します。
  textFont(font);
}

function draw() {
  background(0);

  strokeWeight(1);
  stroke(153);

  push();
  let angle1 = radians(45);
  translate(100, 180);
  rotate(angle1);
  // スクリーンに文字を描きます。
  text("45 DEGREES", 0, 0);
  line(0, 0, 150, 0);
  pop();

  push();
  let angle2 = radians(270);
  translate(200, 180);
  rotate(angle2);
  // スクリーンに文字を描きます。
  text("270 DEGREES", 0, 0);
  line(0, 0, 150, 0);
  pop();

  push();
  translate(440, 180);
  rotate(radians(angleRotate));
  text((int(angleRotate) % 360) + " DEGREES ", 0, 0);
  line(0, 0, 150, 0);
  pop();

  angleRotate += 0.25;

  stroke(255, 0, 0);
  strokeWeight(4);
  point(100, 180);
  point(200, 180);
  point(440, 180);
}
