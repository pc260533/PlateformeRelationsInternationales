<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

$app->get("/api/couts", function (Request $request, Response $response, $args) {
	$controleurCouts = new ControleurCouts();
	$json = json_encode($controleurCouts->chargerListeCouts());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->post("/api/couts", function (Request $request, Response $response, $args) {
	$controleurCouts = new ControleurCouts();
	$coutArray = $request->getParsedBody();

	$json = json_encode($controleurCouts->ajouterCout($coutArray)->getObjetSerializable());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->put("/api/couts", function (Request $request, Response $response, $args) {
	$controleurCouts = new ControleurCouts();
	$coutArray = $request->getParsedBody();

	$json = json_encode($controleurCouts->modifierCout($coutArray)->getObjetSerializable());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});