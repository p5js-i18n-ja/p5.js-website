// パーティクルシステムとテクスチャのための変数を宣言
let particleTexture;
let particleSystem;

function preload() {
  particleTexture = loadImage("/assets/particle_texture.png");
}

function setup() {
  // キャンバスのサイズを設定
  createCanvas(720, 400);
  colorMode(HSB);

  // パーティクルシステムを初期化
  particleSystem = new ParticleSystem(
    0,
    createVector(width / 2, height - 60),
    particleTexture,
  );

  describe(
    "白い円がキャンバスの中央で煙を出し、風の力はカーソルの位置によって決まります。",
  );
}

function draw() {
  background(20);

  // マウスのx位置に基づいて風の力を計算
  let dx = map(mouseX, 0, width, -0.2, 0.2);
  let wind = createVector(dx, 0);

  // 風を適用し、パーティクルシステムを実行
  particleSystem.applyForce(wind);
  particleSystem.run();
  for (let i = 0; i < 2; i += 1) {
    particleSystem.addParticle();
  }

  // 風の力を示す矢印を描画
  drawVector(wind, createVector(width / 2, 50, 0), 500);
}

// ベクトルの大きさと方向を示す矢印を表示
function drawVector(v, loc, scale) {
  push();
  let arrowSize = 4;
  translate(loc.x, loc.y);
  stroke(255);
  strokeWeight(3);
  rotate(v.heading());

  let length = v.mag() * scale;
  line(0, 0, length, 0);
  line(length, 0, length - arrowSize, +arrowSize / 2);
  line(length, 0, length - arrowSize, -arrowSize / 2);
  pop();
}

class ParticleSystem {
  constructor(particleCount, origin, textureImage) {
    this.particles = [];

    // 入力ベクトルのコピーを作成
    this.origin = origin.copy();
    this.img = textureImage;
    for (let i = 0; i < particleCount; ++i) {
      this.particles.push(new Particle(this.origin, this.img));
    }
  }

  run() {
    // 各パーティクルをループして実行
    for (let i = this.particles.length - 1; i >= 0; i -= 1) {
      let particle = this.particles[i];
      particle.run();

      // 死んだパーティクルを削除
      if (particle.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }

  // 各パーティクルに力を適用
  applyForce(dir) {
    for (let particle of this.particles) {
      particle.applyForce(dir);
    }
  }

  addParticle() {
    this.particles.push(new Particle(this.origin, this.img));
  }
} // class ParticleSystem

class Particle {
  constructor(pos, imageTexture) {
    this.loc = pos.copy();

    let xSpeed = randomGaussian() * 0.3;
    let ySpeed = randomGaussian() * 0.3 - 1.0;

    this.velocity = createVector(xSpeed, ySpeed);
    this.acceleration = createVector();
    this.lifespan = 100.0;
    this.texture = imageTexture;
    this.color = color(frameCount % 256, 255, 255);
  }

  // パーティクルを更新して描画
  run() {
    this.update();
    this.render();
  }

  // パーティクルを描画
  render() {
    imageMode(CENTER);
    tint(this.color, this.lifespan);
    image(this.texture, this.loc.x, this.loc.y);
  }

  applyForce(f) {
    // 力ベクトルを現在の加速度ベクトルに加える
    this.acceleration.add(f);
  }

  isDead() {
    return this.lifespan <= 0.0;
  }

  // パーティクルの位置、速度、寿命を更新
  update() {
    this.velocity.add(this.acceleration);
    this.loc.add(this.velocity);
    this.lifespan -= 2.5;

    // 加速度をゼロに設定
    this.acceleration.mult(0);
  }
} // class Particle
