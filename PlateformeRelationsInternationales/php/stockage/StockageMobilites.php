<?php

/**
 * StockageMobilites short summary.
 *
 * StockageMobilites description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class StockageMobilites extends StockageBaseDeDonnees {

	public function __construct(string $dataSourceName, string $username, string $password) {
		parent::__construct($dataSourceName, $username, $password);
	}

	public function ajouterMobilite(Mobilite $mobilite): void {
		try {
			$this->pdo->beginTransaction();
			$requete = "INSERT INTO MOBILITE(TYPEMOBILITE) VALUES (:typemobilite);";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":typemobilite", $mobilite->getTypeMobilite(), PDO::PARAM_STR);
			$statement->execute();
			$mobilite->setIdentifiantMobilite(intval($this->pdo->lastInsertId()));
			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	public function supprimerMobilite(Mobilite $mobilite): void {
		try {
			$this->pdo->beginTransaction();
			$requete = "DELETE FROM MOBILITE " .
					   "WHERE IDENTIFIANTMOBILITE = :identifiantmobilite;";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":identifiantmobilite", $mobilite->getIdentifiantMobilite(), PDO::PARAM_INT);
			$statement->execute();
			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	public function modifierMobilite(Mobilite $mobilite): void {
		try {
			$this->pdo->beginTransaction();
			$requete = "UPDATE MOBILITE " .
					   "SET TYPEMOBILITE = :typemobilite " .
					   "WHERE IDENTIFIANTMOBILITE = :identifiantmobilite;";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":typemobilite", $mobilite->getTypeMobilite(), PDO::PARAM_STR);
			$statement->bindValue(":identifiantmobilite", $mobilite->getIdentifiantMobilite(), PDO::PARAM_INT);
			$statement->execute();
			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
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

}