function setup() {
  createCanvas(400, 400);
  background(255);

  // ストロークなしで色相、彩度、明度の色を使用
  colorMode(HSB);
  noStroke();

  // 角度モードを度数法に設定
  angleMode(DEGREES);
  describe(
    "小さな円がそれぞれ異なる色で、円形のパスに配置され、色のスペクトル全体の色相を表示します。",
  );

  // テキストを中央揃えにする
  textAlign(CENTER, CENTER);

  // 0から360までの角度を30度刻みで繰り返す
  // 30の値を変更すると
  // 描画される円の数とその間隔が変わる
  for (let angle = 0; angle < 360; angle += 30) {
    // 現在の変換を保存
    push();

    // 原点をキャンバスの中心に移動
    translate(width / 2, height / 2);

    // 現在の角度で回転
    rotate(angle);

    // 中心から150ピクセル外に移動
    translate(150, 0);

    // 現在の角度を色相として塗りつぶし
    fill(angle, 85, 90);

    // 現在の原点に円を描画（中心から150ピクセル）
    circle(0, 0, 50);

    // 中心に向かって50ピクセル移動
    translate(-50, 0);

    // テキストを直立させるために回転を逆にする
    rotate(-angle);

    // 現在の角度をラベル付け
    fill(0);
    text(`${angle}°`, 0, 0);

    // キャンバスの変換を復元
    pop();
  }
}
