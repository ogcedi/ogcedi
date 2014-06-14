<?php

/*
 * Point d'entrée de l'application
 * Redirige vers les sources dans le dossier app/
 *
 * L'utilisation des services rest utilisent les requetes HTTP suivantes :
 * GET 		: retourne les informations en bases de données
 * POST 	: ajouter une nouvelle ligne dans une table
 * PUT 		: modifier une ligne dans une table
 * DELETE 	: supprimer une ligne dans une table
 * 
 * Toutes les tables sont accessibles de la manière suivante :
 * GET 		/nomDeLaTables.json 		-> retourne la liste des élements de la table
 * GET 		/nomDeLaTables/id.json 		-> retourne l'élément de la table dont l'id est spécifié
 * POST 	/nomDeLaTables.json 		-> ajoute l'élément dont les informations sont passé dans la requete HTTP
 * PUT 		/nomDeLaTables/id.json 		-> modifie l'élément dont l'id est spécifié
 * DELETE 	/nomDeLaTables/id.json 		-> supprimer l'éléménet dont l'id est spécifié
 */
define('BASE_DIR', realpath(__DIR__ . '/..'));


$app = require_once (BASE_DIR . '/app/app.php');


$app['debug'] = true;
$app['auth.user'] = AUTH_USER;
$app['auth.pass'] = AUTH_PASS;

$app->run();