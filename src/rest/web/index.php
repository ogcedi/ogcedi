<?php

/*
 * Point d'entrée de l'application
 * Redirige vers les sources dans le dossier app/
 */
define('BASE_DIR', realpath(__DIR__ . '/..'));


$app = require_once (BASE_DIR . '/app/app.php');


$app['debug'] = true;
$app['auth.user'] = AUTH_USER;
$app['auth.pass'] = AUTH_PASS;

$app->run();