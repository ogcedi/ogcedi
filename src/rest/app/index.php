<?php 
// web/index.php
require_once __DIR__.'/../vendor/autoload.php';

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


$app = new Silex\Application();

/**
 * Connexion à la base de données
 * Parametres de connexion
 */
$app->register(new Silex\Provider\DoctrineServiceProvider(), array(
    'db.options' => array(
        'driver'   => 'pdo_mysql',
        'path'     => __DIR__.'/app.db',
    ),
));

// AUTHENTIFICATION
$app->post('/login', function (Request $request) use ($app){

    //$user  = $request->get('user');
    //$pass = $request->get('password');

    //Reccupération des informations en base
    $connect = false;

    $error = array('message' => '');

    if($connect){
        return $app->json($error, 404);
    }
    else{
        return $app->json($error, 403);
    }
});


$app->get('/hello/{name}', function ($name) use ($app) {
    return 'Hello '.$app->escape($name);
});

$app->get('/enseignants', function () use ($app) {

	$error = array('message' => 'The user was not found.');
	
   	return $app->json($error, 404);
});




$app->run();

?>