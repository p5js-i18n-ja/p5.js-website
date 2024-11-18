/*
 * @name ノイズ 3D
 * @arialabel ノイズのグラデーションです。
 * @frame 710,400 (optional)
 * @description 3D ノイズを使用してシンプルなアニメーションテクスチャを作成します。
 */

let noiseVal;
// x増分を 0.01 にセットします。
let x_increment = 0.01;
// draw() が呼ばれる各サイクルでの z増分を 0.02 にセットします。
let z_increment = 0.02;

// オフセット値
let z_off, y_off, x_off;

function setup() {
  // キャンバスを作成します。
  createCanvas(640, 360);
  // フレームレートを設定します。
  frameRate(20);
  // z_offの初期値
  z_off = 0;
}

function draw() {
  x_off = 0;
  y_off = 0;
  // 背景を黒にします。
  background(0);
  // ノイズのディテールを調整します。
  noiseDetail(8, 0.65);

  // x、y 毎でノイズ値を計算します。
  for (let y = 0; y < height; y++) {
    x_off += x_increment;
    y_off = 0;

    for (let x = 0; x < width; x++) {
      //それぞれのピクセルを計算し、描画します。
      noiseVal = noise(x_off, y_off, z_off);
      stroke(noiseVal * 255);
      y_off += x_increment;
      point(x, y);
    }
  }

  z_off += z_increment;
}
