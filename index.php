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
  <link rel="stylesheet" href="./css/normalize.css">
  <link rel="stylesheet" href="./css/bar/bar.css">
  <link rel="stylesheet" href="./css/master.css">
</head>
<body>
  <?php include './inc/http.inc.php'; ?>
  <?php include './inc/header.inc.php'; ?>
  <main>
    <h1>Portfolio de Mazars Robin Web développeur</h1>
    <section>
      <h2>Présentation Générale:</h2>
      <h2>Situation Actuelle :</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
        aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </section>
    <section id="competence">
      <h2>Compétences(bar)</h2>
      <h3>Language Informatique</h3>
      <div class="Competence">
      <h4>HTML</h4>
      <div class="bar 80">

      </div>
      <h4>CSS</h4>
      <div class="bar 70">

      </div>
      <h4>JS</h4>
      <div class="bar 20">

      </div>
      <h4>PHP</h4>
      <div class="bar 0">

      </div>
      <h4>mySQL</h4>
      <div class="bar 110">

      </div>
      </div>
      <h4>Java</h4>
      <div class="bar 100">

      </div>
      <h4>Python</h4>
      <div class="bar -50">

      </div>
      <h4>Symfony</h4>
      <p>0%</p>
      <h3>Autre Compétence</h3>
      <p>Github</p>
    </section>
    <section>
      <h2>Réalisations</h2>
      <div id="lienRealisation">
        <a href="<?=$RelativePath."/programme/piece/piece.html" ?>">Piece full CSS</a>
        <a href="<?=$RelativePath."/programme/jsGame/jsGame.php" ?>">jsGame</a>
        <a href="#">Lien 3</a>
        <a href="#">Lien 4</a>
        <a href="#">Lien 5</a>
        <a href="#">Lien 6</a>
      </div>
    </section>
    <section>
      <h2>Parcours:(timeline)</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </section>
    <section>
      <h2> Informations Suplémentaires</h2>


      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
        aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </section>
    <section>
      <h2>Me contacter</h2>


      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
        aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </section>
  </main>
  <?php include './class/bdd.class.php'; ?>
  <?php
  $db=new Bdd();
  $sql="SELECT * FROM `employees`";
  $req=$db->retrieveData($sql);
  foreach ($req as $key => $value) {
    foreach ($value as $key2 => $value2) {
      echo "<p>".$key2.":".$value2.'</p>';
    }
    echo "<p>".$key."</p>";

  }
  var_dump($req);
  ?>
  <?php include './inc/footer.inc.php'; ?>
</body>
<script src="./js/bar/bar.js" charset="utf-8"></script>
<script src="./js/main.js" charset="utf-8"></script>
</html>
