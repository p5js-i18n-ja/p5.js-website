/*
 * @name 文字
 * @arialabel 灰色の背景に白い文字が並んでいます。母音はピンクで表示しています。
 * @description フォントを読み込み、その特徴を設定してから文字を描くことで、画面に文字を描画することができます。
 * この例では、forループとunicode参照番号を使用して、キャンバスのグリッドに文字を自動的に埋めます。
 * 母音は特定の塗りつぶし色が与えられます。
 */
let font,
  fontsize = 32;

function preload() {
  // assets ディレクトリに保存されている .ttf や .otf フォントは、
  // setup() と draw() が呼ばれる前に確実に読み込みます。
  font = loadFont("assets/SourceSansPro-Regular.otf");
}

function setup() {
  createCanvas(710, 400);

  // テキストの特徴を設定します。
  textFont(font);
  textSize(fontsize);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(160);

  // 文字と左マージン、上マージンの間隔を設定する。
  let gap = 52;
  let margin = 10;
  translate(margin * 4, margin * 4);

  // counter を好みの文字から開始するように設定します。
  // この35は ＃ 記号です。
  let counter = 35;

  // キャンバスにスペースがある限りループします。
  for (let y = 0; y < height - gap; y += gap) {
    for (let x = 0; x < width - gap; x += gap) {
      // Unicode番号で個々の文字を取得するには、counter を使用します。
      let letter = char(counter);

      // 母音やその他の文字に異なる色を設定します。
      if (
        letter === "A" ||
        letter === "E" ||
        letter === "I" ||
        letter === "O" ||
        letter === "U"
      ) {
        fill("#ed225d");
      } else {
        fill(255);
      }

      // スクリーンに文字を描きます。
      text(letter, x, y);

      // counter をインクリメントします。
      counter++;
    }
  }
}
