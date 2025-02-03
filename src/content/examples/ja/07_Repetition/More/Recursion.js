/*
 *@name 再帰
 *@arialabel 灰色の円の真ん中を横切って2つの灰色の円が描画されています。この2つの灰色の円は、それぞれの真ん中にさらに2つの灰色の円が描画されており、このパターンは、その中にこれ以上描けなくなるまで続きます。
 *@description 関数が自分自身を呼び出すことを意味する再帰のデモです。
 * 再帰的な関数には終了条件が必要で、
 * それがないと無限ループに陥ってしまいます。drawCircle() 関数が
 * ブロックの最後で自分自身を呼び出していることに注目してください。
 * これは、変数「level」が1になるまで続けられます。
 */

function setup() {
  createCanvas(720, 560);
  noStroke();
  noLoop();
}

function draw() {
  drawCircle(width / 2, 280, 6);
}

function drawCircle(x, radius, level) {
  // 「level」はある値（ここでは1）に達すると
  // 再帰を終了させる変数です。終了条件が指定されていない場合、
  // 再帰的関数はスタック容量がなくなるまで何度も繰り返し呼び出されますが、
  // これは好ましい結果とは言えません!
  const tt = (126 * level) / 4.0;
  fill(tt);
  ellipse(x, height / 2, radius * 2, radius * 2);
  if (level > 1) {
    // 「level」がステップごとに1ずつ減っていくので、終了条件を
    // 達成できます。
    level = level - 1;
    drawCircle(x - radius / 2, radius / 2, level);
    drawCircle(x + radius / 2, radius / 2, level);
  }
}
