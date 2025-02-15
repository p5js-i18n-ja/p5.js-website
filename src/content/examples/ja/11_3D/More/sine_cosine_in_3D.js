/*
 * @name 3D での正弦・余弦
 * @arialabel 3D 空間で、幾何学的な球体が異なる螺旋形状を描きながら動きます。
 * @description 3D 空間でも正弦（サイン、Sine）、余弦（コサイン、Cosine）、push / pop が使えます。
 */
function setup() {
  createCanvas(710, 400, WEBGL);
}

function draw() {
  background(250);
  rotateY(frameCount * 0.01);

  for (let j = 0; j < 5; j++) {
    push();
    for (let i = 0; i < 80; i++) {
      translate(
        sin(frameCount * 0.001 + j) * 100,
        sin(frameCount * 0.001 + j) * 100,
        i * 0.1,
      );
      rotateZ(frameCount * 0.002);
      push();
      sphere(8, 6, 4);
      pop();
    }
    pop();
  }
}
