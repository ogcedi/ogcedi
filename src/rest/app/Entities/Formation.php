<?php

namespace src\Entities;

class Formation 
{
    
    public $id;
    public $nom;

    /**
     * Insert query
     * @return string 
     */
    public function getInsertSQL()
    {
        $sql = "INSERT INTO formation(
                nom
            ) 
            VALUES (%s)";
        
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
                from formation
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
                from formation";
        
        return $sql;
    }
    
    /**
     * Update the formation based on the ID
     * @param string $content
     * @return string
     */
    public function getUpdateSQL($id, $content)
    {
        $sql = "update formation
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
     * Delete formation based on ID
     * @param int $id
     * @return string 
     */
    public static function getDeleteSQL($id)
    {
        $sql = "delete from formation
                where id = %d";
        $sql = sprintf($sql, $id);
        
        return $sql;
    }
    
}

?>
