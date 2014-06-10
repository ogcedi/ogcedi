<?php

namespace src\Entities;

/**
 * Représentation métier d'un Intervenant de la base de données
 * Realise toutes les interactions SQL.
 */
class Intervenant 
{
    
    public $id;
    public $enseignant;
    public $thesard;
    public $etablissement;
    public $Departement_id;
    public $Intervenant_id;
    

    /**
     * Insert query
     * @return string 
     */
    public function getInsertSQL()
    {
        $sql = "INSERT INTO intervenant(
                enseignant, thesard, etablissement, Departement_id, Intervenant_id
            ) 
            VALUES ('%s', '%s', '%s', '%s', '%s')";
        
        $sql = sprintf(
            $sql, 
            $this->enseignant,
            $this->thesard,
            $this->etablissement,
            $this->Departement_id,
            $this->Intervenant_id
        );
        
        return $sql;
    }
    
    /**
     * Find a intervenant
     * @param int $id
     * @return string 
     */
    public static function find($id)
    {
        $sql = "select * 
                from intervenant
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
                from intervenant";
        
        return $sql;
    }
    
    /**
     * Update the intervenant based on the ID
     * @param string $content
     * @return string
     */
    public function getUpdateSQL()
    {

        $sql = "update intervenant
                set enseignant = '%s', 
                thesard = '%s', 
                etablissement = '%s', 
                Departement_id = '%s', 
                Intervenant_id = '%s'

                where id = %d";
        
        $sql = sprintf(
            $sql, 
            $this->enseignant,
            $this->thesard,
            $this->etablissement,
            $this->Departement_id,
            $this->Intervenant_id
        );
        
        return $sql;
    }
    
    /**
     * Delete intervenant based on ID
     * @param int $id
     * @return string 
     */
    public static function getDeleteSQL($id)
    {
        $sql = "delete from intervenant
                where id = %d";
        $sql = sprintf($sql, $id);
        
        return $sql;
    }
    
}

?>
