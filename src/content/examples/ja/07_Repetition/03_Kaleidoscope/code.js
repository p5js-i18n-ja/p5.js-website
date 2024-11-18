// グローバル変数を定義します。
// symmetry変数はキャンバスがいくつの反射セクションに分割されるかを定義します。
let symmetry = 6;

// angle変数は各セクションが回転する角度を計算します。
let angle = 360 / symmetry;

function setup() {
  describe(
    `ダークグレーのキャンバスが、${symmetry}つのセクションに分割された内部に描かれた線を反射します。`,
  );
  createCanvas(720, 400);
  angleMode(DEGREES);
  background(50);
}

function draw() {
  // キャンバスの0,0座標を左上隅ではなく中心に移動します。
  translate(width / 2, height / 2);

  // カーソルがキャンバスの範囲内にある場合...
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    // 現在の位置とカーソルの前の位置を、上で設定した新しい座標に変換します。
    let lineStartX = mouseX - width / 2;
    let lineStartY = mouseY - height / 2;
    let lineEndX = pmouseX - width / 2;
    let lineEndY = pmouseY - height / 2;

    // そして、もしマウスがキャンバス内で押されている場合...
    if (mouseIsPressed === true) {
      // キャンバスが分割されている反射セクションごとに、押されている間のカーソルの座標を描画します...
      for (let i = 0; i < symmetry; i++) {
        rotate(angle);
        stroke(255);
        strokeWeight(3);
        line(lineStartX, lineStartY, lineEndX, lineEndY);

        // ... そして、反射セクション内でも線を反射します。
        push();
        scale(1, -1);
        line(lineStartX, lineStartY, lineEndX, lineEndY);
        pop();
      }
    }
  }
}
