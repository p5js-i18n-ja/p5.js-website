// グローバル変数を定義します。
// p5のホームページのステートメントから単語を格納するための配列を作成します。
let words = [
  "p5.js",
  "is",
  "a",
  "JavaScript",
  "library",
  "for",
  "creative",
  "coding",
  "with",
  "a",
  "focus",
  "on",
  "making",
  "coding",
  "accessible",
  "and",
  "inclusive",
  "for",
  "artists",
  "designers",
  "educators",
  "beginners",
  "and",
  "anyone",
  "else!",
  "p5.js",
  "is",
  "free",
  "and",
  "open-source",
  "because",
  "we",
  "believe",
  "software",
  "and",
  "the",
  "tools",
  "to",
  "learn",
  "it",
  "should",
  "be",
  "accessible",
  "to",
  "everyone",
  "Using",
  "the",
  "metaphor",
  "of",
  "a",
  "sketch",
  "p5.js",
  "has",
  "a",
  "full",
  "set",
  "of",
  "drawing",
  "functionality",
  "However",
  "you're",
  "not",
  "limited",
  "to",
  "your",
  "drawing",
  "canvas",
  "You",
  "can",
  "think",
  "of",
  "your",
  "whole",
  "browser",
  "page",
  "as",
  "your",
  "sketch",
  "including",
  "HTML5",
  "objects",
  "for",
  "text",
  "input",
  "video",
  "webcam",
  "and",
  "sound",
];

// キャンバスに描画する単語の数と、
// 開始色相値を設定します。配列内の単語選択をランダムに開始するための位置変数を宣言します。
let wordCount = 15;
let hue;
let position;

function setup() {
  describe(
    "p5.jsに関連するランダムな単語の系列がキャンバスに散りばめられます。",
  );

  // キャンバスのstyle.cssファイルで定義されたフォントスタイルをインポートします。
  textFont("Space Mono");

  createCanvas(720, 400);

  // テキストの配置を中央揃えにし、色モードをHSBに設定します。
  textAlign(CENTER);
  colorMode(HSB);

  // 色相をランダムな値として定義します。
  hue = random(180, 360);

  // 配列内の単語を選択するためのランダムな開始点を定義します。
  position = floor(random(0, words.length - wordCount));

  background(hue, 95, 25);

  // words変数で設定された数だけ、キャンバスにランダムな位置で単語を描画します。
  for (let i = 0; i < 20; i++) {
    textSize(random(16, 48));
    fill(hue, 200, random(50, 95));
    text(random(words), random(width), random(height));
  }
}
