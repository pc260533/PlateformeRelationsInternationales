<?php

/**
 * StockageBaseDeDonnees short summary.
 *
 * StockageBaseDeDonnees description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class StockageBaseDeDonnees {
	/**
	 * Le data source name de la base de données.
	 * @var mixed
	 */
	private $dataSourceName;
	/**
	 * Le nom d'utilisateur de la base de données.
	 * @var mixed
	 */
	private $username;
	/**
	 * Le mot de passe de la base de données.
	 * @var mixed
	 */
	private $password;
	/**
	 * L'instance de pdo.
	 * @var mixed
	 */
	private $pdo;

	private function ajouterLocalisation(Localisation $localisation) {
		$requete = "INSERT INTO LOCALISATION(LATITUDELOCALISATION, LONGITUDELOCALISATION) VALUES (:latitudelocalisation, :longitudelocalisation);";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":latitudelocalisation", $localisation->getLatitudeLocalisation(), PDO::PARAM_STR);
		$statement->bindValue(":longitudelocalisation", $localisation->getLongitudeLocalisation(), PDO::PARAM_STR);
		$statement->execute();
		$localisation->setIdentifiantLocalisation(intval($this->pdo->lastInsertId()));
	}

	private function supprimerLocalisation(Localisation $localisation) {
		$requete = "DELETE FROM LOCALISATION " .
				   "WHERE IDENTIFIANTLOCALISATION = :identifiantlocalisation";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantlocalisation", $localisation->getIdentifiantLocalisation(), PDO::PARAM_INT);
		$statement->execute();
	}

	private function modifierLocalisation(Localisation $localisation) {
		$requete = "UPDATE LOCALISATION " .
				   "SET LATITUDELOCALISATION = :latitudelocalisation, LONGITUDELOCALISATION = :longitudelocalisation " .
				   "WHERE IDENTIFIANTLOCALISATION = :identifiantlocalisation;";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":latitudelocalisation", $localisation->getLatitudeLocalisation(), PDO::PARAM_STR);
		$statement->bindValue(":longitudelocalisation", $localisation->getLongitudeLocalisation(), PDO::PARAM_STR);
		$statement->bindValue(":identifiantlocalisation", $localisation->getIdentifiantLocalisation(), PDO::PARAM_INT);
		$statement->execute();
	}

	private function chargerListeSousSpecialites(Specialite $specialite): void {
		$requete = "SELECT IDENTIFIANTSOUSSPECIALITE, NOMSOUSSPECIALITE ".
				   "FROM SOUSSPECIALITE ".
				   "WHERE IDENTIFIANTSPECIALITE = :identifiantspecialite;";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantspecialite", $specialite->getIdentifiantSpecialite(), PDO::PARAM_INT);
		$statement->execute();
		$donnees = $statement->fetchAll();
		foreach ($donnees as $ligne) {
			$sousSpecialite = new SousSpecialite();
			$sousSpecialite->setIdentifiantSousSpecialite($ligne["IDENTIFIANTSOUSSPECIALITE"]);
			$sousSpecialite->setNomSousSpecialite($ligne["NOMSOUSSPECIALITE"]);
			$specialite->ajouterSousSpecialite($sousSpecialite);
		}
	}

	private function chargerLocalisationPartenaire(Localisation $localisation): void {
		$requete = "SELECT LATITUDELOCALISATION, LONGITUDELOCALISATION ".
				   "FROM LOCALISATION ".
				   "WHERE IDENTIFIANTLOCALISATION = :identifiantlocalisation;";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantlocalisation", $localisation->getIdentifiantLocalisation(), PDO::PARAM_INT);
		$statement->execute();
		$donnees = $statement->fetchAll();
		foreach ($donnees as $ligne) {
			$localisation->setLatitudeLocalisation($ligne["LATITUDELOCALISATION"]);
			$localisation->setLongitudeLocalisation($ligne["LONGITUDELOCALISATION"]);
		}
	}

	private function chargerSousSpecialitesDansPartenaire(Partenaire $partenaire): void {
		$requete = "SELECT IDENTIFIANTSOUSSPECIALITE ".
				   "FROM CORRESPONDANCE_PARTENAIRE_SOUSSPECIALITE ".
				   "WHERE IDENTIFIANTPARTENAIRE = :identifiantpartenaire;";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantpartenaire", $partenaire->getIdentifiantPartenaire(), PDO::PARAM_INT);
		$statement->execute();
		$donnees = $statement->fetchAll();
		foreach ($donnees as $ligne) {
			$sousSpecialite = new SousSpecialite();
			$sousSpecialite->setIdentifiantSousSpecialite($ligne["IDENTIFIANTSOUSSPECIALITE"]);
			$partenaire->ajouterSousSpecialite($sousSpecialite);
		}
	}

	private function chargerMobilitesDansPartenaire(Partenaire $partenaire): void {
		$requete = "SELECT IDENTIFIANTMOBILITE ".
				   "FROM CORRESPONDANCE_PARTENAIRE_MOBILITE ".
				   "WHERE IDENTIFIANTPARTENAIRE = :identifiantpartenaire;";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantpartenaire", $partenaire->getIdentifiantPartenaire(), PDO::PARAM_INT);
		$statement->execute();
		$donnees = $statement->fetchAll();
		foreach ($donnees as $ligne) {
			$mobilite = new Mobilite();
			$mobilite->setIdentifiantMobilite($ligne["IDENTIFIANTMOBILITE"]);
			$partenaire->ajouterMobilite($mobilite);
		}
	}

	private function chargerAidesFinancieresDansPartenaire(Partenaire $partenaire): void {
		$requete = "SELECT IDENTIFIANTAIDEFINANCIERE ".
				   "FROM CORRESPONDANCE_PARTENAIRE_AIDEFINANCIERE ".
				   "WHERE IDENTIFIANTPARTENAIRE = :identifiantpartenaire;";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantpartenaire", $partenaire->getIdentifiantPartenaire(), PDO::PARAM_INT);
		$statement->execute();
		$donnees = $statement->fetchAll();
		foreach ($donnees as $ligne) {
			$aideFinanciere = new AideFinanciere();
			$aideFinanciere->setIdentifiantAideFinanciere($ligne["IDENTIFIANTAIDEFINANCIERE"]);
			$partenaire->ajouterAideFinanciere($aideFinanciere);
		}
	}

	private function chargerContactsDansPartenaire(Partenaire $partenaire): void {
		$requete = "SELECT IDENTIFIANTCONTACT ".
				   "FROM CORRESPONDANCE_PARTENAIRE_CONTACT ".
				   "WHERE IDENTIFIANTPARTENAIRE = :identifiantpartenaire;";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantpartenaire", $partenaire->getIdentifiantPartenaire(), PDO::PARAM_INT);
		$statement->execute();
		$donnees = $statement->fetchAll();
		foreach ($donnees as $ligne) {
			$contact = new Contact();
			$contact->setIdentifiantContact($ligne["IDENTIFIANTCONTACT"]);
			$partenaire->ajouterContact($contact);
		}
	}

	private function ajouterSousSpecialiteDansPartenaire(Partenaire $partenaire, SousSpecialite $sousSpecialite) {
		$requete = "INSERT INTO CORRESPONDANCE_PARTENAIRE_SOUSSPECIALITE(IDENTIFIANTPARTENAIRE, IDENTIFIANTSOUSSPECIALITE) VALUES (:identifiantpartenaire, :identifiantsousspecialite);";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantpartenaire", $partenaire->getIdentifiantPartenaire(), PDO::PARAM_INT);
		$statement->bindValue(":identifiantsousspecialite", $sousSpecialite->getIdentifiantSousSpecialite(), PDO::PARAM_INT);
		$statement->execute();
	}

	private function supprimerSousSpecialiteDansPartenaire(Partenaire $partenaire, SousSpecialite $sousSpecialite) {
		$requete = "DELETE FROM CORRESPONDANCE_PARTENAIRE_SOUSSPECIALITE " .
				   "WHERE IDENTIFIANTPARTENAIRE = :identifiantpartenaire AND IDENTIFIANTSOUSSPECIALITE = :identifiantsousspecialite;";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantpartenaire", $partenaire->getIdentifiantPartenaire(), PDO::PARAM_INT);
		$statement->bindValue(":identifiantsousspecialite", $sousSpecialite->getIdentifiantSousSpecialite(), PDO::PARAM_INT);
		$statement->execute();
	}
	private function supprimerToutesSousSpecialitesDansPartenaire(Partenaire $partenaire) {
		$requete = "DELETE FROM CORRESPONDANCE_PARTENAIRE_SOUSSPECIALITE " .
				   "WHERE IDENTIFIANTPARTENAIRE = :identifiantpartenaire;";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantpartenaire", $partenaire->getIdentifiantPartenaire(), PDO::PARAM_INT);
		$statement->execute();
	}

	private function ajouterMobiliteDansPartenaire(Partenaire $partenaire, Mobilite $mobilite) {
		$requete = "INSERT INTO CORRESPONDANCE_PARTENAIRE_MOBILITE(IDENTIFIANTPARTENAIRE, IDENTIFIANTMOBILITE) VALUES (:identifiantpartenaire, :identifiantmobilite);";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantpartenaire", $partenaire->getIdentifiantPartenaire(), PDO::PARAM_INT);
		$statement->bindValue(":identifiantmobilite", $mobilite->getIdentifiantMobilite(), PDO::PARAM_INT);
		$statement->execute();
	}

	private function supprimerMobiliteDansPartenaire(Partenaire $partenaire, Mobilite $mobilite) {
		$requete = "DELETE FROM CORRESPONDANCE_PARTENAIRE_MOBILITE " .
				   "WHERE IDENTIFIANTPARTENAIRE = :identifiantpartenaire AND IDENTIFIANTMOBILITE = :identifiantmobilite;";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantpartenaire", $partenaire->getIdentifiantPartenaire(), PDO::PARAM_INT);
		$statement->bindValue(":identifiantmobilite", $mobilite->getIdentifiantMobilite(), PDO::PARAM_INT);
		$statement->execute();
	}
	private function supprimerToutesMobilitesDansPartenaire(Partenaire $partenaire) {
		$requete = "DELETE FROM CORRESPONDANCE_PARTENAIRE_MOBILITE " .
				   "WHERE IDENTIFIANTPARTENAIRE = :identifiantpartenaire;";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantpartenaire", $partenaire->getIdentifiantPartenaire(), PDO::PARAM_INT);
		$statement->execute();
	}

	private function ajouterContactDansPartenaire(Partenaire $partenaire, Contact $contact) {
		$requete = "INSERT INTO CORRESPONDANCE_PARTENAIRE_CONTACT(IDENTIFIANTPARTENAIRE, IDENTIFIANTCONTACT) VALUES (:identifiantpartenaire, :identifiantcontact);";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantpartenaire", $partenaire->getIdentifiantPartenaire(), PDO::PARAM_INT);
		$statement->bindValue(":identifiantcontact", $contact->getIdentifiantContact(), PDO::PARAM_INT);
		$statement->execute();
	}

	private function supprimerContactDansPartenaire(Partenaire $partenaire, Contact $contact) {
		$requete = "DELETE FROM CORRESPONDANCE_PARTENAIRE_CONTACT " .
				   "WHERE IDENTIFIANTPARTENAIRE = :identifiantpartenaire AND IDENTIFIANTCONTACT = :identifiantcontact;";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantpartenaire", $partenaire->getIdentifiantPartenaire(), PDO::PARAM_INT);
		$statement->bindValue(":identifiantcontact", $contact->getIdentifiantContact(), PDO::PARAM_INT);
		$statement->execute();
	}
	private function supprimerTousContactsDansPartenaire(Partenaire $partenaire) {
		$requete = "DELETE FROM CORRESPONDANCE_PARTENAIRE_CONTACT " .
				   "WHERE IDENTIFIANTPARTENAIRE = :identifiantpartenaire;";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantpartenaire", $partenaire->getIdentifiantPartenaire(), PDO::PARAM_INT);
		$statement->execute();
	}

	private function ajouterAideFinanciereDansPartenaire(Partenaire $partenaire, AideFinanciere $aideFinanciere) {
		$requete = "INSERT INTO CORRESPONDANCE_PARTENAIRE_AIDEFINANCIERE(IDENTIFIANTPARTENAIRE, IDENTIFIANTAIDEFINANCIERE) VALUES (:identifiantpartenaire, :identifiantaidefinanciere);";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantpartenaire", $partenaire->getIdentifiantPartenaire(), PDO::PARAM_INT);
		$statement->bindValue(":identifiantaidefinanciere", $aideFinanciere->getIdentifiantAideFinanciere(), PDO::PARAM_INT);
		$statement->execute();
	}

	private function supprimerAideFinanciereDansPartenaire(Partenaire $partenaire, AideFinanciere $aideFinanciere) {
		$requete = "DELETE FROM CORRESPONDANCE_PARTENAIRE_AIDEFINANCIERE " .
				   "WHERE IDENTIFIANTPARTENAIRE = :identifiantpartenaire AND IDENTIFIANTAIDEFINANCIERE = :identifiantaidefinanciere;";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantpartenaire", $partenaire->getIdentifiantPartenaire(), PDO::PARAM_INT);
		$statement->bindValue(":identifiantaidefinanciere", $aideFinanciere->getIdentifiantAideFinanciere(), PDO::PARAM_INT);
		$statement->execute();
	}

	private function supprimerToutesAidesFinancieresDansPartenaire(Partenaire $partenaire) {
		$requete = "DELETE FROM CORRESPONDANCE_PARTENAIRE_AIDEFINANCIERE " .
				   "WHERE IDENTIFIANTPARTENAIRE = :identifiantpartenaire;";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantpartenaire", $partenaire->getIdentifiantPartenaire(), PDO::PARAM_INT);
		$statement->execute();
	}

	private function ajouterImagePartenaire(ImagePartenaire $imagePartenaire) {
		$requete = "INSERT INTO IMAGEPARTENAIRE(CHEMINIMAGEPARTENAIRESERVEUR) VALUES (:cheminimagepartenaireserveur);";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":cheminimagepartenaireserveur", $imagePartenaire->getCheminImagePartenaireServeur(), PDO::PARAM_STR);
		$statement->execute();
		$imagePartenaire->setIdentifiantImagePartenaire(intval($this->pdo->lastInsertId()));
	}

	private function supprimerImagePartenaire(ImagePartenaire $imagePartenaire) {
		$requete = "DELETE FROM IMAGEPARTENAIRE " .
				   "WHERE IDENTIFIANTIMAGEPARTENAIRE = :identifiantimagepartenaire";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantimagepartenaire", $imagePartenaire->getIdentifiantImagePartenaire(), PDO::PARAM_INT);
		$statement->execute();
	}

	private function ajouterImagePartenaireDansPartenaire(Partenaire $partenaire, ImagePartenaire $imagePartenaire) {
		$requete = "INSERT INTO CORRESPONDANCE_PARTENAIRE_IMAGEPARTENAIRE(IDENTIFIANTPARTENAIRE, IDENTIFIANTIMAGEPARTENAIRE) VALUES (:identifiantpartenaire, :identifiantimagepartenaire);";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantpartenaire", $partenaire->getIdentifiantPartenaire(), PDO::PARAM_INT);
		$statement->bindValue(":identifiantimagepartenaire", $imagePartenaire->getIdentifiantImagePartenaire(), PDO::PARAM_INT);
		$statement->execute();
	}

	private function supprimerImagePartenaireDansPartenaire(Partenaire $partenaire, ImagePartenaire $imagePartenaire) {
		$requete = "DELETE FROM CORRESPONDANCE_PARTENAIRE_IMAGEPARTENAIRE " .
				   "WHERE IDENTIFIANTIMAGEPARTENAIRE = :identifiantpartenaire AND IDENTIFIANTIMAGEPARTENAIRE = :identifiantimagepartenaire;";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantpartenaire", $partenaire->getIdentifiantPartenaire(), PDO::PARAM_INT);
		$statement->bindValue(":identifiantimagepartenaire", $imagePartenaire->getIdentifiantImagePartenaire(), PDO::PARAM_INT);
		$statement->execute();
	}

	private function chargerImagesPartenaireDansPartenaire(Partenaire $partenaire): void {
		$requete = "SELECT CORRESPONDANCE_PARTENAIRE_IMAGEPARTENAIRE.IDENTIFIANTIMAGEPARTENAIRE, IMAGEPARTENAIRE.CHEMINIMAGEPARTENAIRESERVEUR ".
				   "FROM CORRESPONDANCE_PARTENAIRE_IMAGEPARTENAIRE INNER JOIN IMAGEPARTENAIRE ON (CORRESPONDANCE_PARTENAIRE_IMAGEPARTENAIRE.IDENTIFIANTIMAGEPARTENAIRE = IMAGEPARTENAIRE.IDENTIFIANTIMAGEPARTENAIRE)".
				   "WHERE IDENTIFIANTPARTENAIRE = :identifiantpartenaire;";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantpartenaire", $partenaire->getIdentifiantPartenaire(), PDO::PARAM_INT);
		$statement->execute();
		$donnees = $statement->fetchAll();
		foreach ($donnees as $ligne) {
			$imagePartenaire = new ImagePartenaire();
			$imagePartenaire->setIdentifiantImagePartenaire($ligne["IDENTIFIANTIMAGEPARTENAIRE"]);
			$imagePartenaire->setCheminImagePartenaireServeur($ligne["CHEMINIMAGEPARTENAIRESERVEUR"]);
			$partenaire->ajouterImagePartenaire($imagePartenaire);
		}
	}

	public function __construct(string $dataSourceName, string $username, string $password) {
		try {
			$this->dataSourceName = $dataSourceName;
			$this->username = $username;
			$this->password = $password;
			$this->pdo = new PDO($this->dataSourceName, $this->username, $this->password);
			$this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		}
		catch (PDOException $exception) {
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	public function chargerListeSpecialites(): array {
		try {
			$listeSpecialites = array();
			$requete = "SELECT IDENTIFIANTSPECIALITE, NOMSPECIALITE, COULEURSPECIALITE ".
					   "FROM SPECIALITE;";
			$statement = $this->pdo->prepare($requete);
			$statement->execute();
			$donnees = $statement->fetchAll();
			foreach ($donnees as $ligne) {
				$specialite = new Specialite();
				$specialite->setIdentifiantSpecialite($ligne["IDENTIFIANTSPECIALITE"]);
				$specialite->setNomSpecialite($ligne["NOMSPECIALITE"]);
				$specialite->setCouleurSpecialite($ligne["COULEURSPECIALITE"]);
				$this->chargerListeSousSpecialites($specialite);
				$listeSpecialites[] = $specialite->getObjetSerializable();
			}
			return $listeSpecialites;
		}
		catch (PDOException $exception) {
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
		catch (TypeError $exception) {
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
		catch (Exception $exception) {
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
		catch (Throwable $exception) {
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	public function chargerListeMobilites(): array {
		try {
			$listeMobilites = array();
			$requete = "SELECT IDENTIFIANTMOBILITE, TYPEMOBILITE ".
					   "FROM MOBILITE;";
			$statement = $this->pdo->prepare($requete);
			$statement->execute();
			$donnees = $statement->fetchAll();
			foreach ($donnees as $ligne) {
				$mobilite = new Mobilite();
				$mobilite->setIdentifiantMobilite($ligne["IDENTIFIANTMOBILITE"]);
				$mobilite->setTypeMobilite($ligne["TYPEMOBILITE"]);
				$listeMobilites[] = $mobilite->getObjetSerializable();
			}
			return $listeMobilites;
		}
		catch (PDOException $exception) {
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
		catch (TypeError $exception) {
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
		catch (Exception $exception) {
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
		catch (Throwable $exception) {
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	public function ajouterPartenaire(Partenaire $partenaire): void {
		try {
			$this->pdo->beginTransaction();

			$this->ajouterLocalisation($partenaire->getLocalisationPartenaire());

			$requete = "INSERT INTO PARTENAIRE(NOMPARTENAIRE, DOMAINEDECOMPETENCEPARTENAIRE, IDENTIFIANTLOCALISATION, INFORMATIONLOGEMENTPARTENAIRE, INFORMATIONCOUTPARTENAIRE) VALUES (:nompartenaire, :domainedecompetencepartenaire, :identifiantlocalisation, :informationlogementpartenaire, :informationcoutpartenaire);";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":nompartenaire", $partenaire->getNomPartenaire(), PDO::PARAM_STR);
			$statement->bindValue(":domainedecompetencepartenaire", $partenaire->getDomaineDeCompetencePartenaire(), PDO::PARAM_STR);
			$statement->bindValue(":identifiantlocalisation", $partenaire->getLocalisationPartenaire()->getIdentifiantLocalisation(), PDO::PARAM_INT);
			$statement->bindValue(":informationlogementpartenaire", $partenaire->getInformationLogementPartenaire(), PDO::PARAM_STR);
			$statement->bindValue(":informationcoutpartenaire", $partenaire->getInformationCoutPartenaire(), PDO::PARAM_STR);
			$statement->execute();
			$partenaire->setIdentifiantPartenaire(intval($this->pdo->lastInsertId()));

			foreach ($partenaire->getListeSousSpecialitesPartenaire() as $sousSpecialite) {
				$this->ajouterSousSpecialiteDansPartenaire($partenaire, $sousSpecialite);
			}
			foreach ($partenaire->getListeMobilitesPartenaire() as $mobilite) {
				$this->ajouterMobiliteDansPartenaire($partenaire, $mobilite);
			}
			foreach ($partenaire->getListeAidesFinancieresPartenaire() as $aideFinanciere) {
				$this->ajouterAideFinanciereDansPartenaire($partenaire, $aideFinanciere);
			}
			foreach ($partenaire->getListeContactsPartenaire() as $contact) {
				$this->ajouterContactDansPartenaire($partenaire, $contact);
			}
			/*foreach ($partenaire->getListeImagesPartenaire() as $imagePartenaire) {
				$this->ajouterImagePartenaire($imagePartenaire);
				$this->ajouterImagePartenaireDansPartenaire($partenaire, $imagePartenaire);
			}*/

			$this->pdo->commit();

		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	public function ajouterListeImagesPartenaire(Partenaire $partenaire): void {
		try {
			$this->pdo->beginTransaction();
			foreach ($partenaire->getListeImagesPartenaire() as $imagePartenaire) {
				$this->ajouterImagePartenaire($imagePartenaire);
				$this->ajouterImagePartenaireDansPartenaire($partenaire, $imagePartenaire);
			}
			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	public function supprimerPartenaire(Partenaire $partenaire): void {
		try {
			$this->pdo->beginTransaction();
			$requete = "DELETE FROM PARTENAIRE " .
					   "WHERE IDENTIFIANTPARTENAIRE = :identifiantpartenaire;";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":identifiantpartenaire", $partenaire->getIdentifiantPartenaire(), PDO::PARAM_INT);
			$statement->execute();

			$this->supprimerLocalisation($partenaire->getLocalisationPartenaire());

			foreach ($partenaire->getListeImagesPartenaire() as $imagePartenaire) {
				$this->supprimerImagePartenaire($imagePartenaire);
			}

			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	public function modifierPartenaire(Partenaire $partenaire): void {
		try {
			$this->pdo->beginTransaction();
			$requete = "UPDATE PARTENAIRE " .
					   "SET NOMPARTENAIRE = :nompartenaire, DOMAINEDECOMPETENCEPARTENAIRE = :domainedecompetencepartenaire, IDENTIFIANTLOCALISATION = :identifiantlocalisation, INFORMATIONLOGEMENTPARTENAIRE = :informationlogementpartenaire, INFORMATIONCOUTPARTENAIRE = :informationcoutpartenaire " .
					   "WHERE IDENTIFIANTPARTENAIRE = :identifiantpartenaire;";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":nompartenaire", $partenaire->getNomPartenaire(), PDO::PARAM_STR);
			$statement->bindValue(":domainedecompetencepartenaire", $partenaire->getDomaineDeCompetencePartenaire(), PDO::PARAM_STR);
			$statement->bindValue(":identifiantlocalisation", $partenaire->getLocalisationPartenaire()->getIdentifiantLocalisation(), PDO::PARAM_INT);
			$statement->bindValue(":informationlogementpartenaire", $partenaire->getInformationLogementPartenaire(), PDO::PARAM_STR);
			$statement->bindValue(":informationcoutpartenaire", $partenaire->getInformationCoutPartenaire(), PDO::PARAM_STR);
			$statement->bindValue(":identifiantpartenaire", $partenaire->getIdentifiantPartenaire(), PDO::PARAM_INT);
			$statement->execute();

			$this->modifierLocalisation($partenaire->getLocalisationPartenaire());
			$this->supprimerToutesSousSpecialitesDansPartenaire($partenaire);
			$this->supprimerToutesMobilitesDansPartenaire($partenaire);
			$this->supprimerToutesAidesFinancieresDansPartenaire($partenaire);
			$this->supprimerTousContactsDansPartenaire($partenaire);
			foreach ($partenaire->getListeSousSpecialitesPartenaire() as $sousSpecialite) {
				$this->ajouterSousSpecialiteDansPartenaire($partenaire, $sousSpecialite);
			}
			foreach ($partenaire->getListeMobilitesPartenaire() as $mobilite) {
				$this->ajouterMobiliteDansPartenaire($partenaire, $mobilite);
			}
			foreach ($partenaire->getListeAidesFinancieresPartenaire() as $aideFinanciere) {
				$this->ajouterAideFinanciereDansPartenaire($partenaire, $aideFinanciere);
			}
			foreach ($partenaire->getListeContactsPartenaire() as $contact) {
				$this->ajouterContactDansPartenaire($partenaire, $contact);
			}

			$listeImagesPartenairesASupprimer = array();
			foreach ($partenaire->getListeImagesPartenaire() as $imagePartenaire) {
				if ($imagePartenaire->getIdentifiantImagePartenaire() == 0) {
					$this->ajouterImagePartenaire($imagePartenaire);
					$this->ajouterImagePartenaireDansPartenaire($partenaire, $imagePartenaire);
				}
				else {
					$this->supprimerImagePartenaire($imagePartenaire);
					$listeImagesPartenairesASupprimer[] = $imagePartenaire;
				}
			}
			foreach ($listeImagesPartenairesASupprimer as $imagePartenaire) {
				$partenaire->supprimerImagePartenaire($imagePartenaire);
			}

			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	public function chargerListePartenaires(): array {
		try {
			$listePartenaires = array();
			$requete = "SELECT IDENTIFIANTPARTENAIRE, NOMPARTENAIRE, DOMAINEDECOMPETENCEPARTENAIRE, IDENTIFIANTLOCALISATION, INFORMATIONLOGEMENTPARTENAIRE, INFORMATIONCOUTPARTENAIRE ".
					   "FROM PARTENAIRE;";
			$statement = $this->pdo->prepare($requete);
			$statement->execute();
			$donnees = $statement->fetchAll();
			foreach ($donnees as $ligne) {
				$partenaire = new Partenaire();
				$partenaire->setIdentifiantPartenaire($ligne["IDENTIFIANTPARTENAIRE"]);
				$partenaire->setNomPartenaire($ligne["NOMPARTENAIRE"]);
				$partenaire->setDomaineDeCompetence($ligne["DOMAINEDECOMPETENCEPARTENAIRE"]);
				$partenaire->setInformationLogementPartenaire($ligne["INFORMATIONLOGEMENTPARTENAIRE"]);
				$partenaire->setInformationCoutPartenaire($ligne["INFORMATIONCOUTPARTENAIRE"]);
				$localisation = new Localisation();
				$localisation->setIdentifiantLocalisation($ligne["IDENTIFIANTLOCALISATION"]);
				$partenaire->setLocalisationPartenaire($localisation);

				$this->chargerLocalisationPartenaire($localisation);
				$this->chargerSousSpecialitesDansPartenaire($partenaire);
				$this->chargerMobilitesDansPartenaire($partenaire);
				$this->chargerAidesFinancieresDansPartenaire($partenaire);
				$this->chargerContactsDansPartenaire($partenaire);
				$this->chargerImagesPartenaireDansPartenaire($partenaire);

				$listePartenaires[] = $partenaire->getObjetSerializable();
			}
			return $listePartenaires;
		}
		catch (PDOException $exception) {
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
		catch (TypeError $exception) {
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
		catch (Exception $exception) {
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
		catch (Throwable $exception) {
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	public function ajouterAideFinanciere(AideFinanciere $aideFinanciere): void {
		try {
			$this->pdo->beginTransaction();
			$requete = "INSERT INTO AIDEFINANCIERE(NOMAIDEFINANCIERE) VALUES (:nomaidefinanciere);";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":nomaidefinanciere", $aideFinanciere->getNomAideFinanciere(), PDO::PARAM_STR);
			$statement->execute();
			$aideFinanciere->setIdentifiantAideFinanciere(intval($this->pdo->lastInsertId()));
			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	public function supprimerAideFinanciere(AideFinanciere $aideFinanciere): void {
		try {
			$this->pdo->beginTransaction();
			$requete = "DELETE FROM AIDEFINANCIERE " .
					   "WHERE IDENTIFIANTAIDEFINANCIERE= :identifiantaidefinanciere;";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":identifiantaidefinanciere", $aideFinanciere->getIdentifiantAideFinanciere(), PDO::PARAM_INT);
			$statement->execute();
			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	public function modifierAideFinanciere(AideFinanciere $aideFinanciere): void {
		try {
			$this->pdo->beginTransaction();
			$requete = "UPDATE AIDEFINANCIERE " .
					   "SET NOMAIDEFINANCIERE = :nomaidefinanciere " .
					   "WHERE IDENTIFIANTAIDEFINANCIERE = :identifiantaidefinanciere;";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":nomaidefinanciere", $aideFinanciere->getNomAideFinanciere(), PDO::PARAM_STR);
			$statement->bindValue(":identifiantaidefinanciere", $aideFinanciere->getIdentifiantAideFinanciere(), PDO::PARAM_INT);
			$statement->execute();
			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	public function chargerListeAidesFinancieres(): array {
		try {
			$listeAidesFinancieres = array();
			$requete = "SELECT IDENTIFIANTAIDEFINANCIERE, NOMAIDEFINANCIERE ".
					   "FROM AIDEFINANCIERE;";
			$statement = $this->pdo->prepare($requete);
			$statement->execute();
			$donnees = $statement->fetchAll();
			foreach ($donnees as $ligne) {
				$aideFinanciere = new AideFinanciere();
				$aideFinanciere->setIdentifiantAideFinanciere($ligne["IDENTIFIANTAIDEFINANCIERE"]);
				$aideFinanciere->setNomAideFinanciere($ligne["NOMAIDEFINANCIERE"]);
				$listeAidesFinancieres[] = $aideFinanciere->getObjetSerializable();
			}
			return $listeAidesFinancieres;
		}
		catch (PDOException $exception) {
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
		catch (TypeError $exception) {
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
		catch (Exception $exception) {
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
		catch (Throwable $exception) {
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	public function ajouterContact(Contact $contact): void {
		try {
			$this->pdo->beginTransaction();
			$requete = "INSERT INTO CONTACT(NOMCONTACT, PRENOMCONTACT, ADRESSEMAILCONTACT, FONCTIONCONTACT) VALUES (:nomcontact, :prenomcontact, :adressemailcontact, :fonctioncontact);";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":nomcontact", $contact->getNomContact(), PDO::PARAM_STR);
			$statement->bindValue(":prenomcontact", $contact->getPrenomContact(), PDO::PARAM_STR);
			$statement->bindValue(":adressemailcontact", $contact->getAdresseMailContact(), PDO::PARAM_STR);
			$statement->bindValue(":fonctioncontact", $contact->getFonctionContact(), PDO::PARAM_STR);
			$statement->execute();
			$contact->setIdentifiantContact(intval($this->pdo->lastInsertId()));
			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	public function supprimerContact(Contact $contact): void {
		try {
			$this->pdo->beginTransaction();
			$requete = "DELETE FROM CONTACT " .
					   "WHERE IDENTIFIANTCONTACT = :identifiantcontact;";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":identifiantcontact", $contact->getIdentifiantContact(), PDO::PARAM_INT);
			$statement->execute();
			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	public function modifierContact(Contact $contact): void {
		try {
			$this->pdo->beginTransaction();
			$requete = "UPDATE CONTACT " .
					   "SET NOMCONTACT = :nomcontact, PRENOMCONTACT = :prenomcontact, ADRESSEMAILCONTACT = :adressemailcontact, FONCTIONCONTACT = :fonctioncontact " .
					   "WHERE IDENTIFIANTCONTACT = :identifiantcontact;";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":nomcontact", $contact->getNomContact(), PDO::PARAM_STR);
			$statement->bindValue(":prenomcontact", $contact->getPrenomContact(), PDO::PARAM_STR);
			$statement->bindValue(":adressemailcontact", $contact->getAdresseMailContact(), PDO::PARAM_STR);
			$statement->bindValue(":fonctioncontact", $contact->getFonctionContact(), PDO::PARAM_STR);
			$statement->bindValue(":identifiantcontact", $contact->getIdentifiantContact(), PDO::PARAM_INT);
			$statement->execute();
			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	public function chargerListeContacts(): array {
		try {
			$listeContacts = array();
			$requete = "SELECT IDENTIFIANTCONTACT, NOMCONTACT, PRENOMCONTACT, ADRESSEMAILCONTACT, FONCTIONCONTACT ".
					   "FROM CONTACT;";
			$statement = $this->pdo->prepare($requete);
			$statement->execute();
			$donnees = $statement->fetchAll();
			foreach ($donnees as $ligne) {
				$contact = new Contact();
				$contact->setIdentifiantContact($ligne["IDENTIFIANTCONTACT"]);
				$contact->setNomContact($ligne["NOMCONTACT"]);
				$contact->setPrenomContact($ligne["PRENOMCONTACT"]);
				$contact->setAdresseMailContact($ligne["ADRESSEMAILCONTACT"]);
				$contact->setFonctionContact($ligne["FONCTIONCONTACT"]);
				$listeContacts[] = $contact->getObjetSerializable();
			}
			return $listeContacts;
		}
		catch (PDOException $exception) {
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
		catch (TypeError $exception) {
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
		catch (Exception $exception) {
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
		catch (Throwable $exception) {
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

}