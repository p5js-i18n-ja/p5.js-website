// グローバル変数としてcanvasTextを定義します。
let canvasText = "キャンバスに画像ファイルをドラッグしてください。";

function setup() {
  // dropArea変数をキャンバスに割り当てます。
  let dropArea = createCanvas(710, 400);

  // drop()メソッドをキャンバスに追加します。ファイルがキャンバスにドロップされたときにgotFile関数を呼び出します。
  dropArea.drop(gotFile);
  noLoop();
}

function draw() {
  background(100);

  // キャンバスに画像ファイルをドロップするための指示を追加します。
  fill(255);
  noStroke();
  textSize(24);
  textAlign(CENTER);
  text(canvasText, width / 2, height / 2);

  describe(
    `灰色のキャンバスの中央に「${canvasText}」というテキストがあります。`,
  );
}

function gotFile(file) {
  // キャンバスにドロップされたファイルが画像である場合、
  // 画像を含むimgという変数を作成します。
  // この画像ファイルをDOMから削除し、キャンバス内でのみ画像を描画します。
  if (file.type === "image") {
    // 装飾的な写真の場合のみ、altテキストに空の文字列を渡します。
    let img = createImg(file.data, "").hide();
    image(img, 0, 0, width, height);
  } else {
    // キャンバスにドロップされたファイルが画像でない場合、
    // 指示を「画像ファイルではありません！」に変更します。
    canvasText = "画像ファイルではありません！";
    redraw();
  }
}
