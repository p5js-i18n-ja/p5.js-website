// このフォームの入力をグローバル変数として定義します。
let nameInput;
let fontSelect;
let foodRadio;

function setup() {
  createCanvas(720, 400);

  // nameInputに入力ボックスを割り当てます。
  nameInput = createInput();
  nameInput.position(25, 115);

  // foodRadioにラジオボタンを割り当てます。
  foodRadio = createRadio();
  foodRadio.position(25, 215);

  // foodRadioのラジオオプションをリストし、
  // 各選択に関連付けられた背景色を設定します。
  foodRadio.option("#F7F5BC", "クランベリー");
  foodRadio.option("#B8E3FF", "アーモンド");
  foodRadio.option("#C79A9A", "ゴーダ");

  // fontSelectにセレクトドロップダウンを割り当てます。
  fontSelect = createSelect();
  fontSelect.position(25, 300);

  // fontSelectのドロップダウンオプションをリストします。
  fontSelect.option("サンセリフ");
  fontSelect.option("セリフ");
  fontSelect.option("カースィブ");

  // fontSelectの選択が変更された場合、fontChanged関数を呼び出します。
  fontSelect.changed(fontChanged);
}

function draw() {
  describe(
    "ヘッダーに「Welcome to p5.js!」、ラベルに「What is your name?」のテキスト入力、ラベルに「What is your favorite food?」のラジオボタンセットがあり、「クランベリー」、「アーモンド」、「ゴーダ」のオプションがあります。入力を通じて送信されたテキストは、そのラベルの横に表示されます。ラジオボタンの選択はキャンバスの背景色を変更します。セレクト要素はフォームのフォントを変更します。",
  );

  // 背景色を現在のfoodRadioの値に設定します。
  let backgroundColor = foodRadio.value();
  background(backgroundColor);

  // フォームのヘッダーを作成します。
  textSize(25);
  text("Welcome to p5.js!", 25, 50);

  // 新しいユーザー入力で更新されるテキスト入力を作成します。
  textSize(20);
  text(`What is your name? ${nameInput.value()}`, 25, 100);
  text("What is your favorite food?", 25, 200);
}

function fontChanged() {
  // fontSelectの値が変更されたとき、
  // キャンバスのフォント選択を新しい値に更新します。
  let fontSelection = fontSelect.value();
  textFont(fontSelection);
}
