<?php

//declare(strict_types=1);
/*require_once("php/pages/Page.php");
require_once("php/pages/PageApplication.php");

$pageApplication = new PageApplication();
$pageApplication->chargerTemplatePage();*/

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . "./vendor/autoload.php";

require __DIR__ . "./php/modele/ISerializable.php";
require __DIR__ . "./php/modele/AideFinanciere.php";
require __DIR__ . "./php/modele/Contact.php";
require __DIR__ . "./php/modele/Localisation.php";
require __DIR__ . "./php/modele/Mobilite.php";
require __DIR__ . "./php/modele/Partenaire.php";
require __DIR__ . "./php/modele/Plateforme.php";
require __DIR__ . "./php/modele/SousSpecialite.php";
require __DIR__ . "./php/modele/Specialite.php";

require __DIR__ . "./php/stockage/InstalleurBaseDeDonnees.php";
require __DIR__ . "./php/stockage/StockageBaseDeDonnees.php";

require __DIR__ . "./php/exception/ExceptionSerializable.php";
require __DIR__ . "./php/exception/ExceptionBaseDeDonneesPlateforme.php";

$app = AppFactory::create();

$app->addBodyParsingMiddleware();

$stockageBaseDeDonnee = new StockageBaseDeDonnees("mysql:host=localhost;dbname=plateforme;charset=utf8", "root", "");

