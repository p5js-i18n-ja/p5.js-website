// 移動する物体を格納するための配列を宣言
let movers = [];

// Liquidオブジェクトのための変数を宣言
let liquid;

function setup() {
  createCanvas(720, 400);
  colorMode(HSB, 9, 100, 100);
  initializeMovers();

  // Liquidオブジェクトを作成
  liquid = new Liquid(0, height / 2, width, height / 2, 0.1);

  describe(
    "九つの灰色のボールがキャンバスの上から落下し、キャンバスの下半分に達するにつれて減速します。",
  );
}

function draw() {
  background(20);

  // 水を描画
  liquid.display();

  for (let mover of movers) {
    // 移動体が液体の中にいるか確認
    if (liquid.contains(mover)) {
      // 抵抗力を計算
      let dragForce = liquid.calculateDrag(mover);

      // 抵抗力をMoverに適用
      mover.applyForce(dragForce);
    }

    // 重力は質量に比例
    let gravity = createVector(0, 0.1 * mover.mass);

    // 重力を適用
    mover.applyForce(gravity);

    // 更新して表示
    mover.update();
    mover.display();
    mover.checkEdges();
  }
}

function mousePressed() {
  initializeMovers();
}

function initializeMovers() {
  // キャンバスの幅に基づいて間隔を計算
  let xSpacing = width / 9;

  // 9つのMoverオブジェクトをランダムな質量で movers 配列に格納
  for (let i = 0; i < 9; i += 1) {
    let mass = random(0.5, 3);
    let xPosition = xSpacing * i + xSpacing / 2;
    movers[i] = new Mover(mass, xPosition, 0, color(i, 100, 100));
  }
}

class Liquid {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
  }

  // Moverが液体の中にいるか確認
  contains(m) {
    let l = m.position;
    return (
      l.x > this.x &&
      l.x < this.x + this.w &&
      l.y > this.y &&
      l.y < this.y + this.h
    );
  }

  // 抵抗力を計算
  calculateDrag(m) {
    // 抵抗力の大きさは係数 * 速度の二乗
    let speed = m.velocity.mag();
    let dragMagnitude = this.c * speed * speed;

    // 抵抗力ベクトルを作成（速度の逆方向）
    let dragForce = m.velocity.copy();
    dragForce.mult(-1);

    // 抵抗力ベクトルを上記で計算した大きさにスケール
    dragForce.setMag(dragMagnitude);

    return dragForce;
  }

  display() {
    noStroke();
    fill(50);
    rect(this.x, this.y, this.w, this.h);
  }
} // class Liquid

class Mover {
  constructor(m, x, y, c) {
    this.mass = m;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.color = c;
  }

  // ニュートンの第2法則に従って力を適用: F = M * A
  // または A = F / M
  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    // 加速度によって速度を変更
    this.velocity.add(this.acceleration);

    // 速度によって位置を変更
    this.position.add(this.velocity);

    // 各フレームで加速度をクリア
    this.acceleration.mult(0);
  }

  display() {
    stroke(0);
    strokeWeight(2);
    fill(this.color);
    ellipse(this.position.x, this.position.y, this.mass * 16, this.mass * 16);
  }

  // ボールが底で跳ね返るようにする
  checkEdges() {
    if (this.position.y > height - this.mass * 8) {
      // 底に当たったときの少しの減衰
      this.velocity.y *= -0.9;
      this.position.y = height - this.mass * 8;
    }
  }
} // class Mover
