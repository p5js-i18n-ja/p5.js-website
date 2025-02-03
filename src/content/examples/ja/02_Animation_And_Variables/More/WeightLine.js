/* 
 * @name 線の太さ
 * @arialabel 薄黄色の背景の上でマウス移動すると、さまざまな色合いと太さの線が描かれます。
 * @frame 710,400
 * @description <a href="https://www.rit.edu/directory/wmhics-w-michelle-harris">
   <b>Prof WM Harris</b></a>から寄稿された、各イベントでランダム関数を使用して線の色や太さを変更する方法です。<br/>
  <b>どうやって</b> マウスの位置、左マウスボタンのクリック、文字キーを押したか、キーを離したかのイベントで、
  ランダム関数を使用して色や太さを
  変えるかをしめしています。<br/>
  <b>関数として</b> キャンバスのセットアップだけでなく、線を描くのための関数が作成されます。
  また、ユーザーが行うアクションによって、線の太さと色に変化をもたらします。
  左マウスボタンのクリックをすると色が青に変わり、
  太さは 0 〜 1 の範囲で変化します。
  文字キーを押しっぱなしにすると色がターコイズ色に変わり、
  太さは 0 〜 5 の範囲で変化します。
	また、キーを離したときには、
  色をランダムな色相、彩度、輝度に変化させます。
 */

function setup() {
  createCanvas(400, 400);
  background("beige");
  colorMode(HSB);
}

function draw() {
  // マウス位置の前のポイントから
  // 現在のポイントまでの線
  line(mouseX, mouseY, pmouseX, pmouseY);
}

// マウスをクリックすると
function mouseClicked() {
  // ウェイト(太さ)を 0 ～ 1 で設定します。
  stroke("slateBlue");
  strokeWeight(random());

  // もしウェイトを 0 〜 0.4 にしたい場合は?
  //strokeWeight( random(.4) );
}

// *どれか* のキーを離したとき
function keyReleased() {
  // 色相 20 ～ 145
  // 彩度 0 ～ 100
  // 明るさ 80 ～ 100
  stroke(random(20, 145), random(100), random(80, 100));
}

// 文字キーが押されているとき
function keyTyped() {
  // ウェイト 0 〜 5
  stroke("turquoise");
  strokeWeight(random(5));
}
