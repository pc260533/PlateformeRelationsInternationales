<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

$app->get("/api/contactsEtrangers", function (Request $request, Response $response, $args) {
	$controleurContactsEtrangers = new ControleurContactsEtrangers();
	$json = json_encode($controleurContactsEtrangers->chargerListeContactsEtrangers());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->post("/api/contactsEtrangers", function (Request $request, Response $response, $args) {
	$controleurContactsEtrangers = new ControleurContactsEtrangers();
	$controleurAuthentification = new ControleurAuthentification();
	$utilisateurArray = $request->getParsedBody()["utilisateur"];
	$contactEtrangerArray = $request->getParsedBody()["contactEtranger"];

	if ($controleurAuthentification->getUtilisateurEnSessionAvecIdentifiantUtilisateur($utilisateurArray["identifiantUtilisateur"])) {
		$json = json_encode($controleurContactsEtrangers->ajouterContactEtrange($contactEtrangerArray)->getObjetSerializable());
	}
	else {
		throw new ExceptionUtilisateurDeconnecte();
	}

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->delete("/api/contactsEtrangers", function (Request $request, Response $response, $args) {
	$controleurContactsEtrangers = new ControleurContactsEtrangers();
	$controleurAuthentification = new ControleurAuthentification();
	$utilisateurArray = $request->getParsedBody()["utilisateur"];
	$contactEtrangerArray = $request->getParsedBody()["contactEtranger"];

	if ($controleurAuthentification->getUtilisateurEnSessionAvecIdentifiantUtilisateur($utilisateurArray["identifiantUtilisateur"])) {
		$json = json_encode($controleurContactsEtrangers->supprimerContactEtrange($contactEtrangerArray)->getObjetSerializable());
	}
	else {
		throw new ExceptionUtilisateurDeconnecte();
	}

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->put("/api/contactsEtrangers", function (Request $request, Response $response, $args) {
	$controleurContactsEtrangers = new ControleurContactsEtrangers();
	$controleurAuthentification = new ControleurAuthentification();
	$utilisateurArray = $request->getParsedBody()["utilisateur"];
	$contactEtrangerArray = $request->getParsedBody()["contactEtranger"];

	if ($controleurAuthentification->getUtilisateurEnSessionAvecIdentifiantUtilisateur($utilisateurArray["identifiantUtilisateur"])) {
		$json = json_encode($controleurContactsEtrangers->modifierContactEtrange($contactEtrangerArray)->getObjetSerializable());
	}
	else {
		throw new ExceptionUtilisateurDeconnecte();
	}

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});