// 最初のキャンバスのための関数
function sketch1(p) {
  p.setup = function () {
    p.createCanvas(720, 200);
    p.background(0);
  };
  p.draw = function () {
    p.circle(p.mouseX, p.mouseY, 50);
  };
}

// 最初のp5インスタンスを実行
new p5(sketch1);

// 2番目のキャンバスのための関数
function sketch2(p) {
  p.setup = function () {
    p.createCanvas(720, 200);
    p.background(255);
    p.fill(0);
    p.stroke(255);
  };
  p.draw = function () {
    p.square(p.mouseX, p.mouseY, 50);
  };
}

// 2番目のp5インスタンスを実行
new p5(sketch2);
