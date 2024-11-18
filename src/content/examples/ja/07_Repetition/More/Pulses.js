/*
 * @name パルス
 * @arialabel 暗い灰色の背景上でマウスを動かすと中央に白い円のある黒い花が連続して描かれます。円はマウスを速く動かすほど大きくなり、ゆっくり動かすほど小さくなります。マウスを止めると、最後の花が少し回転します。
 * @description ソフトウェアの描画装置は、描画のジェスチャーとは無関係に、
 * リズムやルールに従った描画が可能です。
 * これは、作図者がイメージの一部をコントロールし、ソフトウェアが他の部分をコントロールする、
 * コラボレーション・ドローイングの一形態です。
 */
let angle = 0;

function setup() {
  createCanvas(710, 400);
  background(102);
  noStroke();
  fill(0, 102);
}

function draw() {
  // マウスが押されている時だけ描画します。
  if (mouseIsPressed === true) {
    angle += 5;
    let val = cos(radians(angle)) * 12.0;
    for (let a = 0; a < 360; a += 75) {
      let xoff = cos(radians(a)) * val;
      let yoff = sin(radians(a)) * val;
      fill(0);
      ellipse(mouseX + xoff, mouseY + yoff, val, val);
    }
    fill(255);
    ellipse(mouseX, mouseY, 2, 2);
  }
}