$app->get("/api/specialites", function (Request $request, Response $response, $args) use ($stockageBaseDeDonnee) {
	$json = json_encode($stockageBaseDeDonnee->chargerListeSpecialites());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->get("/api/mobilites", function (Request $request, Response $response, $args) use ($stockageBaseDeDonnee) {
	$json = json_encode($stockageBaseDeDonnee->chargerListeMobilites());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->get("/api/partenaires", function (Request $request, Response $response, $args) use ($stockageBaseDeDonnee) {
	$json = json_encode($stockageBaseDeDonnee->chargerListePartenaires());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->post("/api/partenaires", function (Request $request, Response $response, $args) use ($stockageBaseDeDonnee) {
	$partenaireArray = $request->getParsedBody();
	$partenaire = new Partenaire();
	$partenaire->setNomPartenaire($partenaireArray["nomPartenaire"]);
	$partenaire->setDomaineDeCompetence($partenaireArray["domaineDeCompetencePartenaire"]);
	$localisationPartenaire = new Localisation();
	$localisationPartenaire->setLatitudeLocalisation($partenaireArray["localisationPartenaire"]["latitudeLocalisation"]);
	$localisationPartenaire->setLongitudeLocalisation($partenaireArray["localisationPartenaire"]["longitudeLocalisation"]);
	$partenaire->setLocalisationPartenaire($localisationPartenaire);
	if (isset($partenaireArray["listeSousSpecialitesPartenaire"])) {
		foreach ($partenaireArray["listeSousSpecialitesPartenaire"] as $sousSpecialiteArray) {
			$sousSpecialite = new SousSpecialite();
			$sousSpecialite->setIdentifiantSousSpecialite($sousSpecialiteArray["identifiantSousSpecialite"]);
			$partenaire->ajouterSousSpecialite($sousSpecialite);
		}
	}
	if (isset($partenaireArray["listeMobilitesPartenaire"])) {
		foreach ($partenaireArray["listeMobilitesPartenaire"] as $mobiliteArray) {
			$mobilite = new Mobilite();
			$mobilite->setIdentifiantMobilite($mobiliteArray["identifiantMobilite"]);
			$partenaire->ajouterMobilite($mobilite);
		}
	}
	if (isset($partenaireArray["listeAidesFinancieresPartenaire"])) {
		foreach ($partenaireArray["listeAidesFinancieresPartenaire"] as $aideFinanciereArray) {
			$aideFinanciere = new AideFinanciere();
			$aideFinanciere->setIdentifiantAideFinanciere($aideFinanciereArray["identifiantAideFinanciere"]);
			$partenaire->ajouterAideFinanciere($aideFinanciere);
		}
	}
	if (isset($partenaireArray["listeContactsPartenaire"])) {
		foreach ($partenaireArray["listeContactsPartenaire"] as $contactArray) {
			$contact = new Contact();
			$contact->setIdentifiantContact($contactArray["identifiantContact"]);
			$partenaire->ajouterContact($contact);
		}
	}
	$partenaire->setInformationLogementPartenaire($partenaireArray["informationLogementPartenaire"]);
	$partenaire->setInformationCoutPartenaire($partenaireArray["informationCoutPartenaire"]);
	$stockageBaseDeDonnee->ajouterPartenaire($partenaire);

	$json = json_encode($partenaire->getObjetSerializable());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->delete("/api/partenaires", function (Request $request, Response $response, $args) use ($stockageBaseDeDonnee) {
	$partenaireArray = $request->getParsedBody();
	$partenaire = new Partenaire();
	$partenaire->setIdentifiantPartenaire($partenaireArray["identifiantPartenaire"]);
	$localisationPartenaire = new Localisation();
	$localisationPartenaire->setIdentifiantLocalisation($partenaireArray["localisationPartenaire"]["identifiantLocalisation"]);
	$partenaire->setLocalisationPartenaire($localisationPartenaire);
	if (isset($partenaireArray["listeSousSpecialitesPartenaire"])) {
		foreach ($partenaireArray["listeSousSpecialitesPartenaire"] as $sousSpecialiteArray) {
			$sousSpecialite = new SousSpecialite();
			$sousSpecialite->setIdentifiantSousSpecialite($sousSpecialiteArray["identifiantSousSpecialite"]);
			$partenaire->ajouterSousSpecialite($sousSpecialite);
		}
	}
	if (isset($partenaireArray["listeMobilitesPartenaire"])) {
		foreach ($partenaireArray["listeMobilitesPartenaire"] as $mobiliteArray) {
			$mobilite = new Mobilite();
			$mobilite->setIdentifiantMobilite($mobiliteArray["identifiantMobilite"]);
			$partenaire->ajouterMobilite($mobilite);
		}
	}
	if (isset($partenaireArray["listeAidesFinancieresPartenaire"])) {
		foreach ($partenaireArray["listeAidesFinancieresPartenaire"] as $aideFinanciereArray) {
			$aideFinanciere = new AideFinanciere();
			$aideFinanciere->setIdentifiantAideFinanciere($aideFinanciereArray["identifiantAideFinanciere"]);
			$partenaire->ajouterAideFinanciere($aideFinanciere);
		}
	}
	if (isset($partenaireArray["listeContactsPartenaire"])) {
		foreach ($partenaireArray["listeContactsPartenaire"] as $contactArray) {
			$contact = new Contact();
			$contact->setIdentifiantContact($contactArray["identifiantContact"]);
			$partenaire->ajouterContact($contact);
		}
	}
	$stockageBaseDeDonnee->supprimerPartenaire($partenaire);

	$json = json_encode($partenaire->getObjetSerializable());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->put("/api/partenaires", function (Request $request, Response $response, $args) use ($stockageBaseDeDonnee) {
	$partenaireArray = $request->getParsedBody();
	$partenaire = new Partenaire();
	$partenaire->setIdentifiantPartenaire($partenaireArray["identifiantPartenaire"]);
	$partenaire->setNomPartenaire($partenaireArray["nomPartenaire"]);
	$partenaire->setDomaineDeCompetence($partenaireArray["domaineDeCompetencePartenaire"]);
	$localisationPartenaire = new Localisation();
	$localisationPartenaire->setIdentifiantLocalisation($partenaireArray["localisationPartenaire"]["identifiantLocalisation"]);
	$localisationPartenaire->setLatitudeLocalisation($partenaireArray["localisationPartenaire"]["latitudeLocalisation"]);
	$localisationPartenaire->setLongitudeLocalisation($partenaireArray["localisationPartenaire"]["longitudeLocalisation"]);
	$partenaire->setLocalisationPartenaire($localisationPartenaire);
	$partenaire->setInformationLogementPartenaire($partenaireArray["informationLogementPartenaire"]);
	$partenaire->setInformationCoutPartenaire($partenaireArray["informationCoutPartenaire"]);
	if (isset($partenaireArray["listeSousSpecialitesPartenaire"])) {
		foreach ($partenaireArray["listeSousSpecialitesPartenaire"] as $sousSpecialiteArray) {
			$sousSpecialite = new SousSpecialite();
			$sousSpecialite->setIdentifiantSousSpecialite($sousSpecialiteArray["identifiantSousSpecialite"]);
			$partenaire->ajouterSousSpecialite($sousSpecialite);
		}
	}
	if (isset($partenaireArray["listeMobilitesPartenaire"])) {
		foreach ($partenaireArray["listeMobilitesPartenaire"] as $mobiliteArray) {
			$mobilite = new Mobilite();
			$mobilite->setIdentifiantMobilite($mobiliteArray["identifiantMobilite"]);
			$partenaire->ajouterMobilite($mobilite);
		}
	}
	if (isset($partenaireArray["listeAidesFinancieresPartenaire"])) {
		foreach ($partenaireArray["listeAidesFinancieresPartenaire"] as $aideFinanciereArray) {
			$aideFinanciere = new AideFinanciere();
			$aideFinanciere->setIdentifiantAideFinanciere($aideFinanciereArray["identifiantAideFinanciere"]);
			$partenaire->ajouterAideFinanciere($aideFinanciere);
		}
	}
	if (isset($partenaireArray["listeContactsPartenaire"])) {
		foreach ($partenaireArray["listeContactsPartenaire"] as $contactArray) {
			$contact = new Contact();
			$contact->setIdentifiantContact($contactArray["identifiantContact"]);
			$partenaire->ajouterContact($contact);
		}
	}
	$stockageBaseDeDonnee->modifierPartenaire($partenaire);

	$json = json_encode($partenaire->getObjetSerializable());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->get("/api/aidesfinancieres", function (Request $request, Response $response, $args) use ($stockageBaseDeDonnee) {
	$json = json_encode($stockageBaseDeDonnee->chargerListeAidesFinancieres());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->post("/api/aidesfinancieres", function (Request $request, Response $response, $args) use ($stockageBaseDeDonnee) {
	$aideFinanciereArray = $request->getParsedBody();
	$aideFinanciere = new AideFinanciere();
	$aideFinanciere->setNomAideFinanciere($aideFinanciereArray["nomAideFinanciere"]);
	$stockageBaseDeDonnee->ajouterAideFinanciere($aideFinanciere);

	$json = json_encode($aideFinanciere->getObjetSerializable());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->delete("/api/aidesfinancieres", function (Request $request, Response $response, $args) use ($stockageBaseDeDonnee) {
	$aideFinanciereArray = $request->getParsedBody();
	$aideFinanciere = new AideFinanciere();
	$aideFinanciere->setIdentifiantAideFinanciere($aideFinanciereArray["identifiantAideFinanciere"]);
	$stockageBaseDeDonnee->supprimerAideFinanciere($aideFinanciere);

	$json = json_encode($aideFinanciere->getObjetSerializable());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->put("/api/aidesfinancieres", function (Request $request, Response $response, $args) use ($stockageBaseDeDonnee) {
	$aideFinanciereArray = $request->getParsedBody();
	$aideFinanciere = new AideFinanciere();
	$aideFinanciere->setIdentifiantAideFinanciere($aideFinanciereArray["identifiantAideFinanciere"]);
	$aideFinanciere->setNomAideFinanciere($aideFinanciereArray["nomAideFinanciere"]);
	$stockageBaseDeDonnee->modifierAideFinanciere($aideFinanciere);

	$json = json_encode($aideFinanciere->getObjetSerializable());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->get("/api/contacts", function (Request $request, Response $response, $args) use ($stockageBaseDeDonnee) {
	$json = json_encode($stockageBaseDeDonnee->chargerListeContacts());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->post("/api/contacts", function (Request $request, Response $response, $args) use ($stockageBaseDeDonnee) {
	$contactArray = $request->getParsedBody();
	$contact = new Contact();
	$contact->setNomContact($contactArray["nomContact"]);
	$contact->setPrenomContact($contactArray["prenomContact"]);
	$contact->setAdresseMailContact($contactArray["adresseMailContact"]);
	$contact->setFonctionContact($contactArray["fonctionContact"]);
	$stockageBaseDeDonnee->ajouterContact($contact);

	$json = json_encode($contact->getObjetSerializable());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->delete("/api/contacts", function (Request $request, Response $response, $args) use ($stockageBaseDeDonnee) {
	$contactArray = $request->getParsedBody();
	$contact = new Contact();
	$contact->setIdentifiantContact($contactArray["identifiantContact"]);
	$stockageBaseDeDonnee->supprimerContact($contact);

	$json = json_encode($contact->getObjetSerializable());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->put("/api/contacts", function (Request $request, Response $response, $args) use ($stockageBaseDeDonnee) {
	$contactArray = $request->getParsedBody();
	$contact = new Contact();
	$contact->setIdentifiantContact($contactArray["identifiantContact"]);
	$contact->setNomContact($contactArray["nomContact"]);
	$contact->setPrenomContact($contactArray["prenomContact"]);
	$contact->setAdresseMailContact($contactArray["adresseMailContact"]);
	$contact->setFonctionContact($contactArray["fonctionContact"]);
	$stockageBaseDeDonnee->modifierContact($contact);

	$json = json_encode($contact->getObjetSerializable());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->get("/[{path:.*}]", function (Request $request, Response $response, $args) {
	$templatePageApplication = "./php/templates/templatePageApplication.php";
    if (file_exists($templatePageApplication)) {
        $response->getBody()->write(file_get_contents($templatePageApplication));
    }
	else {
		throw new \Slim\Exception\HttpInternalServerErrorException ($request, "La page contenant l'application est introuvable");
    }
    /*$response->getBody()->write('<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="utf-8">
    <title>Plateforme Relations Internationales</title>
    <link rel="icon" type="image/png" />
</head>

<body>
    <div id="app"></div>
</body>

<script src="dist/bundle.js"></script>

</html>');*/
    return $response;
});

$app->run();