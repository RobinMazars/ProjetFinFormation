<?php


var_dump("class");
/**
 *
 */
class Bdd
{
    private $_db;
    public function __construct()
    {
      require_once "../../config.php";
        try {
            $this->_db = new PDO($nameDb, $nameUser, $password);
            $this->_db->query("SET NAMES UTF8");
            $this->_db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            // echo "error";
            echo $e;
            die("error connexion");
        }
        // var_dump ($this->_db);
        return $this->_db;
    }
    public function retrieveData(string $sql)
    {
        $data=$this->_db->prepare($sql);
        $data->execute();
        $result= $data->fetchAll();
        if (count($result)==0) {
          $result=false;
        }

        return $result;
    }
}
