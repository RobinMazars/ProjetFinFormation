<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>Portfolio MAZARS Robin</title>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
  <script
  src="https://code.jquery.com/jquery-3.3.1.min.js"
  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
  crossorigin="anonymous"></script>
  <link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet">
  <link rel="stylesheet" href="./../../css/normalize.css">
  <link rel="stylesheet" href="./../../css/master.css">
  <!--class-->
  <script src="./../../js/jsClass/circle.class.js" charset="utf-8"></script>
  <script src="./../../js/jsClass/canvas.class.js" charset="utf-8"></script>
  <script src="./../../js/jsClass/pen.class.js" charset="utf-8"></script>
  <!--  -->
</head>
  <body>
    <?php include './../../inc/http.inc.php'; ?>
    <?php include './../../inc/header.inc.php'; ?>
      <canvas id="canvas" width="700" height="700">

      </canvas>
      <input type="color" id="color" value="#000000">
    <?php include './../../inc/footer.inc.php'; ?>
    <script src="./../../js/jsGame/jsGame.js" charset="utf-8"></script>
    <script src="./../../js/main.js" charset="utf-8"></script>
  </body>
</html>
