<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

$app->get("/api/voeux", function (Request $request, Response $response, $args) {
	$controleurVoeux = new ControleurVoeux();
	$json = json_encode($controleurVoeux->chargerListeVoeux());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->delete("/api/voeux", function (Request $request, Response $response, $args) {
	$controleurVoeux = new ControleurVoeux();
	$controleurAuthentification = new ControleurAuthentification();
	$utilisateurArray = $request->getParsedBody()["utilisateur"];
	$voeuArray = $request->getParsedBody()["voeu"];

	if ($controleurAuthentification->getUtilisateurEnSessionAvecIdentifiantUtilisateur($utilisateurArray["identifiantUtilisateur"])) {
		$json = json_encode($controleurVoeux->supprimerVoeu($voeuArray)->getObjetSerializable());
	}
	else {
		throw new ExceptionUtilisateurDeconnecte();
	}

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->get("/api/voeuxDansPartenaire/{identifiantPartenaire1}/{identifiantPartenaire2}/{identifiantPartenaire3}/{adresseMailVoeux}", function (Request $request, Response $response, $args) {
	$controleurVoeux = new ControleurVoeux();
	$adresseMailVoeux = base64_decode($args["adresseMailVoeux"]);
	$voeuArray = array (
		"identifiantVoeu" => 0,
		"adresseMailVoeu" => $adresseMailVoeux);

	if (!$controleurVoeux->getVoeuAvecAdressMailVoeu($adresseMailVoeux)) {
		$voeu1 = $controleurVoeux->ajouterVoeux($voeuArray);
		$voeu2 = $controleurVoeux->ajouterVoeux($voeuArray);
		$voeu3 = $controleurVoeux->ajouterVoeux($voeuArray);

		$controleurPartenaire = new ControleurPartenaires();
		$identifiantPartenaire1 = base64_decode($args["identifiantPartenaire1"]);
		$identifiantPartenaire2 = base64_decode($args["identifiantPartenaire2"]);
		$identifiantPartenaire3 = base64_decode($args["identifiantPartenaire3"]);

		$partenaire1 = new Partenaire();
		$partenaire1->setIdentifiantPartenaire(intval($identifiantPartenaire1));
		$partenaire2 = new Partenaire();
		$partenaire2->setIdentifiantPartenaire(intval($identifiantPartenaire2));
		$partenaire3 = new Partenaire();
		$partenaire3->setIdentifiantPartenaire(intval($identifiantPartenaire3));

		$listePartenaires = array();
		$listePartenaires[] = $partenaire1;
		$listePartenaires[] = $partenaire2;
		$listePartenaires[] = $partenaire3;
		$listeVoeux = array();
		$listeVoeux[] = $voeu1;
		$listeVoeux[] = $voeu2;
		$listeVoeux[] = $voeu3;

		$controleurPartenaire->ajouterListeVoeuxDansListePartenaires($listeVoeux, $listePartenaires);

	}
	else {
		throw new ExceptionVoeuxDejaValides();
	}

	return $response->withStatus(302)->withHeader("Location", "/partenaires");;
});