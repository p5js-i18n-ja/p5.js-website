/*
 * @name テクスチャ
 * @arialabel 白い背景の前で回転する球と立方体があります。球は動画で覆われ、立方体は画像で覆われています。
 * @description テクスチャは、画像と動画をサポートしています。
 */
// 動画のソース: https://vimeo.com/90312869
let img;
let vid;
let theta = 0;

function setup() {
  createCanvas(710, 400, WEBGL);

  img = loadImage("assets/cat.jpg");
  vid = createVideo(["assets/360video_256crop_v2.mp4"]);
  vid.elt.muted = true;
  vid.loop();
  vid.hide();
}

function draw() {
  background(250);
  translate(-220, 0, 0);
  push();
  rotateZ(theta * mouseX * 0.001);
  rotateX(theta * mouseX * 0.001);
  rotateY(theta * mouseX * 0.001);
  //pass image as texture
  texture(vid);
  sphere(150);
  pop();
  translate(440, 0, 0);
  push();
  rotateZ(theta * 0.1);
  rotateX(theta * 0.1);
  rotateY(theta * 0.1);
  texture(img);
  box(100, 100, 100);
  pop();
  theta += 0.05;
}
