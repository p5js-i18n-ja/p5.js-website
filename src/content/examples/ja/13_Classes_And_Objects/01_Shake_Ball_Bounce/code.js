// グローバル変数を定義します。
// balls変数は、キャンバス内のすべての
// ボールを含みます。
let balls = [];

// threshold変数は、モバイルデバイスが
// 反応を開始するのに十分に動いたかどうかを
// チェックするために使用されます。
let threshold = 30;

// accChangeXとaccChangeYは、モバイルデバイスが
// 動いたときの加速度を測定します。
let accChangeX = 0;
let accChangeY = 0;

// accChangeTは、モバイルデバイスの位置の
// 全体的な変化を計算するために使用されます。
let accChangeT = 0;

function setup() {
  describe("モバイルデバイスが傾くたびにキャンバス内でバウンドする20個の円。");

  // ビューポートディスプレイ全体を埋めるキャンバスを作成します。
  createCanvas(displayWidth, displayHeight);

  // Ballクラスのインスタンスを20個作成します。
  for (let i = 0; i < 20; i++) {
    balls.push(new Ball());
  }
}

function draw() {
  background(0);

  // 作成された各ボールに対して、checkForShake()関数で
  // 収集された測定値に応じてボールを移動させます。
  for (let i = 0; i < balls.length; i++) {
    balls[i].move();
    balls[i].display();
  }
  checkForShake();
}

function checkForShake() {
  // accelerationXとaccelerationYの総変化を計算します。
  accChangeX = abs(accelerationX - pAccelerationX);
  accChangeY = abs(accelerationY - pAccelerationY);

  // モバイルデバイスの加速度の全体的な変化を計算します。
  accChangeT = accChangeX + accChangeY;

  // 全体的な変化がしきい値以上の場合、
  // shake()とturn()メソッドを呼び出し、
  // 各ボールの方向と速度を変更します。
  if (accChangeT >= threshold) {
    for (let i = 0; i < balls.length; i++) {
      balls[i].shake();
      balls[i].turn();
    }
  }
  // 全体的な変化がしきい値に満たない場合、
  // ボールの動きを徐々に遅くします。
  else {
    for (let i = 0; i < balls.length; i++) {
      balls[i].stopShake();
      balls[i].turn();
      balls[i].move();
    }
  }
}

// Ballクラスを作成します。
class Ball {
  constructor() {
    // 作成された各ボールにランダムなサイズ、速度、
    // キャンバス内の開始位置を与えます。
    this.x = random(width);
    this.y = random(height);
    this.diameter = random(10, 30);
    this.xspeed = random(-2, 2);
    this.yspeed = random(-2, 2);
    this.direction = 0.7;

    // oxspeedはstopShake()メソッドで速度の減少を
    // 計算するために使用されます。
    this.oxspeed = this.xspeed;
    this.oyspeed = this.yspeed;
  }

  // ボールのmove()メソッドが呼び出されるたびに、
  // その速度と移動方向を掛け合わせ、
  // それをキャンバス内の新しい位置とします。
  move() {
    this.x += this.xspeed * this.direction;
    this.y += this.yspeed * this.direction;
  }

  // ボールがキャンバスの端に触れた場合、
  // 端から跳ね返るようにします。
  turn() {
    if (this.x < 0) {
      this.x = 0;
      this.direction = -this.direction;
    } else if (this.y < 0) {
      this.y = 0;
      this.direction = -this.direction;
    } else if (this.x > width - 20) {
      this.x = width - 20;
      this.direction = -this.direction;
    } else if (this.y > height - 20) {
      this.y = height - 20;
      this.direction = -this.direction;
    }
  }

  // ボールのshake()メソッドが呼び出されるたびに、
  // accelerationXの値の変化に基づいて
  // ボールの速度を増加させます。
  shake() {
    this.xspeed += random(5, accChangeX / 3);
    this.yspeed += random(5, accChangeX / 3);
  }

  // ボールのstopShake()メソッドが呼び出されるたびに、
  // その速度を徐々に遅くします。
  stopShake() {
    if (this.xspeed > this.oxspeed) {
      this.xspeed -= 0.6;
    } else {
      this.xspeed = this.oxspeed;
    }
    if (this.yspeed > this.oyspeed) {
      this.yspeed -= 0.6;
    } else {
      this.yspeed = this.oyspeed;
    }
  }

  // 上記のメソッドで計算された現在の座標と
  // ランダム化された直径に基づいて、
  // キャンバス上にボールを描画します。
  display() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}
