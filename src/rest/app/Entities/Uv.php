<?php

namespace src\Entities;

/**
 * Représentation métier d'une Uv de la base de données
 * Realise toutes les interactions SQL.
 */
class Uv 
{
    
    public $id;
    public $nom;
    public $Promotion_id;
    

    /**
     * Insert query
     * @return string 
     */
    public function getInsertSQL()
    {
        $sql = "INSERT INTO uv(
                nom, Promotion_id
            ) 
            VALUES ('%s', '%s')";
        
        $sql = sprintf(
            $sql, 
            $this->nom,
            $this->Promotion_id
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
                from uv
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
                from uv";
        
        return $sql;
    }
    
    /**
     * Update the Uv based on the ID
     * @param string $content
     * @return string
     */
    public function getUpdateSQL()
    {

        $sql = "update uv
                set nom = '%s', Promotion_id = '%s'
                where id = %d";
        
        $sql = sprintf(
            $sql, 
            $this->nom,
            $this->Promotion_id,
            $this->id
        );
        
        return $sql;
    }
    
    /**
     * Delete Uv based on ID
     * @param int $id
     * @return string 
     */
    public static function getDeleteSQL($id)
    {
        $sql = "delete from uv
                where id = %d";
        $sql = sprintf($sql, $id);
        
        return $sql;
    }
    
}

?>
