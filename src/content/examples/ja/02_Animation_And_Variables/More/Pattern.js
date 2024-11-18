/*
 * @name パターン
 * @arialabel マウスの動きに応じて暗い灰色の背景に連続する円が描かれ、マウスを早く動かすほど円が大きく、遅く動かすほど小さくなります。
 * @description 画像上でカーソルを移動させると、
 * マウスの速度に応じてソフトウェアツールで描画します。
 */
function setup() {
  createCanvas(710, 400);
  background(102);
}

function draw() {
  // variableEllipse() メソッドを呼び出し、
  // 現在のマウス位置と
  // 前回のマウス位置をパラメーターとして渡します。
  variableEllipse(mouseX, mouseY, pmouseX, pmouseY);
}

// このプログラム専用に作成された単純な variableEllipse() メソッドです。
// マウスのスピードを計算し、
// マウスが遅く動いている場合は小さな楕円を描き、
// マウスが速く動いている場合は大きな楕円を描きます。

function variableEllipse(x, y, px, py) {
  let speed = abs(x - px) + abs(y - py);
  stroke(speed);
  ellipse(x, y, speed, speed);
}
