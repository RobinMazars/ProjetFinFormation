<?php
require 'class/BDD.class.php';


$bdd=new Bdd();

$sql="SELECT `productName`,`productVendor`,`productScale`,`productDescription`,`quantityInStock`,`buyPrice`
FROM `products`LIMIT ".$nbrPage." OFFSET ".$offset." ";
$allProduct=$bdd->retrieveData($sql);

$sql="SELECT  COUNT(`productName`),AVG(`buyPrice`) FROM `products`";
$req=$bdd->retrieveData($sql);

$info=$req[0];
$info["AVG(`buyPrice`)"]=round($info["AVG(`buyPrice`)"],2);








 ?>
