<?php

/**
 *
 * ControleurPartenaires est la classe représentant un controleur de partenaires.
 * Elle implémente l'interface IControleurPlateforme.
 *
 * @version 1.0
 * @author Pierre-Nicolas
 */
class ControleurPartenaires implements IControleurPlateforme {
	/**
	 * Le stockage de partenaires.
	 * @var StockagePartenaires
	 */
	private $stockagePartenaires;
	/**
	 * La gestion de fichiers.
	 * @var GestionFichiers
	 */
	private $gestionFichiers;

	/**
	 * Créer un partenaire à partir d'un tableau
	 * @param array $partenaireArray Le tableau représentant un partenaire.
	 * @return Partenaire Le partenaire créé.
	 */
	public function creerPartenaire(array $partenaireArray): Partenaire {
		$partenaire = new Partenaire();
		if (isset($partenaireArray["identifiantPartenaire"])) {
			$partenaire->setIdentifiantPartenaire($partenaireArray["identifiantPartenaire"]);
		}
		if (isset($partenaireArray["nomPartenaire"])) {
			$partenaire->setNomPartenaire($partenaireArray["nomPartenaire"]);
		}
		if (isset($partenaireArray["lienPartenaire"])) {
			$partenaire->setLienPartenaire($partenaireArray["lienPartenaire"]);
		}
		if (isset($partenaireArray["informationLogementPartenaire"])) {
			$partenaire->setInformationLogementPartenaire($partenaireArray["informationLogementPartenaire"]);
		}
		if (isset($partenaireArray["informationCoutPartenaire"])) {
			$partenaire->setInformationCoutPartenaire($partenaireArray["informationCoutPartenaire"]);
		}
		$localisationPartenaire = new Localisation();
		if (isset($partenaireArray["localisationPartenaire"]["identifiantLocalisation"])) {
			$localisationPartenaire->setIdentifiantLocalisation($partenaireArray["localisationPartenaire"]["identifiantLocalisation"]);
		}
		if (isset($partenaireArray["localisationPartenaire"]["latitudeLocalisation"])) {
			$localisationPartenaire->setLatitudeLocalisation($partenaireArray["localisationPartenaire"]["latitudeLocalisation"]);
		}
		if (isset($partenaireArray["localisationPartenaire"]["longitudeLocalisation"])) {
			$localisationPartenaire->setLongitudeLocalisation($partenaireArray["localisationPartenaire"]["longitudeLocalisation"]);
		}
		if (isset($partenaireArray["localisationPartenaire"]["nomLocalisation"])) {
			$localisationPartenaire->setNomLocalisation($partenaireArray["localisationPartenaire"]["nomLocalisation"]);
		}
		if (isset($partenaireArray["localisationPartenaire"]["nomPaysLocalisation"])) {
			$localisationPartenaire->setNomPaysLocalisation($partenaireArray["localisationPartenaire"]["nomPaysLocalisation"]);
		}
		if (isset($partenaireArray["localisationPartenaire"]["codePaysLocalisation"])) {
			$localisationPartenaire->setCodePaysLocalisation($partenaireArray["localisationPartenaire"]["codePaysLocalisation"]);
		}
		$partenaire->setLocalisationPartenaire($localisationPartenaire);
		$coutPartenaire = new Cout();
		if (isset($partenaireArray["coutPartenaire"]["identifiantCout"])) {
			$coutPartenaire->setIdentifiantCout($partenaireArray["coutPartenaire"]["identifiantCout"]);
		}
		$partenaire->setCoutPartenaire($coutPartenaire);
		$etatPartenaire = new EtatPartenaire();
		if (isset($partenaireArray["etatPartenaire"]["identifiantEtatPartenaire"])) {
			$etatPartenaire->setIdentifiantEtatPartenaire($partenaireArray["etatPartenaire"]["identifiantEtatPartenaire"]);
		}
		$partenaire->setEtatPartenaire($etatPartenaire);
		if (isset($partenaireArray["listeDomainesDeCompetencesPartenaire"])) {
			foreach ($partenaireArray["listeDomainesDeCompetencesPartenaire"] as $domaineDeCompetenceArray) {
				$domaineDeCompetence = new DomaineDeCompetence();
				$domaineDeCompetence->setIdentifiantDomaineDeCompetence($domaineDeCompetenceArray["identifiantDomaineDeCompetence"]);
				$partenaire->ajouterDomaineDeCompetence($domaineDeCompetence);
			}
		}
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
		if (isset($partenaireArray["listeContactsEtrangersPartenaire"])) {
			foreach ($partenaireArray["listeContactsEtrangersPartenaire"] as $contactEtrangeArray) {
				$contactEtrange = new ContactEtranger();
				$contactEtrange->setIdentifiantContact($contactEtrangeArray["identifiantContact"]);
				$partenaire->ajouterContactEtranger($contactEtrange);
			}
		}
		if (isset($partenaireArray["listeCoordinateursPartenaire"])) {
			foreach ($partenaireArray["listeCoordinateursPartenaire"] as $coordinateurArray) {
				$coordinateur = new Coordinateur();
				$coordinateur->setIdentifiantContact($coordinateurArray["identifiantContact"]);
				$partenaire->ajouterCoordinateur($coordinateur);
			}
		}
		if (isset($partenaireArray["listeVoeuxPartenaire"])) {
			foreach ($partenaireArray["listeVoeuxPartenaire"] as $voeuArray) {
				$voeu = new Voeu();
				$voeu->setIdentifiantVoeu($voeuArray["identifiantVoeu"]);
				$partenaire->ajouterVoeu($voeu);
			}
		}
		if (isset($partenaireArray["listeFichiersPartenaire"])) {
			foreach ($partenaireArray["listeFichiersPartenaire"] as $fichierPartenaireArray) {
				$fichierPartenaire = new FichierPartenaire();
				$fichierPartenaire->setIdentifiantFichierPartenaire($fichierPartenaireArray["identifiantFichierPartenaire"]);
				$fichierPartenaire->setCheminFichierPartenaireServeur($fichierPartenaireArray["cheminFichierPartenaireServeur"]);
				if ($fichierPartenaire->getCheminFichierPartenaireServeur() != "") {
					$partenaire->ajouterFichierPartenaire($fichierPartenaire);
					// On supprime le fichier partenaire contenue dans le dossiers uploads.
					$this->gestionFichiers->supprimerFichier($fichierPartenaire->getCheminFichierPartenaireServeur());
				}
			}
		}
		return $partenaire;
	}

