<?php

/**
 * InstalleurBaseDeDonnees short summary.
 *
 * InstalleurBaseDeDonnees description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class InstalleurBaseDeDonnees {
	/**
	 * Le data source name de la base de donn�es.
	 * @var mixed
	 */
	private $dataSourceName;
	/**
	 * Le nom d'utilisateur de la base de donn�es.
	 * @var mixed
	 */
	private $username;
	/**
	 * Le mot de passe de la base de donn�es.
	 * @var mixed
	 */
	private $password;
	/**
	 * L'instance de pdo.
	 * @var mixed
	 */
	private $pdo;

	/**
	 * Cr�er la base de donn�es Plateforme.
	 */
	private function creerBaseDeDonneesPlateforme(): void {
		$requete = "CREATE DATABASE IF NOT EXISTS PLATEFORME CHARACTER SET UTF8mb4 COLLATE utf8mb4_bin;";
        $this->pdo->exec($requete);
	}

	/**
	 * Cr�er la table AideFinanciere dans la base.
	 */
	private function creerTableAideFinanciere(): void {
		$requete = "CREATE TABLE IF NOT EXISTS PLATEFORME.AIDEFINANCIERE (" .
				   "identifiantPartenaire INT PRIMARY KEY NOT NULL AUTO_INCREMENT," .
				   "nomAideFinanciere VARCHAR(255));";
        $this->pdo->exec($requete);
	}

	/**
	 * Cr�er la table Contact dans la base.
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
	 * Cr�er la table Localisation dans la base.
	 */
	private function creerTableLocalisation(): void {
		$requete = "CREATE TABLE IF NOT EXISTS PLATEFORME.LOCALISATION (" .
				   "identifiantLocalisation INT PRIMARY KEY NOT NULL AUTO_INCREMENT," .
				   "latitudeLocalisation VARCHAR(255)," .
				   "longitudeLocalisation VARCHAR(255));";
        $this->pdo->exec($requete);
	}

	/**
	 * Cr�er la table Mobilite dans la base.
	 */
	private function creerTableMobilite(): void {
		$requete = "CREATE TABLE IF NOT EXISTS PLATEFORME.MOBILITE (" .
				   "identifiantMobilite INT PRIMARY KEY NOT NULL AUTO_INCREMENT," .
				   "typeMobilite VARCHAR(255));";
        $this->pdo->exec($requete);
	}

	/**
	 * Cr�er la table Specialite dans la base.
	 */
	private function creerTableSpecialite(): void {
		$requete = "CREATE TABLE IF NOT EXISTS PLATEFORME.SPECIALITE (" .
				   "identifiantSpecialite INT PRIMARY KEY NOT NULL AUTO_INCREMENT," .
				   "nomSpecialite VARCHAR(255));";
        $this->pdo->exec($requete);
	}

	/**
	 * Cr�er la table SousSpecialite dans la base.
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
	 * Cr�er la table Partenaire dans la base.
	 */
	private function creerTablePartenaire(): void {
		$requete = "CREATE TABLE IF NOT EXISTS PLATEFORME.PARTENAIRE (" .
				   "nomPartenaire VARCHAR(255)," .
				   "domaineDeCompetencePartenaire VARCHAR(255)," .
				   "identifiantLocalisation INT NOT NULL," .
				   "informationLogementPartenaire TEXT" .
				   "informationCoutPartenaire TEXT," .
				   "FOREIGN KEY (identifiantLocalisation) REFERENCES LOCALISATION(identifiantLocalisation) ON DELETE CASCADE);";
        $this->pdo->exec($requete);
	}

	/**
	 * Cr�er la table Correspondance_Partenaire_Specialite dans la base.
	 */
	private function creerTableCorrespondancePartenaireSpecialite(): void {
		$requete = "CREATE TABLE IF NOT EXISTS PLATEFORME.CORRESPONDANCE_PARTENAIRE_SPECIALITE (" .
				   "identifiantPartenaire INT," .
				   "identifiantSpecialite INT," .
				   "PRIMARY KEY(identifiantPartenaire, identifiantSpecialite)," .
				   "FOREIGN KEY (identifiantPartenaire) REFERENCES PARTENAIRE(identifiantPartenaire) ON DELETE CASCADE," .
				   "FOREIGN KEY (identifiantSpecialite) REFERENCES SPECIALITE(identifiantSpecialite) ON DELETE CASCADE);";
        $this->pdo->exec($requete);
	}

	/**
	 * Cr�er la table Correspondance_Partenaire_Mobilite dans la base.
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
	 * Cr�er la table Correspondance_Partenaire_Contact dans la base.
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
	 * Cr�er la table Correspondance_Partenaire_AideFinanciere dans la base.
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
	 * Constructeur prenant en param�tre le data source name, le nom d'utilisateur et le mot de passe de la base de donn�es.
	 * @param string $dataSourceName Le data source name de la base de donn�es.
	 * @param string $username Le nom d'utilisateur de la base de donn�es.
	 * @param string $password Le mot de passe de la base de donn�es.
	 * @throws ExceptionBaseDeDonneesPlateforme Exception du service de base de donn�es.
	 */
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

	/**
	 * Initialiser la base de donn�es.
	 * @throws ExceptionBaseDeDonneesPlateforme Exception du service de base de donn�es.
	 */
	public function initialiserBaseDeDonnees(): void {
		try {
			$this->pdo->beginTransaction();
			$this->creerTableAideFinanciere();
			$this->creerTableContact();
			$this->creerTableLocalisation();
			$this->creerTableMobilite();
			$this->creerTableSpecialite();
			$this->creerTableSousSpecialite();
			$this->creerTablePartenaire();
			$this->creerTableCorrespondancePartenaireSpecialite();
			$this->creerTableCorrespondancePartenaireMobilite();
			$this->creerTableCorrespondancePartenaireContact();
			$this->creerTableCorrespondancePartenaireAideFinanciere();
			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

}