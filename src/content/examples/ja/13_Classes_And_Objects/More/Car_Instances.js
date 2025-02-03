/* 
 * @name 車のインスタンス
 * @arialabel 垂直に淡いセージ色の背景に、ブルー、イエロー、灰色の3つの長方形が画面を横切って異なる速度で移動しています。
 * @frame 400,400
 * @description <a href="https://www.rit.edu/directory/wmhics-w-michelle-harris">
   <b>Prof WM Harris,</b></a> からの貢献です。<b>どのように</b> Car のクラスの３つのインスタンスを作成し、
クラスメソッドを呼び出すのかを説明しています。<br/>
キャンバスのセットアップのための関数が作成され、
3つの Car インスタンスが異なる色とキャンバスの位置で初期化されます。
各 Car の速度は、インスタンスの開始メソッドに値を渡すことで設定されます。
2つ目の関数は、クラスのメソッドを呼び出して Car を表示し、
移動させます。
*/
class Car {
  /* コンストラクタは、
  クラスのプロパティを初期化に使用する
  塗りつぶしの色、x および y 座標のパラメーターを期待します。
  */
  constructor(cColor, x, y) {
    this.color = cColor;
    this.doors = 4;
    this.isConvertible = false;
    this.x = x;
    this.y = y;
    this.speed = 0;
  }

  start(speed) {
    // メソッドはパラメーターを期待します!
    this.speed = speed;
  }

  display() {
    // メソッドです!
    fill(this.color);
    rect(this.x, this.y, 20, 10);
  }

  move() {
    // メソッドです!
    this.x += this.speed;
    // x を境界線で囲みます。
    if (this.x < -20) {
      this.x = width;
    } else if (this.x > width) {
      this.x = -20;
    }
  }
} // Car クラス の定義はここまで。

let rav4;
let charger;
let nova;

function setup() {
  createCanvas(200, 400);
  /* 3台の Car を作ります。 */
  // コンストラクタは cColor, x, y を期待しています。
  rav4 = new Car("silver", 100, 300);
  charger = new Car("gold", 0, 200);
  nova = new Car("blue", 200, 100);
  nova.doors = 2; // "nova" の doors プロパティを更新します。

  console.log("rav4", rav4);
  console.log("charger", charger);
  console.log("nova", nova);

  // Car インスタンスの start メソッドを呼び出します。
  // start メソッドは、スピードの数値を期待します。
  rav4.start(2.3);
  charger.start(-4);
  nova.start(random(-1, 1));
}

function draw() {
  background("beige");

  // 3台すべてを表示し、動かします。
  rav4.display();
  charger.display();
  nova.display();

  rav4.move();
  charger.move();
  nova.move();
}
