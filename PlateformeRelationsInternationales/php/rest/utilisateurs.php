<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

$app->get("/api/utilisateurs", function (Request $request, Response $response, $args) {
	$controleurUtilisateurs = new ControleurUtilisateurs();
	$json = json_encode($controleurUtilisateurs->chargerListeUtilisateurs());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->post("/api/utilisateurs", function (Request $request, Response $response, $args) {
	$controleurUtilisateurs = new ControleurUtilisateurs();
	$controleurAuthentification = new ControleurAuthentification();
	$utilisateurArray = $request->getParsedBody()["utilisateur"];
	$utilisateurAAjouterArray = $request->getParsedBody()["utilisateurAAjouter"];

	if ($controleurAuthentification->getUtilisateurEnSessionAvecIdentifiantUtilisateur($utilisateurArray["identifiantUtilisateur"])) {
		$json = json_encode($controleurUtilisateurs->ajouterUtilisateur($utilisateurAAjouterArray)->getObjetSerializable());
	}
	else {
		throw new ExceptionUtilisateurDeconnecte();
	}

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->delete("/api/utilisateurs", function (Request $request, Response $response, $args) {
	$controleurUtilisateurs = new ControleurUtilisateurs();
	$controleurAuthentification = new ControleurAuthentification();
	$utilisateurArray = $request->getParsedBody()["utilisateur"];
	$utilisateurASupprimerArray = $request->getParsedBody()["utilisateurASupprimer"];

	if ($controleurAuthentification->getUtilisateurEnSessionAvecIdentifiantUtilisateur($utilisateurArray["identifiantUtilisateur"])) {
		$json = json_encode($controleurUtilisateurs->supprimerUtilisateur($utilisateurASupprimerArray)->getObjetSerializable());
	}
	else {
		throw new ExceptionUtilisateurDeconnecte();
	}

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->put("/api/utilisateurs", function (Request $request, Response $response, $args) {
	$controleurUtilisateurs = new ControleurUtilisateurs();
	$controleurAuthentification = new ControleurAuthentification();
	$utilisateurArray = $request->getParsedBody()["utilisateur"];
	$utilisateurAModifierArray = $request->getParsedBody()["utilisateurAModifier"];

	if ($controleurAuthentification->getUtilisateurEnSessionAvecIdentifiantUtilisateur($utilisateurArray["identifiantUtilisateur"])) {
		$json = json_encode($controleurUtilisateurs->modifierUtilisateur($utilisateurAModifierArray)->getObjetSerializable());
	}
	else {
		throw new ExceptionUtilisateurDeconnecte();
	}

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->put("/api/utilisateurs/motDePasse", function (Request $request, Response $response, $args) {
	$controleurUtilisateurs = new ControleurUtilisateurs();
	$controleurAuthentification = new ControleurAuthentification();
	$utilisateurArray = $request->getParsedBody()["utilisateur"];
	$utilisateurAModifierArray = $request->getParsedBody()["utilisateurAModifier"];
	$utilisateurAModifierArray["motDePasseUtilisateur"] = $request->getParsedBody()["motDePasse"];

	if ($controleurAuthentification->getUtilisateurEnSessionAvecIdentifiantUtilisateur($utilisateurArray["identifiantUtilisateur"])) {
		$json = json_encode($controleurUtilisateurs->modifierMotDePasseUtilisateur($utilisateurAModifierArray)->getObjetSerializable());
	}
	else {
		throw new ExceptionUtilisateurDeconnecte();
	}

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});