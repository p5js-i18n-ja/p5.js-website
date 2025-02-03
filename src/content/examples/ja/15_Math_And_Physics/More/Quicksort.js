/*
 * @name クイックソート
 * @arialabel 左から右へ、ランダムな高さのバーが短いものから高いものへと並べ替えられます。バーはソートされるにつれて、セージグリーンとコーラルに色が変化します。
 * @frame 710,400
 * @description これはクイックソートのシミュレーションです。
 * バーをずらりと並べた状態で開始し、
 * それらを高さの昇順に並べ替えます。
 * コーディングチャレンジからの引用元は「The Coding Train」です。<br><br>
 *
 * クイックソートは分割統治アルゴリズムです。
 * 大ざっぱに言うと、元の配列を小さいサブ配列に分割し、独立して解決することによってソートを実行します。
 * 配列の要素をピボット要素として選択し、
 * 指定された配列をピボットの周りに分割することが含まれます。<br>
 *
 *
 * 分割とは、ピボット要素よりも左側のすべての要素がそれよりも小さく、
 * 右側のすべての要素がそれよりも大きくなるように
 * 与えられた配列（またはサブ配列）を
 * 配置することを指します。
 * したがって、
 * 配列の左側と右側の「半分」をソートするための基準点があり、
 * 最終的に昇順にソートされた配列に至ります。
 * <a href="https://www.geeksforgeeks.org/quick-sort/">詳細</a><br>
 *
 */

// 各バーの幅は8で設定します。
let values = [];
// 配列「states」は、各段階でのピボットインデックスと、
// 現在並べ替えられているサブ配列を
// 識別するのに役立てます。
let states = [];

// setup() 関数は、プログラムが開始されたときに1回呼び出されます。
// ここでは、配列「values」にランダムな値をセットし、
// 配列「states」に状態の初期値（-1）をセットしておきます。
function setup() {
  createCanvas(710, 400);
  for (let i = 0; i < width / 8; i++) {
    values.push(random(height));
    states.push(-1);
  }
  quickSort(0, values.length - 1);
}

// draw() 関数の文は、プログラムが停止するまで連続して実行されます。
// 各文は順次実行され、
// 最後の文が読み込まれると、
// 最初の文が再度実行されます。
function draw() {
  background(140);
  for (let i = 0; i < values.length; i++) {
    // 色分け
    if (states[i] == 0) {
      // ピボットインデックスのバーの色
      fill("#E0777D");
    } else if (states[i] == 1) {
      // 現在並べ替えられているバーの色
      fill("#D6FFB7");
    } else {
      fill(255);
    }
    rect(i * 8, height - values[i], 8, values[i]);
  }
}

async function quickSort(start, end) {
  if (start > end) {
    // 並べ替えるものがない!
    return;
  }
  // partition() は、ピボット要素のインデックスを返します。
  // partition() が実行されたら、
  // ピボット要素の左側のすべての要素はそれより小さく、
  // 右側のすべての要素はそれより大きくなります。
  let index = await partition(start, end);
  // 元の状態を復元します。
  states[index] = -1;
  await Promise.all([quickSort(start, index - 1), quickSort(index + 1, end)]);
}

// 最後のインデックスの要素をピボット要素として選択しましたが、
// 他の選択肢を選択することもできます。
// たとえば、最初の要素をピボットとして選択できます。
async function partition(start, end) {
  for (let i = start; i < end; i++) {
    // 現在考慮されている要素を識別します。
    states[i] = 1;
  }
  // クイックソートアルゴリズム
  let pivotIndex = start;
  // ピボットインデックスを識別します。
  states[pivotIndex] = 0;
  let pivotElement = values[end];
  for (let i = start; i < end; i++) {
    if (values[i] < pivotElement) {
      await swap(i, pivotIndex);
      states[pivotIndex] = -1;
      pivotIndex++;
      states[pivotIndex] = 0;
    }
  }
  await swap(end, pivotIndex);
  for (let i = start; i < end; i++) {
    // 元の状態を復元します。
    if (i != pivotIndex) {
      states[i] = -1;
    }
  }
  return pivotIndex;
}

// 「values」の要素をインデックス「i」と「j」で交換します。
async function swap(i, j) {
  // 値を変更してシミュレーションのペースを
  // 調整します。
  await sleep(25);
  let temp = values[i];
  values[i] = values[j];
  values[j] = temp;
}

// ソートプロセスの速度を遅くして、
// 可視化を容易にするためのカスタムヘルパー関数です。
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
