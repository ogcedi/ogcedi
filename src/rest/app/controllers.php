<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Silex\Application;
use src\Entities\Formation;

require_once (BASE_DIR . '/app/Entities/Formation.php');


require_once (BASE_DIR . '/app/Entities/rest-activite.php');
require_once (BASE_DIR . '/app/Entities/rest-activitemodule.php');
require_once (BASE_DIR . '/app/Entities/rest-departement.php');
require_once (BASE_DIR . '/app/Entities/rest-formation.php');
require_once (BASE_DIR . '/app/Entities/rest-intervenant.php');
require_once (BASE_DIR . '/app/Entities/rest-module.php');
require_once (BASE_DIR . '/app/Entities/rest-personne.php');
require_once (BASE_DIR . '/app/Entities/rest-promotion.php');
require_once (BASE_DIR . '/app/Entities/rest-typeactivite.php');
require_once (BASE_DIR . '/app/Entities/rest-uv.php');



return $app;