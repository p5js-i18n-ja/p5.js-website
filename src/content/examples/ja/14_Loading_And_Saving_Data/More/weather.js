/*
 * @name 天気予報
 * @arialabel Metaweatherサイトの天気を利用し、画面上の青い矢印と灰色の円を操作します。左下の白い円の中にある青い矢印は風向きを指します。灰色の背景にある小さな濃い灰色の円は、風の方向に動きます。
 * @frame 720,280
 * @description この例は、www.metaweather.com から JSON の天気データを取得します。
 */

// 風向のベクトル
let wind;
// サークル位置
let position;

function setup() {
  createCanvas(720, 200);
  // metaweather.com へデータをリクエストする。
  let url =
    "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/2459115/";
  loadJSON(url, gotWeather);
  // 円は真ん中から始まります。
  position = createVector(width / 2, height / 2);
  // 風は (0,0) から始まります。
  wind = createVector();
}

function draw() {
  background(200);

  // この部分は、風向きを示す矢印を描きます。
  push();
  translate(32, height - 32);
  // 風の角度で回転させます。
  rotate(wind.heading() + PI / 2);
  noStroke();
  fill(255);
  ellipse(0, 0, 48, 48);

  stroke(45, 123, 182);
  strokeWeight(3);
  line(0, -16, 0, 16);

  noStroke();
  fill(45, 123, 182);
  triangle(0, -18, -6, -10, 6, -10);
  pop();

  // 風向きに合わせて動かします。
  position.add(wind);

  stroke(0);
  fill(51);
  ellipse(position.x, position.y, 16, 16);

  if (position.x > width) position.x = 0;
  if (position.x < 0) position.x = width;
  if (position.y > height) position.y = 0;
  if (position.y < 0) position.y = height;
}

function gotWeather(weather) {
  let weather_today = weather.consolidated_weather[0];
  // 角度を取得します（ラジアンに変換します）。
  let angle = radians(Number(weather_today.wind_direction));
  // 風速を取得します。
  let windmag = Number(weather_today.wind_speed);

  // HTML要素で表示します。
  let temperatureDiv = createDiv(floor(weather_today.the_temp) + "&deg;C");
  let windDiv = createDiv("WIND " + windmag + " <small>MPH</small>");

  // ベクトルを作ります。
  wind = p5.Vector.fromAngle(angle);
}
