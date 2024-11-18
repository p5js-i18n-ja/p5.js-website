/*
 * @name インタラクティブ 2
 * @arialabel 濃い灰色の背景の中央に色がついた円があり、ユーザーが下部のスライダーをドラッグすると色が変化します。
 * @frame 720,425
 * @description スライダーを動かすと円の色が変化します。
 */

// HTMLの範囲スライダー
let slider;

function setup() {
  createCanvas(720, 400);
  // 色相、彩度、明度
  colorMode(HSB, 255);
  // スライダーは0〜255の範囲で、開始値は127です。
  slider = createSlider(0, 255, 127);
}

function draw() {
  background(127);
  strokeWeight(2);

  // スライダーにしたがって色相を設定します。
  stroke(slider.value(), 255, 255);
  fill(slider.value(), 255, 255, 127);
  ellipse(360, 200, 200, 200);
}
