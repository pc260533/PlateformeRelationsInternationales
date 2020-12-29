<?php

/**
 * ControleurPartenaires short summary.
 *
 * ControleurPartenaires description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class ControleurPartenaires implements IControleurPlateforme {
	private $stockagePartenaires;
	private $gestionFichiers;

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
		if (isset($partenaireArray["listeImagesPartenaire"])) {
			foreach ($partenaireArray["listeImagesPartenaire"] as $imagePartenaireArray) {
				$imagePartenaire = new ImagePartenaire();
				$imagePartenaire->setIdentifiantImagePartenaire($imagePartenaireArray["identifiantImagePartenaire"]);
				$imagePartenaire->setCheminImagePartenaireServeur($imagePartenaireArray["cheminImagePartenaireServeur"]);
				if ($imagePartenaire->getCheminImagePartenaireServeur() != "") {
					$partenaire->ajouterImagePartenaire($imagePartenaire);
					// On supprime l'image partenaire contenue dans le dossiers uploads.
					$this->gestionFichiers->supprimerFichier($imagePartenaire->getCheminImagePartenaireServeur());
				}
			}
		}
		return $partenaire;
	}

	private function intialiserPartenaireAvecFichiersUploads(Partenaire $partenaire, array $uploadedFiles) {
		$nomDossierPartenaire = "partenaire" . $partenaire->getIdentifiantPartenaire();
		$cheminDossierPartenaire = getVariableEnvironnement("CHEMIN_DOSSIER_UPLOADS") . DIRECTORY_SEPARATOR . $nomDossierPartenaire;
		foreach ($uploadedFiles as $uploadedFile) {
			$nomFichier = $uploadedFile->getClientFilename();

			$uploadedFile->moveTo($cheminDossierPartenaire . DIRECTORY_SEPARATOR . $nomFichier);
			$imagePartenaire = new ImagePartenaire();
			$imagePartenaire->setCheminImagePartenaireServeur("uploads/" . $nomDossierPartenaire . "/". $nomFichier);
			$partenaire->ajouterImagePartenaire($imagePartenaire);
		}
	}

	public function __construct() {
		$this->stockagePartenaires = new StockagePartenaires(getVariableEnvironnement("DATASOURCENAME_BASEDEDONNEEPLATEFORME"), getVariableEnvironnement("USERNAME_BASEDEDONNEE"), getVariableEnvironnement("PASSWORD_BASEDEDONNEE"));
		$this->gestionFichiers = new GestionFichiers();
	}

	public function ajouterListeVoeuxDansListePartenaires(array $listeVoeux, array $listePartenaires): void {
		$this->stockagePartenaires->ajouterListeVoeuxDansListePartenaires($listeVoeux, $listePartenaires);
	}

	public function ajouterPartenaire(array $partenaireArray, array $uploadedFiles): Partenaire {
		$partenaire = $this->creerPartenaire($partenaireArray);
		$this->stockagePartenaires->ajouterPartenaire($partenaire);

		$nomDossierPartenaire = "partenaire" . $partenaire->getIdentifiantPartenaire();
		$cheminDossierPartenaire = getVariableEnvironnement("CHEMIN_DOSSIER_UPLOADS") . DIRECTORY_SEPARATOR . $nomDossierPartenaire;
		$this->gestionFichiers->creerDossier($cheminDossierPartenaire);
		$this->intialiserPartenaireAvecFichiersUploads($partenaire, $uploadedFiles);
		$this->stockagePartenaires->ajouterListeImagesPartenaire($partenaire);

		return $partenaire;
	}

	public function supprimerPartenaire(array $partenaireArray): Partenaire {
		$partenaire = $this->creerPartenaire($partenaireArray);

		//Il faut peut être supprimer les fichiers et le dossiers après en lme sortant de initialiser car ils seront supprimé même s'il y a une erreur.
		$nomDossierPartenaire = "partenaire" . $partenaire->getIdentifiantPartenaire();
		$cheminDossierPartenaire = getVariableEnvironnement("CHEMIN_DOSSIER_UPLOADS") . DIRECTORY_SEPARATOR . $nomDossierPartenaire;
		$this->gestionFichiers->supprimerDossier($cheminDossierPartenaire);

		$this->stockagePartenaires->supprimerPartenaire($partenaire);
		return $partenaire;
	}

	public function modifierPartenaire(array $partenaireArray, array $uploadedFiles): Partenaire {
		$partenaire = $this->creerPartenaire($partenaireArray);
		$this->intialiserPartenaireAvecFichiersUploads($partenaire, $uploadedFiles);
		$this->stockagePartenaires->modifierPartenaire($partenaire);
		return $partenaire;
	}

	public function chargerListePartenaires(): array {
		return $this->stockagePartenaires->chargerListePartenaires();
	}

}