<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Silex\Application;
use src\Entities\Promotion;

require_once (BASE_DIR . '/app/Entities/Promotion.php');




$app->get('/promotions.{format}', function() use($app){
    
    $sql = Promotion::findAll();
    
    $reponse = $app['db']->fetchAll($sql);
    $reponse = utf8_converter($reponse);

    return new Response(json_encode($reponse), 200); 
    
});

$app->get('/promotions/{id}.{format}', function($id) use($app){
    
    $sql = Promotion::find($id);
    
    $reponse = $app['db']->fetchAll($sql)[0];
    $reponse = utf8_converter($reponse);


    return new Response(json_encode($reponse), 200); 
    
});

$app->post('/promotions.{format}', function(Request $request) use($app){
    
    if (!$objet = $request->get('nom'))
    {   
        $result = array('message' => 'parametres incorrects');
        return new Response(json_encode($result), 400);
    }

    $c = new Promotion();
    $c->nom = $request->get('nom');
    $c->Formation_id = $request->get('Formation_id');
    
    $sql = $c->getInsertSQL();
    

    $app['db']->exec($sql);

    $result = array('message' => 'Promotion créée');
    return new Response(json_encode($result), 201);
    
});

$app->put('/promotions/{id}.{format}', function($id) use($app){

    if (!$reponse = $app['request']->get('id'))
    {
        return new Response('Insufficient parameters', 400);
    }
    
    $sql = Promotion::find($id);
    
    $object_db = $app['db']->fetchAll($sql);
    
    if(empty($object_db))
    {
        return new Response(json_encode(array('message' => 'Promotion non trouvé')), 404);
    }
    
    $objet = new Promotion();
    $objet->id = $id;
    $objet->nom = $object_db[0]['nom'];
    $objet->Formation_id = $object_db[0]['Formation_id'];

    if ($nom = $app['request']->get('nom'))
    {
        $objet->nom = $nom;
    }

    if ($Formation_id = $app['request']->get('Formation_id'))
    {
        $objet->Formation_id = $Formation_id;
    }

    $sql = $objet->getUpdateSQL();
    $app['db']->exec($sql);
    
    return new Response(json_encode(array('message' => "Promotion ID: {$id} modifié")), 200);
    
});

$app->delete('promotions/{id}.{format}', function($id) use($app){
    
    $sql = Promotion::find($id);
    
    $objet = $app['db']->fetchAll($sql);
    
    
    if(empty($objet))
    {
        return new Response(json_encode(array('message' => 'Promotion non trouvé')), 404);
    }
    
    $sql = Promotion::getDeleteSQL($id);
    
    $app['db']->exec($sql);

    return new Response(json_encode(array('message' => "Promotion ID: {$id} supprimé")), 200);
    
}); 

return $app;