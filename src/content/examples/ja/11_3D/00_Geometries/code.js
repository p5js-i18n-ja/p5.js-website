// NASAモデルを保存するための変数
let astronaut;

function preload() {
  astronaut = loadModel("/assets/astronaut.obj");
}

function setup() {
  createCanvas(710, 400, WEBGL);

  angleMode(DEGREES);

  // 各ジオメトリの面がどの方向を向いているかを示すために
  // 色を使用する通常のマテリアルを使用します
  normalMaterial();

  describe(
    "八つの3D形状：平面、ボックス、シリンダー、円錐、トーラス、球、楕円体、そして宇宙飛行士のモデル。それぞれの形状がすべての方向に回転しています。形状の表面は多色です。",
  );
}

function draw() {
  background(250);

  // 平面
  push();
  translate(-250, -100, 0);
  rotateWithFrameCount();
  plane(70);
  pop();

  // ボックス
  push();
  translate(-75, -100, 0);
  rotateWithFrameCount();
  box(70, 70, 70);
  pop();

  // シリンダー
  push();
  translate(100, -100, 0);
  rotateWithFrameCount();
  cylinder(70, 70);
  pop();

  // 円錐
  push();
  translate(275, -100, 0);
  rotateWithFrameCount();
  cone(50, 70);
  pop();

  // トーラス
  push();
  translate(-250, 100, 0);
  rotateWithFrameCount();
  torus(50, 20);
  pop();

  // 球
  push();
  translate(-75, 100, 0);
  rotateWithFrameCount();

  // 動きを視覚化するために黒いストロークを表示
  stroke(0);
  sphere(50);
  pop();

  // 楕円体
  push();
  translate(100, 100, 0);
  rotateWithFrameCount();
  ellipsoid(20, 40, 40);
  pop();

  // 宇宙飛行士
  push();
  translate(275, 100, 0);
  rotateWithFrameCount();

  // モデルを直立位置で開始するための追加の回転
  rotateZ(180);
  model(astronaut);
  pop();
}

// 各フレームで3軸すべてに沿って1度回転
function rotateWithFrameCount() {
  rotateZ(frameCount);
  rotateX(frameCount);
  rotateY(frameCount);
}
