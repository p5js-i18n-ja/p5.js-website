// オーディオプレーヤーを格納するための変数を宣言します
let audioPlayer;

function setup() {
  // キャンバスを削除します
  noCanvas();

  // オーディオファイルへのパスを使用してオーディオプレーヤーを作成します
  // これは公開ファイルのURLでも可能です
  // p5エディタでは、左上の>ボタンをクリックし、次に+ボタンをクリックすることで
  // スケッチファイルにファイルをアップロードできます
  audioPlayer = createAudio("/assets/piano-loop.mp3");

  // アシスティブテクノロジー用に再生速度を説明するための説明を追加します
  audioPlayer.attribute(
    "aria-description",
    "このオーディオプレーヤーの再生速度はマウスの位置によって制御されます。マウスが右に行くほど、オーディオは速く再生されます。",
  );

  // プレーヤーコントロールを表示します
  audioPlayer.showControls();
}

function draw() {
  // マウスの位置に基づいて再生速度を1-2倍に設定します
  audioPlayer.speed(1 + mouseX / windowWidth);
}
