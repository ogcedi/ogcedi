<?php 
// web/index.php
require_once __DIR__.'/../vendor/autoload.php';

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


$app = new Silex\Application();

$app->register(new Silex\Provider\DoctrineServiceProvider(), array(
    'db.options' => array(
        'driver'   => 'pdo_mysql',
        'path'     => __DIR__.'/app.db',
    ),
));

$app->get('/hello/{name}', function ($name) use ($app) {
    return 'Hello '.$app->escape($name);
});

$app->get('/enseignants', function () use ($app) {

	$error = array('message' => 'The user was not found.');
	
   	return $app->json($error, 404);
});


$app->post('/login', function (Request $request) {

    $user = $request->get('user');
    $pass = $request->get('password');


    return $app->json($error, 404);
});

$app->run();

?>