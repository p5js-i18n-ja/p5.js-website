let circleX = 200;
let circleY = 150;
let circleRadius = 75;

let graphX = 50;
let graphY = 300;
let graphAmplitude = 50;
let graphPeriod = 300;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  describe(
    "単位円の周りを動く点のアニメーションデモンストレーションで、対応するサインおよびコサインの値がそれぞれのグラフに沿って動きます。",
  );
}

function draw() {
  background(0);

  // フレームカウントに基づいて角度を設定し、現在の値を表示します

  let angle = frameCount % 360;

  fill(255);
  textSize(20);
  textAlign(LEFT, CENTER);
  text(`angle: ${angle}`, 25, 25);

  // 円と直径を描画します

  noFill();
  stroke(128);
  strokeWeight(3);
  circle(circleX, circleY, 2 * circleRadius);
  line(circleX, circleY - circleRadius, circleX, circleY + circleRadius);
  line(circleX - circleRadius, circleY, circleX + circleRadius, circleY);

  // 動く点を描画します

  let pointX = circleX + circleRadius * cos(angle);
  let pointY = circleY - circleRadius * sin(angle);

  line(circleX, circleY, pointX, pointY);

  noStroke();

  fill("white");
  circle(pointX, pointY, 10);

  fill("orange");
  circle(pointX, circleY, 10);

  fill("red");
  circle(circleX, pointY, 10);

  // グラフを描画します

  stroke("grey");
  strokeWeight(3);
  line(graphX, graphY, graphX + 300, graphY);
  line(graphX, graphY - graphAmplitude, graphX, graphY + graphAmplitude);
  line(
    graphX + graphPeriod,
    graphY - graphAmplitude,
    graphX + graphPeriod,
    graphY + graphAmplitude,
  );

  fill("grey");
  strokeWeight(1);
  textAlign(CENTER, CENTER);
  text("0", graphX, graphY + graphAmplitude + 20);
  text("360", graphX + graphPeriod, graphY + graphAmplitude + 20);
  text("1", graphX / 2, graphY - graphAmplitude);
  text("0", graphX / 2, graphY);
  text("-1", graphX / 2, graphY + graphAmplitude);

  fill("orange");
  text("cos", graphX + graphPeriod + graphX / 2, graphY - graphAmplitude);
  fill("red");
  text("sin", graphX + graphPeriod + graphX / 2, graphY);

  // コサイン曲線を描画します

  noFill();
  stroke("orange");
  beginShape();
  for (let t = 0; t <= 360; t++) {
    let x = map(t, 0, 360, graphX, graphX + graphPeriod);
    let y = graphY - graphAmplitude * cos(t);
    vertex(x, y);
  }
  endShape();

  // サイン曲線を描画します

  noFill();
  stroke("red");
  beginShape();
  for (let t = 0; t <= 360; t++) {
    let x = map(t, 0, 360, graphX, graphX + graphPeriod);
    let y = graphY - graphAmplitude * sin(t);
    vertex(x, y);
  }
  endShape();

  // 動く線を描画します

  let lineX = map(angle, 0, 360, graphX, graphX + graphPeriod);
  stroke("grey");
  line(lineX, graphY - graphAmplitude, lineX, graphY + graphAmplitude);

  // グラフ上の動く点を描画します

  let orangeY = graphY - graphAmplitude * cos(angle);
  let redY = graphY - graphAmplitude * sin(angle);

  noStroke();

  fill("orange");
  circle(lineX, orangeY, 10);

  fill("red");
  circle(lineX, redY, 10);
}
