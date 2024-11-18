/*
 * @name 複数のスプリング
 * @arialabel 濃い灰色の背景に3つの白い円があります。ユーザーが各円をドラッグすると、円は元の位置に戻るまでバネのように前後に動きます。
 * @frame 710,400
 * @description マウスを円の上に移動させてクリックし、位置を動かします。
 * マウスを離すと、元の位置に戻ります。
 * 各円は少し異なるふるまいをします。
 * <br><br><small><em>この例は <a href="https://processing.org/examples/">Processing ウェブサイト</a> から移植されています。</em></small>
 */
let num = 3;
let springs = [];

function setup() {
  createCanvas(710, 400);
  noStroke();

  springs[0] = new Spring(240, 260, 40, 0.98, 8.0, 0.1, springs, 0);
  springs[1] = new Spring(320, 210, 120, 0.95, 9.0, 0.1, springs, 1);
  springs[2] = new Spring(180, 170, 200, 0.9, 9.9, 0.1, springs, 2);
}

function draw() {
  background(51);

  for (let i = 0; i < num; i++) {
    springs[i].update();
    springs[i].display();
  }
}

function mousePressed() {
  for (let i = 0; i < num; i++) {
    springs[i].pressed();
  }
}

function mouseReleased() {
  for (let i = 0; i < num; i++) {
    springs[i].released();
  }
}

// Spring クラス
function Spring(_x, _y, _s, _d, _m, _k_in, _others, _id) {
  // 画面上の値
  // this.xpos = _x;
  // this.ypos = _y;

  this.x_pos = _x;
  this.y_pos = _y;

  this.size = 20;
  this.size = _s;

  this.over = false;
  this.move = false;

  // スプリングシミュレーション定数
  this.mass = _m; // 質量
  this.k = 0.2; // スプリング定数
  this.k = _k_in;
  this.damp = _d; // ダンピング
  this.rest_posx = _x; // 安定位置 X
  this.rest_posy = _y; // 安定位置 Y

  // スプリングシミュレーション変数
  //float pos = 20.0;   // 位置
  this.velx = 0.0; // X 方向の速度
  this.vely = 0.0; // Y 方向の速度
  this.accel = 0; // 加速度
  this.force = 0; // 力

  this.friends = _others;
  this.id = _id;

  this.update = function () {
    if (this.move) {
      this.rest_posy = mouseY;
      this.rest_posx = mouseX;
    }

    this.force = -this.k * (this.y_pos - this.rest_posy); // f=-ky
    this.accel = this.force / this.mass; // 加速度を設定します: f=ma == a=f/m
    this.vely = this.damp * (this.vely + this.accel); // 速度を設定します。
    this.y_pos = this.y_pos + this.vely; // 更新された位置

    this.force = -this.k * (this.x_pos - this.rest_posx); // f=-ky
    this.accel = this.force / this.mass; // 加速度を設定します: f=ma == a=f/m
    this.velx = this.damp * (this.velx + this.accel); // 速度を設定します。
    this.x_pos = this.x_pos + this.velx; // 更新された位置

    if ((this.overEvent() || this.move) && !this.otherOver()) {
      this.over = true;
    } else {
      this.over = false;
    }
  };

  // マウスがこのスプリングの上にあるかどうかをテストします。
  this.overEvent = function () {
    let disX = this.x_pos - mouseX;
    let disY = this.y_pos - mouseY;
    let dis = createVector(disX, disY);
    if (dis.mag() < this.size / 2) {
      return true;
    } else {
      return false;
    }
  };

  // 他のスプリングがアクティブでないことを確認します。
  this.otherOver = function () {
    for (let i = 0; i < num; i++) {
      if (i != this.id) {
        if (this.friends[i].over == true) {
          return true;
        }
      }
    }
    return false;
  };

  this.display = function () {
    if (this.over) {
      fill(153);
    } else {
      fill(255);
    }
    ellipse(this.x_pos, this.y_pos, this.size, this.size);
  };

  this.pressed = function () {
    if (this.over) {
      this.move = true;
    } else {
      this.move = false;
    }
  };

  this.released = function () {
    this.move = false;
    this.rest_posx = this.y_pos;
    this.rest_posy = this.y_pos;
  };
}
