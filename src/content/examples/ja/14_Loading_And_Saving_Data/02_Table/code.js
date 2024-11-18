// グローバルオブジェクト：loadTable呼び出しからの結果を保持
let table;

// グローバル配列：すべてのバブルオブジェクトを保持
let bubbles;

// バブルを作成するためのマウス押下位置を保存
let mousePressX = 0;
let mousePressY = 0;

// 現在バブルが作成中かどうかを記憶
let creatingBubble = false;

// "setup"が実行される前に完了するように非同期データの読み込みをpreloadに入れる
function preload() {
  table = loadTable("/assets/bubbles.csv", "header", loadData);
}

// 保存されたバブルデータをバブルオブジェクトに変換
function loadData(table) {
  bubbles = [];
  let tableRows = table.getRows();
  for (let row of tableRows) {
    // 位置、直径、名前を取得
    let x = row.getNum("x");
    let y = row.getNum("y");
    let radius = row.getNum("radius");
    let name = row.getString("name");

    // オブジェクトを配列に追加
    bubbles.push(new Bubble(x, y, radius, name));
  }
}

function setup() {
  let p5Canvas = createCanvas(640, 360);

  // キャンバスがクリックされたときにsaveMousePress()を呼び出す
  p5Canvas.mousePressed(saveMousePress);

  ellipseMode(RADIUS);
  textSize(20);

  // ダウンロードボタンを追加し、押されたときにdownloadBubbleData()を呼び出す
  let downloadButton = createButton("バブルデータをダウンロード");
  downloadButton.mousePressed(downloadBubbleFile);

  // ダウンロードしたデータファイルを読み込むためのロードボタンを追加
  let loadButton = createFileInput(loadBubbleFile);

  // .csv拡張子のファイルのみを受け入れる
  loadButton.attribute("accept", ".csv");

  describe(
    "カーソルがキャンバスをクリックし、ドラッグして放すと、バブルを表す黒い輪郭の円が白い背景に表示されます。バブルの名前を尋ねるプロンプトが表示され、この名前はカーソルが円の上にあるときに円の下に表示されます。",
  );
}

function draw() {
  background(255);

  // すべてのバブルを表示
  for (let bubble of bubbles) {
    bubble.display();
  }

  // 進行中のバブルを表示
  if (creatingBubble === true) {
    let radius = dist(mousePressX, mousePressY, mouseX, mouseY);
    noFill();
    stroke(0);
    strokeWeight(4);
    circle(mousePressX, mousePressY, radius);
  }

  // 下部に指示を表示
  textAlign(LEFT, BOTTOM);
  fill(0);
  noStroke();
  text("クリックしてバブルを追加します。", 10, height - 10);
}

// 現在のマウス位置を保存して次のバブル位置として使用
function saveMousePress() {
  mousePressX = mouseX;
  mousePressY = mouseY;
  creatingBubble = true;
}

// バブルを作成中の場合はバブルを追加
function mouseReleased() {
  if (creatingBubble === true) {
    addBubble();
    creatingBubble = false;
  }
}

// 新しいバブルを作成
function addBubble() {
  // 新しい行を作成
  let row = table.addRow();

  // バブルに半径とラベルを追加
  let radius = dist(mousePressX, mousePressY, mouseX, mouseY);
  let name = prompt("新しいバブルの名前を入力してください");

  // その行の値を設定
  row.setNum("x", mousePressX);
  row.setNum("y", mousePressY);
  row.setNum("radius", radius);
  row.setString("name", name);

  bubbles.push(new Bubble(mousePressX, mousePressY, radius, name));
}

// CSVファイルからバブルデータを読み込む
function loadBubbleFile(file) {
  loadTable(file.data, "csv", "header", loadData);
}

// バブルデータをCSVファイルとしてダウンロード
function downloadBubbleFile() {
  saveTable(table, "bubbles.csv");
}

// バブルクラス
class Bubble {
  constructor(x, y, radius, name) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.name = name;
  }

  // マウスがバブルの上にあるかどうかを確認
  mouseOver() {
    let mouseDistance = dist(mouseX, mouseY, this.x, this.y);
    return mouseDistance < this.radius;
  }

  // バブルを表示
  display() {
    stroke(0);
    noFill();
    strokeWeight(4);
    circle(this.x, this.y, this.radius);
    if (this.mouseOver() === true) {
      fill(0);
      noStroke();
      textAlign(CENTER);
      text(this.name, this.x, this.y + this.radius + 30);
    }
  }
}
