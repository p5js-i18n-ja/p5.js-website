/*
 * @name 二次元配列上を走査
 * @arialabel 黒い背景の上に黒い文字で20のフレーズを４フレーズずつ計５行配置します。
 * @frame 400,400
 * @description <a href="https://www.rit.edu/directory/wmhics-w-michelle-harris">
   <b>Prof WM Harris</b></a>の貢献による、通常のforループとfor-ofループを使用して、二次元配列の内容をキャンバス上に複数の異なる方法で表示する方法です。<br/>
	  キャンバス用の関数が作成されます。この関数では二次元配列（friend 配列）を初期化し、
    さまざまな方法でネストされたループを用いて配列を処理します。変数 x と y は
    二次元配列の形でキャンバス上に配列の要素を配置するために使用されます。
    最後のネストしたループは、ランダムな整数（魚の年齢）で
    二次元配列 (魚の名前の配列) を初期化するために使用されます。
*/

//"use strict"; // よくあるコーディング・エラーを発見

/**
 * setup :
 */
function setup() {
  createCanvas(400, 600);
  // 二次元配列の作成、スライド４
  let friendArray = [
    ["Nona", "mac & cheese", "orange", "Eid al-fitr"],
    ["Marylin", "ice cream", "blue", "Halloween"],
    ["Rashaad", "garbage plates", "turquoise", "Christmas"],
    ["Ava", "sushi", "pink", "New Years"],
  ];
  friendArray.push(["Xavier", "Louisiana creole", "red", "their birthday"]);

  // 二次元配列を走査、スライド６
  let y = 20; // 文字サイズ20を基準に行を開始
  for (let f = 0; f < friendArray.length; f++) {
    // 配列の外側
    let x = 10; // Start item in this row
    for (let t = 0; t < friendArray[f].length; t++) {
      //内側
      text(friendArray[f][t], x, y);
      x += textWidth(friendArray[f][t]) + 20; // 次の項目を配置
    }
    y += 28; // place next row
  }

  // 二次元配列を走査、スライド６の変形
  // y の埋め込みの演算
  //
  for (let f = 0; f < friendArray.length; f++) {
    // 配列の外側
    let x = 10; // この行の開始の項目
    for (let t = 0; t < friendArray[f].length; t++) {
      // 内側
      // y は is v-padding + LCV * v-spacing
      text(friendArray[f][t], x, 200 + f * 28);
      x += textWidth(friendArray[f][t]) + 20; // 次の項目を配置
    }
  }

  // 二次元配列を走査、スライド７
  // キャンバスの配置を管理するために、変数 x と y を使用する必要がある
  y = 400;
  for (let friend of friendArray) {
    let x = 10; // この行の開始の項目
    console.log("x and y", x, y);
    console.log("friend:", friend);
    for (let item of friend) {
      console.log("item & x:", item, x);
      text(item, x, y);
      x += textWidth(item) + 20; // 次の項目を配置
    }
    y += 28; // 次の項目を配置
  }

  // スライド９、二次元配列の生成: 魚の群れの年齢
  console.log("\n *** Fish ages in 2D ***");
  const schools = [];
  // ４つの魚の群れ
  for (let t = 0; t < 4; t++) {
    schools[t] = []; // この群の初期化
    console.log("schools[t]?", t, schools[t]);

    // 配列に 10 のランダムな年齢を追加
    for (let a = 0; a < 10; a++) {
      schools[t].push(round(random(1, 5)));
    }
  }
  console.log(schools);
}
