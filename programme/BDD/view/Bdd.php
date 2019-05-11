<?=$sql ?>
  <body>
    <section>
      <h2>Tableaux</h2>

      <form id="rechercheBar" action="./BddController.php" method="post">
        <label for="recherche">Rechercher un produit:   </label>
        <input type="text" name="recherche" value="" required>
        <input type="submit" name="submitRecherche" value="Enter">
      </form>
    <?php if ($allProduct) {
      if ($PaginationEnable){
        include 'view/pagination.html';
      }
      else {
        ?>
        <a href="./BddController.php">Effacer recherche</a>
        <?php
      }

    ?>

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
     <a href="./BddController.php">Retour</a>
   <?php
    } ?>
<?php if ($PaginationEnable) {
  include 'view/pagination.html';
} ?>
</section>
<?php if(isset($info)): ?>
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

<?php endif; ?>

<section>
  Explication
</section>
  </body>
