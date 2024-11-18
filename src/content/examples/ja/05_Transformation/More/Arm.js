/*
 * @name アーム
 * @arialabel 二つの楕円を末端で結合した腕の形状があります。片方の末端が黒い背景の中心に固定されており、マウスが画面を移動すると、腕が円を描くように動きます。
 * @description この例では、変換マトリックスを使用して腕を作成します。
 * 各セグメントの角度は、マウスの位置で制御されます。
 * 同じ push() と pop() の
 * マトリックスグループ内にあるため、
 * 最初のセグメントに適用される変換は
 * 次のセグメントにも適用されます。
 */

let x, y;
let angle1 = 0.0;
let angle2 = 0.0;
let segLength = 100;

function setup() {
  createCanvas(720, 400);
  strokeWeight(30);

  // 半透明の白でストローク
  stroke(255, 160);

  // 腕の "肩" をキャンバスの中央に配置
  x = width * 0.5;
  y = height * 0.5;
}

function draw() {
  background(0);

  // マウスの位置に応じてセグメントの角度を変更します。
  angle1 = (mouseX / float(width) - 0.5) * -TWO_PI;
  angle2 = (mouseY / float(height) - 0.5) * PI;

  // 変換を "含める" ために push と pop を使用します。
  // カスタム関数を使用してセグメントを描画していますが、
  // 変換はそれでも累積されることに着目してください。
  push();
  segment(x, y, angle1);
  segment(segLength, 0, angle2);
  pop();
}

// セグメントを描画するためのカスタム関数
function segment(x, y, a) {
  translate(x, y);
  rotate(a);
  line(0, 0, segLength, 0);
}
