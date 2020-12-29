<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

$app->post("/api/mails/validerVoeuxPartenaires", function (Request $request, Response $response, $args) {
	$controleurPartenaire = new ControleurPartenaires();
	$controleurMails = new ControleurMails();
	$listePartenaires = array();
	foreach ($request->getParsedBody()["listePartenaires"] as $partenaireArray) {
		$listePartenaires[] = $controleurPartenaire->creerPartenaire($partenaireArray);
	}
	$controleurMails->envoyerMailsValidationListeVoeuxPartenaire($listePartenaires ,$request->getParsedBody()["adresseMailVoeu"]);

	$json = json_encode(array(
		"titreInformation" => "Mail envoyé avec succès.",
		"messageInformation" => "Le mail de validation de vos voeux a été envoyé avec succès sur votre boîte mail.",
		"detailsInformation" => "Veuillez valider vos voeux en cliquant sur le bouton Valider Voeux du mail envoyé."));

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->post("/api/mails/envoyerMailPartenaire", function (Request $request, Response $response, $args) {
	$controleurMails = new ControleurMails();
	$controleurAuthentification = new ControleurAuthentification();
	$utilisateurArray = $request->getParsedBody()["utilisateur"];
	$mailArray = $request->getParsedBody()["mail"];

	if ($controleurAuthentification->getUtilisateurEnSessionAvecIdentifiantUtilisateur($utilisateurArray["identifiantUtilisateur"])) {
		$controleurMails->envoyerMailPartenaire($mailArray);
	}
	else {
		throw new ExceptionUtilisateurDeconnecte();
	}

	$json = json_encode(array(
		"titreInformation" => "Mail envoyé avec succès.",
		"messageInformation" => "Le mail de validation de vos voeux a été envoyé.",
		"detailsInformation" => "Le mails a bien été envoyé aux destinataire s'ils existent."));

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});