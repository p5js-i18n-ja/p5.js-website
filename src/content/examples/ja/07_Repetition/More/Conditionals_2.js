/*
 * @name 条件 2
 * @arialabel 画面の上半分は縦線が間隔をあけて表示されています。画面の下半分には、狭い間隔で縦線が配置されています。
 * @description 前の例から条件文の使い方をを拡張し、
 * キーワード「else」を追加します。
 * これにより、条件文は2つ以上の連続した質問を行い、
 * それぞれに異なるアクションを実行することが可能になります。
 */
function setup() {
  createCanvas(720, 360);
  background(0);

  for (let i = 2; i < width - 2; i += 4) {
    // i 変数が 20 で割り切れる場合
    if (i % 20 === 0) {
      stroke(255);
      line(i, 80, i, height / 2);
      // i 変数が 10 で割り切れる場合
    } else if (i % 10 === 0) {
      stroke(153);
      line(i, 20, i, 180);
      // 上記の2つの条件のどちらも満たさない場合は、
      // 次の線を引きます。
    } else {
      stroke(102);
      line(i, height / 2, i, height - 20);
    }
  }
}
