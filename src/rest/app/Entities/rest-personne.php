<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Silex\Application;
use src\Entities\Personne;

require_once (BASE_DIR . '/app/Entities/Personne.php');




$app->get('/list-personne.{format}', function() use($app){
    
    $sql = Personne::findAll();
    
    $reponse = $app['db']->fetchAll($sql);
    $reponse = utf8_converter($reponse);

    return new Response(json_encode($reponse), 200); 
    
});

$app->get('/get-personne/{id}.{format}', function($id) use($app){
    
    $sql = Personne::find($id);
    
    $reponse = $app['db']->fetchAll($sql);
    $reponse = utf8_converter($reponse);


    return new Response(json_encode($reponse), 200); 
    
});

$app->post('/create-personne.{format}', function(Request $request) use($app){
    
    if (!$personne = $request->get('nom'))
    {   
        $result = array('message' => 'parametres incorrects');
        return new Response(json_encode($result), 400);
    }

    $c = new Personne();
    $c->nom = $request->get('nom');
    $c->prenom = $request->get('prenom');
    
    $sql = $c->getInsertSQL();
    

    $app['db']->exec($sql);

    $result = array('message' => 'personne créée');
    return new Response(json_encode($result), 201);
    
});

$app->put('/update-personne/{id}.{format}', function($id) use($app){

    if (!$reponse = $app['request']->get('id'))
    {
        return new Response('Insufficient parameters', 400);
    }
    
    $sql = Personne::find($id);
    
    $personne_db = $app['db']->fetchAll($sql);
    
    if(empty($personne_db))
    {
        return new Response(json_encode(array('message' => 'Personne non trouvé')), 404);
    }
    
    $personne = new Personne();
    $personne->id = $id;
    $personne->nom = $personne_db[0]['nom'];
    $personne->prenom = $personne_db[0]['prenom'];

    if ($nom = $app['request']->get('nom'))
    {
        $personne->nom = $nom;
    }


    if ($prenom = $app['request']->get('prenom'))
    {
        $personne->prenom = $prenom;
    }
 

    $sql = $personne->getUpdateSQL();
    $app['db']->exec($sql);
    
    return new Response(json_encode(array('message' => "Personne ID: {$id} modifiée")), 200);
    
});

$app->delete('delete-personne/{id}.{format}', function($id) use($app){
    
    $sql = Personne::find($id);
    
    $personne = $app['db']->fetchAll($sql);
    
    
    if(empty($personne))
    {
        return new Response(json_encode(array('message' => 'Personne non trouvé')), 404);
    }
    
    $sql = Personne::getDeleteSQL($id);
    
    $app['db']->exec($sql);

    return new Response(json_encode(array('message' => "Formations with ID: {$id} deleted")), 200);
    
}); 

return $app;