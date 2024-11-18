/*
 * @name 論理演算子
 * @arialabel 灰色の背景の半分に、水平の黒い線が敷き詰められています。これらの線の一部は左にずれており、この上下に垂直の点線が表示されています。
 * @description 論理演算子の AND(&& 論理積) および OR(|| 論理和) は、
 * 単純な関係文をより複雑な式として結合するために使用されます。
 * NOT(! 否定)演算子は、ブール(真偽)文を否定するために使用されます。
 */
let test = false;

function setup() {
  createCanvas(720, 360);
  background(126);

  for (let i = 5; i <= height; i += 5) {
    // AND 論理積
    stroke(0);
    if (i > 35 && i < 100) {
      line(width / 4, i, width / 2, i);
      test = false;
    }

    // OR 論理和
    stroke(76);
    if (i <= 35 || i >= 100) {
      line(width / 2, i, width, i);
      test = true;
    }

    // ブール値が "true" かどうかのテストです。
    // 「if(test)」という表現は、「if(test == true)」と等価です。
    if (test) {
      stroke(0);
      point(width / 3, i);
    }

    // ブール値が "false" かどうかのテストです。
    // 「if(!test)」という表現は、「if(test == false)」と等価です。
    if (!test) {
      stroke(255);
      point(width / 4, i);
    }
  }
}
