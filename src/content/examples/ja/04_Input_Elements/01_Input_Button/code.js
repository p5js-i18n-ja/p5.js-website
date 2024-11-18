// グローバル変数を定義します: input, button, greeting.
let nameInput;
let button;
let greeting;

function setup() {
  createCanvas(710, 400);
  background(255);

  // greeting変数を使って、名前を尋ねます。
  greeting = createElement("h2", "あなたの名前は何ですか？");
  greeting.position(20, 5);

  // キャンバスに入力とボタンを作成します。
  nameInput = createInput();
  nameInput.position(20, 65);

  button = createButton("送信");
  button.position(nameInput.x + nameInput.width, 65);

  // ボタンが押されたときにgreet()関数を呼び出すためにmousePressed()メソッドを使用します。
  button.mousePressed(greet);

  // 入力が変更され、Enter/Returnボタンが押されたときにもgreetを呼び出します
  nameInput.changed(greet);
}

function greet() {
  // 前の入力をクリアするためにキャンバスの背景をリフレッシュします。
  background(255);

  // name変数を入力の値に接続します。
  let name = nameInput.value();

  // 挨拶を更新して、相手の名前を表示します。
  greeting.html(`こんにちは、${name}さん！`);

  // 入力の値をクリアします。
  nameInput.value("");

  // キャンバスに名前を描画します
  textSize(100);
  textAlign(CENTER, CENTER);
  text(name, width / 2, height / 2);

  describe(`名前 ${name} を白い背景に大きな黒い文字で表示します。`);
}
