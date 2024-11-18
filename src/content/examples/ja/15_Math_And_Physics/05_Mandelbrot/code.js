function setup() {
  createCanvas(710, 400);
  pixelDensity(1);
  describe("マンデルブロ集合のカラフルな描画。");
  background(0);

  // 複素平面上の値の範囲を設定
  // 幅の値を変えることでズームレベルが変わる
  let w = 4;
  let h = (w * height) / width;

  // 負の半幅と半高さから開始
  let xMin = -w / 2;
  let yMin = -h / 2;

  // pixels[] 配列にアクセス
  loadPixels();

  // 複素平面上の各点の最大反復回数を設定
  let maxIterations = 100;

  // xは xMin から xMax まで
  let xMax = xMin + w;

  // yは yMin から yMax まで
  let yMax = yMin + h;

  // 各ピクセルのために x,y を増加させる量を計算
  let dx = (xMax - xMin) / width;
  let dy = (yMax - yMin) / height;

  // yの開始
  let y = yMin;
  for (let j = 0; j < height; j += 1) {
    // xの開始
    let x = xMin;
    for (let i = 0; i < width; i += 1) {
      // z = z^2 + cm の反復が発散するかどうかをテスト
      let a = x;
      let b = y;
      let iterations = 0;
      while (iterations < maxIterations) {
        let aSquared = pow(a, 2);
        let bSquared = pow(b, 2);
        let twoAB = 2.0 * a * b;
        a = aSquared - bSquared + x;
        b = twoAB + y;

        // 値が大きすぎる場合、反復を停止
        if (dist(aSquared, bSquared, 0, 0) > 16) {
          break;
        }
        iterations += 1;
      }

      // 無限大に達するまでの時間に基づいて各ピクセルに色を付ける

      let index = (i + j * width) * 4;

      // 反復回数を0-1の範囲に変換
      let normalized = map(iterations, 0, maxIterations, 0, 1);

      // 色の補間のために正規化された値の平方根を使用
      let lerpAmount = sqrt(normalized);

      // デフォルトの色を黒に設定
      let pixelColor = color(0);

      // 青
      let startColor = color(47, 68, 159);

      // 明るい黄色
      let endColor = color(255, 255, 128);

      // 反復回数が最大未満の場合、色を補間
      if (iterations < maxIterations) {
        pixelColor = lerpColor(startColor, endColor, lerpAmount);
      }

      // 色からピクセルにRGBA値をコピー
      for (let i = 0; i < 4; i += 1) {
        pixels[index + i] = pixelColor.levels[i];
      }

      x += dx;
    }
    y += dy;
  }
  updatePixels();
}
