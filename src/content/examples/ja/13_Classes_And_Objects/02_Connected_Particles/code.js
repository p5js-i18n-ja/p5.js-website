// パーティクルの配列を含むパスオブジェクトの配列
let paths = [];

// 次のパーティクルまでの時間
let framesBetweenParticles = 5;
let nextParticleFrame = 0;

// 最後に作成されたパーティクルの位置
let previousParticlePosition;

// パーティクルがフェードアウトするまでの時間
let particleFadeFrames = 300;

function setup() {
  createCanvas(720, 400);
  colorMode(HSB);

  // デフォルトのベクトルで開始し、これを使用して最後に作成されたパーティクルの位置を保存する
  previousParticlePosition = createVector();
  describe(
    "カーソルが黒い背景上をドラッグすると、白い輪郭線で描かれた多色の円と、それらを結ぶ白い線のパターンが描かれます。円と線は時間とともにフェードアウトします。",
  );
}

function draw() {
  background(0);

  // すべてのパスを更新して描画する
  for (let path of paths) {
    path.update();
    path.display();
  }
}

// マウスが押されたときに新しいパスを作成する
function mousePressed() {
  nextParticleFrame = frameCount;
  paths.push(new Path());

  // 前のパーティクルの位置をマウスにリセットする
  // これにより、パスの最初のパーティクルの速度がゼロになる
  previousParticlePosition.set(mouseX, mouseY);
  createParticle();
}

// マウスがドラッグされたときにパーティクルを追加する
function mouseDragged() {
  // 新しいポイントを作成する時間になったら
  if (frameCount >= nextParticleFrame) {
    createParticle();
  }
}

function createParticle() {
  // マウスの位置を取得する
  let mousePosition = createVector(mouseX, mouseY);

  // 新しいパーティクルの速度はマウスの動きに基づく
  let velocity = p5.Vector.sub(mousePosition, previousParticlePosition);
  velocity.mult(0.05);

  // 新しいパーティクルを追加する
  let lastPath = paths[paths.length - 1];
  lastPath.addParticle(mousePosition, velocity);

  // 次のパーティクルをスケジュールする
  nextParticleFrame = frameCount + framesBetweenParticles;

  // マウスの値を保存する
  previousParticlePosition.set(mouseX, mouseY);
}

// パスはパーティクルのリストである
class Path {
  constructor() {
    this.particles = [];
  }

  addParticle(position, velocity) {
    // 位置、速度、色相を持つ新しいパーティクルを追加する
    let particleHue = (this.particles.length * 30) % 360;
    this.particles.push(new Particle(position, velocity, particleHue));
  }

  // すべてのパーティクルを更新する
  update() {
    for (let particle of this.particles) {
      particle.update();
    }
  }

  // 2つのパーティクル間に線を引く
  connectParticles(particleA, particleB) {
    let opacity = particleA.framesRemaining / particleFadeFrames;
    stroke(255, opacity);
    line(
      particleA.position.x,
      particleA.position.y,
      particleB.position.x,
      particleB.position.y,
    );
  }

  // パスを表示する
  display() {
    // パーティクルが削除されたとき、次のループのインデックス番号が
    // 削除されたパーティクルの前のパーティクルと一致するように、
    // 後ろからループする
    for (let i = this.particles.length - 1; i >= 0; i -= 1) {
      // このパーティクルの残りフレームがなければ削除する
      if (this.particles[i].framesRemaining <= 0) {
        this.particles.splice(i, 1);

        // そうでなければ、表示する
      } else {
        this.particles[i].display();

        // このパーティクルの後にパーティクルがある場合
        if (i < this.particles.length - 1) {
          // それらを線で結ぶ
          this.connectParticles(this.particles[i], this.particles[i + 1]);
        }
      }
    }
  }
}

// パスに沿ったパーティクル
class Particle {
  constructor(position, velocity, hue) {
    this.position = position.copy();
    this.velocity = velocity.copy();
    this.hue = hue;
    this.drag = 0.95;
    this.framesRemaining = particleFadeFrames;
  }

  update() {
    // 移動させる
    this.position.add(this.velocity);

    // 減速させる
    this.velocity.mult(this.drag);

    // フェードアウトさせる
    this.framesRemaining = this.framesRemaining - 1;
  }

  // パーティクルを描画する
  display() {
    let opacity = this.framesRemaining / particleFadeFrames;
    noStroke();
    fill(this.hue, 80, 90, opacity);
    circle(this.position.x, this.position.y, 24);
  }
}
