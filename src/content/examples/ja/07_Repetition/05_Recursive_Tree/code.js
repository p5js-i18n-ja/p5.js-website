let angle;

function setup() {
  createCanvas(710, 400);
  colorMode(HSB);
  angleMode(DEGREES);
}

function draw() {
  background(0);

  // マウスの位置に基づいて角度を計算し、最大90度
  angle = (mouseX / width) * 90;
  angle = min(angle, 90);

  // 画面の下から木を描き始める
  translate(width / 2, height);

  // 120ピクセルの線を描く
  stroke(0, 255, 255);
  line(0, 0, 0, -120);

  // その線の端に移動
  translate(0, -120);

  // 再帰的な分岐を開始
  branch(120, 0);

  describe(
    "A tree drawn by recursively drawing branches, with angle determined by the user mouse position.",
  );
}

function branch(h, level) {
  // 再帰レベルに基づいて色相を設定
  stroke(level * 25, 255, 255);

  // 各枝は前の枝の2/3のサイズ
  h *= 0.66;

  // 枝の長さが2より大きい場合は描画し、そうでなければ再帰を停止
  if (h > 2) {
    // 右の枝を描く
    // 現在の座標系を保存
    push();

    // 角度で回転
    rotate(angle);

    // 枝を描く
    line(0, 0, 0, -h);

    // 枝の端に移動
    translate(0, -h);

    // branch()を再帰的に呼び出す
    branch(h, level + 1);

    // 保存した座標系を復元
    pop();

    // 左の枝を描く
    push();
    rotate(-angle);
    line(0, 0, 0, -h);
    translate(0, -h);
    branch(h, level + 1);
    pop();
  }
}
