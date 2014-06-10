<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Silex\Application;
use src\Entities\Formation;

require_once (BASE_DIR . '/app/Entities/Formation.php');
require_once (BASE_DIR . '/app/Entities/rest-personne.php');
require_once (BASE_DIR . '/app/Entities/rest-departement.php');


$app->get('/view-formations.{format}', function() use($app){
    
    $sql = Formation::findAll();
    
    $comments = $app['db']->fetchAll($sql);
    $comments = utf8_converter($comments);

    var_dump($comments);
    return new Response(json_encode($comments), 200); 
    
});

$app->post('/create-formations.{format}', function(Request $request) use($app){
    
    if (!$formations = $request->get('formations'))
    {
        return new Response('Insufficient parameters', 400);
    }

    $c = new Formation();
    $c->nom = $app['db']->quote($comment['nom']);
    
    $sql = $c->getInsertSQL();
    
    $app['db']->exec($sql);

    return new Response('Comment created', 201);
    
});

$app->put('update-formations/{id}.{format}', function($id) use($app){

    if (!$formations = $app['request']->get('formations'))
    {
        return new Response('Insufficient parameters', 400);
    }
    
    $sql = Formation::find($id);
    
    $formations = $app['db']->fetchAll($sql);
    
    if(empty($formations))
    {
        return new Response('Formations not found.', 404);
    }
    

    $content = $app['db']->quote($formations['content']);
    $sql = Formations::getUpdateSQL($id, $content);
    
    
    $app['db']->exec($sql);
    
    return new Response("Formations with ID: {$id} updated", 200);
    
});

$app->delete('delete-formations/{id}.{format}', function($id) use($app){
    
    $sql = Formation::find($id);
    
    $formations = $app['db']->fetchAll($sql);
    
    
    if(empty($formations))
    {
        return new Response('Formations not found.', 404);
    }
    
    $sql = formation::getDeleteSQL($id);
    
    $app['db']->exec($sql);

    return new Response("Formations with ID: {$id} deleted", 200);
    
}); 

return $app;