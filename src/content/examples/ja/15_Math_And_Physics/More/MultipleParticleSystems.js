/*
 * @name 複数のパーティクルシステム
 * @arialabel ユーザーが黒い背景の任意の場所をクリックすると、スパークラーのようにクリックした場所から薄い灰色の円が噴き出すパーティクルシステムが始まります。
 * @description マウスをクリックすると、マウスの位置からパーティクルが噴き出すアニメーションを生成します。<br>それぞれのパーティクルの噴出は、Particles と CrazyParticles（Particle のサブクラス）で構成されるパーティクルシステムの1インスタンスです。<br>ここで継承と多態性の使用に注意してください。<br>
 * オリジナル: Daniel Shiffman
 */
let systems;

function setup() {
  createCanvas(710, 400);
  systems = [];
}

function draw() {
  background(51);
  background(0);
  for (i = 0; i < systems.length; i++) {
    systems[i].run();
    systems[i].addParticle();
  }
  if (systems.length == 0) {
    fill(255);
    textAlign(CENTER);
    textSize(32);
    text(
      "マウスをクリックしてパーティクルシステムを追加します",
      width / 2,
      height / 2,
    );
  }
}

function mousePressed() {
  this.p = new ParticleSystem(createVector(mouseX, mouseY));
  systems.push(p);
}

// シンプルな Particle クラス
let Particle = function (position) {
  this.acceleration = createVector(0, 0.05);
  this.velocity = createVector(random(-1, 1), random(-1, 0));
  this.position = position.copy();
  this.lifespan = 255.0;
};

Particle.prototype.run = function () {
  this.update();
  this.display();
};

// 位置を更新するメソッド
Particle.prototype.update = function () {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

// 表示するメソッド
Particle.prototype.display = function () {
  stroke(200, this.lifespan);
  strokeWeight(2);
  fill(127, this.lifespan);
  ellipse(this.position.x, this.position.y, 12, 12);
};

// パーティクルはまだ役に立ちますか？
Particle.prototype.isDead = function () {
  if (this.lifespan < 0) {
    return true;
  } else {
    return false;
  }
};

let ParticleSystem = function (position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function () {
  // システムに Particle または CrazyParticle を追加します。
  if (int(random(0, 2)) == 0) {
    p = new Particle(this.origin);
  } else {
    p = new CrazyParticle(this.origin);
  }
  this.particles.push(p);
};

ParticleSystem.prototype.run = function () {
  for (let i = this.particles.length - 1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};

// Particle のサブクラス

function CrazyParticle(origin) {
  // 親コンストラクタを呼び出し、Function#call を使用して
  // 「this」が呼び出し中に正しく設定されることを確認します。
  Particle.call(this, origin);

  // 追加されたプロパティを初期化します。
  this.theta = 0.0;
}

// Particle.prototype から継承した CrazyParticle.prototype オブジェクトを作成します。
// 注意: ここでよくある間違いは、CrazyParticle.prototype を作成するために
// 「new Particle()」を使用することです。これはいくつかの理由で間違いです。
// 最大の理由は、「origin」引数に何も与えるものがないことです。
// Particle を呼び出す正しい場所は上記で、CrazyParticle から呼び出すところです。
CrazyParticle.prototype = Object.create(Particle.prototype); // 下記の注意を参照してください。

// 「constructor」プロパティを CrazyParticle を指すように設定します。
CrazyParticle.prototype.constructor = CrazyParticle;

// ここではメソッド run() が存在しないことに注意してください。これは Particle から継承されます。

// この update() メソッドは、親クラスの update() メソッドをオーバーライドします。
CrazyParticle.prototype.update = function () {
  Particle.prototype.update.call(this);
  // 水平方向の速度に基づいて回転を増加させます。
  this.theta += (this.velocity.x * this.velocity.mag()) / 10.0;
};

// この display() メソッドは親クラスの display() メソッドをオーバーライドします。
CrazyParticle.prototype.display = function () {
  // 通常のパーティクルと同様に楕円を描画します。
  Particle.prototype.display.call(this);
  // その後、回転する線を追加します。
  push();
  translate(this.position.x, this.position.y);
  rotate(this.theta);
  stroke(255, this.lifespan);
  line(0, 0, 25, 0);
  pop();
};
