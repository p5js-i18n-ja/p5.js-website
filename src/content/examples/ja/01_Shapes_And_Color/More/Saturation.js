/*
 * @name 彩度
 * @arialabel 色の彩度（高から低）を段階的に示す水平バー、ループを使用して制御
 * @description 彩度は色の強さまたは純度を表し、
 * 色相に対する灰色の量を示します。「彩度の高い」
 * 色は純粋であり、「彩度の低い」色は灰色の割合が大きいです。
 */
function setup() {
  createCanvas(400, 400);
  colorMode(HSB);
}

function draw() {
  background(220);
  noStroke();

  for (let i = 0; i < 6; i++) {
    // ループの各反復で
    // 彩度が20ずつ減少します

    // fill(hue,saturation,brightness)
    fill(28, 100 - i * 20, 95);

    rect(0, (i * height) / 6, width, height / 6);
  }
}
