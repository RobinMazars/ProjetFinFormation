<?php
require 'class/BDD.class.php';
$bdd=new Bdd();

$sql="SELECT `productName`,`productVendor`,`productScale`,`productDescription`,`quantityInStock`,`buyPrice`
FROM `products` WHERE `productName` LIKE '%".$recherche."%'   LIMIT ".$nbrPage." OFFSET ".$offset." ";
$allProduct=$bdd->retrieveData($sql);







 ?>
