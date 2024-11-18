/*
 * @name スライダー
 * @arialabel 背景は明るい紫色で始まり、左上隅に「red」、「green」、「blue」とラベル付けされた3つのスライダーがあります。ユーザーが各スライダーをドラッグすることで、これら3色の増減に応じて背景の色を変更できます。
 * @description スライダーを動かして、背景のR、G、Bの値を調整します。
 */
let rSlider, gSlider, bSlider;

function setup() {
  // キャンバスを作成します。
  createCanvas(710, 400);
  textSize(15);
  noStroke();

  // スライダーを作ります。
  rSlider = createSlider(0, 255, 100);
  rSlider.position(20, 20);
  gSlider = createSlider(0, 255, 0);
  gSlider.position(20, 50);
  bSlider = createSlider(0, 255, 255);
  bSlider.position(20, 80);
}

function draw() {
  const r = rSlider.value();
  const g = gSlider.value();
  const b = bSlider.value();
  background(r, g, b);
  text("red", rSlider.x * 2 + rSlider.width, 35);
  text("green", gSlider.x * 2 + gSlider.width, 65);
  text("blue", bSlider.x * 2 + bSlider.width, 95);
}
