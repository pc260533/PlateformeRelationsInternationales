<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

$app->get("/api/domainesDeCompetences", function (Request $request, Response $response, $args) {
	$controleurDomainesDeCompetences = new ControleurDomainesDeCompetences();
	$json = json_encode($controleurDomainesDeCompetences->chargerListeDomainesDeCompetences());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->post("/api/domainesDeCompetences", function (Request $request, Response $response, $args) {
	$controleurDomainesDeCompetences = new ControleurDomainesDeCompetences();
	$domaineDeCompetenceArray = $request->getParsedBody();

	$json = json_encode($controleurDomainesDeCompetences->ajouterDomaineDeCompetence($domaineDeCompetenceArray)->getObjetSerializable());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->delete("/api/domainesDeCompetences", function (Request $request, Response $response, $args) {
	$controleurDomainesDeCompetences = new ControleurDomainesDeCompetences();
	$domaineDeCompetenceArray = $request->getParsedBody();

	$json = json_encode($controleurDomainesDeCompetences->supprimerDomaineDeCompetence($domaineDeCompetenceArray)->getObjetSerializable());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->put("/api/domainesDeCompetences", function (Request $request, Response $response, $args) {
	$controleurDomainesDeCompetences = new ControleurDomainesDeCompetences();
	$domaineDeCompetenceArray = $request->getParsedBody();

	$json = json_encode($controleurDomainesDeCompetences->modifierDomaineDeCompetence($domaineDeCompetenceArray)->getObjetSerializable());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});