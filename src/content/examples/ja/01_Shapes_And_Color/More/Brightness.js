/*
 * @name 明るさ
 * @arialabel 明るさ（高から低）を段階的に示す水平バー、ループを使用して制御
 * @description 明るさは、色相に混ぜられた黒または白の量です。
 * 白を加えると色が明るくなり、黒を加えると暗くなります。
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
    // 明るさが20ずつ減少します

    // fill(hue,saturation,brightness)
    fill(28, 100, 100 - i * 20);

    rect(0, (i * height) / 6, width, height / 6);
  }
}
