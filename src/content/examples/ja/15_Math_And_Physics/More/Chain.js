/*
 * @name チェーン
 * @arialabel 白いやや不透明な2つの円が白い線で繋がれています。ユーザーのマウスに合わせて弦の上部が動き、円もマウスに合わせて動きますが重力の影響も受けます。
 * @description ひとつめの円はマウスの位置に、ふたつめの円はひとつめの円の位置に結び付けられます。環境の重力は両方に対して下向きに働きます。
 * <br><br><small><em>この例は <a href="https://processing.org/examples/">Processing のウェブサイト</a> から移植されました。</em></small>
 */
let s1, s2;
let gravity = 9.0;
let mass = 2.0;

function setup() {
  createCanvas(720, 400);
  fill(255, 126);
  // 入力: x、y、mass、gravity
  s1 = new Spring2D(0.0, width / 2, mass, gravity);
  s2 = new Spring2D(0.0, width / 2, mass, gravity);
}

function draw() {
  background(0);
  s1.update(mouseX, mouseY);
  s1.display(mouseX, mouseY);
  s2.update(s1.x, s1.y);
  s2.display(s1.x, s1.y);
}

function Spring2D(xpos, ypos, m, g) {
  this.x = xpos; // x 座標と y 座標
  this.y = ypos;
  this.vx = 0; // x 軸と y 軸の速度
  this.vy = 0;
  this.mass = m;
  this.gravity = g;
  this.radius = 30;
  this.stiffness = 0.2;
  this.damping = 0.7;

  this.update = function (targetX, targetY) {
    let forceX = (targetX - this.x) * this.stiffness;
    let ax = forceX / this.mass;
    this.vx = this.damping * (this.vx + ax);
    this.x += this.vx;
    let forceY = (targetY - this.y) * this.stiffness;
    forceY += this.gravity;
    let ay = forceY / this.mass;
    this.vy = this.damping * (this.vy + ay);
    this.y += this.vy;
  };

  this.display = function (nx, ny) {
    noStroke();
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    stroke(255);
    line(this.x, this.y, nx, ny);
  };
}
