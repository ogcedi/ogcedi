<?php

namespace src\Entities;

/**
 * Représentation métier d'un Departement de la base de données
 * Realise toutes les interactions SQL.
 */
class Departement 
{
    
    public $id;
    public $nom;

    /**
     * Insert query
     * @return string 
     */
    public function getInsertSQL()
    {
        $sql = "INSERT INTO departement(
                nom
            ) 
            VALUES ('%s')";
        
        $sql = sprintf(
            $sql,
            $this->nom
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
                from departement
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
                from departement";
        
        return $sql;
    }
    
    /**
     * Update the departement based on the ID
     * @param string $content
     * @return string
     */
    public function getUpdateSQL()
    {
        $sql = "update departement
                set nom = '%s'
                where id = %d";
        $sql = sprintf(
            $sql, 
            $this->nom, 
            $this->id
            );
        
        return $sql;
    }
    
    /**
     * Delete departement based on ID
     * @param int $id
     * @return string 
     */
    public static function getDeleteSQL($id)
    {
        $sql = "delete from departement
                where id = %d";
        $sql = sprintf($sql, $id);
        
        return $sql;
    }
    
}

?>
