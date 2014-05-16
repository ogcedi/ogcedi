<?php 
// web/index.php
require_once __DIR__.'/../vendor/autoload.php';

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

require_once (BASE_DIR . '/util.php');

$app = new Silex\Application();

/**
 * Connexion à la base de données
 * Parametres de connexion
 */
$app->register(new Silex\Provider\DoctrineServiceProvider(), array(
    'db.options' => array(
        'driver'   => 'pdo_mysql',
        'host'      => 'localhost',
        'dbname'    => 'ogcedi',
        'user'      => 'root',
        'password'  => '',
        'charset'   => 'utf8', 
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


//LECTURE DES BASES DE DONNES

$app->get('/formations', function () use ($app) {


    $sql = "SELECT * FROM formation";
    $stmt = $app['db']->prepare($sql);
    $stmt->execute();
    $formation = $stmt->fetchAll();

    $users = $app['db']->fetchAll('SELECT * FROM formation');
    $users = utf8_converter($users);
        
        var_dump($users);
    //$comments = $app['db']->fetchAll($sql);
    //$comments = utf8_converter($post);

    return new Response(json_encode($users), 200); 

});


$app->get('/enseignants', function () use ($app) {

	$error = array('message' => 'The user was not found.');
	
   	return $app->json($error, 404);
});






$app->run();

?>