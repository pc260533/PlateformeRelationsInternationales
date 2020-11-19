<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

$app->get("/api/mobilites", function (Request $request, Response $response, $args) {
	$controleurMobilites = new ControleurMobilites();
	$json = json_encode($controleurMobilites->chargerListeMobilites());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});