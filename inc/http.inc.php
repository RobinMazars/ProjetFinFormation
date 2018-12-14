<?php
$root="codeOnly";
/*
 * create relative path from $root 
 * @param  string $root   name of root folder
 * @return string         relative path
 */
function createPathTo($root)
{
  $url=$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
  $url=explode("/",$url);
  $deeper=count($url)-array_search($root,$url)-1;
  $path=$root;
  for ($i=0; $i < $deeper; $i++) {
    $path="../".$path;
  }
  return $path;
}
$RelativePath=createPathTo($root)

 ?>
