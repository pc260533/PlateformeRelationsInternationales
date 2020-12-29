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
	$controleurAuthentification = new ControleurAuthentification();
	$utilisateurArray = $request->getParsedBody()["utilisateur"];
	$aideFinanciereArray = $request->getParsedBody()["aideFinanciere"];

	if ($controleurAuthentification->getUtilisateurEnSessionAvecIdentifiantUtilisateur($utilisateurArray["identifiantUtilisateur"])) {
		$json = json_encode($controleurAidesFinancieres->ajouterAideFinanciere($aideFinanciereArray)->getObjetSerializable());
	}
	else {
		throw new ExceptionUtilisateurDeconnecte();
	}

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->delete("/api/aidesfinancieres", function (Request $request, Response $response, $args) {
	$controleurAidesFinancieres = new ControleurAidesFinancieres();
	$controleurAuthentification = new ControleurAuthentification();
	$utilisateurArray = $request->getParsedBody()["utilisateur"];
	$aideFinanciereArray = $request->getParsedBody()["aideFinanciere"];

	if ($controleurAuthentification->getUtilisateurEnSessionAvecIdentifiantUtilisateur($utilisateurArray["identifiantUtilisateur"])) {
		$json = json_encode($controleurAidesFinancieres->supprimerAideFinanciere($aideFinanciereArray)->getObjetSerializable());
	}
	else {
		throw new ExceptionUtilisateurDeconnecte();
	}

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->put("/api/aidesfinancieres", function (Request $request, Response $response, $args) {
	$controleurAidesFinancieres = new ControleurAidesFinancieres();
	$controleurAuthentification = new ControleurAuthentification();
	$utilisateurArray = $request->getParsedBody()["utilisateur"];
	$aideFinanciereArray = $request->getParsedBody()["aideFinanciere"];

	if ($controleurAuthentification->getUtilisateurEnSessionAvecIdentifiantUtilisateur($utilisateurArray["identifiantUtilisateur"])) {
		$json = json_encode($controleurAidesFinancieres->modifierAideFinanciere($aideFinanciereArray)->getObjetSerializable());
	}
	else {
		throw new ExceptionUtilisateurDeconnecte();
	}

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});