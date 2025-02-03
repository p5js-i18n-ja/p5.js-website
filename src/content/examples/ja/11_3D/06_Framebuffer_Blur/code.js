// Vertex shader code
let vertexShader = `
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

attribute vec3 aPosition;
// テクスチャ座標はp5から頂点シェーダーにのみ来るため
// フラグメントシェーダーに渡すためにvarying変数でテクスチャ座標を渡します
attribute vec2 aTexCoord;
varying vec2 vTexCoord;

void main() {
  // フラグメントシェーダー用にテクスチャ座標を転送
  vTexCoord = aTexCoord;

  // 投影のための4番目の座標を持つ位置をコピー（1.0は通常）
  vec4 positionVec4 = vec4(aPosition, 1.0);

  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
}`;

// Fragment shader code
let fragmentShader = `
precision highp float;
varying vec2 vTexCoord;
uniform sampler2D img;
uniform sampler2D depth;
float getBlurriness(float d) {
  // 焦点深度=0.9から遠ざかるほどぼかしが増します
  return abs(d - 0.9) * 40.;
}
float maxBlurDistance(float blurriness) {
  return blurriness * 0.01;
}
void main() {
  vec4 color = texture2D(img, vTexCoord);
  float samples = 1.;
  float centerDepth = texture2D(depth, vTexCoord).r;
  float blurriness = getBlurriness(centerDepth);
  for (int sample = 0; sample < 20; sample++) {
    // 現在のピクセルから外側に向かってスパイラル状に近くのピクセルをサンプリング
    float angle = float(sample);
    float distance = float(sample) / 20. * maxBlurDistance(blurriness);
    vec2 offset = vec2(cos(angle), sin(angle)) * distance;

    // 近くのピクセルでのオブジェクトの距離はどれくらいか?
    float sampleDepth = texture2D(depth, vTexCoord + offset).r;

    // そのぼかしがどれくらい届くべきか?
    float sampleBlurDistance = maxBlurDistance(getBlurriness(sampleDepth));

    // もしそれが現在のピクセルの前にあるか、またはそのぼかしが
    // 現在のピクセルと重なる場合、その色を平均に加えます
    if (
      sampleDepth >= centerDepth ||
      sampleBlurDistance >= distance
    ) {
      color += texture2D(img, vTexCoord + offset);
      samples++;
    }
  }
  color /= samples;
  gl_FragColor = color;
}`;

let layer;
let blur;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  noStroke();

  // フレームバッファとシェーダーオブジェクトを作成
  layer = createFramebuffer();
  blur = createShader(vertexShader, fragmentShader);

  describe(
    "カメラの前で回転する5つの球体の列。カメラからもっとも近い球体ともっとも遠い球体がぼやけて見えます。",
  );
}

function draw() {
  // フレームバッファへの描画を開始
  layer.begin();
  background(255);
  ambientLight(100);
  directionalLight(255, 255, 255, -1, 1, -1);
  ambientMaterial(255, 0, 0);
  fill(255, 255, 100);
  specularMaterial(255);
  shininess(150);

  // フレームごとに1°回転
  rotateY(frameCount);

  // キャンバスに5つの球体を等間隔で配置
  let sphereDistance = width / 4;
  for (let x = -width / 2; x <= width / 2; x += sphereDistance) {
    push();
    translate(x, 0, 0);
    sphere();
    pop();
  }

  // フレームバッファへの描画を停止
  layer.end();

  // フレームバッファからシェーダーのuniformsに色と深度情報を渡す
  blur.setUniform("img", layer.color);
  blur.setUniform("depth", layer.depth);

  // 深度ぼかしを使ってフレームバッファでキャプチャしたシーンを描画
  shader(blur);
  plane(width, height);
}
