/*
 * @name Wolfram のセルオートマトン
 * @arialabel 1次元セルオートマトンは、白い正方形から構成されたデザインで、ピクセル化された外観をもつピラミッド形状が描かれています。
 * @description Wolfram の1次元セルオートマトンのシンプルなデモンストレーション
 * (<a href="http://natureofcode.com">natureofcode.com</a>)
 */

let w = 10;
// 0と1の配列
let cells;

// 最初の世代は中央のセルだけが状態「1」であるとします。
let generation = 0;

// ルールセットを格納する配列、例: {0,1,1,0,1,1,0,1}
let ruleset = [0, 1, 0, 1, 1, 0, 1, 0];

function setup() {
  createCanvas(640, 400);
  cells = Array(floor(width / w));
  for (let i = 0; i < cells.length; i++) {
    cells[i] = 0;
  }
  cells[cells.length / 2] = 1;
}

function draw() {
  for (let i = 0; i < cells.length; i++) {
    if (cells[i] === 1) {
      fill(200);
    } else {
      fill(51);
    }
    noStroke();
    rect(i * w, generation * w, w, w);
  }
  if (generation < height / w) {
    generate();
  }
}

// 新しい世代を作るプロセス
function generate() {
  // 最初に新しい値を格納するための空の配列を作成します。
  let nextgen = Array(cells.length);
  // 各セルについて、現在の状態と隣接するセルの状態を調べて、新しい状態を決定します。
  // 隣接するセルがひとつしかない端のセルは無視します。
  for (let i = 1; i < cells.length - 1; i++) {
    let left = cells[i - 1]; // 左側のセルの状態
    let me = cells[i]; // 現在のセルの状態
    let right = cells[i + 1]; // 右側のセルの状態
    nextgen[i] = rules(left, me, right); // ルールセットに基づいて新しい状態を決定します。
  }
  // 現在の世代を新しい世代に更新します。
  cells = nextgen;
  generation++;
}

// Wolfram のルールの実装
// もっと簡潔に改善できますが、ここではそれぞれのケースごとに起こっていることが、はっきりわかるように実装しています。
function rules(a, b, c) {
  if (a == 1 && b == 1 && c == 1) return ruleset[0];
  if (a == 1 && b == 1 && c == 0) return ruleset[1];
  if (a == 1 && b == 0 && c == 1) return ruleset[2];
  if (a == 1 && b == 0 && c == 0) return ruleset[3];
  if (a == 0 && b == 1 && c == 1) return ruleset[4];
  if (a == 0 && b == 1 && c == 0) return ruleset[5];
  if (a == 0 && b == 0 && c == 1) return ruleset[6];
  if (a == 0 && b == 0 && c == 0) return ruleset[7];
  return 0;
}
