// vertex shader code as a string
let vertexShader = `
precision highp float;

attribute vec3 aPosition;
attribute vec2 aTexCoord;
attribute vec4 aVertexColor;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

varying vec2 vTexCoord;

void main() {
  // カメラ変換を適用
  vec4 viewModelPosition =
    uModelViewMatrix *
    vec4(aPosition, 1.0);

  // WebGLに頂点の位置を伝える
  gl_Position =
    uProjectionMatrix *
    viewModelPosition;  

  // フラグメントシェーダーにデータを渡す
  vTexCoord = aTexCoord;
}
 `;

// fragment shader code as a string
let fragmentShader = `
// casey conchinha - @kcconch ( https://github.com/kcconch )
// louise lessel - @louiselessel ( https://github.com/louiselessel )
// さらに多くのp5.js + シェーダーの例: https://itp-xstory.github.io/p5js-shaders/
// rotate/tile関数はpatricio gonzalez vivoによる例から
// @patriciogv ( patriciogonzalezvivo.com )

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;
varying vec2 vTexCoord;

vec2 rotate2D (vec2 _st, float _angle) {
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

vec2 tile (vec2 _st, float _zoom) {
    _st *= _zoom;
    return fract(_st);
}

vec2 rotateTilePattern(vec2 _st){
    
    //  座標系を2x2にスケール
    _st *= 2.0;
    
    //  各セルに位置に応じたインデックス番号を付与
    float index = 0.0;
    index += step(1., mod(_st.x,2.0));
    index += step(1., mod(_st.y,2.0))*2.0;
    
    //      |
    //  2   |   3
    //      |
    //--------------
    //      |
    //  0   |   1
    //      |
    
    // 各セルを0.0 - 1.0の範囲にする
    _st = fract(_st);
    
    // インデックスに応じて各セルを回転
    if(index == 1.0){
        //  セル1を90度回転
        _st = rotate2D(_st,PI*0.5);
    } else if(index == 2.0){
        //  セル2を-90度回転
        _st = rotate2D(_st,PI*-0.5);
    } else if(index == 3.0){
        //  セル3を180度回転
        _st = rotate2D(_st,PI);
    }
    
    return _st;
}

float concentricCircles(in vec2 st, in vec2 radius, in float res, in float scale) {
    float dist = distance(st,radius);
    float pct = floor(dist*res)/scale;
    return pct;
}

void main (void) {
    vec2 st = vTexCoord;
    vec2 mst = gl_FragCoord.xy/mouse.xy;
    float mdist= distance(vec2(1.0,1.0), mst);
    
    float dist = distance(st,vec2(sin(time/10.0),cos(time/10.0)));
    st = tile(st,10.0);
    
    st = rotate2D(st,dist/(mdist/5.0)*PI*2.0);
    
    gl_FragColor = vec4(vec3(concentricCircles(st, vec2(0.0,0.0), 5.0, 5.0),concentricCircles(st, vec2(0.0,0.0), 10.0, 10.0),concentricCircles(st, vec2(0.0,0.0), 20.0, 10.0)),1.0);
}
`;

// この変数はシェーダーオブジェクトを保持します
let theShader;

// この変数はcreateGraphicsレイヤーを保持します
let shaderTexture;

function setup() {
  // シェーダーはWEBGLモードで動作する必要があります
  createCanvas(710, 400, WEBGL);

  noStroke();
  angleMode(DEGREES);

  // 頂点シェーダーとフラグメントシェーダーの文字列を使用してシェーダーオブジェクトを作成
  theShader = createShader(vertexShader, fragmentShader);

  describe("グラデーションのある正方形グリッドに分割された球体。");
}

function draw() {
  background(255);

  // シェーダーにユニフォーム値を送信
  theShader.setUniform("resolution", [width, height]);
  theShader.setUniform("time", millis() / 1000.0);
  theShader.setUniform("mouse", [mouseX, map(mouseY, 0, height, height, 0)]);

  shader(theShader);
  // テクスチャを使用して球体を追加
  translate(-150, 0, 0);
  push();
  rotateX(-mouseY);
  rotateY(-mouseX);
  sphere(125);
  pop();

  // テクスチャを使用して楕円を追加
  // 3Dで滑らかなエッジのために楕円に5番目のパラメータを渡す
  ellipse(260, 0, 200, 200, 100);
}
