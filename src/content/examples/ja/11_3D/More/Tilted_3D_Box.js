/*
 * @name 傾いた3Dボックス
 * @description モバイル端末を使って、ボックスを傾けます。
 */
function setup() {
  createCanvas(displayWidth, displayHeight, WEBGL);
}

function draw() {
  background(250);
  normalMaterial();
  rotateX(accelerationX * 0.01);
  rotateY(accelerationY * 0.01);
  box(100, 100, 100);
}
