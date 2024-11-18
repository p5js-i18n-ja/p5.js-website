/*
 * @name 明度
 * @arialabel 白黒で描かれた宇宙飛行士のイメージが黒いスクリーンで覆われています。ユーザーのマウスが懐中電灯のように機能し、マウスを動かすことで画像の一部分が照らされます。
 * @description このプログラムは、各ピクセルとマウスとの距離を計算して、画像の一部の明るさを調整します。
 * <br><br><span class="small"><em>この例は、Processing ウェブサイトの <a href="https://processing.org/examples/brightness.html">明度の例</a> を移植したものです。</em></span>
 */
// このプログラムは、各ピクセルとマウスとの距離を計算して、
// 画像の一部の明るさを調整します。
let img;
// preload() は setup() の前に1回だけ実行されます。
// loadImage() は setup() で呼び出すのではなく、ここで実行する必要があります。
// preload() は、他の処理が実行される前に画像が読み込まれることを保証します。
function preload() {
  // オリジナルの画像を読み込みます。
  img = loadImage("assets/rover_wide.jpg");
}
// setup() は preload() の後に1回実行されます。
function setup() {
  createCanvas(710, 400);
  pixelDensity(1);
  frameRate(30);
}

function draw() {
  image(img, 0, 0);
  // pixels[] 配列を読み込む必要があるのは1回だけです。
  // 形状を描くのではなく、draw() 内で pixels[] を操作するためです。
  loadPixels();
  // この画像のピクセルを読み取るために loadPixels() を呼び出す必要があります。
  img.loadPixels();
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      // 2D グリッドから 1D の位置を計算します。
      let loc = (x + y * img.width) * 4;
      // 画像から R、G、B の値を取得します（今回は R のみ）。
      let r, g, b;
      r = img.pixels[loc];
      // g = img.pixels[loc+1];
      // b = img.pixels[loc+2];
      // マウスに近い距離に基づいて明るさを変更する量を計算します。
      // ピクセルがマウスに近いほど、「distance」の値が低くなります。
      let maxdist = 50; // dist(0, 0, width, height);
      let d = dist(x, y, mouseX, mouseY);
      let adjustbrightness = (255 * (maxdist - d)) / maxdist;
      r += adjustbrightness;
      // g += adjustbrightness;
      // b += adjustbrightness;
      // R が0-255のカラー範囲内に収まるように設定します。
      r = constrain(r, 0, 255);
      // g = constrain(g, 0, 255);
      // b = constrain(b, 0, 255);
      // 新しい色を作成して、ウィンドウ内のピクセルを設定します。
      let pixloc = (y * width + x) * 4;
      pixels[pixloc] = r;
      pixels[pixloc + 1] = r;
      pixels[pixloc + 2] = r;
      pixels[pixloc + 3] = 255; // アルファ値は255固定です。
    }
  }
  updatePixels();
}
