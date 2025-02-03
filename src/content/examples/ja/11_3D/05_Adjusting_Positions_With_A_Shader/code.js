let wiggleShader;

let vertSrc = `
precision highp float;

attribute vec3 aPosition;
attribute vec4 aVertexColor;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

varying vec4 vVertexColor;

uniform float time;

void main() {
  vec3 position = aPosition;

  // 各頂点ごとにオフセットを追加します。テクスチャ座標に基づいて
  // 時間遅延が発生します。
  position.y += 20.0 * sin(time * 0.01 + position.y * 0.1);

  // p5で設定された変換を適用します
  vec4 viewModelPosition = uModelViewMatrix * vec4(position, 1.0);

  // WebGLに頂点が描画される位置を伝えます
  gl_Position = uProjectionMatrix * viewModelPosition;  

  // 頂点の色をフラグメントシェーダーに渡します
  vVertexColor = aVertexColor;
}
`;

let fragSrc = `
precision highp float;

// 頂点シェーダーから頂点の色を受け取ります
varying vec4 vVertexColor;

void main() {
  // ピクセルを頂点の色で塗ります
  gl_FragColor = vVertexColor;
}
`;

let ribbon;
function setup() {
  createCanvas(700, 400, WEBGL);
  wiggleShader = createShader(vertSrc, fragSrc);

  let startColor = color("#F55");
  let endColor = color("#55F");
  ribbon = buildGeometry(() => {
    noStroke();

    // 頂点のリボンを描画します
    beginShape(QUAD_STRIP);
    let numPoints = 50;
    for (let currentPoint = 0; currentPoint < numPoints; currentPoint++) {
      let x = map(currentPoint, 0, numPoints - 1, -width / 3, width / 3);
      let y = map(currentPoint, 0, numPoints - 1, -height / 3, height / 3);

      // リボンに沿って色を赤から青に変化させます
      fill(lerpColor(startColor, endColor, currentPoint / (numPoints - 1)));
      for (let z of [-50, 50]) {
        vertex(x, y, z);
      }
    }
    endShape();
  });

  describe("時間とともに波打つ赤から青のリボン");
}

function draw() {
  background(255);
  noStroke();

  rotateX(PI * 0.1);

  // 作成した頂点シェーダーを使用します。この行をコメントアウトして
  // シェーダーで動かさない場合のリボンの見た目を確認してみてください!
  shader(wiggleShader);

  // シェーダーに現在の時間を渡してアニメーションさせます。
  wiggleShader.setUniform("time", millis());

  // リボンを描画します。シェーダーがそれを歪めてアニメーションさせます。
  model(ribbon);
}
