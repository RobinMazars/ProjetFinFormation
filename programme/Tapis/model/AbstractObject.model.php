<?php
/**
 *
 */

abstract class AbstractObject
{
  private $_img;
  private $_pos;
  private $_size;
  private $_svg;
  function __construct($img,$pos,$size)
  {
    $this->_img=$img;
    $this->_pos=$pos;
    $this->_size=$size;
    $this->_svg='<rect id"rect" x="0" y="50" width="450" height="450"
   style="fill:url(#imgpattern)" />';
  }

  public function aff(){
    echo $this->_svg;
  }

}







 ?>
