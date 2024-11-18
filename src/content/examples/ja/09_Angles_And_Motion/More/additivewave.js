/*
 * @name 波の重ね合わせ
 * @arialabel 少し不透明な白い丸が並んで波を作り、黒い画面を横切っています。
 * @description より複雑な波を作成するために、2つの波を重ね合わせています。
 * オリジナルは Daniel Shiffman のものです。
 */
let xspacing = 8; // 各水平位置間の距離
let w; // 波全体の幅
let maxwaves = 4; // 重ね合わせる波の最大数

let theta = 0.0;
let amplitude = new Array(maxwaves); // 波の高さ
// Xをインクリメントした値です。
// 周期と xspacing を使って計算されます。
let dx = new Array(maxwaves);
// 波の高さの値を保存する配列です。
// （ここに完全に記述する必要はありません。）
let yvalues;

function setup() {
  createCanvas(710, 400);
  frameRate(30);
  colorMode(RGB, 255, 255, 255, 100);
  w = width + 16;

  for (let i = 0; i < maxwaves; i++) {
    amplitude[i] = random(10, 30);
    let period = random(100, 300); // 波が繰り返されるまでのピクセル数
    dx[i] = (TWO_PI / period) * xspacing;
  }

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

  // すべての高さの値をゼロにします。
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = 0;
  }

  // 波の高さを蓄積していきます。
  for (let j = 0; j < maxwaves; j++) {
    let x = theta;
    for (let i = 0; i < yvalues.length; i++) {
      // 波は交互に正弦波・余弦波とします。
      if (j % 2 == 0) yvalues[i] += sin(x) * amplitude[j];
      else yvalues[i] += cos(x) * amplitude[j];
      x += dx[j];
    }
  }
}

function renderWave() {
  // 各位置に楕円を使って波を描く、シンプルな関数です。
  noStroke();
  fill(255, 50);
  ellipseMode(CENTER);
  for (let x = 0; x < yvalues.length; x++) {
    ellipse(x * xspacing, width / 2 + yvalues[x], 16, 16);
  }
}
