<?php

/**
 * StockageDomainesDeCompetences short summary.
 *
 * StockageDomainesDeCompetences description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class StockageDomainesDeCompetences extends StockageBaseDeDonnees {

	public function __construct(string $dataSourceName, string $username, string $password) {
		parent::__construct($dataSourceName, $username, $password);
	}

	public function ajouterDomaineDeCompetence(DomaineDeCompetence $domaineDeCompetence): void {
		try {
			$this->pdo->beginTransaction();
			$requete = "INSERT INTO DOMAINEDECOMPETENCE(NOMDOMAINEDECOMPETENCE) VALUES (:nomdomainedecompetence);";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":nomdomainedecompetence", $domaineDeCompetence->getNomDomaineDeCompetence(), PDO::PARAM_STR);
			$statement->execute();
			$domaineDeCompetence->setIdentifiantDomaineDeCompetence(intval($this->pdo->lastInsertId()));
			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	public function supprimerDomaineDeCompetence(DomaineDeCompetence $domaineDeCompetence): void {
		try {
			$this->pdo->beginTransaction();
			$requete = "DELETE FROM DOMAINEDECOMPETENCE " .
					   "WHERE IDENTIFIANTDOMAINEDECOMPETENCE= :identifiantdomainedecompetence;";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":identifiantdomainedecompetence", $domaineDeCompetence->getIdentifiantDomaineDeCompetence(), PDO::PARAM_INT);
			$statement->execute();
			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	public function modifierDomaineDeCompetence(DomaineDeCompetence $domaineDeCompetence): void {
		try {
			$this->pdo->beginTransaction();
			$requete = "UPDATE DOMAINEDECOMPETENCE " .
					   "SET NOMDOMAINEDECOMPETENCE = :nomdomainedecompetence " .
					   "WHERE IDENTIFIANTDOMAINEDECOMPETENCE = :identifiantdomainedecompetence;";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":nomdomainedecompetence", $domaineDeCompetence->getNomDomaineDeCompetence(), PDO::PARAM_STR);
			$statement->bindValue(":identifiantdomainedecompetence", $domaineDeCompetence->getIdentifiantDomaineDeCompetence(), PDO::PARAM_INT);
			$statement->execute();
			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	public function chargerListeDomainesDeCompetences(): array {
		try {
			$listeDomainesDeCompetences = array();
			$requete = "SELECT IDENTIFIANTDOMAINEDECOMPETENCE, NOMDOMAINEDECOMPETENCE ".
					   "FROM DOMAINEDECOMPETENCE;";
			$statement = $this->pdo->prepare($requete);
			$statement->execute();
			$donnees = $statement->fetchAll();
			foreach ($donnees as $ligne) {
				$domaineDeCompetence = new DomaineDeCompetence();
				$domaineDeCompetence->setIdentifiantDomaineDeCompetence($ligne["IDENTIFIANTDOMAINEDECOMPETENCE"]);
				$domaineDeCompetence->setNomDomaineDeCompetence($ligne["NOMDOMAINEDECOMPETENCE"]);
				$listeDomainesDeCompetences[] = $domaineDeCompetence->getObjetSerializable();
			}
			return $listeDomainesDeCompetences;
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