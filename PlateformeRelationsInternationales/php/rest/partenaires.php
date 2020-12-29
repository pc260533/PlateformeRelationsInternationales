<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

$app->get("/api/partenaires", function (Request $request, Response $response, $args) {
	$controleurPartenaire = new ControleurPartenaires();
	$json = json_encode($controleurPartenaire->chargerListePartenaires());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->post("/api/partenaires", function (Request $request, Response $response, $args) {
	$controleurPartenaire = new ControleurPartenaires();
	$controleurAuthentification = new ControleurAuthentification();
	$bodyArray = $request->getParsedBody();
	$partenaireArray = json_decode($bodyArray["partenaire"], true);
	$utilisateurArray = json_decode($bodyArray["utilisateur"], true);
	$uploadedFiles = $request->getUploadedFiles();

	if ($controleurAuthentification->getUtilisateurEnSessionAvecIdentifiantUtilisateur($utilisateurArray["identifiantUtilisateur"])) {
		$json = json_encode($controleurPartenaire->ajouterPartenaire($partenaireArray, $uploadedFiles)->getObjetSerializable());
	}
	else {
		throw new ExceptionUtilisateurDeconnecte();
	}

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->delete("/api/partenaires", function (Request $request, Response $response, $args) {
	$controleurPartenaire = new ControleurPartenaires();
	$controleurAuthentification = new ControleurAuthentification();
	$utilisateurArray = $request->getParsedBody()["utilisateur"];
	$partenaireArray = $request->getParsedBody()["partenaire"];

	if ($controleurAuthentification->getUtilisateurEnSessionAvecIdentifiantUtilisateur($utilisateurArray["identifiantUtilisateur"])) {
		$json = json_encode($controleurPartenaire->supprimerPartenaire($partenaireArray)->getObjetSerializable());
	}
	else {
		throw new ExceptionUtilisateurDeconnecte();
	}

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

//put : /api/partenaires
$app->post("/api/putpartenaires", function (Request $request, Response $response, $args) {
	$controleurPartenaire = new ControleurPartenaires();
	$controleurAuthentification = new ControleurAuthentification();
	$bodyArray = $request->getParsedBody();
	$partenaireArray = json_decode($bodyArray["partenaire"], true);
	$utilisateurArray = json_decode($bodyArray["utilisateur"], true);
	$uploadedFiles = $request->getUploadedFiles();

	if ($controleurAuthentification->getUtilisateurEnSessionAvecIdentifiantUtilisateur($utilisateurArray["identifiantUtilisateur"])) {
		$json = json_encode($controleurPartenaire->modifierPartenaire($partenaireArray, $uploadedFiles)->getObjetSerializable());
	}
	else {
		throw new ExceptionUtilisateurDeconnecte();
	}

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});