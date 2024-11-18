/**
 * @name 2次元方程式のグラフ化
 * @arialabel ユーザーのマウスが右に動くとき、黒と白のパターンの光線がまとまって渦を巻き、ユーザーのマウスが左に動くときには渦が解かれていきます。
 * @frame 710, 400
 * @description 次の方程式をグラフ化します: sin(n * cos(r) + 5θ) 。n は水平方向のマウス位置の関数です。オリジナルは Daniel Shiffman によるものです。
 */
function setup() {
  createCanvas(710, 400);
  pixelDensity(1);
}

function draw() {
  loadPixels();
  let n = (mouseX * 10.0) / width;
  const w = 16.0; // 2次元空間の幅
  const h = 16.0; // 2次元空間の高さ
  const dx = w / width; // ピクセルあたりの x増分
  const dy = h / height; // ピクセルあたりの y増分
  let x = -w / 2; // Start x at -1 * width / 2
  let y;

  let r;
  let theta;
  let val;

  let bw; // グレースケールを格納するための変数
  let i;
  let j;
  let cols = width;
  let rows = height;

  for (i = 0; i < cols; i += 1) {
    y = -h / 2;
    for (j = 0; j < rows; j += 1) {
      r = sqrt(x * x + y * y); // デカルト座標を極座標に変換
      theta = atan2(y, x); // デカルト座標を極座標に変換
      // 2次元の極座標を計算する関数
      val = sin(n * cos(r) + 5 * theta); // 結果は -1 から 1 の範囲の値です
      //var val = cos(r);                            // もう一つのシンプルな関数
      //var val = sin(theta);                        // もう一つのシンプルな関数
      bw = color(((val + 1) * 255) / 2);
      index = 4 * (i + j * width);
      pixels[index] = red(bw);
      pixels[index + 1] = green(bw);
      pixels[index + 2] = blue(bw);
      pixels[index + 3] = alpha(bw);

      y += dy;
    }
    x += dx;
  }
  updatePixels();
}
