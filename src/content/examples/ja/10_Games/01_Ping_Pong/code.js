let paddleLeftX = 20;
let paddleLeftY = 200;

let paddleRightX = 380;
let paddleRightY = 200;

let paddleSpeed = 2;
let paddleHeight = 80;
let paddleWidth = 10;

let leftScore = 0;
let rightScore = 0;

let ballPosX = 200;
let ballPosY = 200;
let ballSpeedX = 0;
let ballSpeedY = 0;
let ballSize = 10;

function setup() {
  createCanvas(400, 400);

  // 中心から矩形を描画します
  // これにより、ボールがパドルの中心の上または下にあるかを確認しやすくなります
  rectMode(CENTER);
  fill(255);
  noStroke();
  textSize(40);
  textAlign(CENTER);

  // 一時停止で開始します
  noLoop();
  describe(
    "二つの狭い白い矩形と、ピンポンゲームのパドルとボールを表す白い正方形。プレイヤーのスコアは上隅に表示され、最初は「クリックして開始」と表示されます。",
  );
}

function draw() {
  background(0);

  // パドルを描画します
  rect(paddleLeftX, paddleLeftY, paddleWidth, paddleHeight);
  rect(paddleRightX, paddleRightY, paddleWidth, paddleHeight);

  // ボールを描画します
  square(ballPosX, ballPosY, ballSize);

  // スコアを描画します
  text(leftScore, width * 0.25, height * 0.1);
  text(rightScore, width * 0.75, height * 0.1);

  // ボールを現在の速度で移動させます
  ballPosX += ballSpeedX;
  ballPosY += ballSpeedY;

  // 左パドルの衝突エリアの座標を保存します
  let leftCollisionLeft = paddleLeftX - paddleWidth / 2 - ballSize / 2;
  let leftCollisionRight = paddleLeftX + paddleWidth / 2 + ballSize / 2;
  let leftCollisionTop = paddleLeftY - paddleHeight / 2 - ballSize / 2;
  let leftCollisionBottom = paddleLeftY + paddleHeight / 2 + ballSize / 2;

  // ボールが左パドルと衝突している場合
  if (
    ballPosX >= leftCollisionLeft &&
    ballPosX <= leftCollisionRight &&
    ballPosY >= leftCollisionTop &&
    ballPosY <= leftCollisionBottom
  ) {
    // ボールの水平方向の速度を反転させます
    ballSpeedX = -ballSpeedX;

    // ボールの垂直速度を変更して、パドルから跳ね返るように見せます
    ballSpeedY = (ballPosY - paddleLeftY) / 20;
  }

  // 右パドルの衝突エリアの座標を保存します
  let rightCollisionLeft = paddleRightX - paddleWidth / 2 - ballSize / 2;
  let rightCollisionRight = paddleRightX + paddleWidth / 2 + ballSize / 2;
  let rightCollisionTop = paddleRightY - paddleHeight / 2 - ballSize / 2;
  let rightCollisionBottom = paddleRightY + paddleHeight / 2 + ballSize / 2;

  // ボールが右パドルと衝突している場合
  if (
    ballPosX >= rightCollisionLeft &&
    ballPosX <= rightCollisionRight &&
    ballPosY >= rightCollisionTop &&
    ballPosY <= rightCollisionBottom
  ) {
    // ボールの水平方向の速度を反転させます
    ballSpeedX = -ballSpeedX;

    // ボールの垂直速度を変更して、パドルから跳ね返るように見せます
    ballSpeedY = (ballPosY - paddleRightY) / 20;
  }

  // ボールが左端を越えた場合
  if (ballPosX < 0) {
    // 右プレイヤーにポイントを与えます
    rightScore += 1;
    resetBall();

    // そうでなければ、ボールが右端を越えた場合
  } else if (ballPosX > width) {
    // 左プレイヤーにポイントを与えます
    leftScore += 1;
    resetBall();

    // そうでなければ、ボールが上端または下端に当たった場合
  } else if (ballPosY < 0 || ballPosY > height) {
    // 垂直速度を反転させます
    ballSpeedY = -ballSpeedY;
  }

  // WおよびSキーが押されているかどうかを保存します
  let leftDownPressed = keyIsDown(83);
  let leftUpPressed = keyIsDown(87);

  // 左パドルがどれだけ動くかを保存します
  let leftMove = 0;

  if (leftDownPressed === true) {
    leftMove += paddleSpeed;
  }
  if (leftUpPressed === true) {
    leftMove -= paddleSpeed;
  }

  // パドルが画面外に出ないようにします
  paddleLeftY = constrain(
    paddleLeftY + leftMove,
    paddleHeight / 2,
    height - paddleHeight / 2,
  );

  // 上矢印および下矢印キーが押されているかどうかを保存します
  let rightDownPressed = keyIsDown(DOWN_ARROW);
  let rightUpPressed = keyIsDown(UP_ARROW);

  // 右パドルがどれだけ動くかを保存します
  let rightMove = 0;

  if (rightDownPressed === true) {
    rightMove += paddleSpeed;
  }
  if (rightUpPressed === true) {
    rightMove -= paddleSpeed;
  }

  // パドルが画面外に出ないようにします
  paddleRightY = constrain(
    paddleRightY + rightMove,
    paddleHeight / 2,
    height - paddleHeight / 2,
  );

  // ゲームが一時停止している場合は「クリックして開始」と表示します
  if (isLooping() === false) {
    text("クリックして開始", width / 2, height / 2 - 20);
  }
}

// ボールをキャンバスの中心にリセットし、ランダムな速度を設定します
function resetBall() {
  ballPosX = width / 2;
  ballPosY = height / 2;
  ballSpeedX = random([-3, 3]);
  ballSpeedY = random([-1, 1]);
}

function mousePressed() {
  if (isLooping() === false) {
    resetBall();
    loop();
  }
}
