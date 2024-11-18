let x = 0;
let y = 0;

function setup() {
  createCanvas(720, 400);
  noStroke();
  textOutput();
}

function draw() {
  background(51);

  // lerp() は、特定の増分で2つの数値の間の数値を計算します。
  // amt パラメータは、2つの値の間で補間する量を示し、
  // 0.0 は最初の点と等しく、0.1 は最初の点に非常に近く、0.5
  // はその中間点に相当します。

  // 毎フレーム、マウスの位置に向かって5%移動します
  x = lerp(x, mouseX, 0.05);
  y = lerp(y, mouseY, 0.05);

  fill(255);
  stroke(255);
  ellipse(x, y, 66, 66);
}
