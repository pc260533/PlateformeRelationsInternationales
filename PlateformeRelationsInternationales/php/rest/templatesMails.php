<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

$app->get("/api/templatesMails", function (Request $request, Response $response, $args) {
	$controleurTemplatesMails = new ControleurTemplatesMails();
	$json = json_encode($controleurTemplatesMails->chargerListeTemplatesMails());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->post("/api/templatesMails", function (Request $request, Response $response, $args) {
	$controleurTemplatesMails = new ControleurTemplatesMails();
	$controleurAuthentification = new ControleurAuthentification();
	$utilisateurArray = $request->getParsedBody()["utilisateur"];
	$templateMailArray = $request->getParsedBody()["templateMail"];

	if ($controleurAuthentification->getUtilisateurEnSessionAvecIdentifiantUtilisateur($utilisateurArray["identifiantUtilisateur"])) {
		$json = json_encode($controleurTemplatesMails->ajouterTemplateMail($templateMailArray)->getObjetSerializable());
	}
	else {
		throw new ExceptionUtilisateurDeconnecte();
	}

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->delete("/api/templatesMails", function (Request $request, Response $response, $args) {
	$controleurTemplatesMails = new ControleurTemplatesMails();
	$controleurAuthentification = new ControleurAuthentification();
	$utilisateurArray = $request->getParsedBody()["utilisateur"];
	$templateMailArray = $request->getParsedBody()["templateMail"];

	if ($controleurAuthentification->getUtilisateurEnSessionAvecIdentifiantUtilisateur($utilisateurArray["identifiantUtilisateur"])) {
		$json = json_encode($controleurTemplatesMails->supprimerTemplateMail($templateMailArray)->getObjetSerializable());
	}
	else {
		throw new ExceptionUtilisateurDeconnecte();
	}

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->put("/api/templatesMails", function (Request $request, Response $response, $args) {
	$controleurTemplatesMails = new ControleurTemplatesMails();
	$controleurAuthentification = new ControleurAuthentification();
	$utilisateurArray = $request->getParsedBody()["utilisateur"];
	$templateMailArray = $request->getParsedBody()["templateMail"];

	if ($controleurAuthentification->getUtilisateurEnSessionAvecIdentifiantUtilisateur($utilisateurArray["identifiantUtilisateur"])) {
		$json = json_encode($controleurTemplatesMails->modifierTemplateMail($templateMailArray)->getObjetSerializable());
	}
	else {
		throw new ExceptionUtilisateurDeconnecte();
	}

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});