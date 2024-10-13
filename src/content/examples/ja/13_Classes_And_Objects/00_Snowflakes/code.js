// 雪片オブジェクトを保持する配列を定義
let snowflakes = [];

function setup() {
  createCanvas(400, 600);

  angleMode(DEGREES);

  // 雪片オブジェクトを作成
  for (let i = 0; i < 300; i++) {
    // 配列に新しい雪片オブジェクトを追加
    snowflakes.push(new Snowflake());
  }

  // スクリーンリーダーでアクセス可能な説明を作成
  describe("黒い背景に降る雪片。");
}

function draw() {
  background(0);

  // 配列内の各雪片を更新して表示
  let currentTime = frameCount / 60;

  for (let flake of snowflakes) {
    // 各雪片の位置を更新して表示
    flake.update(currentTime);
    flake.display();
  }
}

// 雪片クラスを定義

class Snowflake {
  constructor() {
    this.posX = 0;
    this.posY = random(-height, 0);
    this.initialAngle = random(0, 360);
    this.size = random(2, 5);
    this.radius = sqrt(random(pow(width / 2, 2)));
    this.color = color(random(200, 256), random(200, 256), random(200, 256));
  }

  update(time) {
    // 角速度を定義（度 / 秒）
    let angularSpeed = 35;

    // 現在の角度を計算
    let angle = this.initialAngle + angularSpeed * time;

    // x位置は正弦波に従う
    this.posX = width / 2 + this.radius * sin(angle);

    // 異なるサイズの雪片は異なるy速度で落下
    let ySpeed = 8 / this.size;
    this.posY += ySpeed;

    // 雪片が底に達したら、上に移動
    if (this.posY > height) {
      this.posY = -50;
    }
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.posX, this.posY, this.size);
  }
}
