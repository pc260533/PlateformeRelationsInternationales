<?php

//declare(strict_types=1);
/*require_once("php/pages/Page.php");
require_once("php/pages/PageApplication.php");

$pageApplication = new PageApplication();
$pageApplication->chargerTemplatePage();*/

use DI\ContainerBuilder;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\UploadedFileInterface;
use Slim\Factory\AppFactory;

use Psr\Http\Message\ServerRequestInterface;
use Psr\Log\LoggerInterface;
//use Slim\Psr7\Response;

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
require __DIR__ . "./php/modele/ImagePartenaire.php";

require __DIR__ . "./php/stockage/InstalleurBaseDeDonnees.php";
require __DIR__ . "./php/stockage/StockageBaseDeDonnees.php";

require __DIR__ . "./php/exception/ExceptionSerializable.php";
require __DIR__ . "./php/exception/ExceptionBaseDeDonneesPlateforme.php";

function getVariableEnvironnement(string $variableEnvironnement): string {
	$res = "";
	if (isset($_ENV[$variableEnvironnement])) {
		$res = $_ENV[$variableEnvironnement];
	}
	return $res;
}

function getStockageBaseDeDonnee(): StockageBaseDeDonnees {
	return new StockageBaseDeDonnees(getVariableEnvironnement("DATASOURCENAME_BASEDEDONNEEPLATEFORME"), getVariableEnvironnement("USERNAME_BASEDEDONNEE"), getVariableEnvironnement("PASSWORD_BASEDEDONNEE"));
}

function getInstalleurBaseDeDonnees(): InstalleurBaseDeDonnees {
	return new InstalleurBaseDeDonnees(getVariableEnvironnement("DATASOURCENAME_BASEDEDONNEE"), getVariableEnvironnement("USERNAME_BASEDEDONNEE"), getVariableEnvironnement("PASSWORD_BASEDEDONNEE"));
}

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$containerBuilder = new ContainerBuilder();
$container = $containerBuilder->build();

//$container->set("uploadDirectory", __DIR__ . "\\uploads");
$container->set("dossierRacine", __DIR__);

AppFactory::setContainer($container);
$app = AppFactory::create();

$app->addBodyParsingMiddleware();


$app->addRoutingMiddleware();

$customErrorHandler = function (ServerRequestInterface $request, Throwable $exception, bool $displayErrorDetails, bool $logErrors, bool $logErrorDetails, ?LoggerInterface $logger = null) use ($app) {
    //$logger->error($exception->getMessage());

	$json = null;
	$status = "500";

	if ($exception instanceof ExceptionBaseDeDonneesPlateforme) {
		$json = json_encode($exception->toArray());
		$status = $exception->getStatus();
	}
	else {
		$exceptionBaseDeDonneesPlateforme = new ExceptionBaseDeDonneesPlateforme($exception);
		$json = json_encode($exceptionBaseDeDonneesPlateforme->toArray());
	}

    $response = $app->getResponseFactory()->createResponse();
    $response->getBody()->write($json);

	return $response->withStatus($status)->withHeader("Content-Type", "application/json");
};

$errorMiddleware = $app->addErrorMiddleware(true, true, true, null);
$errorMiddleware->setDefaultErrorHandler($customErrorHandler);


