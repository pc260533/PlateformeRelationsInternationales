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
	$controleurAuthentification = new ControleurAuthentification();
	$utilisateurArray = $request->getParsedBody()["utilisateur"];
	$coordinateurArray = $request->getParsedBody()["coordinateur"];

	if ($controleurAuthentification->getUtilisateurEnSessionAvecIdentifiantUtilisateur($utilisateurArray["identifiantUtilisateur"])) {
		$json = json_encode($controleurCoordinateurs->ajouterCoordinateur($coordinateurArray)->getObjetSerializable());
	}
	else {
		throw new ExceptionUtilisateurDeconnecte();
	}

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->delete("/api/coordinateurs", function (Request $request, Response $response, $args) {
	$controleurCoordinateurs = new ControleurCoordinateurs();
	$controleurAuthentification = new ControleurAuthentification();
	$utilisateurArray = $request->getParsedBody()["utilisateur"];
	$coordinateurArray = $request->getParsedBody()["coordinateur"];

	if ($controleurAuthentification->getUtilisateurEnSessionAvecIdentifiantUtilisateur($utilisateurArray["identifiantUtilisateur"])) {
		$json = json_encode($controleurCoordinateurs->supprimerCoordinateur($coordinateurArray)->getObjetSerializable());
	}
	else {
		throw new ExceptionUtilisateurDeconnecte();
	}

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->put("/api/coordinateurs", function (Request $request, Response $response, $args) {
	$controleurCoordinateurs = new ControleurCoordinateurs();
	$controleurAuthentification = new ControleurAuthentification();
	$utilisateurArray = $request->getParsedBody()["utilisateur"];
	$coordinateurArray = $request->getParsedBody()["coordinateur"];

	if ($controleurAuthentification->getUtilisateurEnSessionAvecIdentifiantUtilisateur($utilisateurArray["identifiantUtilisateur"])) {
		$json = json_encode($controleurCoordinateurs->modifierCoordinateur($coordinateurArray)->getObjetSerializable());
	}
	else {
		throw new ExceptionUtilisateurDeconnecte();
	}

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});