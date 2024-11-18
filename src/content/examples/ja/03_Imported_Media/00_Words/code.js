// グローバル変数を定義: フォントとフォントサイズ
let font;
let fontsize = 40;

function preload() {
  // キャンバスのアセットディレクトリにフォントファイルをプリロード
  // loadFont() は .ttf または .otf ファイルを受け入れます
  font = loadFont("/assets/SourceSansPro-Regular.otf");
}

function setup() {
  describe(
    "白い背景に「ichi」、「ni」、「san」、「shi」の単語の3つの列。最初の列は右揃え、中間の列は中央揃え、左の列は左揃えです。",
  );

  createCanvas(710, 400);
  background(250);

  // テキストスタイルを事前定義されたフォントとフォントサイズに設定
  textFont(font);
  textSize(fontsize);

  // テキストを右揃えにし、drawWords() 関数を実行して
  // 左の列のテキストを生成
  textAlign(RIGHT, CENTER);
  drawWords(width * 0.25);

  // テキストを中央揃えにし、drawWords() 関数を実行して
  // 中央の列のテキストを生成
  textAlign(CENTER, CENTER);
  drawWords(width * 0.5);

  // テキストを左揃えにし、drawWords() 関数を実行して
  // 右の列のテキストを生成
  textAlign(LEFT, CENTER);
  drawWords(width * 0.75);
}

function drawWords(x) {
  // drawWords() 関数は4つの text() インスタンスを作成し、
  // setup() で作成された各列によって供給された x 座標を使用
  fill(80);

  text("ichi", x, 80);

  text("ni", x, 150);

  text("san", x, 220);

  text("shi", x, 290);
}
