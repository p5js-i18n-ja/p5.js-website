/*
 * @name 歩行足幅錯視
 * @arialabel 縦の黒と白の線があります。白い縦線の下に白い長方形がスクリーンを横切って移動し、黒い線の上を通過します。黒い長方形が、両方の色の線の上をスクリーンを横切って移動します。
 * Stepping feet illusion（歩行足幅錯視）は、極めて有名な心理実験です。
 * 2つのレンガは同じ速度で動いているにもかかわらず、
 * 異なる速度で動くように見えます。
 * キャンバス内でマウスをクリックすると、
 * 同じ速度で動いていることが確認できます。
 * Sagar Arora の貢献により作成されました。
 */

// このクラスはブロックの構造と
// 動きを記述します。
class Brick {
  constructor(bc, y) {
    this.brickColor = bc;
    this.yPos = y;
    this.xPos = 0;
  }

  // この関数はブロックを作成します。
  createBrick() {
    fill(this.brickColor);
    rect(this.xPos, this.yPos, 100, 50);
  }

  // この関数はブロックの動きの
  // 速度を1に設定します。
  setSpeed() {
    this.xSpeed = 1;
  }

  // この関数はブロックを動かします。
  moveBrick() {
    this.xPos += this.xSpeed;
    if (this.xPos + 100 >= width || this.xPos <= 0) {
      this.xSpeed *= -1;
    }
  }
}

function setup() {
  createCanvas(720, 400);
  createP("白いブロックと黒いブロックが").style("color", "#ffffff");
  createP("同じ速度で動いているかを確認するために").style("color", "#ffffff");
  createP("マウスを押したままにしてみてください").style("color", "#ffffff");
}

// 色が白と黒の
// 2つのブロックを作成します。
let brick1 = new Brick("white", 100);
let brick2 = new Brick("black", 250);

// この関数はブロック1とブロック2の
// 速度を1に設定します。
brick1.setSpeed();
brick2.setSpeed();

function draw() {
  background(0);
  if (mouseIsPressed) {
    background(50);
  }
  brick1.createBrick();
  brick1.moveBrick();
  if (!mouseIsPressed) {
    createBars();
  }
  brick2.createBrick();
  brick2.moveBrick();
}

// この関数は画面に
// 白い棒と黒い棒を作成します。
function createBars() {
  let len = 12;
  for (let i = 0; i < width / len; i++) {
    fill("white");
    if (i % 2 === 0) rect(i * len, height, len, -height);
  }
}
