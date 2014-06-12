<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Silex\Application;
use src\Entities\Activite;

require_once (BASE_DIR . '/app/Entities/Activite.php');




$app->get('/activites.{format}', function() use($app){
    
    $sql = Activite::findAll();
    
    $reponse = $app['db']->fetchAll($sql);
    $reponse = utf8_converter($reponse);

    return new Response(json_encode($reponse), 200); 
    
});

$app->get('/activites/{id}.{format}', function($id) use($app){
    
    $sql = Activite::find($id);
    
    $reponse = $app['db']->fetchAll($sql)[0];
    $reponse = utf8_converter($reponse);


    return new Response(json_encode($reponse), 200); 
    
});

$app->post('/activites.{format}', function(Request $request) use($app){
    
    if (!$objet = $request->get('nom'))
    {   
        $result = array('message' => 'parametres incorrects');
        return new Response(json_encode($result), 400);
    }

    $c = new Activite();
    $c->charge = $request->get('charge');
    $c->nombre = $request->get('nombre');
    $c->information = $request->get('information');
    $c->TypeActivite_id = $request->get('TypeActivite_id');
    $c->Intervenant_id = $request->get('Intervenant_id');
    
    $sql = $c->getInsertSQL();
    

    $app['db']->exec($sql);

    $result = array('message' => 'activite créée');
    return new Response(json_encode($result), 201);
    
});

$app->put('/activites/{id}.{format}', function($id) use($app){

    if (!$reponse = $app['request']->get('id'))
    {
        return new Response('Insufficient parameters', 400);
    }
    
    $sql = Activite::find($id);
    
    $object_db = $app['db']->fetchAll($sql);
    
    if(empty($object_db))
    {
        return new Response(json_encode(array('message' => 'Activite non trouvé')), 404);
    }
    
    $objet = new Activite();
    $objet->id = $id;
    $objet->charge = $object_db[0]['charge'];
    $objet->nombre = $object_db[0]['nombre'];
    $objet->information = $object_db[0]['information'];
    $objet->TypeActivite_id = $object_db[0]['TypeActivite_id'];
    $objet->Intervenant_id = $object_db[0]['Intervenant_id'];


    if ($charge = $app['request']->get('charge'))
    {
        $objet->charge = $charge;
    }

    if ($nombre = $app['request']->get('nombre'))
    {
        $objet->nombre = $nombre;
    }

    if ($information = $app['request']->get('information'))
    {
        $objet->information = $information;
    }

    if ($TypeActivite_id = $app['request']->get('TypeActivite_id'))
    {
        $objet->TypeActivite_id = $TypeActivite_id;
    }

    if ($Intervenant_id = $app['request']->get('Intervenant_id'))
    {
        $objet->Intervenant_id = $Intervenant_id;
    }

    $sql = $objet->getUpdateSQL();
    $app['db']->exec($sql);
    
    return new Response(json_encode(array('message' => "Activite ID: {$id} modifié")), 200);
    
});

$app->delete('activites/{id}.{format}', function($id) use($app){
    
    $sql = Activite::find($id);
    
    $objet = $app['db']->fetchAll($sql);
    
    
    if(empty($objet))
    {
        return new Response(json_encode(array('message' => 'Activite non trouvé')), 404);
    }
    
    $sql = Activite::getDeleteSQL($id);
    
    $app['db']->exec($sql);

    return new Response(json_encode(array('message' => "Activite ID: {$id} supprimé")), 200);
    
}); 

return $app;