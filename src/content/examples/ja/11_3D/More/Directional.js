/*
 * @name 指向性
 * @arialabel マウスが光源となって黒い画面の両側にある2つの球体を照らします。光源をマウスで動かして球体をさまざまな方向から照らし、それに応じた影を作ることができます。
 * @frame 710,400
 * @description マウスを動かして光の方向を変えます。
 * 指向性ライトは、ある方向から照射され、表面に正対すると強くなり、なだらかな角度で当たると弱くなります。
 * 指向性ライトは表面に当たった後、あらゆる方向に拡散します。
 */
const radius = 200;

function setup() {
  createCanvas(710, 400, WEBGL);
  noStroke();
  fill(200);
}

function draw() {
  noStroke();
  background(0);
  const dirY = (mouseY / height - 0.5) * 4;
  const dirX = (mouseX / width - 0.5) * 4;
  directionalLight(204, 204, 204, dirX, dirY, 1);
  translate(-1.5 * radius, 0, 0);
  sphere(radius);
  translate(3 * radius, 0, 0);
  sphere(radius);
}
