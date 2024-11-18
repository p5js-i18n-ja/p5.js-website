/* @name 継承
 * @arialabel 2つの白い円がつながって反時計回りに回転し、その後ろで黒い線が時計回りに回転しています。
 * @description クラスは、別のクラスを基盤として定義できます。
 * オブジェクト指向プログラミングの用語では、
 * あるクラスは別のクラスからフィールドとメソッドを継承できます。
 * 別のオブジェクトから継承するオブジェクトは、サブクラスと呼ばれ、それが継承するオブジェクトは
 * スーパークラスと呼ばれます。サブクラスはスーパークラスを拡張します。
 */
let spots, arm;

function setup() {
  createCanvas(640, 360);
  arm = new SpinArm(width / 2, height / 2, 0.01);
  spots = new SpinSpots(width / 2, height / 2, -0.02, 90.0);
}

function draw() {
  background(204);
  arm.update();
  arm.display();
  spots.update();
  spots.display();
}

class Spin {
  constructor(x, y, s) {
    this.x = x;
    this.y = y;
    this.speed = s;
    this.angle = 0.0;
  }

  update() {
    this.angle += this.speed;
  }
}

class SpinArm extends Spin {
  constructor(x, y, s) {
    super(x, y, s);
  }

  display() {
    strokeWeight(1);
    stroke(0);
    push();
    translate(this.x, this.y);
    this.angle += this.speed;
    rotate(this.angle);
    line(0, 0, 165, 0);
    pop();
  }
}

class SpinSpots extends Spin {
  constructor(x, y, s, d) {
    super(x, y, s);
    this.dim = d;
  }

  display() {
    noStroke();
    push();
    translate(this.x, this.y);
    this.angle += this.speed;
    rotate(this.angle);
    ellipse(-this.dim / 2, 0, this.dim, this.dim);
    ellipse(this.dim / 2, 0, this.dim, this.dim);
    pop();
  }
}
