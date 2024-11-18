// Noise tends to look smoother with coordinates that are very close together
// これらの値はx座標とy座標によって掛け算され、
// 結果の値が非常に近くなるようにします。
let xScale = 0.015;
let yScale = 0.02;

let gapSlider;
let gap;
let offsetSlider;
let offset;

function setup() {
  createCanvas(400, 400);

  // スライダーを設定します
  gapSlider = createSlider(2, width / 10, width / 20);
  gapSlider.changed(dotGrid);
  gapSlider.mouseMoved(checkChanged);
  offsetSlider = createSlider(0, 1000, 0);
  offsetSlider.mouseMoved(checkChanged);

  // グリッドを描画します
  dotGrid();
}

// マウスがスライダーの上に移動したとき
// 何かが変更された場合、ドットグリッドを描画します
function checkChanged() {
  if (gap !== gapSlider.value()) {
    dotGrid();
  }
  if (offset !== offsetSlider.value()) {
    dotGrid();
  }
}

function dotGrid() {
  background(255);
  noStroke();
  fill(0);

  // スライダーから現在のギャップとオフセットの値を取得します
  gap = gapSlider.value();
  offset = offsetSlider.value();

  // ギャップで設定された増分でx座標とy座標をループします
  for (let x = gap / 2; x < width; x += gap) {
    for (let y = gap / 2; y < height; y += gap) {
      // スケールされたオフセット座標を使用してノイズ値を計算します
      let noiseValue = noise((x + offset) * xScale, (y + offset) * yScale);

      // noiseValueは0-1の範囲になるため、ギャップを掛けて直径を設定します
      // 円の間のギャップのサイズの間で
      let diameter = noiseValue * gap;
      circle(x, y, diameter);
    }
  }
}
