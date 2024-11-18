let snake;

function setup() {
  createCanvas(700, 400, WEBGL);
  angleMode(DEGREES);
  buildSnake();
  describe("A tiled plane of snake models");
}

function buildSnake() {
  // 以前のスネークがあった場合、それを置き換えます
  // そうすることで、メモリを節約するためにリソースを解放できます
  if (snake) {
    freeGeometry(snake);
  }

  snake = buildGeometry(() => {
    colorMode(HSB, 100);
    fill(random(100), 50, 100);

    // 頭を描画します
    push();
    scale(1, 0.5, 1.4);
    sphere(50);
    pop();

    // 目を描画します
    for (let mirrorX of [-1, 1]) {
      push();
      scale(mirrorX, 1, 1);
      fill("black");
      translate(20, -20, 10);
      sphere(10);
      pop();
    }
    translate(0, 0, 50);

    // 体を描画します
    let numSegments = ceil(random(10, 30));
    for (let segment = 0; segment < numSegments; segment++) {
      rotateY(random(-60, 60));
      translate(0, 0, 50);
      push();
      rotateX(90);
      scale(1, 1, 0.5);
      let radius = map(segment, numSegments - 5, numSegments, 50, 0, true);
      cylinder(radius, 100);
      pop();
      translate(0, 0, 50);
    }
  });

  // モデルを再中心化し、共通のサイズにスケールします
  snake.normalize();
}

function draw() {
  background(255);
  noStroke();
  scale(1.5);

  // スネークの平面の周りをゆっくりと回転します
  rotateX(-45);
  rotateY(frameCount * 0.25);

  // マテリアルと光沢を設定します
  lights();
  specularMaterial("white");
  shininess(100);

  // 地面に沿ってスネークモデルを複数回タイルします
  for (let x = -4; x <= 4; x += 1) {
    for (let z = -4; z <= 4; z += 1) {
      push();
      translate(x * 200, 0, z * 200);
      model(snake);
      pop();
    }
  }
}

// マウスが押されたとき、新しいスネークを生成します
function mousePressed() {
  buildSnake();
}
