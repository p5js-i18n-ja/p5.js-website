/*
 * @name 操作を保存
 * @arialabel ユーザーは、赤紫色の背景に白い円を描きます。次の円が描かれるにつれて、円の色が薄くなります。
 * @description 画面上でマウスを動かすと、
 * 円の位置が変化します。
 * マウスの位置は配列に記録され、
 * 1 フレームごとに再生されます。
 * 各フレーム間で、最新の値が配列の末尾に追加され、
 * もっとも古い値が削除されます。
 */
let num = 60;
let mx = [];
let my = [];

function setup() {
  createCanvas(720, 400);
  noStroke();
  fill(255, 153);
  for (let i = 0; i < num; i++) {
    mx.push(i);
    my.push(i);
  }
}

function draw() {
  background(237, 34, 93);

  // 各フレームで異なるエントリーを使用し、配列を循環させます。
  // このように余剰（%）を使用すると、すべての値を移動させるよりも高速になります。
  let which = frameCount % num;
  mx[which] = mouseX;
  my[which] = mouseY;

  for (let i = 0; i < num; i++) {
    // which+1 が一番小さい（配列の中で一番古い）
    let index = (which + 1 + i) % num;
    ellipse(mx[index], my[index], i, i);
  }
}
