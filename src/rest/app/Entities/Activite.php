<?php

namespace src\Entities;

/**
 * Représentation métier d'un Intervenant de la base de données
 * Realise toutes les interactions SQL.
 */
class Activite 
{
    
    public $id;
    public $charge;
    public $nombre;
    public $information;
    public $TypeActivite_id;
    public $Intervenant_id;
    

    /**
     * Insert query
     * @return string 
     */
    public function getInsertSQL()
    {
        $sql = "INSERT INTO activite(
                charge, nombre, information, TypeActivite_id, Intervenant_id
            ) 
            VALUES ('%s', '%s', '%s', '%s', '%s')";
        
        $sql = sprintf(
            $sql, 
            $this->charge,
            $this->nombre,
            $this->information,
            $this->TypeActivite_id,
            $this->Intervenant_id
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
                from activite
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
                from activite";
        
        return $sql;
    }
    
    /**
     * Update the activite based on the ID
     * @param string $content
     * @return string
     */
    public function getUpdateSQL()
    {

        $sql = "update activite
                set charge = '%s', 
                nombre = '%s', 
                information = '%s', 
                TypeActivite_id = '%s', 
                Intervenant_id = '%s'

                where id = %d";
        
        $sql = sprintf(
            $sql, 
            $this->charge,
            $this->nombre,
            $this->information,
            $this->TypeActivite_id,
            $this->Intervenant_id,
            $this->id
        );
        
        return $sql;
    }
    
    /**
     * Delete activite based on ID
     * @param int $id
     * @return string 
     */
    public static function getDeleteSQL($id)
    {
        $sql = "delete from activite
                where id = %d";
        $sql = sprintf($sql, $id);
        
        return $sql;
    }
    
}

?>
