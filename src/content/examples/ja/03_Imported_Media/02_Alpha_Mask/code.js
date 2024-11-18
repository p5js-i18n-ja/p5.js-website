// 画像アセットをキャンバスからプリロードします
// assets ディレクトリ。
function preload() {
  // Photo by Sergey Shmidt, https://unsplash.com/photos/koy6FlCCy5s
  img = loadImage("/assets/image.jpg");

  // Photo by Mockup Graphics, https://unsplash.com/photos/_mUVHhvBYZ0
  imgMask = loadImage("/assets/mask.png");
}

function setup() {
  describe(
    "左側に「マスクされた画像」とラベル付けされた2つの写真、右側に「マスク」とラベル付けされた写真。",
  );
  createCanvas(710, 400);

  // mask() メソッドを使用して imgMask 写真を
  // img のマスクとして適用します。
  img.mask(imgMask);

  // テキストラベルの配置を設定します。
  textAlign(LEFT, TOP);
}

function draw() {
  background(255);

  // 左側にマスクされた画像を描画し、次に
  // 右側にマスクに使用された写真を描画します。
  describeElement("マスクされた画像", "2枚の葉でマスクされた黄色い花の写真。");
  image(img, 0, 0, 350, 350);

  describeElement(
    "マスク",
    "前の写真をマスクするために使用された2枚の葉の写真。",
  );
  image(imgMask, 350, 0, 350, 350);

  // 表示されている画像を説明するラベルを追加します。
  textSize(24);
  fill(0);
  text("マスクされた画像", 10, 10);
  text("マスク", 360, 10);
}
