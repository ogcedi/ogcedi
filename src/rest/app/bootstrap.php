<?php

require_once __DIR__.'/../vendor/autoload.php';

$app = new Silex\Application();

$app->register(new Silex\Provider\DoctrineServiceProvider(), array(
    'db.options'        => array(
        'driver'        => DB_DRIVER,
        'host'          => DB_HOST,
        'dbname'        => DB_NAME,
        'user'          => DB_USER,
        'password'      => DB_PASS,
        'charset'   => 'utf8', 
    ),
));