function setup() {
  createCanvas(400, 400);
  colorMode(HSB);

  // atan2()が度数法で角度を返すように角度モードを設定します
  angleMode(DEGREES);

  describe("カーソルを追う二つの目。");
}

function draw() {
  background(0);

  // 左目を描画します

  let leftX = 150;
  let leftY = 200;

  // 左目とマウスの間の角度を計算します
  let leftAngle = atan2(mouseY - leftY, mouseX - leftX);

  push();
  translate(leftX, leftY);
  fill(255);
  ellipse(0, 0, 50, 50);
  rotate(leftAngle);
  fill(0);
  ellipse(12.5, 0, 25, 25);
  pop();

  // 右目を描画します

  let rightX = 250;
  let rightY = 200;

  // 右目とマウスの間の角度を計算します
  let rightAngle = atan2(mouseY - rightY, mouseX - rightX);

  push();
  translate(rightX, rightY);
  fill(255);
  ellipse(0, 0, 50, 50);
  rotate(rightAngle);
  fill(0);
  ellipse(12.5, 0, 25, 25);
  pop();
}
