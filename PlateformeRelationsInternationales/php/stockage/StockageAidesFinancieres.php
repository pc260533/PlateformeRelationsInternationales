<?php

/**
 * StockageAidesFinancieres short summary.
 *
 * StockageAidesFinancieres description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class StockageAidesFinancieres extends StockageBaseDeDonnees {

	public function __construct(string $dataSourceName, string $username, string $password) {
		parent::__construct($dataSourceName, $username, $password);
	}

	public function ajouterAideFinanciere(AideFinanciere $aideFinanciere): void {
		try {
			$this->pdo->beginTransaction();
			$requete = "INSERT INTO AIDEFINANCIERE(NOMAIDEFINANCIERE, DESCRIPTIONAIDEFINANCIERE, LIENAIDEFINANCIERE) VALUES (:nomaidefinanciere, :descriptionaidefinanciere, :lienaidefinanciere);";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":nomaidefinanciere", $aideFinanciere->getNomAideFinanciere(), PDO::PARAM_STR);
			$statement->bindValue(":descriptionaidefinanciere", $aideFinanciere->getDescriptionAideFinanciere(), PDO::PARAM_STR);
			$statement->bindValue(":lienaidefinanciere", $aideFinanciere->getLienAideFinanciere(), PDO::PARAM_STR);
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
					   "SET NOMAIDEFINANCIERE = :nomaidefinanciere, DESCRIPTIONAIDEFINANCIERE = :descriptionaidefinanciere, LIENAIDEFINANCIERE = :lienaidefinanciere " .
					   "WHERE IDENTIFIANTAIDEFINANCIERE = :identifiantaidefinanciere;";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":nomaidefinanciere", $aideFinanciere->getNomAideFinanciere(), PDO::PARAM_STR);
			$statement->bindValue(":descriptionaidefinanciere", $aideFinanciere->getDescriptionAideFinanciere(), PDO::PARAM_STR);
			$statement->bindValue(":lienaidefinanciere", $aideFinanciere->getLienAideFinanciere(), PDO::PARAM_STR);
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
			$requete = "SELECT IDENTIFIANTAIDEFINANCIERE, NOMAIDEFINANCIERE, DESCRIPTIONAIDEFINANCIERE, LIENAIDEFINANCIERE ".
					   "FROM AIDEFINANCIERE;";
			$statement = $this->pdo->prepare($requete);
			$statement->execute();
			$donnees = $statement->fetchAll();
			foreach ($donnees as $ligne) {
				$aideFinanciere = new AideFinanciere();
				$aideFinanciere->setIdentifiantAideFinanciere($ligne["IDENTIFIANTAIDEFINANCIERE"]);
				$aideFinanciere->setNomAideFinanciere($ligne["NOMAIDEFINANCIERE"]);
				$aideFinanciere->setDescriptionAideFinanciere($ligne["DESCRIPTIONAIDEFINANCIERE"]);
				$aideFinanciere->setLienAideFinanciere($ligne["LIENAIDEFINANCIERE"]);
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

}