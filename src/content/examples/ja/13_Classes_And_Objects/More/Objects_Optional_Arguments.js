/*
 * @name オブジェクト 2
 * @arialabel 黒い背景上で、異なるサイズの四角形を形成する4セットの垂直な白い線が、ユーザーのマウスの動きに応じて動きます。
 * @description hbarragan の 例からの移植です。
 * 画像全体にカーソルを移動させて、ジオメトリの速度と位置を変更します。
 * MRect クラスでは、一連の線を定義しています。
 */

let r1, r2, r3, r4;

function setup() {
  createCanvas(710, 400);
  fill(255, 204);
  noStroke();
  r1 = new MRect(1, 134.0, 0.532, 0.1 * height, 10.0, 60.0);
  r2 = new MRect(2, 44.0, 0.166, 0.3 * height, 5.0, 50.0);
  r3 = new MRect(2, 58.0, 0.332, 0.4 * height, 10.0, 35.0);
  r4 = new MRect(1, 120.0, 0.0498, 0.9 * height, 15.0, 60.0);
}

function draw() {
  background(0);

  r1.display();
  r2.display();
  r3.display();
  r4.display();

  r1.move(mouseX - width / 2, mouseY + height * 0.1, 30);
  r2.move((mouseX + width * 0.05) % width, mouseY + height * 0.025, 20);
  r3.move(mouseX / 4, mouseY - height * 0.025, 40);
  r4.move(mouseX - width / 2, height - mouseY, 50);
}

class MRect {
  constructor(iw, ixp, ih, iyp, id, it) {
    this.w = iw; // 1つの棒の幅
    this.xpos = ixp; // 矩形の x 座標
    this.h = ih; // 矩形の高さ
    this.ypos = iyp; // 矩形の y 座標
    this.d = id; // 1つの棒の間隔
    this.t = it; // 棒の数
  }

  move(posX, posY, damping) {
    let dif = this.ypos - posY;
    if (abs(dif) > 1) {
      this.ypos -= dif / damping;
    }
    dif = this.xpos - posX;
    if (abs(dif) > 1) {
      this.xpos -= dif / damping;
    }
  }

  display() {
    for (let i = 0; i < this.t; i++) {
      rect(
        this.xpos + i * (this.d + this.w),
        this.ypos,
        this.w,
        height * this.h,
      );
    }
  }
}
