/*
 * @name バブルソート
 * @arialabel ライト灰色の背景に、高さが異なる濃い灰色のバーが並び、画面の右側から左側に向かって、高いバーから低いバーの順に並び替えられます。
 * @description ランダムに配置されたバーを
 * 高さが昇順になるようにソートして、
 * 並べ替えのプロセス全体をシミュレーションします。
 * The Coding Train による Coding Challenge を参考にしました。
 */

let values = [];
let i = 0;
let j = 0;

// setup() 関数内の文はプログラムが開始されたときに
// 一度実行されます。
// 配列は setup() 関数内でランダムな値で埋められます。
function setup() {
  createCanvas(720, 400);
  for (let i = 0; i < width / 8; i++) {
    values.push(random(height));
  }
}

// draw() 関数内の文はプログラムが停止するまで
// 繰り返し実行されます。
// 各文は順次実行され、最後の行が読み込まれた後に、
// 最初の行が再度実行されます。
function draw() {
  background(220);
  bubbleSort();
  simulateSorting();
}

// bubbleSort() 関数は、配列の8つの要素を
// 1フレームごとに取り出してソートします。
// この関数の背後にあるアルゴリズムはバブルソートです。
function bubbleSort() {
  for (let k = 0; k < 8; k++) {
    if (i < values.length) {
      let temp = values[j];
      if (values[j] > values[j + 1]) {
        values[j] = values[j + 1];
        values[j + 1] = temp;
      }
      j++;

      if (j >= values.length - i - 1) {
        j = 0;
        i++;
      }
    } else {
      noLoop();
    }
  }
}

// simulateSorting() 関数は、
// 配列の値を長方形の高さとして使用して、
// 整列プロセス全体を
// アニメーション化するのに役立ちます。
function simulateSorting() {
  for (let i = 0; i < values.length; i++) {
    stroke(100, 143, 143);
    fill(50);
    rect(i * 8, height, 8, -values[i], 20);
  }
}
