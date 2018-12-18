<?php
require './../../class/BDD.class.php';
$bdd=new Bdd();
$sql="SELECT `productName`,`productVendor`,`productScale`,`productDescription`,`quantityInStock`,`buyPrice` FROM `products`";
$allProduct=$bdd->retrieveData($sql);









 ?>
