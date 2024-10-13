let flock;

function setup() {
  createCanvas(640, 360);
  createP("マウスをドラッグして新しいボイドを生成します。");

  flock = new Flock();

  // システムに初期のボイドのセットを追加
  for (let i = 0; i < 100; i++) {
    let b = new Boid(width / 2, height / 2);
    flock.addBoid(b);
  }

  describe(
    "三角形で表現された鳥のようなオブジェクトのグループが、群れの行動をモデル化してキャンバス上を移動します。",
  );
}

function draw() {
  background(0);
  flock.run();
}

// マウスドラッグ時に、新しいボイドを群れに追加
function mouseDragged() {
  flock.addBoid(new Boid(mouseX, mouseY));
}

// すべてのボイドの配列を管理するFlockクラス
class Flock {
  constructor() {
    // ボイドの配列を初期化
    this.boids = [];
  }

  run() {
    for (let boid of this.boids) {
      // ボイド全体のリストを各ボイドに個別に渡す
      boid.run(this.boids);
    }
  }

  addBoid(b) {
    this.boids.push(b);
  }
}

class Boid {
  constructor(x, y) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.position = createVector(x, y);
    this.size = 3.0;

    // 最大速度
    this.maxSpeed = 3;

    // 最大操舵力
    this.maxForce = 0.05;
    colorMode(HSB);
    this.color = color(random(256), 255, 255);
  }

  run(boids) {
    this.flock(boids);
    this.update();
    this.borders();
    this.render();
  }

  applyForce(force) {
    // ここに質量を追加することもできます: A = F / M
    this.acceleration.add(force);
  }

  // 3つのルールに基づいて、毎回新しい加速度を蓄積します
  flock(boids) {
    let separation = this.separate(boids);
    let alignment = this.align(boids);
    let cohesion = this.cohesion(boids);

    // これらの力を任意に重み付け
    separation.mult(1.5);
    alignment.mult(1.0);
    cohesion.mult(1.0);

    // 力のベクトルを加速度に加える
    this.applyForce(separation);
    this.applyForce(alignment);
    this.applyForce(cohesion);
  }

  // 位置を更新するメソッド
  update() {
    // 速度を更新
    this.velocity.add(this.acceleration);

    // 速度を制限
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);

    // 各サイクルで加速度を0にリセット
    this.acceleration.mult(0);
  }

  // ターゲットに向かう操舵力を計算して適用するメソッド
  // STEER = DESIRED MINUS VELOCITY
  seek(target) {
    // 現在位置からターゲットへのベクトル
    let desired = p5.Vector.sub(target, this.position);

    // desiredを正規化し、最大速度にスケーリング
    desired.normalize();
    desired.mult(this.maxSpeed);

    // 操舵 = 目的 - 速度
    let steer = p5.Vector.sub(desired, this.velocity);

    // 最大操舵力に制限
    steer.limit(this.maxForce);
    return steer;
  }

  render() {
    // 速度の方向に回転した三角形を描画
    let theta = this.velocity.heading() + radians(90);
    fill(this.color);
    stroke(255);
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.size * 2);
    vertex(-this.size, this.size * 2);
    vertex(this.size, this.size * 2);
    endShape(CLOSE);
    pop();
  }

  // 画面端のラップアラウンド
  borders() {
    if (this.position.x < -this.size) {
      this.position.x = width + this.size;
    }

    if (this.position.y < -this.size) {
      this.position.y = height + this.size;
    }

    if (this.position.x > width + this.size) {
      this.position.x = -this.size;
    }

    if (this.position.y > height + this.size) {
      this.position.y = -this.size;
    }
  }

  // 分離
  // 近くのボイドをチェックし、離れるように操舵するメソッド
  separate(boids) {
    let desiredSeparation = 25.0;
    let steer = createVector(0, 0);
    let count = 0;

    // システム内のすべてのボイドに対して、近すぎないかチェック
    for (let boid of boids) {
      let distanceToNeighbor = p5.Vector.dist(this.position, boid.position);

      // 距離が0より大きく、任意の量未満の場合（0は自分自身の場合）
      if (distanceToNeighbor > 0 && distanceToNeighbor < desiredSeparation) {
        // 隣接ボイドから離れる方向のベクトルを計算
        let diff = p5.Vector.sub(this.position, boid.position);
        diff.normalize();

        // 距離に応じてスケーリング
        diff.div(distanceToNeighbor);
        steer.add(diff);

        // カウントを記録
        count++;
      }
    }

    // 平均 -- カウント数で割る
    if (count > 0) {
      steer.div(count);
    }

    // ベクトルの大きさが0より大きい場合
    if (steer.mag() > 0) {
      // レイノルズの実装: 操舵 = 目的 - 速度
      steer.normalize();
      steer.mult(this.maxSpeed);
      steer.sub(this.velocity);
      steer.limit(this.maxForce);
    }
    return steer;
  }

  // 整列
  // システム内の近くのすべてのボイドに対して、平均速度を計算
  align(boids) {
    let neighborDistance = 50;
    let sum = createVector(0, 0);
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if (d > 0 && d < neighborDistance) {
        sum.add(boids[i].velocity);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxSpeed);
      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxForce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }

  // 結合
  // 近くのすべてのボイドの平均位置（つまり中心）に向かう操舵ベクトルを計算
  cohesion(boids) {
    let neighborDistance = 50;
    let sum = createVector(0, 0); // すべての位置を蓄積するための空のベクトルで開始
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if (d > 0 && d < neighborDistance) {
        sum.add(boids[i].position); // 位置を追加
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      return this.seek(sum); // その位置に向かって操舵
    } else {
      return createVector(0, 0);
    }
  }
} // Boidクラス
