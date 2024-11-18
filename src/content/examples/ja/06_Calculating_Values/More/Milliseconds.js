/*
 * @name ミリ秒
 * @arialabel 背景が濃淡をつけた灰色のバーで埋められていきます。一部のバーの塗りつぶしは、1ミリ秒ごとにランダムに他の色調の灰色に変化します。
 * @description ミリ秒は 1 秒の 1/1000 です。
 * p5jsは、プログラムが起動してから何ミリ秒経ったのかを記録しています。
 * この数値を余剰(%)演算子で加工することで、時間におけるさまざまなパターンを作成することができます。
 * <br><br><small><em> この例は、Processingのウェブサイトにある<a href="https://processing.org/examples/milliseconds.html">ミリ秒の例</a>から移植されています</em></small>。
 */

let scale;

function setup() {
  createCanvas(720, 400);
  noStroke();
  scale = width / 20;
}

function draw() {
  let i;
  for (i = 0; i < scale; i++) {
    colorMode(RGB, (i + 1) * scale * 10);
    fill(millis() % ((i + 1) * scale * 10));
    rect(i * scale, 0, scale, height);
  }
}
