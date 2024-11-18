/* 
 * @name 三角ホイールと円グラフ
 * @arialabel 白地に2つの円があります。1つの円はさまざまな色のスライス。1つの円は、虹色のグラデーションで円形に螺旋状に巻かれた長方形で構成されています。
 * @frame 400,400
 * @description <a href="https://www.rit.edu/directory/wmhics-w-michelle-harris">
   <b>Prof WM Harris</b></a>による投稿です。
   <b>どのようにして</b> 三角カラーホイールと、人口年齢データのビジュアライゼーションとしての
   円グラフを作成するのかを示しています。<br/>
キャンバスのセットアップ、三角カラーホイール、スライスの描画、円グラフの
各関数が作成されています。
スライスの大きさとそれらの色の範囲が決定されます。
円グラフは値ごとに明確な色で区切られていますが、
三角カラーホイールは固定された数でスライスされ、
それらの範囲内が色塗りされます。
*/

function setup() {
  createCanvas(400, 400);
  colorMode(HSB);
  angleMode(DEGREES);

  // カラーホイールの中心点を表す変数群
  let x = width / 2;
  let y = height / 2 + 100;
  colorWheel(x, y, 100); // スライド 11

  noStroke();
  pieChartPop(200, 100); // スライド 12
}

//**** スライド 12 円グラフ デモ
function pieChartPop(x, y) {
  let [total, child, young, adult, senior, elder] = [
    577, 103, 69, 122, 170, 113,
  ];
  let startValue = 0;
  let range = 0;

  // チャイルド スライス
  range = child / total;
  drawSlice("blue", x, y, 200, startValue, startValue + range);
  startValue += range;
  // ヤング スライス
  range = young / total;
  drawSlice("orange", x, y, 200, startValue, startValue + range);
  startValue += range;
  // アダルト スライス
  range = adult / total;
  drawSlice("green", x, y, 200, startValue, startValue + range);
  startValue += range;
  // シニア スライス
  range = senior / total;
  drawSlice("tan", x, y, 200, startValue, startValue + range);
  startValue += range;
  // エルダー スライス
  range = elder / total;
  drawSlice("pink", x, y, 200, startValue, startValue + range);
  startValue += range;
}

/**
 * drawSlice - 角度のパーセンテージに基づいて色付きの円弧を描画します。 スライド 13
 * 0％ が一番上（実際には -90 ）から始まるように角度を調整します。
 * @param {color} fColor - 塗りつぶし色
 * @param {number} x - 中心 x
 * @param {number} y - 中心 y
 * @param {number} d - 直径
 * @param {float} percent1 - 開始パーセント
 * @param {float} percent2 - 終了パーセント
 */
function drawSlice(fColor, x, y, d, percent1, percent2) {
  fill(fColor);
  arc(x, y, d, d, -90 + percent1 * 360, -90 + percent2 * 360);
}

//**** スライド 11 三角カラーホイール デモ
function colorWheel(x, y, rad) {
  strokeWeight(10);
  strokeCap(SQUARE);

  // 360度、1回転につき ＋10度の反復処理です。
  for (let a = 0; a < 360; a += 10) {
    stroke(a, 150, 200); // 半径を100、角度を度として
    // 色相を計算します。
    line(x, y, x + rad * cos(a), y + rad * sin(a));
  }
}
