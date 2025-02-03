/*
 * @name キーボード
 * @arialabel キーボードの各文字を押すと、灰色の画面にさまざまな色の四角形が描かれます。
 * @description 画面をクリックしてフォーカスをあて文字キーを押すと、そのキーと回数にもとづいて四角形を作り出します。
 * 各キーには、固有の識別番号があります。
 * これらの番号は、
 * 空間の中で四角形を配置するために使用できます。
 */
let rectWidth;

function setup() {
  createCanvas(720, 400);
  noStroke();
  background(230);
  rectWidth = width / 4;
}

function draw() {
  // キーを待っている間、ループを続けるために draw() を書いておきます。
}

function keyPressed() {
  let keyIndex = -1;
  if (key >= "a" && key <= "z") {
    keyIndex = key.charCodeAt(0) - "a".charCodeAt(0);
  }
  if (keyIndex === -1) {
    // 文字キーでない場合、画面をクリアします。
    background(230);
  } else {
    // 文字キーの場合、長方形を塗りつぶします。
    randFill_r = Math.floor(Math.random() * 255 + 1);
    randFill_g = Math.floor(Math.random() * 255 + 1);
    randFill_b = Math.floor(Math.random() * 255 + 1);
    fill(randFill_r, randFill_g, randFill_b);
    let x = map(keyIndex, 0, 25, 0, width - rectWidth);
    rect(x, 0, rectWidth, height);
  }
}
