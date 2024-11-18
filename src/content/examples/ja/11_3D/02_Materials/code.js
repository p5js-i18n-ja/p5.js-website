// モデルと画像テクスチャ
let astronaut;
let venus;

// マテリアルタイプのラジオ要素
let materialType;

// カラーセレクター要素
let fillStrokeSelectionContainer;
let ambientSpecularSelectionContainer;
let fillCheckbox, strokeCheckbox, ambientCheckbox, specularCheckbox;
let emissivePicker;

// 選択された色
let fillSelection, strokeSelection, ambientSelection, specularSelection;

// 宇宙飛行士モデルと金星画像テクスチャを読み込む
function preload() {
  astronaut = loadModel("/assets/astronaut.obj");
  venus = loadImage("/assets/venus.jpg");
}

function setup() {
  createCanvas(400, 400, WEBGL);
  angleMode(DEGREES);
  createSelectionArea();

  describe(
    "キャンバスの下にあるセレクタを使用してユーザーが選択したマテリアルで表示された宇宙飛行士の3Dモデル。",
  );
}

function draw() {
  background(0);

  // キャンバス設定を保存
  push();

  // 現在のマテリアルタイプを取得
  let currentMaterial = materialType.value();

  switch (currentMaterial) {
    case "color":
      applyColorMaterial();
      break;
    case "emissive":
      applyEmissiveMaterial();
      break;
    case "normal":
      applyNormalMaterial();
      break;
    case "texture":
      applyTextureMaterial();
      break;
  }

  // ライト
  ambientLight(128);
  spotLight(255, 255, 255, 0, -height / 2, 200, 0, 0.5, -1, 30);

  // 宇宙飛行士
  translate(0, -25);
  scale(4);
  rotateZ(180);
  model(astronaut);

  // キャンバス設定を復元し、次のフレームで現在の選択のみが適用されるようにする
  pop();
}

function createSelectionArea() {
  // 選択要素のコンテナを作成
  let selectionArea = createDiv();
  selectionArea.style("background", "#f0f0f0");
  selectionArea.style("width", "400px");
  selectionArea.style("font-family", "sans-serif");

  // マテリアルタイプのラジオセレクタを作成
  let materialTypeLabel = createElement("label", "Material type");
  materialTypeLabel.parent(selectionArea);
  materialType = createRadio();
  materialType.parent(materialTypeLabel);
  materialType.option("color");
  materialType.option("emissive");
  materialType.option("normal");
  materialType.option("texture");
  materialType.selected("color");

  // マテリアルカラーのセレクタを作成
  fillStrokeSelectionContainer = createDiv();
  fillStrokeSelectionContainer.parent(selectionArea);
  ambientSpecularSelectionContainer = createDiv();
  ambientSpecularSelectionContainer.parent(selectionArea);

  fillSelection = color(255);
  fillCheckbox = createColorSelector(
    "fill",
    fillSelection,
    true,
    fillStrokeSelectionContainer,
  );
  strokeSelection = color(0);
  strokeCheckbox = createColorSelector(
    "stroke",
    strokeSelection,
    true,
    fillStrokeSelectionContainer,
  );
  ambientSelection = color(255);
  ambientCheckbox = createColorSelector(
    "ambient",
    ambientSelection,
    false,
    ambientSpecularSelectionContainer,
  );
  specularSelection = color(255);
  specularCheckbox = createColorSelector(
    "specular",
    specularSelection,
    false,
    ambientSpecularSelectionContainer,
  );

  // 放射性マテリアルカラーのためのピッカーを作成
  emissivePicker = createColorPicker(color(255));
  emissivePicker.hide();
}

function createColorSelector(label, colorSelection, checked, parentElement) {
  let checkbox = createCheckbox(label);
  checkbox.parent(parentElement);
  let picker = createColorPicker(colorSelection);
  picker.parent(parentElement);

  function setColor() {
    let selectedColor = picker.color();
    colorSelection.setRed(red(selectedColor));
    colorSelection.setGreen(green(selectedColor));
    colorSelection.setBlue(blue(selectedColor));
  }

  // ピッカーの色が変更されたとき、セレクタの色をその値に設定
  picker.changed(setColor);

  function setPickerVisibility() {
    if (checkbox.checked() === true) {
      picker.show();
    } else {
      picker.hide();
    }
  }

  // チェックボックスがチェックされたとき、カラーピッカーを表示
  checkbox.changed(setPickerVisibility);
  checkbox.checked(checked);
  setPickerVisibility();

  return checkbox;
}

function applyColorMaterial() {
  ambientSpecularSelectionContainer.show();
  emissivePicker.hide();
  fillStrokeSelectionContainer.show();
  applyAmbientSpecularMaterial();

  // 現在の選択を使用して塗りつぶしを設定
  if (fillCheckbox.checked() === true) {
    fill(fillSelection);
  } else {
    noFill();
  }
  strokeCheckbox.show();

  // 現在の選択を使用してストロークを設定
  if (strokeCheckbox.checked() === true) {
    stroke(strokeSelection);
  } else {
    noStroke();
  }
}

function applyEmissiveMaterial() {
  noStroke();
  ambientSpecularSelectionContainer.hide();
  fillStrokeSelectionContainer.hide();
  emissivePicker.show();

  // 選択した色を使用して放射性マテリアルを適用
  emissiveMaterial(emissivePicker.color());
}

function applyNormalMaterial() {
  ambientSpecularSelectionContainer.hide();
  fillStrokeSelectionContainer.hide();
  emissivePicker.hide();

  // 通常のマテリアルを適用
  normalMaterial();
}

function applyTextureMaterial() {
  ambientSpecularSelectionContainer.show();
  emissivePicker.hide();
  fillStrokeSelectionContainer.hide();
  applyAmbientSpecularMaterial();
  noStroke();

  // テクスチャを適用
  texture(venus);
}

function applyAmbientSpecularMaterial() {
  if (ambientCheckbox.checked() === true) {
    ambientMaterial(ambientSelection);
  }
  if (specularCheckbox.checked() === true) {
    specularMaterial(specularSelection);
  }
}
