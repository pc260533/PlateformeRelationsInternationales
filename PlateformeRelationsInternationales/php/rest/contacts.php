<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

$app->get("/api/contacts", function (Request $request, Response $response, $args) {
	$controleurContacts = new ControleurContacts();
	$json = json_encode($controleurContacts->chargerListeContacts());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->post("/api/contacts", function (Request $request, Response $response, $args) {
	$controleurContacts = new ControleurContacts();
	$contactArray = $request->getParsedBody();

	$json = json_encode($controleurContacts->ajouterContact($contactArray)->getObjetSerializable());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->delete("/api/contacts", function (Request $request, Response $response, $args) {
	$controleurContacts = new ControleurContacts();
	$contactArray = $request->getParsedBody();

	$json = json_encode($controleurContacts->supprimerContact($contactArray)->getObjetSerializable());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->put("/api/contacts", function (Request $request, Response $response, $args) {
	$controleurContacts = new ControleurContacts();
	$contactArray = $request->getParsedBody();

	$json = json_encode($controleurContacts->modifierContact($contactArray)->getObjetSerializable());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});