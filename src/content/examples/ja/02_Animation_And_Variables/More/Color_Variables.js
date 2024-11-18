/*
 * @name カラー変数
 * @arialabel 茶色の背景に左右に2つの正方形があります。どちらの正方形も大きな正方形の中に2つの正方形が入っています。左は、外側の正方形が焦げた土のような茶色、中央の正方形が金色、中央の正方形がオレンジ色になっています。右は、外側の正方形がオレンジ色、真ん中の正方形が焦げた土のような茶色、真ん中の正方形が金色になっています。
 * @description (Albers へのオマージュです。) この例では、数値ではなく、
 * プログラム内で参照可能な色の名前で、色の変数を作成しています。（訳注: 実際には数値で色指定されています。）
 */
function setup() {
  createCanvas(710, 400);
  noStroke();
  background(51, 0, 0);

  let inside = color(204, 102, 0);
  let middle = color(204, 153, 0);
  let outside = color(153, 51, 0);

  // これらの宣言は、上記の宣言と同等の意味です。
  // プログラマーは好きな形式を使うことができます。
  //let inside = color('#CC6600');
  //let middle = color('#CC9900');
  //let outside = color('#993300');

  push();
  translate(80, 80);
  fill(outside);
  rect(0, 0, 200, 200);
  fill(middle);
  rect(40, 60, 120, 120);
  fill(inside);
  rect(60, 90, 80, 80);
  pop();

  push();
  translate(360, 80);
  fill(inside);
  rect(0, 0, 200, 200);
  fill(outside);
  rect(40, 60, 120, 120);
  fill(middle);
  rect(60, 90, 80, 80);
  pop();
}