	/**
	 * Initialiser un partenaire en copiant les fichiers uploads dans le dossier du partenaire.
	 * @param Partenaire $partenaire Le partenaire à initialiser.
	 * @param array $uploadedFiles La liste de fichiers à déplacer.
	 */
	private function intialiserPartenaireAvecFichiersUploads(Partenaire $partenaire, array $uploadedFiles) {
		$nomDossierPartenaire = "partenaire" . $partenaire->getIdentifiantPartenaire();
		$cheminDossierPartenaire = getVariableEnvironnement("CHEMIN_DOSSIER_UPLOADS") . DIRECTORY_SEPARATOR . $nomDossierPartenaire;
		foreach ($uploadedFiles as $uploadedFile) {
			$nomFichier = $uploadedFile->getClientFilename();

			$uploadedFile->moveTo($cheminDossierPartenaire . DIRECTORY_SEPARATOR . $nomFichier);
			$fichierPartenaire = new FichierPartenaire();
			$fichierPartenaire->setCheminFichierPartenaireServeur("uploads/" . $nomDossierPartenaire . "/". $nomFichier);
			$partenaire->ajouterFichierPartenaire($fichierPartenaire);
		}
	}

	/**
	 * Constructeur ControleurPartenaires sans paramètres.
	 */
	public function __construct() {
		$this->stockagePartenaires = new StockagePartenaires(getVariableEnvironnement("DATASOURCENAME_BASEDEDONNEEPLATEFORME"), getVariableEnvironnement("USERNAME_BASEDEDONNEE"), getVariableEnvironnement("PASSWORD_BASEDEDONNEE"));
		$this->gestionFichiers = new GestionFichiers();
	}

	/**
	 * Ajouter une liste des voeux dans la liste des partenaires.
	 * @param array $listeVoeux La liste des voeux à ajouter.
	 * @param array $listePartenaires La liste des partenaires.
	 */
	public function ajouterListeVoeuxDansListePartenaires(array $listeVoeux, array $listePartenaires): void {
		$this->stockagePartenaires->ajouterListeVoeuxDansListePartenaires($listeVoeux, $listePartenaires);
	}

	/**
	 * Ajouter un partenaire.
	 * @param array $partenaireArray Le tableau représentant un partenaire.
	 * @param array $uploadedFiles Les fichiers à déplacer dans le dossier du partenaire.
	 * @return Partenaire Le partenaire ajouté.
	 */
	public function ajouterPartenaire(array $partenaireArray, array $uploadedFiles): Partenaire {
		$partenaire = $this->creerPartenaire($partenaireArray);
		$this->stockagePartenaires->ajouterPartenaire($partenaire);

		$nomDossierPartenaire = "partenaire" . $partenaire->getIdentifiantPartenaire();
		$cheminDossierPartenaire = getVariableEnvironnement("CHEMIN_DOSSIER_UPLOADS") . DIRECTORY_SEPARATOR . $nomDossierPartenaire;
		$this->gestionFichiers->creerDossier($cheminDossierPartenaire);
		$this->intialiserPartenaireAvecFichiersUploads($partenaire, $uploadedFiles);
		$this->stockagePartenaires->ajouterListeFichiersPartenaire($partenaire);

		return $partenaire;
	}

	/**
	 * Supprimer un partenaire.
	 * @param array $partenaireArray Le tableau représentant un partenaire.
	 * @return Partenaire Le partenaire supprimé.
	 */
	public function supprimerPartenaire(array $partenaireArray): Partenaire {
		$partenaire = $this->creerPartenaire($partenaireArray);

		//Il faut peut être supprimer les fichiers et le dossiers après en le sortant de initialiser car ils seront supprimé même s'il y a une erreur.
		$nomDossierPartenaire = "partenaire" . $partenaire->getIdentifiantPartenaire();
		$cheminDossierPartenaire = getVariableEnvironnement("CHEMIN_DOSSIER_UPLOADS") . DIRECTORY_SEPARATOR . $nomDossierPartenaire;
		$this->gestionFichiers->supprimerDossier($cheminDossierPartenaire);

		$this->stockagePartenaires->supprimerPartenaire($partenaire);
		return $partenaire;
	}

	/**
	 * Modifier un partenaire.
	 * @param array $partenaireArray Le tableau représentant un partenaire.
	 * @param array $uploadedFiles Les nouveaux fichiers à déplacer dans le dossier du partenaire.
	 * @return Partenaire Le partenaire modifié.
	 */
	public function modifierPartenaire(array $partenaireArray, array $uploadedFiles): Partenaire {
		$partenaire = $this->creerPartenaire($partenaireArray);
		$this->intialiserPartenaireAvecFichiersUploads($partenaire, $uploadedFiles);
		$this->stockagePartenaires->modifierPartenaire($partenaire);
		return $partenaire;
	}

	/**
	 * Retourner la liste des partenaires.
	 * @return array La liste des partenaires.
	 */
	public function chargerListePartenaires(): array {
		return $this->stockagePartenaires->chargerListePartenaires();
	}

}