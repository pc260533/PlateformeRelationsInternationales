<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

$app->get("/api/aidesfinancieres", function (Request $request, Response $response, $args) {
	$controleurAidesFinancieres = new ControleurAidesFinancieres();
	$json = json_encode($controleurAidesFinancieres->chargerListeAidesFinancieres());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->post("/api/aidesfinancieres", function (Request $request, Response $response, $args) {
	$controleurAidesFinancieres = new ControleurAidesFinancieres();
	$aideFinanciereArray = $request->getParsedBody();

	$json = json_encode($controleurAidesFinancieres->ajouterAideFinanciere($aideFinanciereArray)->getObjetSerializable());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->delete("/api/aidesfinancieres", function (Request $request, Response $response, $args) {
	$controleurAidesFinancieres = new ControleurAidesFinancieres();
	$aideFinanciereArray = $request->getParsedBody();

	$json = json_encode($controleurAidesFinancieres->supprimerAideFinanciere($aideFinanciereArray)->getObjetSerializable());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->put("/api/aidesfinancieres", function (Request $request, Response $response, $args) {
	$controleurAidesFinancieres = new ControleurAidesFinancieres();
	$aideFinanciereArray = $request->getParsedBody();

	$json = json_encode($controleurAidesFinancieres->modifierAideFinanciere($aideFinanciereArray)->getObjetSerializable());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});