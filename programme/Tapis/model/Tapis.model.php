<?php
require 'AbstractObject.model.php';
/**
 *
 */
class Tapis extends AbstractObject
{

  public $_def='<defs>
  <pattern id="imgpattern" x="0" y="0" width="1" height="1">
    <image width="150" height="150"
           xlink:href="https://upload.wikimedia.org/wikipedia/commons/4/41/IMG_Mali_Roundel.svg"/>
  </pattern>
</defs>';

  function __construct()
  {
    parent::__construct(1,1,1);
  }
  public static function affDef()
  {
    echo $_def;
  }
}
 ?>
