/*
 * @norender
 * @name インスタンスコンテナ
 * @description オプションとして、第2引数で canvas と
 * 他の要素を追加するためのデフォルトのコンテナを指定することができます。
 * html内の要素のIDや、html ノードそのものを指定することができます。
 *
 * ここでは、コンテナとなる DOM 要素を選択するための3種の異なる選択肢を紹介します。
 * p5 が作成するすべての DOM 要素（canvas、button、div など）は、
 * p5() 呼び出しの第2引数として指定された 
 * DOM 要素に追加されます。
 */
<!-- コンテナ要素の ID を渡す方法 -->
<!DOCTYPE html>
<head>
  <script src='p5.js'></script>
</head>
<body>
  <div id='container'></div>
  <script>
  let sketch = function(p) {
    p.setup = function(){
      p.createCanvas(100, 100);
      p.background(0);
    }
  };
  new p5(sketch, 'container');
  </script>
</body>
</html>


<!-- コンテナ要素へのポインタを渡す方法 -->
<!DOCTYPE html>
<head>
  <script src='p5.js'></script>
</head>
<body>
  <div id='container'></div>
  <script>
  let sketch = function(p) {
    p.setup = function(){
      p.createCanvas(100, 100);
      p.background(0);
    }
  };
  new p5(sketch, window.document.getElementById('container'));
  </script>
</body>
</html>


<!-- 要素を作成し、body に追加、
そして、そのポインタを渡す方法  -->
<!DOCTYPE html>
<head>
  <script src='p5.js'></script>
</head>
<body>
  <script>
  let sketch = function(p) {
    p.setup = function(){
      p.createCanvas(100, 100);
      p.background(0);
    }
  };
  let node = document.createElement('div');
  window.document.getElementsByTagName('body')[0].appendChild(node);
  new p5(sketch, node);
  </script>
</body>
</html>


<!-- 要素を作成、先にそのポインタを渡し、
あとで body に追加する方法 -->
<!DOCTYPE html>
<head>
  <script src='p5.js'></script>
</head>
<body>
  <script>
  let sketch = function(p) {
    p.setup = function(){
      p.createCanvas(100, 100);
      p.background(0);
    }
  };
  let node = document.createElement('div');
  new p5(sketch, node);
  window.document.getElementsByTagName('body')[0].appendChild(node);
  </script>
</body>
</html>