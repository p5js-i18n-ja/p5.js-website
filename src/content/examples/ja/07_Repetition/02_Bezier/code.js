// strokeHueをグローバル変数として定義します。この変数は
// 各線の色を設定するために使用されます。
let strokeHue = 20;

function setup() {
  createCanvas(720, 400);

  // bezierのストロークフィルを削除し、新しい
  // ストロークの太さを設定します。色モードをHSBに変更します。
  noFill();
  strokeWeight(2);
  colorMode(HSB);
}

function draw() {
  describe(
    "十本の虹色の線がベジェ曲線の形で描かれます。曲線の上部のアンカーは、黒いキャンバスの上をカーソルが移動するにつれて動きます。",
  );

  background(5);

  // カーソルのX座標に合わせて動くアンカーポイントを持つ
  // 10本のベジェ線を作成します。
  for (let i = 0; i < 200; i += 20) {
    // 各反復で線の色相値に10を加えます。
    strokeColor = i + 10;

    stroke(strokeColor, 50, 60);

    bezier(mouseX - i / 2, 0 + i, 410, 20, 440, 300, 240 - i / 16, 300 + i / 8);
  }
}
