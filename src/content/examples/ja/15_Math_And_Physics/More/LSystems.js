/*
 * @name L システム
 * @arialabel さまざまな色とパターンの円が、直角に曲がる黒い線でつながれてグリッド状に整列した形で画面に描かれます。
 * @description このスケッチは、Lindenmayer システム（L システムとも呼ばれます）に基づいた自動描画を作成します。
 * L システムは、手続き型グラフィックスで
 * 自然、幾何学的、または興味深い「フラクタル風」のパターンを作成するためによく使用されます。<br>
 * 例の作成者: <a href='http://lukedubois.com/' target='_blank'>R. Luke DuBois</a><br>
 * <a href='https://en.wikipedia.org/wiki/L-system'>https://en.wikipedia.org/wiki/L-system</a>
 */
// タートル関連の変数:
let x, y; // タートルの現在位置
let currentangle = 0; // タートルが向いている方向
let step = 20; // タートルが「F」で動く量
let angle = 90; // タートルが「-」または「+」で回転する角度

// Lindenmayer 関連の変数（L システム）
let thestring = "A"; // 文字列の開始点（「原則」）
let numloops = 5; // 事前に計算する反復回数
let therules = []; // ルールの配列
therules[0] = ["A", "-BF+AFA+FB-"]; // 最初のルール
therules[1] = ["B", "+AF-BFB-FA+"]; // 二番目のルール

let whereinstring = 0; // L システム内のどこにいるか

function setup() {
  createCanvas(710, 400);
  background(255);
  stroke(0, 0, 0, 255);

  // x と y の位置を左下隅に設定します。
  x = 0;
  y = height - 1;

  // L システムを計算します。
  for (let i = 0; i < numloops; i++) {
    thestring = lindenmayer(thestring);
  }
}

function draw() {
  // 文字列の現在の文字を描画します:
  drawIt(thestring[whereinstring]);

  // 文字列を読み取るポイントをインクリメントします。
  // 終わりに達したらループします。
  whereinstring++;
  if (whereinstring > thestring.length - 1) whereinstring = 0;
}

// L システムを解釈します。
function lindenmayer(s) {
  let outputstring = ""; // 空の出力文字列を開始します。

  // 「therules」を反復処理してシンボルの一致を探します:
  for (let i = 0; i < s.length; i++) {
    let ismatch = 0; // 一致しない場合をデフォルトに設定します。
    for (let j = 0; j < therules.length; j++) {
      if (s[i] == therules[j][0]) {
        outputstring += therules[j][1]; // 置換文字列を書き込みます。
        ismatch = 1; // 一致したので、シンボルはコピーしません。
        break; // この for() ループを抜けます。
      }
    }
    // 一致しなかった場合、シンボルをコピーします。
    if (ismatch == 0) outputstring += s[i];
  }

  return outputstring; // 修正された文字列を返します。
}

// これはタートルのコマンドを描画するカスタム関数です。
function drawIt(k) {
  if (k == "F") {
    // 前進します。
    // step と currentangle に基づいて極座標から直交座標に変換します:
    let x1 = x + step * cos(radians(currentangle));
    let y1 = y + step * sin(radians(currentangle));
    line(x, y, x1, y1); // 古い座標と新しい座標を接続します。

    // タートルの位置を更新します:
    x = x1;
    y = y1;
  } else if (k == "+") {
    currentangle += angle; // 左に曲がります。
  } else if (k == "-") {
    currentangle -= angle; // 右に曲がります。
  }

  // ランダムな色の値を生成します:
  let r = random(128, 255);
  let g = random(0, 192);
  let b = random(0, 50);
  let a = random(50, 100);

  // 半径のガウス（D&D）分布を選びます:
  let radius = 0;
  radius += random(0, 15);
  radius += random(0, 15);
  radius += random(0, 15);
  radius = radius / 3;

  // 円を描画します:
  fill(r, g, b, a);
  ellipse(x, y, radius, radius);
}
