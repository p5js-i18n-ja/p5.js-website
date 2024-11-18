/*
 * @name 円グラフ
 * @arialabel 灰色の背景に、円グラフのさまざまなスライスをさまざまな色合いの灰色で描いた円グラフがあります。
 * @description arc() 関数を使用して、配列に格納されたデータから
 * 円グラフを生成します。
 */
let angles = [30, 10, 45, 35, 60, 38, 75, 67];

function setup() {
  createCanvas(720, 400);
  noStroke();
  noLoop(); // 一度だけ実行して停止します。
}

function draw() {
  background(100);
  pieChart(300, angles);
}

function pieChart(diameter, data) {
  let lastAngle = 0;
  for (let i = 0; i < data.length; i++) {
    let gray = map(i, 0, data.length, 0, 255);
    fill(gray);
    arc(
      width / 2,
      height / 2,
      diameter,
      diameter,
      lastAngle,
      lastAngle + radians(angles[i]),
    );
    lastAngle += radians(angles[i]);
  }
}
