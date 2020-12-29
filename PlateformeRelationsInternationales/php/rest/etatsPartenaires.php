<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

$app->get("/api/etatsPartenaires", function (Request $request, Response $response, $args) {
	$controleurEtatsPartenaires = new ControleurEtatsPartenaires();
	$json = json_encode($controleurEtatsPartenaires->chargerListeEtatsPartenaires());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});