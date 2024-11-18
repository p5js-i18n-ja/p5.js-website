/*
 * @name ミックス
 * @arialabel 黒い背景に青と緑の三面が見える立方体があります。立方体にマウスを乗せると、オレンジ色の光がマウスを照らします。
 * @frame 710,400 (オプション)
 * @description 3種類のライトが箱を照らします。
 */
function setup() {
  createCanvas(710, 400, WEBGL);
  noStroke();
}

function draw() {
  background(0);

  // 環境ライト
  ambientLight(0, 255 / 4, 0);

  // ライトの位置を設定するには、
  // ワールドの座標を次のように考えます：
  // -width/2,-height/2 -------- width/2,-height/2
  //                |            |
  //                |     0,0    |
  //                |            |
  // -width/2,height/2--------width/2,height/2

  // 左からの青い指向性ライト
  directionalLight(0, 0, 255, -1, 0, 0);

  // 中心からmouseXまでの距離を計算します
  let lightX = mouseX - width / 2;
  let lightY = mouseY - height / 2;

  // 赤いスポットライト
  // 軸位置： lightX, lightY, 500
  // 光軸方向：0, 0, -1
  spotLight(255, 0, 0, lightX, lightY, 500, 0, 0, -1);

  // X軸回転
  rotateX(-PI / 4);
  // Y軸回転
  rotateY(PI / 4);

  // 立方体を位置(0, 0, 0)、サイズ 100 で配置します。
  box(100);
}
