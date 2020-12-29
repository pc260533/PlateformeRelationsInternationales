<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

$app->get("/api/coordinateurs", function (Request $request, Response $response, $args) {
	$controleurCoordinateurs = new ControleurCoordinateurs();
	$json = json_encode($controleurCoordinateurs->chargerListeCoordinateurs());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->post("/api/coordinateurs", function (Request $request, Response $response, $args) {
	$controleurCoordinateurs = new ControleurCoordinateurs();
	$coordinateurArray = $request->getParsedBody();

	$json = json_encode($controleurCoordinateurs->ajouterCoordinateur($coordinateurArray)->getObjetSerializable());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->delete("/api/coordinateurs", function (Request $request, Response $response, $args) {
	$controleurCoordinateurs = new ControleurCoordinateurs();
	$coordinateurArray = $request->getParsedBody();

	$json = json_encode($controleurCoordinateurs->supprimerCoordinateur($coordinateurArray)->getObjetSerializable());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->put("/api/coordinateurs", function (Request $request, Response $response, $args) {
	$controleurCoordinateurs = new ControleurCoordinateurs();
	$coordinateurArray = $request->getParsedBody();

	$json = json_encode($controleurCoordinateurs->modifierCoordinateur($coordinateurArray)->getObjetSerializable());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});