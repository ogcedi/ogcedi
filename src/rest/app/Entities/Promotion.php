<?php

namespace src\Entities;

/**
 * Représentation métier d'une Promotion de la base de données
 * Realise toutes les interactions SQL.
 */
class Promotion 
{
    
    public $id;
    public $nom;
    public $Formation_id;
    

    /**
     * Insert query
     * @return string 
     */
    public function getInsertSQL()
    {
        $sql = "INSERT INTO promotion(
                nom, Formation_id
            ) 
            VALUES ('%s', '%s')";
        
        $sql = sprintf(
            $sql, 
            $this->nom,
            $this->Formation_id
        );
        
        return $sql;
    }
    
    /**
     * Find a row
     * @param int $id
     * @return string 
     */
    public static function find($id)
    {
        $sql = "select * 
                from promotion
                where id = %d";
        $sql = sprintf($sql, $id);
        
        return $sql;
    }
    
    /**
     * Returns all the rows
     * @return string 
     */
    public static function findAll()
    {
        $sql = "select * 
                from promotion";
        
        return $sql;
    }
    
    /**
     * Update the promotion based on the ID
     * @param string $content
     * @return string
     */
    public function getUpdateSQL()
    {

        $sql = "update promotion
                set nom = '%s', Formation_id = '%s'
                where id = %d";
        
        $sql = sprintf(
            $sql, 
            $this->nom,
            $this->Formation_id,
            $this->id
        );
        
        return $sql;
    }
    
    /**
     * Delete promotion based on ID
     * @param int $id
     * @return string 
     */
    public static function getDeleteSQL($id)
    {
        $sql = "delete from promotion
                where id = %d";
        $sql = sprintf($sql, $id);
        
        return $sql;
    }
    
}

?>
