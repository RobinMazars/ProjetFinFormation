<?php
require './../../class/BDD.class.php';

$nbrPage=5;


if (isset($_GET['page'])) {
  var_dump($_GET['page']);
  $page=(int)htmlspecialchars($_GET['page']);
  $offset=($page-1)*$nbrPage;

}
else {
  $page=1;
  $offset=0;
  //// TODO: redirection vers ?page=0
}
var_dump($offset);
$bdd=new Bdd();

$sql="SELECT `productName`,`productVendor`,`productScale`,`productDescription`,`quantityInStock`,`buyPrice`
FROM `products`LIMIT ".$nbrPage." OFFSET ".$offset." ";
var_dump($sql);
$allProduct=$bdd->retrieveData($sql);










 ?>
