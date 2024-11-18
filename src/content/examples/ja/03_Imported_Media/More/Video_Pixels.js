/*
 * @name ビデオ・ピクセル
 * @arialabel ビデオが黒い円に変えられ、ピクセルのように見えます。ユーザーのマウスが右にドラッグするとピクセルのサイズが大きくなり、左にドラッグすると小さくなります。
 * @frame 320,240
 * @description ビデオを読み込み、そのピクセルを操作し、キャンバスに描画します。
 * この例をローカルで実行するには、動作している
 * <a href="https://github.com/processing/p5.js/wiki/Local-server">ローカルサーバー</a>が必要です。
 */
let fingers;

function setup() {
  createCanvas(320, 240);
  // 異なるブラウザ用に複数のフォーマットを指定します。
  fingers = createVideo(["assets/fingers.mov", "assets/fingers.webm"]);
  fingers.loop();
  fingers.hide();
  noStroke();
  fill(0);
}

function draw() {
  background(255);
  fingers.loadPixels();
  const stepSize = round(constrain(mouseX / 8, 6, 32));
  for (let y = 0; y < height; y += stepSize) {
    for (let x = 0; x < width; x += stepSize) {
      const i = y * width + x;
      const darkness = (255 - fingers.pixels[i * 4]) / 255;
      const radius = stepSize * darkness;
      ellipse(x, y, radius, radius);
    }
  }
}
