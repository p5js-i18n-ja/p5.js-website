/*
 * @name パラメトリック方程式
 * @arialabel 黒い直線が3D空間でらせん状に移動します。
 * @description パラメトリック方程式は、x と y 座標それぞれを
 * 他の文字によって求めます。
 * この文字は媒介変数(パラメーター)と呼ばれ、通常は文字 t または θ で与えられます。
 * インスピレーションは Alexander Miller の YouTube チャンネルから得ました。
 */

function setup() {
  createCanvas(720, 400);
}

// x と y が依存するパラメーターは、通常 t または θ の記号として与えられます。
let t = 0;
function draw() {
  background("#fff");
  translate(width / 2, height / 2);
  stroke("#0f0f0f");
  strokeWeight(1.5);
  // 100個の線を追加するためのループ
  for (let i = 0; i < 100; i++) {
    line(x1(t + i), y1(t + i), x2(t + i) + 20, y2(t + i) + 20);
  }
  t += 0.15;
}
// 線の初期のx座標を変更する関数
function x1(t) {
  return sin(t / 10) * 125 + sin(t / 20) * 125 + sin(t / 30) * 125;
}

// 線の初期のy座標を変更する関数
function y1(t) {
  return cos(t / 10) * 125 + cos(t / 20) * 125 + cos(t / 30) * 125;
}

// 線の最終的なx座標を変更する関数
function x2(t) {
  return sin(t / 15) * 125 + sin(t / 25) * 125 + sin(t / 35) * 125;
}

// 線の最終的なy座標を変更する関数
function y2(t) {
  return cos(t / 15) * 125 + cos(t / 25) * 125 + cos(t / 35) * 125;
}
