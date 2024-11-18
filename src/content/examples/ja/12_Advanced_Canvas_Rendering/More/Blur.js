/*
 * @name ブラー効果
 * @arialabel 左側に白黒でレンダリングされた宇宙飛行士、右側に画像のぼかしバージョンがあります。
 * @description 画像をぼかす低域通過フィルターです。このプログラムは、画像のすべてのピクセルを分析し、周囲のすべてのピクセルと混ぜ合わせて画像をぼかします。
 * <br><br><span class="small"><em>この例は、Processing ウェブサイトの <a href="https://processing.org/examples/blur.html">ブラー効果の例</a> を移植したものです。</em></span>
 */
// 周囲のすべてのピクセルを考慮するために、3x3の配列を使用します。
// そして、これらの値を正規化します。
// v は正規化された値です。
let v = 1.0 / 9.0;
// kernel は正規化された値の3x3行列です。
let kernel = [
  [v, v, v],
  [v, v, v],
  [v, v, v],
];

// preload() は setup() の前に1回だけ実行されます。
// loadImage() は setup() で呼び出すのではなく、ここで実行する必要があります。
// setup() で loadImage() を呼び出すと、noLoop() により draw() が1回しか実行されないため、
// 画像が表示されません（1回の draw() では画像を読み込むための十分な時間がありません）。
// preload() は、他の処理が実行される前に画像が読み込まれることを保証します。
function preload() {
  // オリジナルの画像を読み込みます。
  img = loadImage("assets/rover.png");
}

// setup() は preload() の後に1回実行されます。
function setup() {
  // キャンバスを作成します。
  createCanvas(710, 400);
  // noLoop() は draw() を1回のみ実行し、ループしないようにします。
  noLoop();
}

// draw() は通常、setup() の後にループ実行されます。
// 今回は noLoop() のため1回だけ実行されます。
function draw() {
  // オリジナルの画像を左上隅に配置します。
  image(img, 0, 0);

  // img と同じ寸法の新しい画像を作成します。
  edgeImg = createImage(img.width, img.height);

  // 画像のピクセルを読み込みます。
  edgeImg.loadPixels();

  // x 軸と y 軸を反復処理するための2つの for() ループ
  // kernel はピクセルが上下左右にピクセルを持っていることを前提としているため、
  // 最初の列と行、最後の列と行をスキップする必要があります。
  // x は1から画像の幅-1までになります。
  // y は1から画像の高さ-1までになります。
  for (let x = 1; x < img.width; x++) {
    for (let y = 1; y < img.height; y++) {
      // 現在のピクセルの kernel の合計は0から始まります。
      let sum = 0;

      // kernel を反復処理するための kx、ky 変数
      // kx、ky には3つの異なる値があります：-1、0、1
      for (kx = -1; kx <= 1; kx++) {
        for (ky = -1; ky <= 1; ky++) {
          let xpos = x + kx;
          let ypos = y + ky;

          // 画像がグレースケールであるため、
          // RGB 値は同一です。
          // この例では赤の値を取得します
          // (緑と青も同様に機能します)。
          let val = red(img.get(xpos, ypos));

          // kernel の合計を蓄積します。
          // kernel は3x3の行列です。
          // kx と ky には-1、0、1の値があります。
          // kx と ky に1を加えると、0、1、2が得られます。
          // それを使用して kernel を反復処理し、
          // 累積和を計算できます。
          sum += kernel[kx + 1][ky + 1] * val;
        }
      }

      // edgeImg のピクセル値を kernel の合計に設定します。
      edgeImg.set(x, y, color(sum));
    }
  }
  // updatePixels() で dgeImg の変更を書き込みます。
  edgeImg.updatePixels();

  // 元の画像の右側に edgeImg（ぼかした画像）を描画します。
  image(edgeImg, img.width, 0);
}
