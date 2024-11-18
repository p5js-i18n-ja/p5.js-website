// 床の左側と右側の位置のための変数を宣言
let baseLeft;
let baseRight;
let baseColor;

// 移動するボールに関連する変数を宣言
let position;
let velocity;
let radius = 6;
let speed = 3.5;
let circleColor;

function setup() {
  createCanvas(710, 400);
  colorMode(HSB, 360, 100, 100);

  baseLeft = createVector(0, height - 150);
  baseRight = createVector(width, height);
  setColors();

  // 初期位置をキャンバスの中央に設定
  position = createVector(width / 2, height / 2);

  // ランダムな方向で速度を設定
  velocity = p5.Vector.random2D();
  velocity.mult(speed);

  // スクリーンリーダー用の説明を作成
  describe("傾斜面で跳ねるボールのシミュレーション。");
}

function setColors() {
  // ランダムな色相を選択
  baseColor = color(random(30, 180), 70, 70);
  circleColor = color(random(30, 180), 90, 90);
}

function draw() {
  // 背景をクリアし、フェード効果のためにアルファを使用
  background(30, 50);
  frameRate(30);

  // 基盤を描画
  fill(baseColor);
  noStroke();
  quad(
    baseLeft.x,
    baseLeft.y,
    baseRight.x,
    baseRight.y,
    width,
    height,
    0,
    height,
  );

  // 円を描画
  fill(circleColor);
  circle(position.x, position.y, 2 * radius);

  // 円を移動
  position.add(velocity);

  // 衝突を処理
  handleBaseCollision();
  handleBoundaryCollision();
}

function handleBaseCollision() {
  // 基準線の法線ベクトルと切片を計算
  let baseDirection = p5.Vector.sub(baseRight, baseLeft);
  baseDirection.normalize();
  let normal = createVector(baseDirection.y, -baseDirection.x);
  let intercept = baseLeft.dot(normal);

  // 基準との衝突を検出し処理
  if (position.dot(normal) < intercept) {
    // 反射された速度ベクトルを計算: v -= 2 * v.dot(n) * n
    let dot = velocity.dot(normal);
    let bounce = p5.Vector.mult(normal, 2 * dot);
    velocity.sub(bounce);

    // 衝突点で法線ベクトルを描画
    stroke(255);
    strokeWeight(5);
    line(
      position.x,
      position.y,
      position.x + normal.x * 100,
      position.y + normal.y * 100,
    );
  }
}

function handleBoundaryCollision() {
  // 側面のバウンドを処理:
  //
  // ボールが左の壁に達した場合
  // またはボールが右の壁に達した場合、
  // ボールのx速度を反転させてバウンドさせる。
  //
  // 注意: ボールが側面の壁に当たったとき
  // y速度は変わらない。

  if (position.x < radius || position.x > width - radius) {
    velocity.x *= -1;
  }

  // 上部のバウンドを処理:
  // ボールが上部に達した場合、y速度を反転させて
  // バウンドさせる。
  if (position.y < radius) {
    velocity.y *= -1;

    // 基盤と色をランダム化
    baseLeft.y = random(height - 100, height);
    baseRight.y = random(height - 100, height);
    setColors();
  }
}
