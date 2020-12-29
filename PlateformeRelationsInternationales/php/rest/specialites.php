<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

$app->get("/api/specialites", function (Request $request, Response $response, $args) {
	$controleurSpecialite = new ControleurSpecialites();
	$json = json_encode($controleurSpecialite->chargerListeSpecialites());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->post("/api/specialites", function (Request $request, Response $response, $args) {
	$controleurSpecialite = new ControleurSpecialites();
	$controleurAuthentification = new ControleurAuthentification();
	$utilisateurArray = $request->getParsedBody()["utilisateur"];
	$specialiteArray = $request->getParsedBody()["specialite"];

	if ($controleurAuthentification->getUtilisateurEnSessionAvecIdentifiantUtilisateur($utilisateurArray["identifiantUtilisateur"])) {
		$json = json_encode($controleurSpecialite->ajouterSpecialite($specialiteArray)->getObjetSerializable());
	}
	else {
		throw new ExceptionUtilisateurDeconnecte();
	}

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->delete("/api/specialites", function (Request $request, Response $response, $args) {
	$controleurSpecialite = new ControleurSpecialites();
	$controleurAuthentification = new ControleurAuthentification();
	$utilisateurArray = $request->getParsedBody()["utilisateur"];
	$specialiteArray = $request->getParsedBody()["specialite"];

	if ($controleurAuthentification->getUtilisateurEnSessionAvecIdentifiantUtilisateur($utilisateurArray["identifiantUtilisateur"])) {
		$json = json_encode($controleurSpecialite->supprimerSpecialite($specialiteArray)->getObjetSerializable());
	}
	else {
		throw new ExceptionUtilisateurDeconnecte();
	}

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->put("/api/specialites", function (Request $request, Response $response, $args) {
	$controleurSpecialite = new ControleurSpecialites();
	$controleurAuthentification = new ControleurAuthentification();
	$utilisateurArray = $request->getParsedBody()["utilisateur"];
	$specialiteArray = $request->getParsedBody()["specialite"];

	if ($controleurAuthentification->getUtilisateurEnSessionAvecIdentifiantUtilisateur($utilisateurArray["identifiantUtilisateur"])) {
		$json = json_encode($controleurSpecialite->modifierSpecialite($specialiteArray)->getObjetSerializable());
	}
	else {
		throw new ExceptionUtilisateurDeconnecte();
	}

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->post("/api/sousSpecialites", function (Request $request, Response $response, $args) {
	$controleurSpecialite = new ControleurSpecialites();
	$controleurAuthentification = new ControleurAuthentification();
	$utilisateurArray = $request->getParsedBody()["utilisateur"];
	$specialiteArray = $request->getParsedBody()["specialite"];
	$sousSpecialiteArray = $request->getParsedBody()["sousSpecialite"];

	if ($controleurAuthentification->getUtilisateurEnSessionAvecIdentifiantUtilisateur($utilisateurArray["identifiantUtilisateur"])) {
		$json = json_encode($controleurSpecialite->ajouterSousSpecialite($specialiteArray, $sousSpecialiteArray)->getObjetSerializable());
	}
	else {
		throw new ExceptionUtilisateurDeconnecte();
	}

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->delete("/api/sousSpecialites", function (Request $request, Response $response, $args) {
	$controleurSpecialite = new ControleurSpecialites();
	$controleurAuthentification = new ControleurAuthentification();
	$utilisateurArray = $request->getParsedBody()["utilisateur"];
	$sousSpecialiteArray = $request->getParsedBody()["sousSpecialite"];

	if ($controleurAuthentification->getUtilisateurEnSessionAvecIdentifiantUtilisateur($utilisateurArray["identifiantUtilisateur"])) {
		$json = json_encode($controleurSpecialite->supprimerSousSpecialite($sousSpecialiteArray)->getObjetSerializable());
	}
	else {
		throw new ExceptionUtilisateurDeconnecte();
	}

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->put("/api/sousSpecialites", function (Request $request, Response $response, $args) {
	$controleurSpecialite = new ControleurSpecialites();
	$controleurAuthentification = new ControleurAuthentification();
	$utilisateurArray = $request->getParsedBody()["utilisateur"];
	$specialiteArray = $request->getParsedBody()["specialite"];
	$sousSpecialiteArray = $request->getParsedBody()["sousSpecialite"];

	if ($controleurAuthentification->getUtilisateurEnSessionAvecIdentifiantUtilisateur($utilisateurArray["identifiantUtilisateur"])) {
		$json = json_encode($controleurSpecialite->modifierSousSpecialite($specialiteArray, $sousSpecialiteArray)->getObjetSerializable());
	}
	else {
		throw new ExceptionUtilisateurDeconnecte();
	}

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});