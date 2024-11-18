/*
 * @name Hue
 * @arialabel 異なる色相を段階的に示す水平バー、ループを使用して制御
 * @description 色相は、色が赤、緑、青などとして知覚される属性です。これは、彩度（強度）や明るさとは独立しています。
 */
function setup() {
  createCanvas(400, 400);
  colorMode(HSB);
}

function draw() {
  background(220);
  noStroke();

  for (let i = 0; i < 12; i++) {
    // ループの各反復で
    // 色相が25ずつ減少します

    // fill(hue,saturation,brightness)
    fill(360 - i * 25, 100, 100);

    rect(0, (i * height) / 12, width, height / 12);
  }
}
