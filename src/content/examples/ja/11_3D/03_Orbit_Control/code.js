function setup() {
  createCanvas(710, 400, WEBGL);
  angleMode(DEGREES);
  strokeWeight(5);
  noFill();
  stroke(32, 8, 64);
  describe(
    "ユーザーは画面をクリックしてドラッグすることで、3D空間での視点を調整できます。空間には、薄いピンクの背景に暗い紫色の立方体の球体があります。",
  );
}

function draw() {
  background(250, 180, 200);

  // マウス/タッチに基づいてカメラを調整するために毎フレーム呼び出します
  orbitControl();

  // 立方体の球体を作成するためにリングを半円で回転させます
  for (let zAngle = 0; zAngle < 180; zAngle += 30) {
    // 立方体のリングを作成するために立方体を全円で回転させます
    for (let xAngle = 0; xAngle < 360; xAngle += 30) {
      push();

      // 球の中心から回転します
      rotateZ(zAngle);
      rotateX(xAngle);

      // その後、400ユニット下に移動します
      translate(0, 400, 0);
      box();
      pop();
    }
  }
}
