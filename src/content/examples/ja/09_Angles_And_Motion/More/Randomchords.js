/*
 * @name ランダムな弦
 * @arialabel 円の一方の縁から他方の縁へランダムに線が引かれ、それが陰影のある球体のように見えるまで続けられます。
 * @description 円のランダムな弦を描き重ねます。各弦は半透明です。
 * 見ている人は、これによりシェーディングされた球体に錯覚します。
 * <a href ="http://inconvergent.net/">Anders Hoff</a> にインスパイヤされ、Aatish Bhatia が作成しました。
 */

function setup() {
  createCanvas(400, 400);
  background(255, 255, 255);

  // アルファ値を使用した半透明のストローク
  stroke(0, 0, 0, 15);
}

function draw() {
  // 各フレームで二つのランダムな弦を描きます。
  randomChord();
  randomChord();
}

function randomChord() {
  // 円上のランダムな点を見つけます。
  let angle1 = random(0, 2 * PI);
  let xpos1 = 200 + 200 * cos(angle1);
  let ypos1 = 200 + 200 * sin(angle1);

  // 円上の別のランダムな点を見つけます。
  let angle2 = random(0, 2 * PI);
  let xpos2 = 200 + 200 * cos(angle2);
  let ypos2 = 200 + 200 * sin(angle2);

  // それらの間で線を描きます。
  line(xpos1, ypos1, xpos2, ypos2);
}
