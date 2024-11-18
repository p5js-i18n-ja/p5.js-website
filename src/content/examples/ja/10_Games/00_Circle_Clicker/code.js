let circleX;
let circleY;
let circleRadius;
let circleMaximumRadius;
let circleColor;
let score = 0;
let highScore;

function setup() {
  createCanvas(720, 400);
  colorMode(HSB);
  noStroke();
  ellipseMode(RADIUS);
  textSize(36);

  // 最後に保存されたハイスコアを取得します
  highScore = getItem("high score");

  // スコアが保存されていない場合、0から始めます
  if (highScore === null) {
    highScore = 0;
  }
}

function draw() {
  background(20);

  // 円が完全に縮んでいない場合
  if (circleRadius > 0) {
    // 円を描画します
    fill(circleColor);
    circle(circleX, circleY, circleRadius);
    describeElement("Circle", "ランダムな色の縮む円");

    // 縮めます
    circleRadius -= 1;

    // スコアを表示します
    textAlign(RIGHT, TOP);
    fill(220);
    text(score, width - 20, 20);
    describeElement("Score", `現在のスコア: ${score} のテキスト`);
  } else {
    // そうでなければ、開始/終了画面を表示します
    endGame();
  }
}

function startGame() {
  // スコアを0にリセットします
  score = 0;

  // 円の半径の最大値をキャンバスの最小寸法の半分に設定します
  circleMaximumRadius = min(height / 2, width / 2);
  resetCircle();
}

function endGame() {
  // スケッチを一時停止します
  noLoop();

  // 新しいハイスコアを保存します
  highScore = max(highScore, score);
  storeItem("high score", highScore);

  textAlign(CENTER, CENTER);
  fill(220);
  let startText = `サークル クリッカー
  円が小さくなる前にクリックしてください
  スコア: ${score}
  ハイスコア: ${highScore}
  クリックしてプレイ`;
  text(startText, 0, 0, width, height);
  describeElement("Start text", `テキスト: "${startText}"`);
}

function resetCircle() {
  // 円の半径を最大値に設定します
  circleRadius = circleMaximumRadius;
  circleX = random(circleRadius, width - circleRadius);
  circleY = random(circleRadius, height - circleRadius);
  circleColor = color(random(240, 360), random(40, 80), random(50, 90));
}

function mousePressed() {
  // ゲームが一時停止していない場合
  if (isLooping() === true) {
    // マウスが円からどれだけ離れているかをチェックします
    let distanceToCircle = dist(mouseX, mouseY, circleX, circleY);

    // マウスが円の半径よりも円の中心に近い場合、
    // プレイヤーがクリックしたことを意味します
    if (distanceToCircle < circleRadius) {
      // 最大半径を減少させますが、15未満にはなりません
      circleMaximumRadius = max(circleMaximumRadius - 1, 15);
      resetCircle();

      // プレイヤーに1ポイントを与えます
      score += 1;
    }
    // ゲームが一時停止している場合
  } else {
    // ゲームを開始し、一時停止を解除します
    startGame();
    loop();
  }
}
