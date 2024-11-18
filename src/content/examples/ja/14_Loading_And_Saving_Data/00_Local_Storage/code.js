// グローバル配列：すべてのバブルオブジェクトを保持
let bubbles;

// バブルを作成するためのマウス押下位置を保存
let mousePressX = 0;
let mousePressY = 0;

// 現在バブルが作成中かどうかを記憶
let creatingBubble = false;

// 保存されたバブルデータをバブルオブジェクトに変換
function loadData(bubblesData) {
  bubbles = [];
  for (let bubble of bubblesData) {
    // 位置からx,yを取得
    let x = bubble.x;
    let y = bubble.y;

    // 半径と名前を取得
    let radius = bubble.radius;
    let name = bubble.name;

    // オブジェクトを配列に追加
    bubbles.push(new Bubble(x, y, radius, name));
  }
}

function setup() {
  let p5Canvas = createCanvas(640, 360);

  // 保存されたデータを取得
  let savedData = getItem("bubbles");

  // データがまだ保存されていない場合
  if (savedData === null) {
    // 空の配列を使用して開始
    loadData([]);
  } else {
    // そうでなければ、データをバブルオブジェクトに変換
    loadData(savedData);
  }

  // キャンバスがクリックされたときにsaveMousePress()を呼び出す
  p5Canvas.mousePressed(saveMousePress);

  ellipseMode(RADIUS);
  textSize(20);

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
  text("クリックしてドラッグしてバブルを追加します。", 10, height - 10);
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

// マウスがクリックされるたびに新しいバブルを作成
function addBubble() {
  // バブルに半径とラベルを追加
  let radius = dist(mousePressX, mousePressY, mouseX, mouseY);
  let name = prompt("新しいバブルの名前を入力してください");

  // ユーザーが「OK」を押した場合
  if (name !== null) {
    // 新しいJSONバブルオブジェクトを配列に追加
    bubbles.push(new Bubble(mousePressX, mousePressY, radius, name));
    storeItem("bubbles", bubbles);
  }
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
