<?php

namespace src\Entities;

/**
 * Représentation métier d'un Intervenant de la base de données
 * Realise toutes les interactions SQL.
 */
class ActiviteModule 
{
    
    public $id;
    public $Module_id;
    public $Activite_id;
    

    /**
     * Insert query
     * @return string 
     */
    public function getInsertSQL()
    {
        $sql = "INSERT INTO activitemodule(
                Module_id, Activite_id
            ) 
            VALUES ('%s', '%s')";
        
        $sql = sprintf(
            $sql,
            $this->Module_id,
            $this->Activite_id
        );
        
        return $sql;
    }
    
    /**
     * Find a activitemodule
     * @param int $id
     * @return string 
     */
    public static function find($id)
    {
        $sql = "select * 
                from activitemodule
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
                from activitemodule";
        
        return $sql;
    }
    
    /**
     * Update the activitemodule based on the ID
     * @param string $content
     * @return string
     */
    public function getUpdateSQL()
    {

        $sql = "update activitemodule
                set Module_id = '%s', 
                Activite_id = '%s'

                where id = %d";
        
        $sql = sprintf(
            $sql,
            $this->Module_id,
            $this->Activite_id
        );
        
        return $sql;
    }
    
    /**
     * Delete activitemodule based on ID
     * @param int $id
     * @return string 
     */
    public static function getDeleteSQL($id)
    {
        $sql = "delete from activitemodule
                where id = %d";
        $sql = sprintf($sql, $id);
        
        return $sql;
    }
    
}

?>
