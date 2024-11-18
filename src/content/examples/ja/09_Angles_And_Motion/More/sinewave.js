/*
 * @name 正弦波
 * @arialabel 白い円が並び、正弦波(サイン波)となって黒い画面を横切っています。
 * @description シンプルな正弦波を表示します。
 * オリジナルは Daniel Shiffman のものです。
 */

let xspacing = 16; // 各水平位置間の距離
let w; // 波全体の幅
let theta = 0.0; // 開始角度は0
let amplitude = 75.0; // 波の高さ
let period = 500.0; // 波が繰り返されるまでのピクセル数
let dx; // xをインクリメントする値
let yvalues; // 配列を使って波の高さの値を格納します。

function setup() {
  createCanvas(710, 400);
  w = width + 16;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));
}

function draw() {
  background(0);
  calcWave();
  renderWave();
}

function calcWave() {
  // θをインクリメントします。
  //（この「角速度」の値を変えてみてください.）
  theta += 0.02;

  // すべての x 値に対して、sin() 関数を使って y 値を計算します。
  let x = theta;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x) * amplitude;
    x += dx;
  }
}

function renderWave() {
  noStroke();
  fill(255);
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < yvalues.length; x++) {
    ellipse(x * xspacing, height / 2 + yvalues[x], 16, 16);
  }
}
