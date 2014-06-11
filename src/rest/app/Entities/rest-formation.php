<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Silex\Application;
use src\Entities\Formation;

require_once (BASE_DIR . '/app/Entities/Formation.php');




$app->get('/formations.{format}', function() use($app){
    
    $sql = Formation::findAll();
    
    $reponse = $app['db']->fetchAll($sql);
    $reponse = utf8_converter($reponse);

    return new Response(json_encode($reponse), 200); 
    
});

$app->get('/formations/{id}.{format}', function($id) use($app){
    
    $sql = Formation::find($id);
    
    $reponse = $app['db']->fetchAll($sql)[0];
    $reponse = utf8_converter($reponse);


    return new Response(json_encode($reponse), 200); 
    
});

$app->post('/formations.{format}', function(Request $request) use($app){
    
    if (!$objet = $request->get('nom'))
    {   
        $result = array('message' => 'parametres incorrects');
        return new Response(json_encode($result), 400);
    }

    $c = new Formation();
    $c->nom = $request->get('nom');
    
    $sql = $c->getInsertSQL();
    

    $app['db']->exec($sql);

    $result = array('message' => 'Formation créée');
    return new Response(json_encode($result), 201);
    
});

$app->put('/formations/{id}.{format}', function($id) use($app){

    if (!$reponse = $app['request']->get('id'))
    {
        return new Response('Insufficient parameters', 400);
    }
    
    $sql = Formation::find($id);
    
    $object_db = $app['db']->fetchAll($sql);
    
    if(empty($object_db))
    {
        return new Response(json_encode(array('message' => 'Formation non trouvé')), 404);
    }
    
    $objet = new Formation();
    $objet->id = $id;
    $objet->nom = $object_db[0]['nom'];

    if ($nom = $app['request']->get('nom'))
    {
        $objet->nom = $nom;
    }

    $sql = $objet->getUpdateSQL();
    $app['db']->exec($sql);
    
    return new Response(json_encode(array('message' => "Formation ID: {$id} modifié")), 200);
    
});

$app->delete('formations/{id}.{format}', function($id) use($app){
    
    $sql = Formation::find($id);
    
    $objet = $app['db']->fetchAll($sql);
    
    
    if(empty($objet))
    {
        return new Response(json_encode(array('message' => 'Formation non trouvé')), 404);
    }
    
    $sql = Formation::getDeleteSQL($id);
    
    $app['db']->exec($sql);

    return new Response(json_encode(array('message' => "Formation ID: {$id} supprimé")), 200);
    
}); 

return $app;