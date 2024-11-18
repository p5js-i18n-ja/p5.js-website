/*
 * @name スパイログラフ
 * @arialabel 灰色の背景に黒い円のアウトラインが互いに連動して回転しているスパイログラフが作成されます。ユーザーがスペースキーを押すと、背景が白くなり、さまざまなサイズの円の軌跡がインディゴ色で表示されます。
 * @description このスケッチは、シンプルな変換を使用して、
 * 互いに連動する円（サインと呼ばれる）をもつスパイログラフのような効果を作成します。
 * スペースキーを押すと、トレースと仕組みのジオメトリ（サインの動き）の表示を切り替えられます。<br>
 * 例の作成者: <a href='http://lukedubois.com/' target='_blank'>R. Luke DuBois</a><br>
 * <a href='http://en.wikipedia.org/wiki/Spirograph'>http://en.wikipedia.org/wiki/Spirograph</a>
 */
let NUMSINES = 20; // 一度に描画するサインの数
let sines = new Array(NUMSINES); // 現在の角度を保持する配列
let rad; // 中心のサインの初期半径値
let i; // カウンター変数

// これらを操作して、何が起こっているかを理解しましょう:
let fund = 0.005; // 中心のサインの速度
let ratio = 1; // 追加されるサインの速度の乗数
let alpha = 50; // トレースシステムの不透明度

let trace = false; // トレースしているかどうか

function setup() {
  createCanvas(710, 400);

  rad = height / 4; // 中心円の半径を計算します。
  background(204); // 画面をクリアします。

  for (let i = 0; i < sines.length; i++) {
    sines[i] = PI; // すべてを北向きにスタートさせます。
  }
}

function draw() {
  if (!trace) {
    background(204); // ジオメトリーを表示している場合は画面をクリアします。
    stroke(0, 255); // 黒のペン
    noFill(); // 塗りつぶし無し
  }

  // メインアクション
  push(); // 変換行列を開始します。
  translate(width / 2, height / 2); // 画面の中心に移動します。

  for (let i = 0; i < sines.length; i++) {
    let erad = 0; // 円内の小さな「点」の半径...これがトレース時の「ペン」になります。
    // トレースの設定
    if (trace) {
      stroke(0, 0, 255 * (float(i) / sines.length), alpha); // 青色
      fill(0, 0, 255, alpha / 2); // これも青色です。
      erad = 5.0 * (1.0 - float(i) / sines.length); // ペンの太さは、どのサインに関連しているかによって決まります。
    }
    let radius = rad / (i + 1); // 円自体の半径
    rotate(sines[i]); // 円を回転させます。
    if (!trace) ellipse(0, 0, radius * 2, radius * 2); // シミュレーション中なら、サインを描画します。
    push(); // ひとつ上のレベルへ移動します。
    translate(0, radius); // サインの端まで移動します。
    if (!trace) ellipse(0, 0, 5, 5); // 小さな円を描画します。
    if (trace) ellipse(0, 0, erad, erad); // トレース時には erad で描画します。
    pop(); // ひとつ下のレベルへ戻ります。
    translate(0, radius); // 次のサインの位置に移動します。
    sines[i] = (sines[i] + (fund + fund * i * ratio)) % TWO_PI; // 基本周波数に基づいて角度を更新します。
  }

  pop(); // 最終的な変換を取り消します。
}

function keyReleased() {
  if (key == " ") {
    trace = !trace;
    background(255);
  }
}
