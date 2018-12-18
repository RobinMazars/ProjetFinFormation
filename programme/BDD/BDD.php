<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title>BDD</title>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
    <script
    src="https://code.jquery.com/jquery-3.3.1.min.js"
    integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
    crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet">
    <link rel="stylesheet" href="./../../css/normalize.css">
    <link rel="stylesheet" href="./../../css/bar/bar.css">
    <link rel="stylesheet" href="./../../css/master.css">
    <link rel="stylesheet" href="./../../css/BDD/BDD.css">
    <!--class  -->
  </head>
  <body>
    <?php include './../../inc/http.inc.php'; ?>
    <?php include './../../inc/header.inc.php'; ?>
    <?php
     include './BDD.model.php';?>
     <table>
         <th>Nom du produit</th>
         <th>Nom du fourniseur</th>
         <th>Echelle</th>
         <th>Description</th>
         <th>Nombre en stock</th>
         <th>Prix</th>
       <tbody>
         <?php foreach ($allProduct as $key => $value) {
         ?>
          <tr>
            <?php foreach ($value as $key2 => $value2): ?>
              <td><?=$value2 ?></td>
            <?php endforeach; ?>

         </tr>
       <?php
     } ?>
       </tbody>
     </table>


    ?>






    <?php include './../../inc/footer.inc.php'; ?>

  </body>
  <script src="./../../js/bar/bar.js" charset="utf-8"></script>
  <script src="./../../js/main.js" charset="utf-8"></script>
</html>
