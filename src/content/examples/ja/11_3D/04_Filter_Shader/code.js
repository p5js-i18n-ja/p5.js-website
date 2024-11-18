let video;
let displaceColors;

let displaceColorsSrc = `
precision highp float;

uniform sampler2D tex0;
varying vec2 vTexCoord;

vec2 zoom(vec2 coord, float amount) {
  vec2 relativeToCenter = coord - 0.5;
  relativeToCenter /= amount; // ズームイン
  return relativeToCenter + 0.5; // 絶対座標に戻す
}

void main() {
  // 各色チャンネルを取得し、異なるズーム量を使用して
  // 色をわずかにずらします
  gl_FragColor = vec4(
    texture2D(tex0, vTexCoord).r,
    texture2D(tex0, zoom(vTexCoord, 1.05)).g,
    texture2D(tex0, zoom(vTexCoord, 1.1)).b,
    texture2D(tex0, vTexCoord).a
  );
}
`;

function setup() {
  createCanvas(700, 400, WEBGL);
  video = createVideo(
    "https://upload.wikimedia.org/wikipedia/commons/d/d2/DiagonalCrosswalkYongeDundas.webm",
  );
  video.volume(0);
  video.hide();
  video.loop();

  displaceColors = createFilterShader(displaceColorsSrc);

  describe("都市の横断歩道の動画で、中心から遠ざかるほど色がずれていきます。");
}

function draw() {
  background(255);
  push();
  imageMode(CENTER);
  image(video, 0, 0, width, height, 0, 0, video.width, video.height, COVER);
  pop();
  filter(displaceColors);
}
