<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Silex\Application;
use src\Entities\Module;

require_once (BASE_DIR . '/app/Entities/Module.php');




$app->get('/modules.{format}', function() use($app){
    
    $sql = Module::findAll();
    
    $reponse = $app['db']->fetchAll($sql);
    $reponse = utf8_converter($reponse);

    return new Response(json_encode($reponse), 200); 
    
});

$app->get('/modules/{id}.{format}', function($id) use($app){
    
    $sql = Module::find($id);
    
    $reponse = $app['db']->fetchAll($sql)[0];
    $reponse = utf8_converter($reponse);


    return new Response(json_encode($reponse), 200); 
    
});

$app->post('/modules.{format}', function(Request $request) use($app){
    
    if (!$intervenant = $request->get('nom'))
    {   
        $result = array('message' => 'parametres incorrects');
        return new Response(json_encode($result), 400);
    }

    $c = new Module();
    $c->nom = $request->get('nom');
    $c->information = $request->get('information');
    $c->UV_id = $request->get('UV_id');
    $c->Departement_id = $request->get('Departement_id');
    
    $sql = $c->getInsertSQL();
    

    $app['db']->exec($sql);

    $result = array('message' => 'intervenant créée');
    return new Response(json_encode($result), 201);
    
});

$app->put('/modules/{id}.{format}', function($id) use($app){

    if (!$reponse = $app['request']->get('id'))
    {
        return new Response('Insufficient parameters', 400);
    }
    
    $sql = Module::find($id);
    
    $object_d = $app['db']->fetchAll($sql);
    
    if(empty($object_d))
    {
        return new Response(json_encode(array('message' => 'Module non trouvé')), 404);
    }
    
    $obj = new Module();
    $obj->id = $id;
    $obj->nom = $object_d[0]['nom'];
    $obj->information = $object_d[0]['information'];
    $obj->UV_id = $object_d[0]['UV_id'];
    $obj->Departement_id = $object_d[0]['Departement_id'];

    if ($nom = $app['request']->get('nom'))
    {
        $obj->nom = $nom;
    }
    if ($information = $app['request']->get('information'))
    {
        $obj->information = $information;
    }
    if ($UV_id = $app['request']->get('UV_id'))
    {
        $obj->UV_id = $UV_id;
    }
    if ($Departement_id = $app['request']->get('Departement_id'))
    {
        $obj->Departement_id = $Departement_id;
    }

    $sql = $obj->getUpdateSQL();
    $app['db']->exec($sql);
    
    return new Response(json_encode(array('message' => "Module ID: {$id} modifiée")), 200);
    
});

$app->delete('modules/{id}.{format}', function($id) use($app){
    
    $sql = Module::find($id);
    
    $intervenant = $app['db']->fetchAll($sql);
    
    
    if(empty($intervenant))
    {
        return new Response(json_encode(array('message' => 'Module non trouvé')), 404);
    }
    
    $sql = Module::getDeleteSQL($id);
    
    $app['db']->exec($sql);

    return new Response(json_encode(array('message' => "Module ID: {$id} supprimé")), 200);
    
}); 

return $app;