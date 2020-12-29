<?php

/**
 * StockageSpecialites short summary.
 *
 * StockageSpecialites description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class StockageSpecialites extends StockageBaseDeDonnees {

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

	public function __construct(string $dataSourceName, string $username, string $password) {
		parent::__construct($dataSourceName, $username, $password);
	}

	public function ajouterSpecialite(Specialite $specialite): void {
		try {
			$this->pdo->beginTransaction();
			$requete = "INSERT INTO SPECIALITE(NOMSPECIALITE, COULEURSPECIALITE) VALUES (:nomspecialite, :couleurspecialite);";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":nomspecialite", $specialite->getNomSpecialite(), PDO::PARAM_STR);
			$statement->bindValue(":couleurspecialite", $specialite->getCouleurSpecialite(), PDO::PARAM_STR);
			$statement->execute();
			$specialite->setIdentifiantSpecialite(intval($this->pdo->lastInsertId()));
			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	public function supprimerSpecialite(Specialite $specialite): void {
		try {
			$this->pdo->beginTransaction();
			$requete = "DELETE FROM SPECIALITE " .
					   "WHERE IDENTIFIANTSPECIALITE = :identifiantspecialite;";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":identifiantspecialite", $specialite->getIdentifiantSpecialite(), PDO::PARAM_INT);
			$statement->execute();
			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	public function modifierSpecialite(Specialite $specialite): void {
		try {
			$this->pdo->beginTransaction();
			$requete = "UPDATE SPECIALITE " .
					   "SET NOMSPECIALITE = :nomspecialite, COULEURSPECIALITE = :couleurspecialite " .
					   "WHERE IDENTIFIANTSPECIALITE = :identifiantspecialite;";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":nomspecialite", $specialite->getNomSpecialite(), PDO::PARAM_STR);
			$statement->bindValue(":couleurspecialite", $specialite->getCouleurSpecialite(), PDO::PARAM_STR);
			$statement->bindValue(":identifiantspecialite", $specialite->getIdentifiantSpecialite(), PDO::PARAM_INT);
			$statement->execute();
			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	public function ajouterSousSpecialite(Specialite $specialite, SousSpecialite $sousSpecialite): void {
		try {
			$this->pdo->beginTransaction();
			$requete = "INSERT INTO SOUSSPECIALITE(NOMSOUSSPECIALITE, IDENTIFIANTSPECIALITE) VALUES (:nomsousspecialite, :identifiantspecialite);";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":nomsousspecialite", $sousSpecialite->getNomSousSpecialite(), PDO::PARAM_STR);
			$statement->bindValue(":identifiantspecialite", $specialite->getIdentifiantSpecialite(), PDO::PARAM_INT);
			$statement->execute();
			$sousSpecialite->setIdentifiantSousSpecialite(intval($this->pdo->lastInsertId()));
			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	public function supprimerSousSpecialite(SousSpecialite $sousSpecialite): void {
		try {
			$this->pdo->beginTransaction();
			$requete = "DELETE FROM SOUSSPECIALITE " .
					   "WHERE IDENTIFIANTSOUSSPECIALITE = :identifiantsousspecialite;";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":identifiantsousspecialite", $sousSpecialite->getIdentifiantSousSpecialite(), PDO::PARAM_INT);
			$statement->execute();
			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	public function modifierSousSpecialite(Specialite $specialite, SousSpecialite $sousSpecialite): void {
		try {
			$this->pdo->beginTransaction();
			$requete = "UPDATE SOUSSPECIALITE " .
					   "SET NOMSOUSSPECIALITE = :nomsousspecialite, IDENTIFIANTSPECIALITE = :identifiantspecialite " .
					   "WHERE IDENTIFIANTSOUSSPECIALITE = :identifiantsousspecialite;";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":nomsousspecialite", $sousSpecialite->getNomSousSpecialite(), PDO::PARAM_STR);
			$statement->bindValue(":identifiantspecialite", $specialite->getIdentifiantSpecialite(), PDO::PARAM_INT);
			$statement->bindValue(":identifiantsousspecialite", $sousSpecialite->getIdentifiantSousSpecialite(), PDO::PARAM_INT);
			$statement->execute();
			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
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

}