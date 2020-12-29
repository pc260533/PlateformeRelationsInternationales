<?php

/**
 * InstalleurBaseDeDonnees short summary.
 *
 * InstalleurBaseDeDonnees description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class InstalleurBaseDeDonnees extends StockageBaseDeDonnees {

	/**
	 * Créer la base de données Plateforme.
	 */
	private function creerBaseDeDonneesPlateforme(): void {
		$requete = "CREATE DATABASE IF NOT EXISTS PLATEFORME CHARACTER SET UTF8mb4 COLLATE utf8mb4_bin;";
        $this->pdo->exec($requete);
	}

	/**
	 * Créer la table AideFinanciere dans la base.
	 */
	private function creerTableAideFinanciere(): void {
		$requete = "CREATE TABLE IF NOT EXISTS PLATEFORME.AIDEFINANCIERE (" .
				   "identifiantAideFinanciere INT PRIMARY KEY NOT NULL AUTO_INCREMENT," .
				   "nomAideFinanciere VARCHAR(255)," .
				   "descriptionAideFinanciere TEXT," .
				   "lienAideFinanciere VARCHAR(255));";
        $this->pdo->exec($requete);
	}

	/**
	 * Créer la table Contact dans la base.
	 */
	private function creerTableContact(): void {
		$requete = "CREATE TABLE IF NOT EXISTS PLATEFORME.CONTACT (" .
				   "identifiantContact INT PRIMARY KEY NOT NULL AUTO_INCREMENT," .
				   "nomContact VARCHAR(255)," .
				   "prenomContact VARCHAR(255)," .
				   "adresseMailContact VARCHAR(255)," .
				   "fonctionContact VARCHAR(255));";
        $this->pdo->exec($requete);
	}

	/**
	 * Créer la table Localisation dans la base.
	 */
	private function creerTableLocalisation(): void {
		$requete = "CREATE TABLE IF NOT EXISTS PLATEFORME.LOCALISATION (" .
				   "identifiantLocalisation INT PRIMARY KEY NOT NULL AUTO_INCREMENT," .
				   "latitudeLocalisation VARCHAR(255)," .
				   "longitudeLocalisation VARCHAR(255)," .
				   "nomLocalisation VARCHAR(255)," .
				   "nomPaysLocalisation VARCHAR(255)," .
				   "codePaysLocalisation VARCHAR(255));";
        $this->pdo->exec($requete);
	}

	/**
	 * Créer la table Mobilite dans la base.
	 */
	private function creerTableMobilite(): void {
		$requete = "CREATE TABLE IF NOT EXISTS PLATEFORME.MOBILITE (" .
				   "identifiantMobilite INT PRIMARY KEY NOT NULL AUTO_INCREMENT," .
				   "typeMobilite VARCHAR(255));";
        $this->pdo->exec($requete);
	}

	/**
	 * Créer la table Specialite dans la base.
	 */
	private function creerTableSpecialite(): void {
		$requete = "CREATE TABLE IF NOT EXISTS PLATEFORME.SPECIALITE (" .
				   "identifiantSpecialite INT PRIMARY KEY NOT NULL AUTO_INCREMENT," .
				   "nomSpecialite VARCHAR(255)," .
				   "couleurSpecialite VARCHAR(255));";
        $this->pdo->exec($requete);
	}

	/**
	 * Créer la table SousSpecialite dans la base.
	 */
	private function creerTableSousSpecialite(): void {
		$requete = "CREATE TABLE IF NOT EXISTS PLATEFORME.SOUSSPECIALITE (" .
				   "identifiantSousSpecialite INT PRIMARY KEY NOT NULL AUTO_INCREMENT," .
				   "nomSousSpecialite VARCHAR(255)," .
				   "identifiantSpecialite INT NOT NULL," .
				   "FOREIGN KEY (identifiantSpecialite) REFERENCES SPECIALITE(identifiantSpecialite) ON DELETE CASCADE);";
        $this->pdo->exec($requete);
	}

	/**
	 * Créer la table ImagePartenaire dans la base.
	 */
	private function creerTableImagePartenaire(): void {
		$requete = "CREATE TABLE IF NOT EXISTS PLATEFORME.IMAGEPARTENAIRE (" .
				   "identifiantImagePartenaire INT PRIMARY KEY NOT NULL AUTO_INCREMENT," .
				   "cheminImagePartenaireServeur VARCHAR(255));";
        $this->pdo->exec($requete);
	}

	/**
	 * Créer la table Cout dans la base.
	 */
	private function creerTableCout(): void {
		$requete = "CREATE TABLE IF NOT EXISTS PLATEFORME.COUT (" .
				   "identifiantCout INT PRIMARY KEY NOT NULL AUTO_INCREMENT," .
				   "nomPaysCout VARCHAR(255)," .
				   "coutMoyenParMois VARCHAR(255)," .
				   "coutLogementParMois VARCHAR(255)," .
				   "coutVieParMois VARCHAR(255)," .
				   "coutInscriptionParMois VARCHAR(255));";
        $this->pdo->exec($requete);
	}

	/**
	 * Créer la table EtatPartenaire dans la base.
	 */
	private function creerTableEtatPartenaire(): void {
		$requete = "CREATE TABLE IF NOT EXISTS PLATEFORME.ETATPARTENAIRE (" .
				   "identifiantEtatPartenaire INT PRIMARY KEY NOT NULL AUTO_INCREMENT," .
				   "nomEtatPartenaire VARCHAR(255));";
        $this->pdo->exec($requete);
	}

	/**
	 * Créer la table Voeu dans la base.
	 */
	private function creerTableVoeu(): void {
		$requete = "CREATE TABLE IF NOT EXISTS PLATEFORME.VOEU (" .
				   "identifiantVoeu INT PRIMARY KEY NOT NULL AUTO_INCREMENT," .
				   "adresseMailVoeu VARCHAR(255));";
        $this->pdo->exec($requete);
	}

	/**
	 * Créer la table Partenaire dans la base.
	 */
	private function creerTablePartenaire(): void {
		$requete = "CREATE TABLE IF NOT EXISTS PLATEFORME.PARTENAIRE (" .
				   "identifiantPartenaire INT PRIMARY KEY NOT NULL AUTO_INCREMENT," .
				   "nomPartenaire VARCHAR(255)," .
				   "domaineDeCompetencePartenaire VARCHAR(255)," .
				   "identifiantLocalisation INT NOT NULL," .
				   "informationLogementPartenaire TEXT," .
				   "informationCoutPartenaire TEXT," .
				   "identifiantCout INT NOT NULL," .
				   "lienPartenaire VARCHAR(255)," .
				   "identifiantEtatPartenaire INT NOT NULL," .
				   "FOREIGN KEY (identifiantLocalisation) REFERENCES LOCALISATION(identifiantLocalisation) ON DELETE CASCADE," .
				   "FOREIGN KEY (identifiantCout) REFERENCES COUT(identifiantCout) ON DELETE CASCADE," .
				   "FOREIGN KEY (identifiantEtatPartenaire) REFERENCES ETATPARTENAIRE(identifiantEtatPartenaire) ON DELETE CASCADE);";
        $this->pdo->exec($requete);
	}

	/**
	 * Créer la table Correspondance_Partenaire_SousSpecialite dans la base.
	 */
	private function creerTableCorrespondancePartenaireSousSpecialite(): void {
		$requete = "CREATE TABLE IF NOT EXISTS PLATEFORME.CORRESPONDANCE_PARTENAIRE_SOUSSPECIALITE (" .
				   "identifiantPartenaire INT," .
				   "identifiantSousSpecialite INT," .
				   "PRIMARY KEY(identifiantPartenaire, identifiantSousSpecialite)," .
				   "FOREIGN KEY (identifiantPartenaire) REFERENCES PARTENAIRE(identifiantPartenaire) ON DELETE CASCADE," .
				   "FOREIGN KEY (identifiantSousSpecialite) REFERENCES SOUSSPECIALITE(identifiantSousSpecialite) ON DELETE CASCADE);";
        $this->pdo->exec($requete);
	}

	/**
	 * Créer la table Correspondance_Partenaire_Mobilite dans la base.
	 */
	private function creerTableCorrespondancePartenaireMobilite(): void {
		$requete = "CREATE TABLE IF NOT EXISTS PLATEFORME.CORRESPONDANCE_PARTENAIRE_MOBILITE (" .
				   "identifiantPartenaire INT," .
				   "identifiantMobilite INT," .
				   "PRIMARY KEY(identifiantPartenaire, identifiantMobilite)," .
				   "FOREIGN KEY (identifiantPartenaire) REFERENCES PARTENAIRE(identifiantPartenaire) ON DELETE CASCADE," .
				   "FOREIGN KEY (identifiantMobilite) REFERENCES MOBILITE(identifiantMobilite) ON DELETE CASCADE);";
        $this->pdo->exec($requete);
	}

	/**
	 * Créer la table Correspondance_Partenaire_Contact dans la base.
	 */
	private function creerTableCorrespondancePartenaireContact(): void {
		$requete = "CREATE TABLE IF NOT EXISTS PLATEFORME.CORRESPONDANCE_PARTENAIRE_CONTACT (" .
				   "identifiantPartenaire INT," .
				   "identifiantContact INT," .
				   "PRIMARY KEY(identifiantPartenaire, identifiantContact)," .
				   "FOREIGN KEY (identifiantPartenaire) REFERENCES PARTENAIRE(identifiantPartenaire) ON DELETE CASCADE," .
				   "FOREIGN KEY (identifiantContact) REFERENCES CONTACT(identifiantContact) ON DELETE CASCADE);";
        $this->pdo->exec($requete);
	}

	/**
	 * Créer la table Correspondance_Partenaire_AideFinanciere dans la base.
	 */
	private function creerTableCorrespondancePartenaireAideFinanciere(): void {
		$requete = "CREATE TABLE IF NOT EXISTS PLATEFORME.CORRESPONDANCE_PARTENAIRE_AIDEFINANCIERE (" .
				   "identifiantPartenaire INT," .
				   "identifiantAideFinanciere INT," .
				   "PRIMARY KEY(identifiantPartenaire, identifiantAideFinanciere)," .
				   "FOREIGN KEY (identifiantPartenaire) REFERENCES PARTENAIRE(identifiantPartenaire) ON DELETE CASCADE," .
				   "FOREIGN KEY (identifiantAideFinanciere) REFERENCES AIDEFINANCIERE(identifiantAideFinanciere) ON DELETE CASCADE);";
        $this->pdo->exec($requete);
	}

	/**
	 * Créer la table Correspondance_Partenaire_ImagePartenaire dans la base.
	 */
	private function creerTableCorrespondancePartenaireImagePartenaire(): void {
		$requete = "CREATE TABLE IF NOT EXISTS PLATEFORME.CORRESPONDANCE_PARTENAIRE_IMAGEPARTENAIRE (" .
				   "identifiantPartenaire INT," .
				   "identifiantImagePartenaire INT," .
				   "PRIMARY KEY(identifiantPartenaire, identifiantImagePartenaire)," .
				   "FOREIGN KEY (identifiantPartenaire) REFERENCES PARTENAIRE(identifiantPartenaire) ON DELETE CASCADE," .
				   "FOREIGN KEY (identifiantImagePartenaire) REFERENCES IMAGEPARTENAIRE(identifiantImagePartenaire) ON DELETE CASCADE);";
        $this->pdo->exec($requete);
	}

	/**
	 * Créer la table Correspondance_Partenaire_Voeu dans la base.
	 */
	private function creerTableCorrespondancePartenaireVoeu(): void {
		$requete = "CREATE TABLE IF NOT EXISTS PLATEFORME.CORRESPONDANCE_PARTENAIRE_VOEU (" .
				   "identifiantPartenaire INT," .
				   "identifiantVoeu INT," .
				   "PRIMARY KEY(identifiantPartenaire, identifiantVoeu)," .
				   "FOREIGN KEY (identifiantPartenaire) REFERENCES PARTENAIRE(identifiantPartenaire) ON DELETE CASCADE," .
				   "FOREIGN KEY (identifiantVoeu) REFERENCES VOEU(identifiantVoeu) ON DELETE CASCADE);";
        $this->pdo->exec($requete);
	}

	/**
	 * Constructeur prenant en paramètre le data source name, le nom d'utilisateur et le mot de passe de la base de données.
	 * @param string $dataSourceName Le data source name de la base de données.
	 * @param string $username Le nom d'utilisateur de la base de données.
	 * @param string $password Le mot de passe de la base de données.
	 * @throws ExceptionBaseDeDonneesPlateforme Exception du service de base de données.
	 */
	public function __construct(string $dataSourceName, string $username, string $password) {
		parent::__construct($dataSourceName, $username, $password);
	}

	/**
	 * Initialiser la base de données.
	 * @throws ExceptionBaseDeDonneesPlateforme Exception du service de base de données.
	 */
	public function initialiserBaseDeDonnees(): void {
		try {
			$this->pdo->beginTransaction();
			$this->creerBaseDeDonneesPlateforme();
			$this->creerTableAideFinanciere();
			$this->creerTableContact();
			$this->creerTableLocalisation();
			$this->creerTableMobilite();
			$this->creerTableSpecialite();
			$this->creerTableSousSpecialite();
			$this->creerTableImagePartenaire();
			$this->creerTableCout();
			$this->creerTableEtatPartenaire();
			$this->creerTableVoeu();
			$this->creerTablePartenaire();
			$this->creerTableCorrespondancePartenaireSousSpecialite();
			$this->creerTableCorrespondancePartenaireMobilite();
			$this->creerTableCorrespondancePartenaireContact();
			$this->creerTableCorrespondancePartenaireAideFinanciere();
			$this->creerTableCorrespondancePartenaireImagePartenaire();
			$this->creerTableCorrespondancePartenaireVoeu();
			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

}