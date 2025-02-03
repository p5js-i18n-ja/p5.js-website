/*
 * @name 正多角形
 * @arialabel 灰色の背景に黒い輪郭の3つの白い図形が回転している。左から三角形、二十角形、七角形。
 * @description あなたのお気に入りは何ですか? ペンタゴン? ヘキサゴン? ヘプタゴン? それ以外ですか?
 * 二十角形はどうでしょうか? この例で作られた polygon() 関数は、あらゆる正多角形を描画することが可能です。
 * draw() 内の polygon() 関数呼び出しに異なる数値を入力して、
 * 探索してみてください。
 */
function setup() {
  createCanvas(720, 400);
}

function draw() {
  background(102);

  push();
  translate(width * 0.2, height * 0.5);
  rotate(frameCount / 200.0);
  polygon(0, 0, 82, 3);
  pop();

  push();
  translate(width * 0.5, height * 0.5);
  rotate(frameCount / 50.0);
  polygon(0, 0, 80, 20);
  pop();

  push();
  translate(width * 0.8, height * 0.5);
  rotate(frameCount / -100.0);
  polygon(0, 0, 70, 7);
  pop();
}

function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
