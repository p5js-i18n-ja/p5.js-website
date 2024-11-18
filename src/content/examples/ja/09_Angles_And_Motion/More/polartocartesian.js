/*
 * @name 極座標からデカルト座標へ
 * @arialabel 黒い背景の上を灰色の円が円を描くようにどんどん進んでいきます。
 * @description 極座標(r,θ)を、デカルト座標(x,y)に変換:
 * x = r cos(θ), y = r sin(θ)
 * オリジナルは Daniel Shiffman のものです。
 */
let r;

// 角度、角速度、加速度
let theta;
let theta_vel;
let theta_acc;

function setup() {
  createCanvas(710, 400);

  // すべての値を初期化します。
  r = height * 0.45;
  theta = 0;
  theta_vel = 0;
  theta_acc = 0.0001;
}

function draw() {
  background(0);

  // 原点を画面の中心に移動させます。
  translate(width / 2, height / 2);

  // 曲座標からデカルト座標への変換
  let x = r * cos(theta);
  let y = r * sin(theta);

  // デカルト座標で楕円を描きます。
  ellipseMode(CENTER);
  noStroke();
  fill(200);
  ellipse(x, y, 32, 32);

  // 角度に加速度と速度を適用します。
  // (この例では r は変えていません。）
  theta_vel += theta_acc;
  theta += theta_vel;
}
