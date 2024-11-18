/*
 * @name 配列
 * @arialabel 垂直な線が白い背景の上を横切り、棒グラフのようにコサイン曲線の値を可視化しています。
 * @description 配列はデータの一覧を意味します。配列内のデータの値ひとつひとつは
 * 配列内の位置を表すインデックス番号を用いて識別されます。
 * 配列はゼロベースであり、配列の最初の要素は
 * [0]、2番目の要素は [1]、これ以降も同様であることを意味します。
 * この例では、「coswave」という名前の配列が作成され
 * 初期値をコサインの値で埋められます。このデータは画面上に
 * 3分割して表示されます。
 */
let coswave = [];

function setup() {
  createCanvas(720, 360);
  for (let i = 0; i < width; i++) {
    let amount = map(i, 0, width, 0, PI);
    coswave[i] = abs(cos(amount));
  }
  background(255);
  noLoop();
}

function draw() {
  let y1 = 0;
  let y2 = height / 3;
  for (let i = 0; i < width; i += 3) {
    stroke(coswave[i] * 255);
    line(i, y1, i, y2);
  }

  y1 = y2;
  y2 = y1 + y1;
  for (let i = 0; i < width; i += 3) {
    stroke((coswave[i] * 255) / 4);
    line(i, y1, i, y2);
  }

  y1 = y2;
  y2 = height;
  for (let i = 0; i < width; i += 3) {
    stroke(255 - coswave[i] * 255);
    line(i, y1, i, y2);
  }
}
