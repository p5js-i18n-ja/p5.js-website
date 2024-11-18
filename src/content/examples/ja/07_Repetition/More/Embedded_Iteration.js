/*
 * @name 組み込まれた反復
 * @arialabel 光線が画面の中央から端に向かって出ています。画面上には正方形の格子状に白い正方形も描かれています。
 * @description "for" 構造を組み込むことで、二次元的な反復が可能になります。
 */
function setup() {
  createCanvas(720, 360);
  background(0);
  noStroke();

  let gridSize = 35;

  for (let x = gridSize; x <= width - gridSize; x += gridSize) {
    for (let y = gridSize; y <= height - gridSize; y += gridSize) {
      noStroke();
      fill(255);
      rect(x - 1, y - 1, 3, 3);
      stroke(255, 50);
      line(x, y, width / 2, height / 2);
    }
  }
}
