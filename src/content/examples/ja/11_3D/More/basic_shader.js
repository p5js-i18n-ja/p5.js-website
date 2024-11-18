/*
 * @name 基本的なシェーダー
 * @arialabel シアンから紫へのグラデーションの背景です。
 * @description これは p5.js でシェーダーを読み込む方法の基本的な例です。
 * <br>p5.js でシェーダーを使用する方法について、詳しくはこちらを参照してください: <a href="https://itp-xstory.github.io/p5js-shaders/">p5.js シェーダー</a>
 */

// この変数にシェーダーオブジェクトを保持します。
let theShader;

function preload() {
  // シェーダーを読み込みます。
  theShader = loadShader("assets/basic.vert", "assets/basic.frag");
}

function setup() {
  // シェーダーを使うためには WEBGL モードにする必要があります。
  createCanvas(710, 400, WEBGL);
  noStroke();
}

function draw() {
  // shader() 関数でアクティブなシェーダーを設定します。
  shader(theShader);

  // rect 関数は画面上にジオメトリ図形を描画します。
  rect(0, 0, width, height);
}
