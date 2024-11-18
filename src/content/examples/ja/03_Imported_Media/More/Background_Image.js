/*
 * @name 背景画像
 * @arialabel 宇宙飛行士の画像の上に黄色い横線を描画し、上から下に向かって線を移動させます。
 * @description この例では、背景画像を最速で読み込む方法を示します。
 * 背景として画像を読み込むには、プログラムと同じ幅と高さである必要があります。
 * <p><em><span class="small"> この例をローカル環境で実行するには画像ファイルと実行中の
 * <a href="https://github.com/processing/p5.js/wiki/Local-server">ローカルサーバー</a> が必要です。</span></em></p>
 */
let bg;
let y = 0;

function setup() {
  // 背景画像は、createCanvas() メソッドに渡されるパラメーターと同じサイズである必要があります。
  // このプログラムの場合、画像のサイズは720x400ピクセルです。
  bg = loadImage("assets/moonwalk.jpg");
  createCanvas(720, 400);
}

function draw() {
  background(bg);

  stroke(226, 204, 0);
  line(0, y, width, y);

  y++;
  if (y > height) {
    y = 0;
  }
}
