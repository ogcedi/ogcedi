<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Silex\Application;
use src\Entities\Intervenant;

require_once (BASE_DIR . '/app/Entities/Intervenant.php');




$app->get('/list-intervenant.{format}', function() use($app){
    
    $sql = Intervenant::findAll();
    
    $reponse = $app['db']->fetchAll($sql);
    $reponse = utf8_converter($reponse);


    return new Response(json_encode($reponse), 200); 
    
});

$app->get('/get-intervenant/{id}.{format}', function($id) use($app){
    
    $sql = Intervenant::find($id);
    
    $reponse = $app['db']->fetchAll($sql);
    $reponse = utf8_converter($reponse);


    return new Response(json_encode($reponse), 200); 
    
});

$app->post('/create-intervenant.{format}', function(Request $request) use($app){
    
    if (!$intervenant = $request->get('nom'))
    {   
        $result = array('message' => 'parametres incorrects');
        return new Response(json_encode($result), 400);
    }

    $c = new Intervenant();
    $c->nom = $request->get('nom');
    $c->prenom = $request->get('prenom');
    
    $sql = $c->getInsertSQL();
    

    $app['db']->exec($sql);

    $result = array('message' => 'intervenant créée');
    return new Response(json_encode($result), 201);
    
});

$app->put('/update-intervenant/{id}.{format}', function($id) use($app){

    if (!$reponse = $app['request']->get('id'))
    {
        return new Response('Insufficient parameters', 400);
    }
    
    $sql = Intervenant::find($id);
    
    $intervenant_db = $app['db']->fetchAll($sql);
    
    if(empty($intervenant_db))
    {
        return new Response(json_encode(array('message' => 'Intervenant non trouvé')), 404);
    }
    
    $intervenant = new Intervenant();
    $intervenant->id = $id;
    $intervenant->nom = $intervenant_db[0]['nom'];
    $intervenant->prenom = $intervenant_db[0]['prenom'];

    if ($nom = $app['request']->get('nom'))
    {
        $intervenant->nom = $nom;
    }


    if ($prenom = $app['request']->get('prenom'))
    {
        $intervenant->prenom = $prenom;
    }
 

    $sql = $intervenant->getUpdateSQL();
    $app['db']->exec($sql);
    
    return new Response(json_encode(array('message' => "Intervenant ID: {$id} modifiée")), 200);
    
});

$app->delete('delete-intervenant/{id}.{format}', function($id) use($app){
    
    $sql = Intervenant::find($id);
    
    $intervenant = $app['db']->fetchAll($sql);
    
    
    if(empty($intervenant))
    {
        return new Response(json_encode(array('message' => 'Intervenant non trouvé')), 404);
    }
    
    $sql = Intervenant::getDeleteSQL($id);
    
    $app['db']->exec($sql);

    return new Response(json_encode(array('message' => "Intervenant ID: {$id} supprimé")), 200);
    
}); 

return $app;