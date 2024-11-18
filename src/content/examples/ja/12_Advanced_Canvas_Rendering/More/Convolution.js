/*
 * @name たたみ込み
 * @arialabel 宇宙飛行士の画像を背景に表示し、ユーザーのマウスの動きに合わせて画像の鮮明度を上げる正方形の領域も動きます。
 * @description 画像の一部にたたみ行列を適用します。マウスを移動させると別の箇所にフィルターを適用できます。この例は、Processing ウェブサイトの <a href="https://processing.org/examples/convolution.html" target="blank">Dan Shiffman によるたたみ込みの例</a> を移植したものです。特に指定のない限り、Dan によるオリジナルのコメントを記載しています。
 * <p><em><span class="small"> この例をローカルで実行するには画像ファイルと実行中の <a href="https://github.com/processing/p5.js/wiki/Local-server">ローカルサーバー</a> が必要です。</span></em></p>
 */

let img;
let w = 80;

// 3x3のたたみ込み行列で画像をたたみ込むことで、さまざまな効果を生み出すことができます。
// これはハイパスフィルターであり、エッジを強調します。
const matrix = [
  [-1, -1, -1],
  [-1, 9, -1],
  [-1, -1, -1],
];

function preload() {
  img = loadImage("assets/moonwalk.jpg");
}

function setup() {
  createCanvas(720, 400);
  img.loadPixels();

  // pixelDensity(1) はピクセル密度を表示密度にスケーリングしないためのものです。
  // 詳細については pixelDensity() のリファレンスを参照してください。
  pixelDensity(1);
}

function draw() {
  // 画像の一部分だけを処理する予定なので、まずは全体を背景として設定しましょう。
  background(img);

  // フィルターを適用する正方形の領域を計算します。
  const xstart = constrain(mouseX - w / 2, 0, img.width);
  const ystart = constrain(mouseY - w / 2, 0, img.height);
  const xend = constrain(mouseX + w / 2, 0, img.width);
  const yend = constrain(mouseY + w / 2, 0, img.height);
  const matrixsize = 3;

  loadPixels();
  // 範囲内のすべてのピクセルに対して処理を開始します。
  for (let x = xstart; x < xend; x++) {
    for (let y = ystart; y < yend; y++) {
      let c = convolution(x, y, matrix, matrixsize, img);

      // 変数「c」から RGBA の値を取得してピクセルを更新します。
      let loc = (x + y * img.width) * 4;
      pixels[loc] = red(c);
      pixels[loc + 1] = green(c);
      pixels[loc + 2] = blue(c);
      pixels[loc + 3] = alpha(c);
    }
  }
  updatePixels();
}

function convolution(x, y, matrix, matrixsize, img) {
  let rtotal = 0.0;
  let gtotal = 0.0;
  let btotal = 0.0;
  const offset = Math.floor(matrixsize / 2);
  for (let i = 0; i < matrixsize; i++) {
    for (let j = 0; j < matrixsize; j++) {
      // 検査するピクセル
      const xloc = x + i - offset;
      const yloc = y + j - offset;
      let loc = (xloc + img.width * yloc) * 4;

      // 画像の範囲内かどうかを確認します。ここで loc の値をさらに上手く制限できるかもしれません。
      loc = constrain(loc, 0, img.pixels.length - 1);

      // たたみ込みの計算
      // RGB 値を取得します。
      rtotal += img.pixels[loc] * matrix[i][j];
      gtotal += img.pixels[loc + 1] * matrix[i][j];
      btotal += img.pixels[loc + 2] * matrix[i][j];
    }
  }
  // RGB 値を0〜255に制限します。
  rtotal = constrain(rtotal, 0, 255);
  gtotal = constrain(gtotal, 0, 255);
  btotal = constrain(btotal, 0, 255);

  // たたみ込み処理をした結果の色を返します。
  return color(rtotal, gtotal, btotal);
}
