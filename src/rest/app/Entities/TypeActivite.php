<?php

namespace src\Entities;

class TypeActivite 
{
    
    public $id;
    public $nom;

    /**
     * Insert query
     * @return string 
     */
    public function getInsertSQL()
    {
        $sql = "INSERT INTO typeactivite(
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
                from typeactivite
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
                from typeactivite";
        
        return $sql;
    }
    
    /**
     * Update the typeactivite based on the ID
     * @param string $content
     * @return string
     */
    public static function getUpdateSQL($id, $content)
    {
        $sql = "update typeactivite
                set content = %s
                where id = %d";
        $sql = sprintf($sql, $content, $id);
        
        return $sql;
    }
    
    /**
     * Delete typeactivite based on ID
     * @param int $id
     * @return string 
     */
    public static function getDeleteSQL($id)
    {
        $sql = "delete from typeactivite
                where id = %d";
        $sql = sprintf($sql, $id);
        
        return $sql;
    }
    
}

?>
