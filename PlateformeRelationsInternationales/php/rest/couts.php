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
	$controleurAuthentification = new ControleurAuthentification();
	$utilisateurArray = $request->getParsedBody()["utilisateur"];
	$coutArray = $request->getParsedBody()["cout"];

	if ($controleurAuthentification->getUtilisateurEnSessionAvecIdentifiantUtilisateur($utilisateurArray["identifiantUtilisateur"])) {
		$json = json_encode($controleurCouts->ajouterCout($coutArray)->getObjetSerializable());
	}
	else {
		throw new ExceptionUtilisateurDeconnecte();
	}

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->put("/api/couts", function (Request $request, Response $response, $args) {
	$controleurCouts = new ControleurCouts();
	$controleurAuthentification = new ControleurAuthentification();
	$utilisateurArray = $request->getParsedBody()["utilisateur"];
	$coutArray = $request->getParsedBody()["cout"];

	if ($controleurAuthentification->getUtilisateurEnSessionAvecIdentifiantUtilisateur($utilisateurArray["identifiantUtilisateur"])) {
		$json = json_encode($controleurCouts->modifierCout($coutArray)->getObjetSerializable());
	}
	else {
		throw new ExceptionUtilisateurDeconnecte();
	}

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});