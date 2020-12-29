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