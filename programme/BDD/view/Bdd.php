<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title>BDD</title>
  </head>
  <body>
    <section>
      <h2>Tableaux</h2>
    <?php if ($allProduct) {
    ?>
      <?php include 'view/pagination.html'; ?>
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
   <?php
} else {
        ?>
     <p>Pas de produit trouvé</p>
   <?php
    } ?>
<?php include 'view/pagination.html'; ?>
</section>
<section>
<h2>Informations suplémentaires</h2>
<table>
  <thead>
    <th>Nombre de produit en vente</th>
    <th>Prix moyen</th>
  </thead>
<tbody>
  <tr>
  <?php foreach ($info as $key => $value): ?>
    <td><?=$value ?></td>
  <?php endforeach; ?>
</tr>
</tbody>

</table>
</section>
<section>
  Explication
</section>
  </body>
</html>
