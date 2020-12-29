<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use PHPMailer\PHPMailer\PHPMailer;

$app->post("/api/mails/validerVoeuxPartenaires", function (Request $request, Response $response, $args) {
	$controleurPartenaire = new ControleurPartenaires();
	$controleurMails = new ControleurMails();
	$listePartenaires = array();
	foreach ($request->getParsedBody()["listePartenaires"] as $partenaireArray) {
		$listePartenaires[] = $controleurPartenaire->creerPartenaire($partenaireArray);
	}
	$controleurMails->envoyerMailsValidationListeVoeuxPartenaire($listePartenaires ,$request->getParsedBody()["adresseMailVoeu"]);

	$response->getBody()->write("");
	return $response->withHeader("Content-Type", "application/json");
});