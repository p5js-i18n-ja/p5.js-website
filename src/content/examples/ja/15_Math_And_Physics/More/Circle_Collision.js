/*
 * @name 円の衝突
 * @arialabel 大きな薄灰色の円と小さな灰色の円が、暗灰色の背景の端やお互いにぶつかると跳ね返ります。
 * @frame 710,400 (オプション)
 * @description processing.org/examples の「Circle Collision」の例を移植したものです。<br> この例では物理量の視覚化のためにベクトルを使用しています。
 */
class Ball {
  constructor(x, y, r) {
    this.position = new p5.Vector(x, y);
    this.velocity = p5.Vector.random2D();
    this.velocity.mult(3);
    this.r = r;
    this.m = r * 0.1;
  }
  update() {
    this.position.add(this.velocity);
  }

  checkBoundaryCollision() {
    if (this.position.x > width - this.r) {
      this.position.x = width - this.r;
      this.velocity.x *= -1;
    } else if (this.position.x < this.r) {
      this.position.x = this.r;
      this.velocity.x *= -1;
    } else if (this.position.y > height - this.r) {
      this.position.y = height - this.r;
      this.velocity.y *= -1;
    } else if (this.position.y < this.r) {
      this.position.y = this.r;
      this.velocity.y *= -1;
    }
  }

  checkCollision(other) {
    // 球体のコンポーネント間の距離を取得します。
    let distanceVect = p5.Vector.sub(other.position, this.position);

    // 球体を分離するベクトルの大きさを計算します。
    let distanceVectMag = distanceVect.mag();

    // 球体が接触するまでの最小の距離です。
    let minDistance = this.r + other.r;

    if (distanceVectMag < minDistance) {
      let distanceCorrection = (minDistance - distanceVectMag) / 2.0;
      let d = distanceVect.copy();
      let correctionVector = d.normalize().mult(distanceCorrection);
      other.position.add(correctionVector);
      this.position.sub(correctionVector);

      // distanceVect のアングルを取得します。
      let theta = distanceVect.heading();
      // 三角関数の値をあらかじめ計算しておきます。
      let sine = sin(theta);
      let cosine = cos(theta);

      /* bTemp には回転したボールの this.positions が入ります。
       あなたが着目すべきは、bTemp[1] の this.position だけです。*/
      let bTemp = [new p5.Vector(), new p5.Vector()];

      /* このボールの位置 (this.position) は他のボールに対して相対的です。
        したがって、それらの間のベクトル (bVect) を回転式の基準点として
        使用できます。
        bTemp[0].this.position.x と bTemp[0].this.position.y は
        自動的に0.0に初期化されます。
        これは、b[1] が b[0] を中心に回転するために必要な値です。 */
      bTemp[1].x = cosine * distanceVect.x + sine * distanceVect.y;
      bTemp[1].y = cosine * distanceVect.y - sine * distanceVect.x;

      // 一時的なベロシティ (vTemp) を回転させます。
      let vTemp = [new p5.Vector(), new p5.Vector()];

      vTemp[0].x = cosine * this.velocity.x + sine * this.velocity.y;
      vTemp[0].y = cosine * this.velocity.y - sine * this.velocity.x;
      vTemp[1].x = cosine * other.velocity.x + sine * other.velocity.y;
      vTemp[1].y = cosine * other.velocity.y - sine * other.velocity.x;

      /* ベロシティが回転したので、1次元運動量保存則を使って、
       x 軸方向に沿った最終的なベロシティ（vFinal）を
       計算できます。 */
      let vFinal = [new p5.Vector(), new p5.Vector()];

      // b[0] の最終的なベロシティを回転します。
      vFinal[0].x =
        ((this.m - other.m) * vTemp[0].x + 2 * other.m * vTemp[1].x) /
        (this.m + other.m);
      vFinal[0].y = vTemp[0].y;

      // b[0] の最終的なベロシティを回転します。
      vFinal[1].x =
        ((other.m - this.m) * vTemp[1].x + 2 * this.m * vTemp[0].x) /
        (this.m + other.m);
      vFinal[1].y = vTemp[1].y;

      // 固まってしまうのを避けるためのハックです。
      bTemp[0].x += vFinal[0].x;
      bTemp[1].x += vFinal[1].x;

      /* ボールの位置とベロシティを逆回転します。
       三角形の式の符号を逆にして
       反対方向に回転します。 */
      // ボールを回転します。
      let bFinal = [new p5.Vector(), new p5.Vector()];

      bFinal[0].x = cosine * bTemp[0].x - sine * bTemp[0].y;
      bFinal[0].y = cosine * bTemp[0].y + sine * bTemp[0].x;
      bFinal[1].x = cosine * bTemp[1].x - sine * bTemp[1].y;
      bFinal[1].y = cosine * bTemp[1].y + sine * bTemp[1].x;

      // this.position を使って、画面上のボールを更新します。
      other.position.x = this.position.x + bFinal[1].x;
      other.position.y = this.position.y + bFinal[1].y;

      this.position.add(bFinal[0]);

      // ベロシティを更新します。
      this.velocity.x = cosine * vFinal[0].x - sine * vFinal[0].y;
      this.velocity.y = cosine * vFinal[0].y + sine * vFinal[0].x;
      other.velocity.x = cosine * vFinal[1].x - sine * vFinal[1].y;
      other.velocity.y = cosine * vFinal[1].y + sine * vFinal[1].x;
    }
  }

  display() {
    noStroke();
    fill(204);
    ellipse(this.position.x, this.position.y, this.r * 2, this.r * 2);
  }
}
let balls = [new Ball(100, 400, 20), new Ball(700, 400, 80)];
console.log(balls);
function setup() {
  createCanvas(710, 400);
}

function draw() {
  background(51);
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];
    b.update();
    b.display();
    b.checkBoundaryCollision();
    balls[0].checkCollision(balls[1]);
  }
}
