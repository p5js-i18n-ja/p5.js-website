/*
 * @name シェーダーのユニフォームを渡す
 * @arialabel 暗い紫色の背景の中央にセージグリーンの形状があります。ユーザーのマウスが左に移動すると形状の辺が少なくなり、右に移動すると辺が増えます。
 * @description ユニフォームは、p5からシェーダーに情報を渡す手段です。
 * <br>p5.js でシェーダーを使用する方法について、詳しくはこちらを参照してください: <a href="https://itp-xstory.github.io/p5js-shaders/">p5.js シェーダー</a>
 */

// この変数にシェーダーオブジェクトを保持します。
let theShader;

function preload() {
  // シェーダーを読み込みます。
  theShader = loadShader("assets/uniforms.vert", "assets/uniforms.frag");
}

function setup() {
  // シェーダーを使うためには WEBGL モードにする必要があります。
  createCanvas(710, 400, WEBGL);
  noStroke();

  describe(
    "a 2d example containing a sage green polygon, rotating in the middle of the sketch. As the mouse moves horizontally, the number of sides for the polygon change.",
  );
}

function draw() {
  // shader() 関数でアクティブなシェーダーを設定します。
  shader(theShader);

  // 解像度、マウス、時間をシェーダーに送信しましょう。
  // マウスと時間を送信する前に、シェーダーで扱いやすくなるようにデータ加工しています。
  theShader.setUniform("resolution", [
    width * displayDensity(),
    height * displayDensity(),
  ]);
  theShader.setUniform("mouse", map(mouseX, 0, width, 0, 7));
  theShader.setUniform("time", frameCount * 0.01);

  // rect 関数は画面上にジオメトリを描画します。
  rect(0, 0, width, height);
}
