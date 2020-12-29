<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

$app->get("/api/voeux", function (Request $request, Response $response, $args) {
	$controleurVoeux = new ControleurVoeux();
	$json = json_encode($controleurVoeux->chargerListeVoeux());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});