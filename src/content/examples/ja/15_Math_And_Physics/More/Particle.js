/*
 * @name パーティクル
 * @arialabel 細い線で接続された小さな灰色の円が黒い背景のあちこちを浮遊しています。
 * @description particle.js という軽量な JavaScript ライブラリがあり、
 * とても美しいパーティクルシステムを作成します。
 * これは、p5.js を使用してそのパーティクルシステムを再現しようとする試みです。
 * Particle.js に触発され、Sagar Arora の貢献により作成されました。
 */

// このクラスは単一のパーティクルのプロパティを構成します。
class Particle {
  // パーティクルの座標、半径、
  // および両座標軸での速度を設定します。
  constructor() {
    this.x = random(0, width);
    this.y = random(0, height);
    this.r = random(1, 8);
    this.xSpeed = random(-2, 2);
    this.ySpeed = random(-1, 1.5);
  }

  // パーティクルを作成します。
  createParticle() {
    noStroke();
    fill("rgba(200,169,169,0.5)");
    circle(this.x, this.y, this.r);
  }

  // パーティクルを動かします。
  moveParticle() {
    if (this.x < 0 || this.x > width) this.xSpeed *= -1;
    if (this.y < 0 || this.y > height) this.ySpeed *= -1;
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  // ある距離未満にあるパーティクルの間に
  // 接続（線）を作成します。
  joinParticles(particles) {
    particles.forEach((element) => {
      let dis = dist(this.x, this.y, element.x, element.y);
      if (dis < 85) {
        stroke("rgba(255,255,255,0.04)");
        line(this.x, this.y, element.x, element.y);
      }
    });
  }
}

// 複数のパーティクルを追加するための配列
let particles = [];

function setup() {
  createCanvas(720, 400);
  for (let i = 0; i < width / 10; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background("#0f0f0f");
  for (let i = 0; i < particles.length; i++) {
    particles[i].createParticle();
    particles[i].moveParticle();
    particles[i].joinParticles(particles.slice(i));
  }
}
