/*
 * @name サイン・コサイン
 * @arialabel 2つの青い円と2つの黄色い円が、白い正方形の各辺を行ったり来たりします。
 * @description 線形移動は sin(）と cos(）を使用しています。
 * 0 と 2π の範囲の数値（2π は大体 6.28 の角度）が
 * 関数に入力され、-1 から 1 までの値が返されます。
 * これらの値は、大きな動きを生み出すためにスケーリングされます。
 */
let angle1 = 0;
let angle2 = 0;
let scalar = 70;

function setup() {
  createCanvas(710, 400);
  noStroke();
  rectMode(CENTER);
}

function draw() {
  background(0);

  let ang1 = radians(angle1);
  let ang2 = radians(angle2);

  let x1 = width / 2 + scalar * cos(ang1);
  let x2 = width / 2 + scalar * cos(ang2);

  let y1 = height / 2 + scalar * sin(ang1);
  let y2 = height / 2 + scalar * sin(ang2);

  fill(255);
  rect(width * 0.5, height * 0.5, 140, 140);

  fill(0, 102, 153);
  ellipse(x1, height * 0.5 - 120, scalar, scalar);
  ellipse(x2, height * 0.5 + 120, scalar, scalar);

  fill(255, 204, 0);
  ellipse(width * 0.5 - 120, y1, scalar, scalar);
  ellipse(width * 0.5 + 120, y2, scalar, scalar);

  angle1 += 2;
  angle2 += 3;
}
