/*
 * @name 放射状グラデーション
 * @arialabel 黒い背景に3つの円があります。真ん中の円は完全な円見えるが、他の両端の2つは半分しか見えていません。円の中心から外側にかけて、色がグラデーションがしており、それは1秒ごとに変化します。
 * @description ある色から別の色へのグラデーションを作成するために、
 * 一連の同心円を描画します。
 */
let dim;

function setup() {
  createCanvas(710, 400);
  dim = width / 2;
  background(0);
  colorMode(HSB, 360, 100, 100);
  noStroke();
  ellipseMode(RADIUS);
  frameRate(1);
}

function draw() {
  background(0);
  for (let x = 0; x <= width; x += dim) {
    drawGradient(x, height / 2);
  }
}

function drawGradient(x, y) {
  let radius = dim / 2;
  let h = random(0, 360);
  for (let r = radius; r > 0; --r) {
    fill(h, 90, 90);
    ellipse(x, y, r, r);
    h = (h + 1) % 360;
  }
}
