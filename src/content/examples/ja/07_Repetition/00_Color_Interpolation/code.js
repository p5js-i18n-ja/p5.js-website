function setup() {
  createCanvas(400, 400);
  colorMode(HSB);
  noStroke();
  describe(
    "上部が明るい緑、下部が暗い青にフェードする横縞。上の縞は「Color A」とラベル付けされ、下の縞は「Color B」とラベル付けされています。",
  );

  // 上の色
  // 色相: 100°, 彩度: 90%, 明度: 100%
  let colorA = color(100, 90, 100);

  // 下の色
  // 色相: 250°, 彩度: 80%, 明度: 20%
  let colorB = color(250, 80, 20);

  // 縞の数
  let stripeCount = 12;

  // キャンバスの高さを縞の数で割る
  let stripeHeight = height / stripeCount;

  // キャンバスの上部から始め、
  // 下部まで繰り返す
  // 毎回stripeHeightだけ下に移動する、
  for (let y = 0; y < height; y += stripeHeight) {
    // y位置を0（キャンバスの上部）から1（キャンバスの下部）までの数値に変換する
    let fadeAmount = y / height;

    // 色を補間する
    let betweenColor = lerpColor(colorA, colorB, fadeAmount);

    // 縞を描画する
    fill(betweenColor);
    rect(0, y, width, stripeHeight);
  }

  // テキストラベルを描画する
  let margin = 5;
  let boxWidth = 60;
  let cornerRadius = 5;
  textAlign(CENTER, CENTER);
  fill(255);
  rect(margin, margin, boxWidth, stripeHeight - margin * 2, cornerRadius);
  fill(0);
  text("Color A", margin, margin, boxWidth, stripeHeight - margin * 2);
  fill(255);
  rect(
    5,
    height - stripeHeight + margin,
    boxWidth,
    stripeHeight - margin * 2,
    cornerRadius,
  );
  fill(0);
  text(
    "Color B",
    5,
    height - stripeHeight + margin,
    60,
    stripeHeight - margin * 2,
  );
}
