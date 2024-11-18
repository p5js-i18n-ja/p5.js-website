/*
 * @name ブラウニアンモーション
 * @arialabel 灰色の背景に白い線がなぐり書きのように描かれます。
 * @description ランダムな移動を一筆書きで記録します。
 * Processing の実例ページのオリジナル例を移植しました。
 */

let num = 2000;
let range = 6;

let ax = [];
let ay = [];

function setup() {
  createCanvas(710, 400);
  for (let i = 0; i < num; i++) {
    ax[i] = width / 2;
    ay[i] = height / 2;
  }
  frameRate(30);
}

function draw() {
  // 背景を塗りつぶします。
  background(51);

  // 全要素を左にひとつずつずらします。
  for (let i = 1; i < num; i++) {
    ax[i - 1] = ax[i];
    ay[i - 1] = ay[i];
  }

  // 新しい値を配列の末尾に追加します。
  ax[num - 1] += random(-range, range);
  ay[num - 1] += random(-range, range);

  // すべての点が画面内に収まるように制限をかけます。
  ax[num - 1] = constrain(ax[num - 1], 0, width);
  ay[num - 1] = constrain(ay[num - 1], 0, height);

  // 点をつないで線を描きます。
  for (let j = 1; j < num; j++) {
    let val = (j / num) * 204.0 + 51;
    stroke(val);
    line(ax[j - 1], ay[j - 1], ax[j], ay[j]);
  }
}
