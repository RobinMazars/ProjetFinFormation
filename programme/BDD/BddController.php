<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
<script
src="https://code.jquery.com/jquery-3.3.1.min.js"
integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
crossorigin="anonymous"></script>
<link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet">
<link rel="stylesheet" href="./../../css/normalize.css">
<link rel="stylesheet" href="./../../css/bar/bar.css">
<link rel="stylesheet" href="./../../css/master.css">
<link rel="stylesheet" href="./../../css/Bdd/Bdd.css">

<?php
$nbrPage=5;
if (isset($_GET['page'])) {
  $page=(int)htmlspecialchars($_GET['page']);
  $offset=($page-1)*$nbrPage;
}
else {
  $page=1;
  $offset=0;
  //// TODO: redirection vers ?page=0 a faire dans le controller
}
if (!isset($_GET['page'])) {
  $page=1;
}
 include './../../inc/http.inc.php';
 include './../../inc/header.inc.php';

if (isset($_POST['recherche'])) {
  $recherche=$_POST['recherche'] ;// TODO: escape
  include './model/BddResearch.model.php';
  $PaginationEnable = false;
}
else {
  include './model/Bdd.model.php';
  $PaginationEnable = true;
}
include './view/Bdd.php';
 include './../../inc/footer.inc.php';



 ?>
 <script src="./../../js/Bdd/Bdd.js" charset="utf-8"></script>
 <script type="text/javascript">
   setPagination(<?=$page?>)
 </script>
 <script src="./../../js/bar/bar.js" charset="utf-8"></script>
 <script src="./../../js/main.js" charset="utf-8"></script>
