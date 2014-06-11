<?php

namespace src\Entities;

/**
 * Représentation métier d'un Module de la base de données
 * Realise toutes les interactions SQL.
 */
class Module 
{
    
    public $id;
    public $nom;
    public $information;
    public $UV_id;
    public $Departement_id;
    

    /**
     * Insert query
     * @return string 
     */
    public function getInsertSQL()
    {
        $sql = "INSERT INTO module(
                nom, information, UV_id, Departement_id
            ) 
            VALUES ('%s', '%s', '%s', '%s')";
        
        $sql = sprintf(
            $sql, 
            $this->nom,
            $this->information,
            $this->UV_id,
            $this->Departement_id
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
                from module
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
                from module";
        
        return $sql;
    }
    
    /**
     * Update the Module based on the ID
     * @param string $content
     * @return string
     */
    public function getUpdateSQL()
    {

        $sql = "update module
                set nom = '%s', 
                information = '%s',
                UV_id = '%s', 
                Departement_id = '%s'

                where id = %d";
        
        $sql = sprintf(
            $sql, 
            $this->nom,
            $this->information,
            $this->UV_id,
            $this->Departement_id
        );
        
        return $sql;
    }
    
    /**
     * Delete Module based on ID
     * @param int $id
     * @return string 
     */
    public static function getDeleteSQL($id)
    {
        $sql = "delete from module
                where id = %d";
        $sql = sprintf($sql, $id);
        
        return $sql;
    }
    
}

?>
