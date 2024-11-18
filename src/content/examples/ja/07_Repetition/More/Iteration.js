/*
 * @name 反復
 * @arialabel 画面上半分の白いバーは、左側では細い線と交差し、右側では濃い灰色のバーと交差しています。
 * @description "for" 構造による反復で、繰り返された造形を構築します。
 */
let y;
let num = 14;

function setup() {
  createCanvas(720, 360);
  background(102);
  noStroke();

  // 白いバーを描きます。
  fill(255);
  y = 60;
  for (let i = 0; i < num / 3; i++) {
    rect(50, y, 475, 10);
    y += 20;
  }

  // 灰色のバーです。
  fill(51);
  y = 40;
  for (let i = 0; i < num; i++) {
    rect(405, y, 30, 10);
    y += 20;
  }
  y = 50;
  for (let i = 0; i < num; i++) {
    rect(425, y, 30, 10);
    y += 20;
  }

  // 細い線です。
  y = 45;
  fill(0);
  for (let i = 0; i < num - 1; i++) {
    rect(120, y, 40, 1);
    y += 20;
  }
}
