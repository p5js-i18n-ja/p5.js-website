/*
 * @name ウェーブメーカー
 * @arialabel ネオングリーンの線の波のような水が、円形のパターンで動いています。マウス操作で波の向きを変えることができます。
 * @description これは、パーティクルがその場で振動することで波（水の波のような）がどのように表現されるかを示しています。
 * マウスを動かして波を操作してください。
 * Dave Whyte の<a href="https://beesandbombs.tumblr.com/post/45513650541/orbiters"> Orbiters </a>に触発されて、 Aatish Bhatia が寄稿しました。
 */

let t = 0; // 時間変数

function setup() {
  createCanvas(600, 600);
  noStroke();
  fill(40, 200, 40);
}

function draw() {
  background(10, 10); // 半透明の背景です（軌跡を残します）。

  // 円のXYグリッドを作ります。
  for (let x = 0; x <= width; x = x + 30) {
    for (let y = 0; y <= height; y = y + 30) {
      // 各円の始点はマウスの位置に依存します。
      const xAngle = map(mouseX, 0, width, -4 * PI, 4 * PI, true);
      const yAngle = map(mouseY, 0, height, -4 * PI, 4 * PI, true);
      // また、パーティクルの位置によっても変化します。
      const angle = xAngle * (x / width) + yAngle * (y / height);

      // 各パーティクルは円を描きます。
      const myX = x + 20 * cos(2 * PI * t + angle);
      const myY = y + 20 * sin(2 * PI * t + angle);

      ellipse(myX, myY, 10); // パーティクルを描きます。
    }
  }

  t = t + 0.01; // 時間を更新します。
}
