// グローバル変数を作成します: playing, video, および button。
// playingをfalseに設定して、動画が一時停止の状態で読み込まれるようにします。
let playing = false;
let video;
let button;

function setup() {
  // noCanvas()関数を使用してキャンバスを削除します。
  noCanvas();

  // キャンバスのアセットディレクトリに動画をアップロードし、
  // createVideo()関数を使用して動画をコードに読み込みます。
  // このcreateVideo()関数はp5.MediaElementクラスを構築します。
  // 動画が異なるブラウザで表示されるように、複数の動画フォーマットをアップロードするのが最良です。
  video = createVideo(["/assets/fingers.mov", "/assets/fingers.webm"]);

  // 動画の隣に「play」と書かれたボタンを作成します。
  button = createButton("play");

  // ボタンが押されるとtoggleVid()関数が呼び出されます。
  button.mousePressed(toggleVid);
}

function toggleVid() {
  // 動画が再生中の場合、pause()メソッドで動画を一時停止し、
  // ボタンのテキストを「play」にします。
  if (playing == true) {
    video.pause();
    button.html("play");

    // 動画が一時停止中の場合、loop()メソッドで動画を再生し、
    // ボタンのテキストを「pause」にします。
  } else {
    video.loop();
    button.html("pause");
  }

  // 動画の再生状態が切り替わったら、
  // playingを反対のブール値に切り替えます。
  playing = !playing;
}
