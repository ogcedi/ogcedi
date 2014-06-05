<?php

namespace src\Entities;

/**
 * Représentation métier d'une Personne de la base de données
 * Realise toutes les interactions SQL.
 */
class Personne 
{
    
    public $id;
    public $nom;
    public $prenom;
    

    /**
     * Insert query
     * @return string 
     */
    public function getInsertSQL()
    {
        $sql = "INSERT INTO personne(
                nom, prenom
            ) 
            VALUES ('%s', '%s')";
        
        $sql = sprintf(
            $sql, 
            $this->nom,
            $this->prenom
        );
        
        return $sql;
    }
    
    /**
     * Find a personne
     * @param int $id
     * @return string 
     */
    public static function find($id)
    {
        $sql = "select * 
                from personne
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
                from personne";
        
        return $sql;
    }
    
    /**
     * Update the personne based on the ID
     * @param string $content
     * @return string
     */
    public function getUpdateSQL()
    {

        $sql = "update personne
                set nom = %s, prenom = %s
                where id = %d";
        
        $sql = sprintf(
            $sql, 
            $this->nom,
            $this->prenom,
            $this->id
        );
        
        return $sql;
    }
    
    /**
     * Delete personne based on ID
     * @param int $id
     * @return string 
     */
    public static function getDeleteSQL($id)
    {
        $sql = "delete from personne
                where id = %d";
        $sql = sprintf($sql, $id);
        
        return $sql;
    }
    
}

?>
