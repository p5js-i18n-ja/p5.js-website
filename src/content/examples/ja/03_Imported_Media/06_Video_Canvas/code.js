// グローバル変数として動画と再生中の状態を定義します。
// 動画がキャンバスに読み込まれたときに一時停止するように、playingをfalseに設定します。
let video;
let playing = false;

function setup() {
  createCanvas(710, 400);

  // キャンバスのアセットディレクトリに動画をアップロードし、
  // createVideo()関数を使用して動画をコードに読み込みます。
  // 異なるブラウザで動画が表示されるように、複数の動画フォーマットをアップロードするのが最適です。
  video = createVideo(["/assets/fingers.mov", "/assets/fingers.webm"]);

  // デフォルトでは、動画は独自のDOM要素としてレンダリングされます。
  // hide()メソッドを使用して動画のDOMインスタンスを削除します。
  video.hide();
}

function draw() {
  describe(
    "キャンバスの右上と中央下に2つの動画があり、左上隅には「キャンバスをクリックして動画フィードを開始および一時停止します。」というテキストがあります。",
  );
  background(240);

  // キャンバスの右上に指示テキストを追加します。
  textSize(16);
  text(
    "キャンバスをクリックして動画フィードを開始および一時停止します。",
    345,
    50,
  );

  // キャンバスに動画の最初のインスタンスを描画します。
  image(video, 10, 10);

  // キャンバス上の既存の要素にグレーのフィルターを追加します。
  filter(GRAY);

  // 動画の2番目のインスタンスを描画します。
  image(video, 150, 150);
}

function mousePressed() {
  // キャンバスがクリックされたとき、動画が
  // 一時停止しているか再生中かを確認します。再生中であれば、動画を一時停止します。
  if (playing) {
    video.pause();
  } else {
    // 一時停止している場合は、動画を再生します。
    video.loop();
  }

  // playingの値を反対のブール値に変更します。
  playing = !playing;
}
