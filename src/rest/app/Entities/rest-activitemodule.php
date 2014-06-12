<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Silex\Application;
use src\Entities\ActiviteModule;

require_once (BASE_DIR . '/app/Entities/ActiviteModule.php');




$app->get('/activitemodules.{format}', function() use($app){
    
    $sql = ActiviteModule::findAll();
    
    $reponse = $app['db']->fetchAll($sql);
    $reponse = utf8_converter($reponse);

    return new Response(json_encode($reponse), 200); 
    
});

$app->get('/activitemodules/{id}.{format}', function($id) use($app){
    
    $sql = ActiviteModule::find($id);
    
    $reponse = $app['db']->fetchAll($sql)[0];
    $reponse = utf8_converter($reponse);


    return new Response(json_encode($reponse), 200); 
    
});

$app->post('/activitemodules.{format}', function(Request $request) use($app){
    
    if (!$objet = $request->get('nom'))
    {   
        $result = array('message' => 'parametres incorrects');
        return new Response(json_encode($result), 400);
    }

    $c = new ActiviteModule();
    $c->Module_id = $request->get('Module_id');
    $c->Activite_id = $request->get('Activite_id');
    
    $sql = $c->getInsertSQL();
    

    $app['db']->exec($sql);

    $result = array('message' => 'activite créée');
    return new Response(json_encode($result), 201);
    
});

$app->put('/activitemodules/{id}.{format}', function($id) use($app){

    if (!$reponse = $app['request']->get('id'))
    {
        return new Response('Insufficient parameters', 400);
    }
    
    $sql = ActiviteModule::find($id);
    
    $object_db = $app['db']->fetchAll($sql);
    
    if(empty($object_db))
    {
        return new Response(json_encode(array('message' => 'ActiviteModule non trouvé')), 404);
    }
    
    $objet = new ActiviteModule();
    $objet->id = $id;
    $objet->Module_id = $object_db[0]['Module_id'];
    $objet->Activite_id = $object_db[0]['Activite_id'];

    if ($Module_id = $app['request']->get('Module_id'))
    {
        $objet->Module_id = $Module_id;
    }

    if ($Activite_id = $app['request']->get('Activite_id'))
    {
        $objet->Activite_id = $Activite_id;
    }

    $sql = $objet->getUpdateSQL();
    $app['db']->exec($sql);
    
    return new Response(json_encode(array('message' => "ActiviteModule ID: {$id} modifié")), 200);
    
});

$app->delete('activitemodules/{id}.{format}', function($id) use($app){
    
    $sql = ActiviteModule::find($id);
    
    $objet = $app['db']->fetchAll($sql);
    
    
    if(empty($objet))
    {
        return new Response(json_encode(array('message' => 'ActiviteModule non trouvé')), 404);
    }
    
    $sql = ActiviteModule::getDeleteSQL($id);
    
    $app['db']->exec($sql);

    return new Response(json_encode(array('message' => "ActiviteModule ID: {$id} supprimé")), 200);
    
}); 

return $app;