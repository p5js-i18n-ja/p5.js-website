let insideRadius = 100;
let outsideRadius = 150;

function setup() {
  createCanvas(720, 400);
  angleMode(DEGREES, 360, 255, 255);
  colorMode(HSB);

  describe("二つの同心円上の頂点からなる三角形で構成された虹のリング。");
}

function draw() {
  background(0);

  let centerX = width / 2;
  let centerY = height / 2;

  // マウスのx位置に基づいてポイントの数を設定します
  let pointCount = map(mouseX, 0, width, 6, 60);

  // pointCountをもっとも近い整数に丸めます
  pointCount = round(pointCount);

  // 現在のpointCountを表示します
  fill(255);
  textSize(20);
  text(`pointCount: ${pointCount}`, 30, 30);

  // 内側の円と外側の円に交互にポイントを指定して三角形ストリップを描画します

  let angle = 0;
  let angleStep = 180.0 / pointCount;

  beginShape(TRIANGLE_STRIP);
  for (let i = 0; i <= pointCount; i += 1) {
    // 外側の円のポイントを指定します
    let pointX = centerX + cos(angle) * outsideRadius;
    let pointY = centerY + sin(angle) * outsideRadius;
    fill(angle, 255, 255);
    vertex(pointX, pointY);
    angle += angleStep;

    // 内側の円のポイントを指定します
    pointX = centerX + cos(angle) * insideRadius;
    pointY = centerY + sin(angle) * insideRadius;
    fill(angle, 255, 255);
    vertex(pointX, pointY);
    angle += angleStep;
  }
  endShape();
}
