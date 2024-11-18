/*
 * @name ２重のランダム
 * @arialabel 画面中央の横軸に小さな白い点が集まり、凝縮されたり散らばったりと刻々と位置を変えています。
 * @frame 720,400 (optional)
 * @description 2つのrandom()関数とpoint()関数を使用して、
 * 不規則な鋸歯状の線を作成します。
 * オリジナルは Ira Greenberg のものです。
 */
let totalPts = 300;
let steps = totalPts + 1;

function setup() {
  createCanvas(710, 400);
  stroke(255);
  frameRate(1);
}

function draw() {
  background(0);
  let rand = 0;
  for (let i = 1; i < steps; i++) {
    point((width / steps) * i, height / 2 + random(-rand, rand));
    rand += random(-5, 5);
  }
}
