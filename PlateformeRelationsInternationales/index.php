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
require __DIR__ . "./php/modele/ContactEtranger.php";
require __DIR__ . "./php/modele/Coordinateur.php";
require __DIR__ . "./php/modele/Localisation.php";
require __DIR__ . "./php/modele/Mobilite.php";
require __DIR__ . "./php/modele/Partenaire.php";
require __DIR__ . "./php/modele/Plateforme.php";
require __DIR__ . "./php/modele/SousSpecialite.php";
require __DIR__ . "./php/modele/Specialite.php";
require __DIR__ . "./php/modele/ImagePartenaire.php";
require __DIR__ . "./php/modele/Cout.php";
require __DIR__ . "./php/modele/EtatPartenaire.php";
require __DIR__ . "./php/modele/Voeu.php";
require __DIR__ . "./php/modele/DomaineDeCompetence.php";
require __DIR__ . "./php/modele/Utilisateur.php";
require __DIR__ . "./php/modele/TemplateMail.php";
require __DIR__ . "./php/modele/ContactMail.php";
require __DIR__ . "./php/modele/Mail.php";

require __DIR__ . "./php/gestionMails/ContactMailGestionMails.php";
require __DIR__ . "./php/gestionMails/MailGestionMails.php";
require __DIR__ . "./php/gestionMails/GestionMails.php";

require __DIR__ . "./php/stockage/StockageBaseDeDonnees.php";
require __DIR__ . "./php/stockage/InstalleurBaseDeDonnees.php";
require __DIR__ . "./php/stockage/StockageSpecialites.php";
require __DIR__ . "./php/stockage/StockageMobilites.php";
require __DIR__ . "./php/stockage/StockagePartenaires.php";
require __DIR__ . "./php/stockage/StockageAidesFinancieres.php";
require __DIR__ . "./php/stockage/StockageContacts.php";
require __DIR__ . "./php/stockage/StockageContactsEtrangers.php";
require __DIR__ . "./php/stockage/StockageCoordinateurs.php";
require __DIR__ . "./php/stockage/StockageCouts.php";
require __DIR__ . "./php/stockage/StockageEtatsPartenaires.php";
require __DIR__ . "./php/stockage/StockageVoeux.php";
require __DIR__ . "./php/stockage/StockageTemplatesMails.php";
require __DIR__ . "./php/stockage/StockageDomainesDeCompetences.php";
require __DIR__ . "./php/stockage/StockageMails.php";
require __DIR__ . "./php/stockage/StockageUtilisateurs.php";
require __DIR__ . "./php/stockage/GestionFichiers.php";

require __DIR__ . "./php/controleurs/IControleurPlateforme.php";
require __DIR__ . "./php/controleurs/ControleurSpecialites.php";
require __DIR__ . "./php/controleurs/ControleurMobilites.php";
require __DIR__ . "./php/controleurs/ControleurPartenaires.php";
require __DIR__ . "./php/controleurs/ControleurAidesFinancieres.php";
require __DIR__ . "./php/controleurs/ControleurContactsEtrangers.php";
require __DIR__ . "./php/controleurs/ControleurCoordinateurs.php";
require __DIR__ . "./php/controleurs/ControleurCouts.php";
require __DIR__ . "./php/controleurs/ControleurEtatsPartenaires.php";
require __DIR__ . "./php/controleurs/ControleurVoeux.php";
require __DIR__ . "./php/controleurs/ControleurTemplatesMails.php";
require __DIR__ . "./php/controleurs/ControleurDomainesDeCompetences.php";
require __DIR__ . "./php/controleurs/ControleurUtilisateurs.php";
require __DIR__ . "./php/controleurs/ControleurAuthentification.php";
require __DIR__ . "./php/controleurs/ControleurMails.php";

require __DIR__ . "./php/exception/ExceptionSerializable.php";
require __DIR__ . "./php/exception/ExceptionBaseDeDonneesPlateforme.php";
require __DIR__ . "./php/exception/ExceptionVoeuxDejaValides.php";
require __DIR__ . "./php/exception/ExceptionGestionMails.php";
require __DIR__ . "./php/exception/ExceptionAuthentification.php";
require __DIR__ . "./php/exception/ExceptionUtilisateurDeconnecte.php";

function getVariableEnvironnement(string $variableEnvironnement): string {
	$res = "";
	if (isset($_ENV[$variableEnvironnement])) {
		$res = $_ENV[$variableEnvironnement];
	}
	return $res;
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

	$response = $app->getResponseFactory()->createResponse();

	if ($exception instanceof ExceptionBaseDeDonneesPlateforme) {
		$json = json_encode($exception->toArray());
		$status = $exception->getStatus();
	}
	else if ($exception instanceof ExceptionGestionMails) {
		$json = json_encode($exception->toArray());
		$status = $exception->getStatus();
	}
	else if ($exception instanceof ExceptionAuthentification) {
		$json = json_encode($exception->toArray());
		$status = $exception->getStatus();
	}
	else if ($exception instanceof ExceptionUtilisateurDeconnecte) {
		$json = json_encode($exception->toArray());
		$status = $exception->getStatus();
	}
	else if ($exception instanceof ExceptionVoeuxDejaValides) {
		session_start();
		$_SESSION["exception"] = $exception->toArray();
		return $response->withStatus(302)->withHeader("Location", "/erreur");
	}
	else {
		$exceptionBaseDeDonneesPlateforme = new ExceptionBaseDeDonneesPlateforme($exception);
		$json = json_encode($exceptionBaseDeDonneesPlateforme->toArray());
	}

	$response->getBody()->write($json);

	return $response->withStatus($status)->withHeader("Content-Type", "application/json");
};

$errorMiddleware = $app->addErrorMiddleware(true, true, true, null);
$errorMiddleware->setDefaultErrorHandler($customErrorHandler);

require __DIR__ . "./php/rest/specialites.php";
require __DIR__ . "./php/rest/mobilites.php";
require __DIR__ . "./php/rest/partenaires.php";
require __DIR__ . "./php/rest/aidesFinancieres.php";
require __DIR__ . "./php/rest/contactsEtrangers.php";
require __DIR__ . "./php/rest/coordinateurs.php";
require __DIR__ . "./php/rest/couts.php";
require __DIR__ . "./php/rest/etatsPartenaires.php";
require __DIR__ . "./php/rest/voeux.php";
require __DIR__ . "./php/rest/templatesMails.php";
require __DIR__ . "./php/rest/domainesDeCompetences.php";
require __DIR__ . "./php/rest/mails.php";
require __DIR__ . "./php/rest/utilisateurs.php";
require __DIR__ . "./php/rest/authentification.php";

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
	try {
		$installeurBaseDeDonnee = new InstalleurBaseDeDonnees(getVariableEnvironnement("DATASOURCENAME_BASEDEDONNEE"), getVariableEnvironnement("USERNAME_BASEDEDONNEE"), getVariableEnvironnement("PASSWORD_BASEDEDONNEE"));
		$installeurBaseDeDonnee->initialiserBaseDeDonnees();
		$templatePageApplication = "./php/templates/templatePageApplication.php";
		if (file_exists($templatePageApplication)) {
			$response->getBody()->write(file_get_contents($templatePageApplication));
		}
		else {
			throw new \Slim\Exception\HttpInternalServerErrorException ($request, "La page contenant l'application est introuvable");
		}
		return $response;
	}
	catch (ExceptionBaseDeDonneesPlateforme $exception) {
		session_start();
		$_SESSION["exception"] = $exception->toArray();
		return $response->withStatus(302)->withHeader("Location", "/erreur");
	}
});

$app->run();