<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

$app->get("/api/mails/envoyerMailsPartenairesEnAttente", function (Request $request, Response $response, $args) {
	$controleurMails = new ControleurMails();
	$controleurMails->envoyerMailsPartenairesEnAttente();
	$json = json_encode(array(
			"titreInformation" => "Mail envoyé avec succès.",
			"messageInformation" => "Le mail de validation de vos voeux a été envoyé avec succès sur votre boîte mail.",
			"detailsInformation" => "Veuillez valider vos voeux en cliquant sur le bouton Valider Voeux du mail envoyé."));

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->get("/api/mails", function (Request $request, Response $response, $args) {
	$controleurMails = new ControleurMails();
	$json = json_encode($controleurMails->chargerListeMails());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

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
		if (filter_var($mailArray["estEnvoye"], FILTER_VALIDATE_BOOL)) {
			$controleurMails->envoyerMailPartenaire($mailArray);
		}
		$jsonMail = $controleurMails->ajouterMail($mailArray)->getObjetSerializable();
	}
	else {
		throw new ExceptionUtilisateurDeconnecte();
	}

	$jsonInformation = array(
		"titreInformation" => "Mail envoyé avec succès.",
		"messageInformation" => "Le mail destiné aux partenaires a été envoyé.",
		"detailsInformation" => "Le mails a bien été envoyé aux destinataire s'ils existent.");

	$json = json_encode(array(
		"mail" => $jsonMail,
		"information" => $jsonInformation));

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->delete("/api/mails", function (Request $request, Response $response, $args) {
	$controleurMails = new ControleurMails();
	$controleurAuthentification = new ControleurAuthentification();
	$utilisateurArray = $request->getParsedBody()["utilisateur"];
	$mailArray = $request->getParsedBody()["mail"];

	if ($controleurAuthentification->getUtilisateurEnSessionAvecIdentifiantUtilisateur($utilisateurArray["identifiantUtilisateur"])) {
		$json = json_encode($controleurMails->supprimerMail($mailArray)->getObjetSerializable());
	}
	else {
		throw new ExceptionUtilisateurDeconnecte();
	}

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});