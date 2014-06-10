<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Silex\Application;
use src\Entities\Departement;

require_once (BASE_DIR . '/app/Entities/Departement.php');




$app->get('/list-departement.{format}', function() use($app){
    
    $sql = Departement::findAll();
    
    $reponse = $app['db']->fetchAll($sql);
    $reponse = utf8_converter($reponse);


    return new Response(json_encode($reponse), 200); 
    
});

$app->get('/get-departement/{id}.{format}', function($id) use($app){
    
    $sql = Departement::find($id);
    
    $reponse = $app['db']->fetchAll($sql);
    $reponse = utf8_converter($reponse);


    return new Response(json_encode($reponse), 200); 
    
});

$app->post('/create-departement.{format}', function(Request $request) use($app){
    
    if (!$departement = $request->get('nom'))
    {   
        $result = array('message' => 'parametres incorrects');
        return new Response(json_encode($result), 400);
    }

    $c = new Departement();
    $c->nom = $request->get('nom');
    
    $sql = $c->getInsertSQL();
    

    $app['db']->exec($sql);

    $result = array('message' => 'departement créé');
    return new Response(json_encode($result), 201);
    
});

$app->put('/update-departement/{id}.{format}', function($id) use($app){

    if (!$reponse = $app['request']->get('id'))
    {
        return new Response('Insufficient parameters', 400);
    }
    
    $sql = Departement::find($id);
    
    $departement_db = $app['db']->fetchAll($sql);
    
    if(empty($departement_db))
    {
        return new Response(json_encode(array('message' => 'Departement non trouvé')), 404);
    }
    
    $departement = new Departement();
    $departement->id = $id;
    $departement->nom = $departement_db[0]['nom'];

    if ($nom = $app['request']->get('nom'))
    {
        $departement->nom = $nom;
    }
 

    $sql = $departement->getUpdateSQL();
    $app['db']->exec($sql);
    
    return new Response(json_encode(array('message' => "Departement ID: {$id} modifié")), 200);
    
});

$app->delete('delete-departement/{id}.{format}', function($id) use($app){
    
    $sql = Departement::find($id);
    
    $departement = $app['db']->fetchAll($sql);
    
    
    if(empty($departement))
    {
        return new Response(json_encode(array('message' => 'Departement non trouvé')), 404);
    }
    
    $sql = Departement::getDeleteSQL($id);
    
    $app['db']->exec($sql);

    return new Response(json_encode(array('message' => "Departement with ID: {$id} deleted")), 200);
    return new Response(json_encode(array('message' => "Departement with ID: {$id} deleted")), 200);
    
}); 

return $app;