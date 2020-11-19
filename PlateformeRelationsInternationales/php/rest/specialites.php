<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

$app->get("/api/specialites", function (Request $request, Response $response, $args) {
	$controleurSpecialite = new ControleurSpecialites();
	$json = json_encode($controleurSpecialite->chargerListeSpecialites());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});