/*
 * @name ヒストグラム
 * @description 画像のヒストグラムを計算します。
 * ヒストグラムは、灰色レベルの頻度分布であり、左側には純粋な黒の値の数が、
 * 右側には純粋な白の値の数が表示されます。
 * このスケッチはAndroidでは異なる動作をすることに注意してください。ほとんどの画像は
 * もはやフル24ビットカラーではありません。
 */

let img;
let hist = [];

function preload() {
  // データディレクトリから画像を読み込む
  // コメントを変更することで別の画像を読み込む
  img = loadImage("/assets/frontier.jpg");
}

function setup() {
  createCanvas(640, 360);
  image(img, 0, 0);

  // ヒストグラムを初期化
  for (let i = 0; i < 100; i++) {
    hist.push(0);
  }

  // ヒストグラムを計算
  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      let bright = int(brightness(img.get(i, j)));
      hist[bright]++;
    }
  }
}

function draw() {
  // ヒストグラムの最大値を見つける
  let histMax = max(hist);
  stroke(255);
  // ヒストグラムの半分を描画（2つおきの値をスキップ）
  for (let i = 0; i < img.width; i += 2) {
    // i（0..img.widthから）をヒストグラムの位置（0..100）にマッピング
    let which = int(map(i, 0, img.width, 0, 100));
    // ヒストグラムの値を画像の下部と上部の間の位置に変換
    let y = int(map(hist[which], 0, histMax, img.height, 0));
    line(i, img.height, i, y);
  }
}
