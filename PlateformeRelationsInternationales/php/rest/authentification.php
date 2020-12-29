<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

$app->post("/api/authentification/connecterUtilisateur", function (Request $request, Response $response, $args) {
	$controleurUtilisateur = new ControleurUtilisateurs();
	$controleurAuthentification = new ControleurAuthentification();
	$utilisateurArray = $request->getParsedBody();

	$utilisateurATester = $controleurUtilisateur->creerUtilisateur($utilisateurArray);
	$utilisateurRecuperer = $controleurUtilisateur->getUtilisateurAvecNomUtilisateur($utilisateurArray);
	$controleurAuthentification->connecterUtilisateur($utilisateurATester, $utilisateurRecuperer);

	$json = json_encode($utilisateurRecuperer->getObjetSerializable());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->post("/api/authentification/deconnecterUtilisateur", function (Request $request, Response $response, $args) {
	$controleurUtilisateur = new ControleurUtilisateurs();
	$controleurAuthentification = new ControleurAuthentification();
	$utilisateurArray = $request->getParsedBody();

	$utilisateurADeconnecter = $controleurUtilisateur->creerUtilisateur($utilisateurArray);
	$controleurAuthentification->deconnecterUtilisateur($utilisateurADeconnecter);

	$json = json_encode($utilisateurADeconnecter->getObjetSerializable());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});