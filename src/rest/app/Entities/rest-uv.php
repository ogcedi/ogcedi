<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Silex\Application;
use src\Entities\Uv;

require_once (BASE_DIR . '/app/Entities/Uv.php');




$app->get('/uvs.{format}', function() use($app){
    
    $sql = Uv::findAll();
    
    $reponse = $app['db']->fetchAll($sql);
    $reponse = utf8_converter($reponse);

    return new Response(json_encode($reponse), 200); 
    
});

$app->get('/uvs/{id}.{format}', function($id) use($app){
    
    $sql = Uv::find($id);
    
    $reponse = $app['db']->fetchAll($sql)[0];
    $reponse = utf8_converter($reponse);


    return new Response(json_encode($reponse), 200); 
    
});

$app->post('/uvs.{format}', function(Request $request) use($app){
    
    if (!$objet = $request->get('nom'))
    {   
        $result = array('message' => 'parametres incorrects');
        return new Response(json_encode($result), 400);
    }

    $c = new Uv();
    $c->nom = $request->get('nom');
    $c->Promotion_id = $request->get('Promotion_id');
    
    $sql = $c->getInsertSQL();
    

    $app['db']->exec($sql);

    $result = array('message' => 'Uv créée');
    return new Response(json_encode($result), 201);
    
});

$app->put('/uvs/{id}.{format}', function($id) use($app){

    if (!$reponse = $app['request']->get('id'))
    {
        return new Response('Insufficient parameters', 400);
    }
    
    $sql = Uv::find($id);
    
    $object_db = $app['db']->fetchAll($sql);
    
    if(empty($object_db))
    {
        return new Response(json_encode(array('message' => 'Uv non trouvé')), 404);
    }
    
    $objet = new Uv();
    $objet->id = $id;
    $objet->nom = $object_db[0]['nom'];
    $objet->Promotion_id = $object_db[0]['Promotion_id'];

    if ($nom = $app['request']->get('nom'))
    {
        $objet->nom = $nom;
    }

    if ($Promotion_id = $app['request']->get('Promotion_id'))
    {
        $objet->Promotion_id = $Promotion_id;
    }

    $sql = $objet->getUpdateSQL();
    $app['db']->exec($sql);
    
    return new Response(json_encode(array('message' => "Uv ID: {$id} modifié")), 200);
    
});

$app->delete('uvs/{id}.{format}', function($id) use($app){
    
    $sql = Uv::find($id);
    
    $objet = $app['db']->fetchAll($sql);
    
    
    if(empty($objet))
    {
        return new Response(json_encode(array('message' => 'Uv non trouvé')), 404);
    }
    
    $sql = Uv::getDeleteSQL($id);
    
    $app['db']->exec($sql);

    return new Response(json_encode(array('message' => "Uv ID: {$id} supprimé")), 200);
    
}); 

return $app;