/*
 * @name インスタンス化
 * @arialabel 黒い背景に左上に白い四角形があります。
 * @description p5 インスタンスを作成し、すべての変数を
 * ページのグローバルスコープから分離します。
 */
let sketch = function (p) {
  let x = 100;
  let y = 100;

  p.setup = function () {
    p.createCanvas(700, 410);
  };

  p.draw = function () {
    p.background(0);
    p.fill(255);
    p.rect(x, y, 50, 50);
  };
};

let myp5 = new p5(sketch);

// 「グローバルモード」との比較
// let x = 100;
// let y = 100;

// function setup() {
//   createCanvas(200,200);
// }

// function draw() {
//   background(0);
//   fill(255);
//   ellipse(x,y,50,50);
// }
