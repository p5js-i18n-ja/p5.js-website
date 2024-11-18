/*
 * @name ウェブカメラを使用したシェーダー
 * @arialabel ユーザーの内蔵ウェブカメラで表示されるシーンにネオンテクスチャが追加されます。
 * @description ウェブカメラはテクスチャとしてシェーダーに渡すことができます。
 * <br>p5.js でシェーダーを使用する方法について、詳しくはこちらを参照してください: <a href="https://itp-xstory.github.io/p5js-shaders/">p5.js シェーダー</a>
 */

// この変数にシェーダーオブジェクトを保持します。
let theShader;
// この変数にウェブカメラ映像を保持します。
let cam;

function preload() {
  // シェーダーを読み込みます。
  theShader = loadShader("assets/webcam.vert", "assets/webcam.frag");
}

function setup() {
  // シェーダーを使うためには WEBGL モードにする必要があります。
  createCanvas(710, 400, WEBGL);
  noStroke();

  cam = createCapture(VIDEO);
  cam.size(710, 400);

  cam.hide();
}

function draw() {
  // shader() 関数でアクティブなシェーダーを設定します。
  shader(theShader);

  // ウェブカメラ映像をテクスチャとして渡します。
  theShader.setUniform("tex0", cam);

  // rect 関数は画面上にジオメトリを描画します。
  rect(0, 0, width, height);
}
