// スネークはグリッドに沿って、一度に1スペース移動します
// グリッドはキャンバスより小さく、その寸法は
// これらの変数に保存されています
let gridWidth = 30;
let gridHeight = 30;

let gameStarted = false;

// スネークが開始するセグメントの数
let startingSegments = 10;

// 最初のセグメントの開始座標
let xStart = 0;
let yStart = 15;

// 動きの開始方向
let startDirection = "right";

// 現在の動きの方向
let direction = startDirection;

// スネークは小さなセグメントに分かれており、
// この配列にベクトルとして保存されています
let segments = [];

let score = 0;
let highScore;

// フルーツの位置はこの変数にベクトルとして保存されています
let fruit;

function setup() {
  createCanvas(500, 500);

  // フレームレートを調整して移動速度を設定します
  frameRate(10);

  textAlign(CENTER, CENTER);
  textSize(2);

  // ローカルブラウザストレージに保存されたハイスコアを確認します
  // スコアが保存されていない場合、これは未定義になります
  highScore = getItem("high score");

  describe(
    "アーケードゲーム「スネーク」の再現で、黒い背景に緑の線で表されたスネークが矢印キーで操作されます。ユーザーは赤い点で表されたフルーツに向かってスネークを移動させますが、スネークはウィンドウの端や自分自身にぶつかってはいけません。",
  );
}

function draw() {
  background(0);

  // ゲームグリッドがキャンバスを埋めるようにスケールを設定します
  scale(width / gridWidth, height / gridHeight);
  if (gameStarted === false) {
    showStartScreen();
  } else {
    // スネークとフルーツが座標が0のときに画面に表示されるようにシフトします
    translate(0.5, 0.5);
    showFruit();
    showSegments();
    updateSegments();
    checkForCollision();
    checkForFruit();
  }
}

function showStartScreen() {
  noStroke();
  fill(32);
  rect(2, gridHeight / 2 - 5, gridWidth - 4, 10, 2);
  fill(255);
  text("クリックしてプレイ。\n矢印キーで移動。", gridWidth / 2, gridHeight / 2);
  noLoop();
}

function mousePressed() {
  if (gameStarted === false) {
    startGame();
  }
}

function startGame() {
  // フルーツをランダムな場所に置きます
  updateFruitCoordinates();

  // セグメント用の空の配列で開始します
  segments = [];

  // xを開始位置に設定し、指定された数のセグメントが作成されるまで繰り返し、
  // 毎回xを1増やします
  for (let x = xStart; x < xStart + startingSegments; x += 1) {
    // 現在の位置に新しいベクトルを作成します
    let segmentPosition = createVector(x, yStart);

    // 配列の先頭に追加します
    segments.unshift(segmentPosition);
  }

  direction = startDirection;
  score = 0;
  gameStarted = true;
  loop();
}

function showFruit() {
  stroke(255, 64, 32);
  point(fruit.x, fruit.y);
}

function showSegments() {
  noFill();
  stroke(96, 255, 64);
  beginShape();
  for (let segment of segments) {
    vertex(segment.x, segment.y);
  }
  endShape();
}

function updateSegments() {
  // 最後のセグメントを削除します
  segments.pop();

  // スネークの現在の頭をコピーします
  let head = segments[0].copy();

  // 新しいスネークの頭を配列の先頭に挿入します
  segments.unshift(head);

  // 現在の方向に基づいて頭の位置を調整します
  switch (direction) {
    case "right":
      head.x = head.x + 1;
      break;
    case "up":
      head.y = head.y - 1;
      break;
    case "left":
      head.x = head.x - 1;
      break;
    case "down":
      head.y = head.y + 1;
      break;
  }
}

function checkForCollision() {
  // 配列の最初のセグメントを頭として保存します
  let head = segments[0];

  // スネークの頭が...
  if (
    // 右端にぶつかった場合や
    head.x >= gridWidth ||
    // 左端にぶつかった場合や
    head.x < 0 ||
    // 下端にぶつかった場合や
    head.y >= gridHeight ||
    // 上端にぶつかった場合や
    head.y < 0 ||
    // 自分自身にぶつかった場合
    selfColliding() === true
  ) {
    // ゲームオーバー画面を表示します
    gameOver();
  }
}

function gameOver() {
  noStroke();
  fill(32);
  rect(2, gridHeight / 2 - 5, gridWidth - 4, 12, 2);
  fill(255);

  // ハイスコアを現在のスコアまたは以前のハイスコアの大きい方に設定します
  highScore = max(score, highScore);

  // ハイスコアをローカルストレージに保存します。これはブラウザデータに保存され、
  // ユーザーがページをリロードしても保持されます。
  storeItem("high score", highScore);
  text(
    `ゲームオーバー!
あなたのスコア: ${score}
ハイスコア: ${highScore}
クリックして再プレイ。`,
    gridWidth / 2,
    gridHeight / 2,
  );
  gameStarted = false;
  noLoop();
}

function selfColliding() {
  // 最初のセグメントを頭として保存します
  let head = segments[0];

  // 最初のセグメントを除くすべてのセグメントを保存します
  let segmentsAfterHead = segments.slice(1);

  // 他のセグメントをチェックします
  for (let segment of segmentsAfterHead) {
    // セグメントが頭と同じ位置にある場合
    if (segment.equals(head) === true) {
      return true;
    }
  }
  return false;
}

function checkForFruit() {
  // 最初のセグメントを頭として保存します
  let head = segments[0];

  // 頭のセグメントがフルーツと同じ位置にある場合
  if (head.equals(fruit) === true) {
    // プレイヤーにポイントを与えます
    score = score + 1;

    // 尾のセグメントを複製します
    let tail = segments[segments.length - 1];
    let newSegment = tail.copy();

    // 複製を配列の先頭に追加します
    segments.push(newSegment);

    // フルーツを新しい位置にリセットします
    updateFruitCoordinates();
  }
}

function updateFruitCoordinates() {
  // フルーツの新しい座標をランダムに選びます
  // そしてfloor()を使って切り捨てます。
  // セグメントが1の増分で移動するため、
  // スネークがフルーツと同じ位置に当たるためには
  // フルーツの座標は整数でなければなりませんが、
  // random()は浮動小数点数を返します
  let x = floor(random(gridWidth));
  let y = floor(random(gridHeight));
  fruit = createVector(x, y);
}

// 矢印キーが押されたとき、スネークの移動方向を切り替えます。
// ただし、スネークがすでに反対方向に移動している場合は何もしません。
function keyPressed() {
  switch (keyCode) {
    case LEFT_ARROW:
      if (direction !== "right") {
        direction = "left";
      }
      break;
    case RIGHT_ARROW:
      if (direction !== "left") {
        direction = "right";
      }
      break;
    case UP_ARROW:
      if (direction !== "down") {
        direction = "up";
      }
      break;
    case DOWN_ARROW:
      if (direction !== "up") {
        direction = "down";
      }
      break;
  }
}
