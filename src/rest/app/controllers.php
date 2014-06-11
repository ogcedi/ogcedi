<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Silex\Application;
use src\Entities\Formation;

require_once (BASE_DIR . '/app/Entities/Formation.php');


require_once (BASE_DIR . '/app/Entities/rest-activite.php');
require_once (BASE_DIR . '/app/Entities/rest-departement.php');
require_once (BASE_DIR . '/app/Entities/rest-intervenant.php');
require_once (BASE_DIR . '/app/Entities/rest-personne.php');


$app->get('/view-formations.{format}', function() use($app){
    
    $sql = Formation::findAll();
    
    $comments = $app['db']->fetchAll($sql);
    $comments = utf8_converter($comments);

    var_dump($comments);
    return new Response(json_encode($comments), 200); 
    
});

return $app;