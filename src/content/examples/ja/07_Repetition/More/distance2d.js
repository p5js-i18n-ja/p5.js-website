/*
 * @name 距離 2D
 * @arialabel マウスが画面上を移動すると、マウスに近いほど小さくなる円のグラデーションができます。
 * @description マウスを画像上で移動して、マトリクスを隠したり表示したりします。
 * マウスから各円までの距離を測定し、
 * それに比例したサイズを設定します。
 */
let max_distance;

function setup() {
  createCanvas(710, 400);
  noStroke();
  max_distance = dist(0, 0, width, height);
}

function draw() {
  background(0);

  for (let i = 0; i <= width; i += 20) {
    for (let j = 0; j <= height; j += 20) {
      let size = dist(mouseX, mouseY, i, j);
      size = (size / max_distance) * 66;
      ellipse(i, j, size, size);
    }
  }
}
