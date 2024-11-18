/*
 * @name モーフィング
 * @arialabel 暗い灰色の背景の前で、正方形の辺が円形にカーブするにつれて、白い正方形の輪郭線が円に変わります。
 * @frame 720,400
 * @description ある頂点から別の頂点に補間することで、ある形状を別の形状に変化させます。
 */

// 2つの ArrayList を用意して、それぞれの形状の頂点を保存します。
// この例では、各形状が同じ数の頂点をもつことを前提としているため、
// 各 ArrayList のサイズは同じになることが期待されています。
let circle = [];
let square = [];

// ウィンドウに描画する第3の頂点セットのための ArrayList
let morph = [];

// このブール変数は、円形に変形するか四角形に変形するかを制御します。
let state = false;

function setup() {
  createCanvas(720, 400);

  // 中心から向かうベクトルを使って円を作成します。
  for (let angle = 0; angle < 360; angle += 9) {
    // 注意: 円のパスに合わせるため、
    // 0から開始していません。
    let v = p5.Vector.fromAngle(radians(angle - 135));
    v.mult(100);
    circle.push(v);
    // この機会に、morph ArrayList を空の p5.Vector で埋めましょう。
    morph.push(createVector());
  }

  // 直線に沿った頂点の集合が正方形です。
  // 正方形の上部
  for (let x = -50; x < 50; x += 10) {
    square.push(createVector(x, -50));
  }
  // 右側
  for (let y = -50; y < 50; y += 10) {
    square.push(createVector(50, y));
  }
  // 下部
  for (let x = 50; x > -50; x -= 10) {
    square.push(createVector(x, 50));
  }
  // 左側
  for (let y = 50; y > -50; y -= 10) {
    square.push(createVector(-50, y));
  }
}

function draw() {
  background(51);

  // 頂点が目標からどのくらい離れているかを保持します。
  let totalDistance = 0;

  // 各頂点を処理します。
  for (let i = 0; i < circle.length; i++) {
    let v1;
    // 円形か正方形のどちらに補完していくのかを決定します。
    if (state) {
      v1 = circle[i];
    } else {
      v1 = square[i];
    }
    // 描画する頂点を取得します。
    let v2 = morph[i];
    // ターゲットに向けて補間します。
    v2.lerp(v1, 0.1);
    // ターゲットからどれくらい離れているかをチェックします。
    totalDistance += p5.Vector.dist(v1, v2);
  }

  // もしすべての頂点が密になっていたら、形状を変更します。
  if (totalDistance < 0.1) {
    state = !state;
  }

  // 中心を基準に描画します。
  translate(width / 2, height / 2);
  strokeWeight(4);
  // すべての頂点で構成されるポリゴンを描画します。
  beginShape();
  noFill();
  stroke(255);

  morph.forEach((v) => {
    vertex(v.x, v.y);
  });
  endShape(CLOSE);
}
