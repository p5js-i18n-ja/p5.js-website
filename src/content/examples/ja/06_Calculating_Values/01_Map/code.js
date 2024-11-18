function setup() {
  createCanvas(720, 400);
  colorMode(HSB);
  noStroke();
  textOutput();
}

function draw() {
  background(0);

  // mouseXの値を0から720の範囲から0から360の範囲にスケーリングします
  let circleHue = map(mouseX, 0, width, 0, 360);

  // mouseYの値を0から400の範囲から20から300の範囲にスケーリングします
  let diameter = map(mouseY, 0, height, 20, 300);

  fill(circleHue, 80, 90);
  circle(width / 2, height / 2, diameter);
}
