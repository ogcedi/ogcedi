<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Silex\Application;
use src\Entities\Personne;

require_once (BASE_DIR . '/app/Entities/Personne.php');




$app->get('/list-personne.{format}', function() use($app){
    
    $sql = Personne::findAll();
    
    $comments = $app['db']->fetchAll($sql);
    $comments = utf8_converter($comments);


    return new Response(json_encode($comments), 200); 
    
});

$app->post('/create-personne.{format}', function(Request $request) use($app){
    
    if (!$formations = $request->get('nom'))
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
    
    $personne = $app['db']->fetchAll($sql);
    
    if(empty($personne))
    {
        return new Response(json_encode(array('message' => 'Personne non trouvé')), 404);
    }
    
    $personne = new Personne();
    $personne->id = $id;

    if ($nom = $app['request']->get('nom'))
    {
        echo "coucocuoccdsjfdskfsdkj";
        $personne->nom = $nom;
    }

     if ($nom = $app['request']->get('prenom'))
    {
        $personne->prenom = $prenom;
    }


    $sql = $personne->getUpdateSQL();
    
    var_dump($personne);
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