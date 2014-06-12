<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Silex\Application;
use src\Entities\Intervenant;

require_once (BASE_DIR . '/app/Entities/Intervenant.php');




$app->get('/intervenants.{format}', function() use($app){
    
    $sql = Intervenant::findAll();
    
    $reponse = $app['db']->fetchAll($sql);
    $reponse = utf8_converter($reponse);

    return new Response(json_encode($reponse), 200); 
    
});

$app->get('/intervenants/{id}.{format}', function($id) use($app){
    
    $sql = Intervenant::find($id);
    
    $reponse = $app['db']->fetchAll($sql)[0];
    $reponse = utf8_converter($reponse);


    return new Response(json_encode($reponse), 200); 
    
});

$app->post('/intervenants.{format}', function(Request $request) use($app){
    
    if (!$intervenant = $request->get('Personne_id'))
    {   
        $result = array('message' => 'parametres incorrects');
        return new Response(json_encode($result), 400);
    }

    $c = new Intervenant();
    $c->enseignant = $request->get('enseignant');
    $c->thesard = $request->get('thesard');
    $c->etablissement = $request->get('etablissement');
    $c->Departement_id = $request->get('Departement_id');
    $c->Personne_id = $request->get('Personne_id');
    
    $sql = $c->getInsertSQL();
    

    $app['db']->exec($sql);

    $result = array('message' => 'intervenant créée');
    return new Response(json_encode($result), 201);
    
});

$app->put('/intervenants/{id}.{format}', function($id) use($app){

    if (!$reponse = $app['request']->get('id'))
    {
        return new Response('Insufficient parameters', 400);
    }
    
    $sql = Intervenant::find($id);
    
    $object_d = $app['db']->fetchAll($sql);
    
    if(empty($object_d))
    {
        return new Response(json_encode(array('message' => 'Intervenant non trouvé')), 404);
    }
    
    $obj = new Intervenant();
    $obj->id = $id;
    $obj->enseignant = $object_d[0]['enseignant'];
    $obj->thesard = $object_d[0]['thesard'];
    $obj->etablissement = $object_d[0]['etablissement'];
    $obj->Departement_id = $object_d[0]['Departement_id'];
    $obj->Personne_id = $object_d[0]['Personne_id'];

    if ($enseignant = $app['request']->get('enseignant'))
    {
        $obj->enseignant = $enseignant;
    }
    if ($thesard = $app['request']->get('thesard'))
    {
        $obj->thesard = $thesard;
    }
    if ($etablissement = $app['request']->get('etablissement'))
    {
        $obj->etablissement = $etablissement;
    }
    if ($Departement_id = $app['request']->get('Departement_id'))
    {
        $obj->Departement_id = $Departement_id;
    }
    if ($Personne_id = $app['request']->get('Personne_id'))
    {
        $obj->Personne_id = $Personne_id;
    }
 

    $sql = $obj->getUpdateSQL();
    $app['db']->exec($sql);
    
    return new Response(json_encode(array('message' => "Intervenant ID: {$id} modifiée")), 200);
    
});

$app->delete('intervenants/{id}.{format}', function($id) use($app){
    
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