$app->get("/api/specialites", function (Request $request, Response $response, $args) {
	$json = json_encode(getStockageBaseDeDonnee()->chargerListeSpecialites());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->get("/api/mobilites", function (Request $request, Response $response, $args) {
	$json = json_encode(getStockageBaseDeDonnee()->chargerListeMobilites());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->get("/api/partenaires", function (Request $request, Response $response, $args) {
	$json = json_encode(getStockageBaseDeDonnee()->chargerListePartenaires());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->post("/api/partenaires", function (Request $request, Response $response, $args) {
	$bodyArray = $request->getParsedBody();
	$partenaireArray = json_decode($bodyArray["partenaire"], true);
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

	getStockageBaseDeDonnee()->ajouterPartenaire($partenaire);

	$dossierRacine = $this->get("dossierRacine");

	$nomDossierPartenaire = "partenaire" . $partenaire->getIdentifiantPartenaire();
	$cheminDossierPartenaire = $dossierRacine . DIRECTORY_SEPARATOR . "uploads" . DIRECTORY_SEPARATOR . $nomDossierPartenaire;

	if (!is_dir($cheminDossierPartenaire)) {
		mkdir($cheminDossierPartenaire);
	}


	$uploadedFiles = $request->getUploadedFiles();
	foreach ($uploadedFiles as $uploadedFile) {
		$nomFichier = $uploadedFile->getClientFilename();

		/*$cheminDossierImagesPartenaireServeur = "uploads" . DIRECTORY_SEPARATOR . $nomDossierPartenaire;
		$cheminImagePartenaireServeur = $cheminDossierImagesPartenaireServeur . DIRECTORY_SEPARATOR . $nomFichier;
		$cheminDossierImagesPartenaireServeurComplet = $directory . DIRECTORY_SEPARATOR . $cheminDossierImagesPartenaireServeur;
		$cheminImagePartenaireServeurComplet = $cheminDossierImagesPartenaireServeurComplet . DIRECTORY_SEPARATOR . $nomFichier;*/

		$uploadedFile->moveTo($cheminDossierPartenaire . DIRECTORY_SEPARATOR . $nomFichier);
		$imagePartenaire = new ImagePartenaire();
		$imagePartenaire->setCheminImagePartenaireServeur("uploads/" . $nomDossierPartenaire . "/". $nomFichier);
		$partenaire->ajouterImagePartenaire($imagePartenaire);
	}

	getStockageBaseDeDonnee()->ajouterListeImagesPartenaire($partenaire);

	$json = json_encode($partenaire->getObjetSerializable());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->delete("/api/partenaires", function (Request $request, Response $response, $args) {
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
	if (isset($partenaireArray["listeImagesPartenaire"])) {
		foreach ($partenaireArray["listeImagesPartenaire"] as $imagePartenaireArray) {
			$imagePartenaire = new ImagePartenaire();
			$imagePartenaire->setIdentifiantImagePartenaire($imagePartenaireArray["identifiantImagePartenaire"]);
			$imagePartenaire->setCheminImagePartenaireServeur($imagePartenaireArray["cheminImagePartenaireServeur"]);
			$partenaire->ajouterImagePartenaire($imagePartenaire);
			unlink($imagePartenaire->getCheminImagePartenaireServeur());
		}
	}
	getStockageBaseDeDonnee()->supprimerPartenaire($partenaire);

	$json = json_encode($partenaire->getObjetSerializable());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

//put : /api/partenaires
$app->post("/api/putpartenaires", function (Request $request, Response $response, $args) {
	$bodyArray = $request->getParsedBody();
	$partenaireArray = json_decode($bodyArray["partenaire"], true);
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

	if (isset($partenaireArray["listeImagesPartenaire"])) {
		foreach ($partenaireArray["listeImagesPartenaire"] as $imagePartenaireASupprimer) {
			$imagePartenaire = new ImagePartenaire();
			$imagePartenaire->setIdentifiantImagePartenaire($imagePartenaireASupprimer["identifiantImagePartenaire"]);
			$imagePartenaire->setCheminImagePartenaireServeur($imagePartenaireASupprimer["cheminImagePartenaireServeur"]);
			// on supprime l'image dans les uploads.
			unlink($imagePartenaire->getCheminImagePartenaireServeur());
			$partenaire->ajouterImagePartenaire($imagePartenaire);
		}
	}
	/*$directory = $this->get("dossierUploads");
	$uploadedFiles = $request->getUploadedFiles();
	foreach ($uploadedFiles as $uploadedFile) {
		$nomFichier = $uploadedFile->getClientFilename();
		$uploadedFile->moveTo($directory . DIRECTORY_SEPARATOR . $nomFichier);
		$imagePartenaire = new ImagePartenaire();
		$imagePartenaire->setCheminImagePartenaireServeur("uploads/" . $nomFichier);
		$partenaire->ajouterImagePartenaire($imagePartenaire);
	}*/

	$dossierRacine = $this->get("dossierRacine");

	$nomDossierPartenaire = "partenaire" . $partenaire->getIdentifiantPartenaire();
	$cheminDossierPartenaire = $dossierRacine . DIRECTORY_SEPARATOR . "uploads" . DIRECTORY_SEPARATOR . $nomDossierPartenaire;

	$uploadedFiles = $request->getUploadedFiles();
	foreach ($uploadedFiles as $uploadedFile) {
		$nomFichier = $uploadedFile->getClientFilename();

		$uploadedFile->moveTo($cheminDossierPartenaire . DIRECTORY_SEPARATOR . $nomFichier);
		$imagePartenaire = new ImagePartenaire();
		$imagePartenaire->setCheminImagePartenaireServeur("uploads/" . $nomDossierPartenaire . "/". $nomFichier);
		$partenaire->ajouterImagePartenaire($imagePartenaire);
	}


	getStockageBaseDeDonnee()->modifierPartenaire($partenaire);

	$json = json_encode($partenaire->getObjetSerializable());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->get("/api/aidesfinancieres", function (Request $request, Response $response, $args) {
	$json = json_encode(getStockageBaseDeDonnee()->chargerListeAidesFinancieres());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->post("/api/aidesfinancieres", function (Request $request, Response $response, $args) {
	$aideFinanciereArray = $request->getParsedBody();
	$aideFinanciere = new AideFinanciere();
	$aideFinanciere->setNomAideFinanciere($aideFinanciereArray["nomAideFinanciere"]);
	getStockageBaseDeDonnee()->ajouterAideFinanciere($aideFinanciere);

	$json = json_encode($aideFinanciere->getObjetSerializable());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->delete("/api/aidesfinancieres", function (Request $request, Response $response, $args) {
	$aideFinanciereArray = $request->getParsedBody();
	$aideFinanciere = new AideFinanciere();
	$aideFinanciere->setIdentifiantAideFinanciere($aideFinanciereArray["identifiantAideFinanciere"]);
	getStockageBaseDeDonnee()->supprimerAideFinanciere($aideFinanciere);

	$json = json_encode($aideFinanciere->getObjetSerializable());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->put("/api/aidesfinancieres", function (Request $request, Response $response, $args) {
	$aideFinanciereArray = $request->getParsedBody();
	$aideFinanciere = new AideFinanciere();
	$aideFinanciere->setIdentifiantAideFinanciere($aideFinanciereArray["identifiantAideFinanciere"]);
	$aideFinanciere->setNomAideFinanciere($aideFinanciereArray["nomAideFinanciere"]);
	getStockageBaseDeDonnee()->modifierAideFinanciere($aideFinanciere);

	$json = json_encode($aideFinanciere->getObjetSerializable());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->get("/api/contacts", function (Request $request, Response $response, $args) {
	$json = json_encode(getStockageBaseDeDonnee()->chargerListeContacts());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->post("/api/contacts", function (Request $request, Response $response, $args) {
	$contactArray = $request->getParsedBody();
	$contact = new Contact();
	$contact->setNomContact($contactArray["nomContact"]);
	$contact->setPrenomContact($contactArray["prenomContact"]);
	$contact->setAdresseMailContact($contactArray["adresseMailContact"]);
	$contact->setFonctionContact($contactArray["fonctionContact"]);
	getStockageBaseDeDonnee()->ajouterContact($contact);

	$json = json_encode($contact->getObjetSerializable());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->delete("/api/contacts", function (Request $request, Response $response, $args) {
	$contactArray = $request->getParsedBody();
	$contact = new Contact();
	$contact->setIdentifiantContact($contactArray["identifiantContact"]);
	getStockageBaseDeDonnee()->supprimerContact($contact);

	$json = json_encode($contact->getObjetSerializable());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->put("/api/contacts", function (Request $request, Response $response, $args) {
	$contactArray = $request->getParsedBody();
	$contact = new Contact();
	$contact->setIdentifiantContact($contactArray["identifiantContact"]);
	$contact->setNomContact($contactArray["nomContact"]);
	$contact->setPrenomContact($contactArray["prenomContact"]);
	$contact->setAdresseMailContact($contactArray["adresseMailContact"]);
	$contact->setFonctionContact($contactArray["fonctionContact"]);
	getStockageBaseDeDonnee()->modifierContact($contact);

	$json = json_encode($contact->getObjetSerializable());

	$response->getBody()->write($json);
	return $response->withHeader("Content-Type", "application/json");
});

$app->get("/erreur", function (Request $request, Response $response, $args) {
	session_start();
	if (isset($_SESSION["exception"])) {
		$exception = $_SESSION["exception"];
		session_destroy();

		$templatePageApplication = "./php/templates/templatePageApplication.php";
		if (file_exists($templatePageApplication)) {
			$response->getBody()->write(file_get_contents($templatePageApplication));
			$response->getBody()->write('<div id="donneeJsonException" class="donneeCachees">' . json_encode($exception) . '</div>');
		}
		else {
			throw new \Slim\Exception\HttpInternalServerErrorException ($request, "La page contenant l'application est introuvable");
		}
	}
	else {
		return $response->withStatus(302)->withHeader("Location", "/accueil");
	}
	return $response;
});

$app->get("/[{path:.*}]", function (Request $request, Response $response, $args) {
	$erreur = false;
	try {
		$installeurBaseDeDonnee = new InstalleurBaseDeDonnees("mysql:host=localhost", "root", "");
		$installeurBaseDeDonnee->initialiserBaseDeDonnees();
	}
	catch (ExceptionBaseDeDonneesPlateforme $exception) {
		session_start();
		$_SESSION["exception"] = $exception->toArray();
		$erreur = true;
	}

	if (!$erreur) {
		$templatePageApplication = "./php/templates/templatePageApplication.php";
		if (file_exists($templatePageApplication)) {
			$response->getBody()->write(file_get_contents($templatePageApplication));
		}
		else {
			throw new \Slim\Exception\HttpInternalServerErrorException ($request, "La page contenant l'application est introuvable");
		}
		return $response;
	}
	else {
		return $response->withStatus(302)->withHeader("Location", "/erreur");
	}

	/*try {
		$installeurBaseDeDonnee = new InstalleurBaseDeDonnees("mysql:host=localhost", "root", "");
		$installeurBaseDeDonnee->initialiserBaseDeDonnees();
	}
	catch (ExceptionBaseDeDonneesPlateforme $exception) {
		var_dump($exception);
	}
	$templatePageApplication = "./php/templates/templatePageApplication.php";
	if (file_exists($templatePageApplication)) {
		$response->getBody()->write(file_get_contents($templatePageApplication));
	}
	else {
		throw new \Slim\Exception\HttpInternalServerErrorException ($request, "La page contenant l'application est introuvable");
	}
	return $response;
	*/
});

$app->run();