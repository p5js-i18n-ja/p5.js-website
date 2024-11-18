let cellSize = 20;
let columnCount;
let rowCount;
let currentCells = [];
let nextCells = [];

function setup() {
  // フリッカリングを避けるためにシミュレーションのフレームレートを10に設定
  frameRate(10);
  createCanvas(720, 400);

  // 列と行を計算
  columnCount = floor(width / cellSize);
  rowCount = floor(height / cellSize);

  // 現在のセルの各列を空の配列に設定
  // これにより、セルをこの配列に追加できるようになる
  // セルのインデックスはその行番号になる
  for (let column = 0; column < columnCount; column++) {
    currentCells[column] = [];
  }

  // 次のセルについても同じプロセスを繰り返す
  for (let column = 0; column < columnCount; column++) {
    nextCells[column] = [];
  }

  noLoop();
  describe(
    "白と黒の間で切り替わる正方形のグリッドで、ジョン・コンウェイのライフゲームのシミュレーションを示しています。クリックするとシミュレーションがリセットされます。",
  );
}

function draw() {
  generate();
  for (let column = 0; column < columnCount; column++) {
    for (let row = 0; row < rowCount; row++) {
      // セルの値を取得（0または1）
      let cell = currentCells[column][row];

      // セルの値を変換して、生きている場合は黒（0）、死んでいる場合は白（255）にする
      fill((1 - cell) * 255);
      stroke(0);
      rect(column * cellSize, row * cellSize, cellSize, cellSize);
    }
  }
}

// マウスが押されたときにボードをリセット
function mousePressed() {
  randomizeBoard();
  loop();
}

// ボードをランダムに埋める
function randomizeBoard() {
  for (let column = 0; column < columnCount; column++) {
    for (let row = 0; row < rowCount; row++) {
      // 0（死んでいる）または1（生きている）のいずれかの値をランダムに選択
      currentCells[column][row] = random([0, 1]);
    }
  }
}

// 新しい世代を生成
function generate() {
  // 2D配列のすべてのスポットをループして生きている隣人を数える
  for (let column = 0; column < columnCount; column++) {
    for (let row = 0; row < rowCount; row++) {
      // 現在のセルの左の列
      // 列が左端にある場合、モジュラスを使用して右端にラップ
      let left = (column - 1 + columnCount) % columnCount;

      // 現在のセルの右の列
      // 列が右端にある場合、モジュラスを使用して左端にラップ
      let right = (column + 1) % columnCount;

      // 現在のセルの上の行
      // 行が上端にある場合、モジュラスを使用して下端にラップ
      let above = (row - 1 + rowCount) % rowCount;

      // 現在のセルの下の行
      // 行が下端にある場合、モジュラスを使用して上端にラップ
      let below = (row + 1) % rowCount;

      // 現在のセルを囲む生きている隣人を数える
      let neighbours =
        currentCells[left][above] +
        currentCells[column][above] +
        currentCells[right][above] +
        currentCells[left][row] +
        currentCells[right][row] +
        currentCells[left][below] +
        currentCells[column][below] +
        currentCells[right][below];

      // ライフのルール
      // 1. 生きているセルが2つ未満の生きている隣人を持つと死ぬ
      // 2. 生きているセルが3つを超える生きている隣人を持つと死ぬ
      if (neighbours < 2 || neighbours > 3) {
        nextCells[column][row] = 0;
        // 4. 正確に3つの生きている隣人を持つ死んでいるセルは生き返る。
      } else if (neighbours === 3) {
        nextCells[column][row] = 1;
        // 3. 2つまたは3つの生きている隣人を持つ生きているセルは、次の世代に変わらず生き続ける。
      } else nextCells[column][row] = currentCells[column][row];
    }
  }

  // 次の世代のために現在の配列と次の配列を入れ替える
  let temp = currentCells;
  currentCells = nextCells;
  nextCells = temp;
}
