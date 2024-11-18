/*
 * @name レイキャスティング
 * @arialabel 画面の中央に白い正方形があり、薄ピンクと濃ピンクの2色で斜めに分割された空間が描かれています。白い正方形は奥壁であり、ピンク色は他の4つの壁を形作っています。ユーザーのマウス操作により、球体のオブジェクトが 3D 壁面の凹凸にしたがって移動します。
 * @description オリジナル例は Jonathan Watson によって作られました。
 * <br><br>レイキャスティング（光源の追跡）を使用して、マウスの 3D 空間上の位置を検出します。
 */
const objects = [];
let eyeZ;

function setup() {
  createCanvas(710, 400, WEBGL);

  eyeZ = height / 2 / tan((30 * PI) / 180); // カメラの初期距離は原点より離れた場所とします。

  objects.push(new IntersectPlane(1, 0, 0, -100, 0, 0)); // 左の壁
  objects.push(new IntersectPlane(1, 0, 0, 100, 0, 0)); // 右の壁
  objects.push(new IntersectPlane(0, 1, 0, 0, -100, 0)); // 底の壁
  objects.push(new IntersectPlane(0, 1, 0, 0, 100, 0)); // 天井の壁
  objects.push(new IntersectPlane(0, 0, 1, 0, 0, 0)); // 奥の壁

  noStroke();
  ambientMaterial(250);
}

function draw() {
  background(0);

  // 光源
  pointLight(255, 255, 255, 0, 0, 400);
  ambientLight(244, 122, 158);

  // 左の壁
  push();
  translate(-100, 0, 200);
  rotateY((90 * PI) / 180);
  plane(400, 200);
  pop();

  // 右の壁
  push();
  translate(100, 0, 200);
  rotateY((90 * PI) / 180);
  plane(400, 200);
  pop();

  // 底の壁
  push();
  translate(0, 100, 200);
  rotateX((90 * PI) / 180);
  plane(200, 400);
  pop();

  // 天井の壁
  push();
  translate(0, -100, 200);
  rotateX((90 * PI) / 180);
  plane(200, 400);
  pop();

  plane(200, 200); // 奥の壁

  const x = mouseX - width / 2;
  const y = mouseY - height / 2;

  const Q = createVector(0, 0, eyeZ); // 光線上の点とカメラの初期位置
  const v = createVector(x, y, -eyeZ); // 光線の方向ベクトル

  let intersect; // 光線とオブジェクトの交点
  let closestLambda = eyeZ * 10; // 描画距離

  for (let x = 0; x < objects.length; x += 1) {
    let object = objects[x];
    let lambda = object.getLambda(Q, v); // 光線がオブジェクトと交差するλ値

    if (lambda < closestLambda && lambda > 0) {
      // 光線とオブジェクトの交点を見つけます。
      intersect = p5.Vector.add(Q, p5.Vector.mult(v, lambda));
      closestLambda = lambda;
    }
  }

  // カーソル
  push();
  translate(intersect);
  fill(237, 34, 93);
  sphere(10);
  pop();
}

// 無限に広がる平面のクラス
class IntersectPlane {
  constructor(n1, n2, n3, p1, p2, p3) {
    this.normal = createVector(n1, n2, n3); // 平面の法線ベクトル
    this.point = createVector(p1, p2, p3); // 平面上の点
    this.d = this.point.dot(this.normal);
  }

  getLambda(Q, v) {
    return (-this.d - this.normal.dot(Q)) / this.normal.dot(v);
  }
}
