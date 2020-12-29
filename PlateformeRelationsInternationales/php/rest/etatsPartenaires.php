<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

$app->get("/api/etatsPartenaires", function (Request $request, Response $response, $args) {
	$controleurEtatsPartenaires = new ControleurEtatsPartenaires();
	$json = json_encode($controleurEtatsPartenaires->chargerListeEtatsPartenaires());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->post("/api/etatsPartenaires", function (Request $request, Response $response, $args) {
	$controleurEtatsPartenaires = new ControleurEtatsPartenaires();
	$controleurAuthentification = new ControleurAuthentification();
	$utilisateurArray = $request->getParsedBody()["utilisateur"];
	$etatPartenaireArray = $request->getParsedBody()["etatPartenaire"];

	if ($controleurAuthentification->getUtilisateurEnSessionAvecIdentifiantUtilisateur($utilisateurArray["identifiantUtilisateur"])) {
		$json = json_encode($controleurEtatsPartenaires->ajouterEtatPartenaire($etatPartenaireArray)->getObjetSerializable());
	}
	else {
		throw new ExceptionUtilisateurDeconnecte();
	}

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->delete("/api/etatsPartenaires", function (Request $request, Response $response, $args) {
	$controleurEtatsPartenaires = new ControleurEtatsPartenaires();
	$controleurAuthentification = new ControleurAuthentification();
	$utilisateurArray = $request->getParsedBody()["utilisateur"];
	$etatPartenaireArray = $request->getParsedBody()["etatPartenaire"];

	if ($controleurAuthentification->getUtilisateurEnSessionAvecIdentifiantUtilisateur($utilisateurArray["identifiantUtilisateur"])) {
		$json = json_encode($controleurEtatsPartenaires->supprimerEtatPartenaire($etatPartenaireArray)->getObjetSerializable());
	}
	else {
		throw new ExceptionUtilisateurDeconnecte();
	}

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->put("/api/etatsPartenaires", function (Request $request, Response $response, $args) {
	$controleurEtatsPartenaires = new ControleurEtatsPartenaires();
	$controleurAuthentification = new ControleurAuthentification();
	$utilisateurArray = $request->getParsedBody()["utilisateur"];
	$etatPartenaireArray = $request->getParsedBody()["etatPartenaire"];

	if ($controleurAuthentification->getUtilisateurEnSessionAvecIdentifiantUtilisateur($utilisateurArray["identifiantUtilisateur"])) {
		$json = json_encode($controleurEtatsPartenaires->modifierEtatPartenaire($etatPartenaireArray)->getObjetSerializable());
	}
	else {
		throw new ExceptionUtilisateurDeconnecte();
	}

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});