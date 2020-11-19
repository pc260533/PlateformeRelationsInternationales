<?php

/**
 * StockageCouts short summary.
 *
 * StockageCouts description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class StockageCouts extends StockageBaseDeDonnees {

	public function __construct(string $dataSourceName, string $username, string $password) {
		parent::__construct($dataSourceName, $username, $password);
	}

	public function ajouterCout(Cout $cout): void {
		try {
			$this->pdo->beginTransaction();
			$requete = "INSERT INTO COUT(NOMPAYSCOUT, COUTMOYENPARMOIS, COUTLOGEMENTPARMOIS, COUTVIEPARMOIS, COUTINSCRIPTIONPARMOIS) VALUES (:nompayscout, :coutmoyenparmois, :coutlogementparmois, :coutvieparmois, :coutinscriptionparmois);";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":nompayscout", $cout->getNomPaysCout(), PDO::PARAM_STR);
			$statement->bindValue(":coutmoyenparmois", $cout->getCoutMoyenParMois(), PDO::PARAM_STR);
			$statement->bindValue(":coutlogementparmois", $cout->getCoutLogementParMois(), PDO::PARAM_STR);
			$statement->bindValue(":coutvieparmois", $cout->getCoutVieParMois(), PDO::PARAM_STR);
			$statement->bindValue(":coutinscriptionparmois", $cout->getCoutInscriptionParMois(), PDO::PARAM_STR);
			$statement->execute();
			$cout->setIdentifiantCout(intval($this->pdo->lastInsertId()));
			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	public function modifierCout(Cout $cout): void {
		try {
			$this->pdo->beginTransaction();
			$requete = "UPDATE COUT " .
					   "SET COUTMOYENPARMOIS = :coutmoyenparmois, COUTLOGEMENTPARMOIS = :coutlogementparmois, COUTVIEPARMOIS = :coutvieparmois, COUTINSCRIPTIONPARMOIS = :coutinscriptionparmois " .
					   "WHERE IDENTIFIANTCOUT = :identifiantcout;";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":coutmoyenparmois", $cout->getCoutMoyenParMois(), PDO::PARAM_STR);
			$statement->bindValue(":coutlogementparmois", $cout->getCoutLogementParMois(), PDO::PARAM_STR);
			$statement->bindValue(":coutvieparmois", $cout->getCoutVieParMois(), PDO::PARAM_STR);
			$statement->bindValue(":coutinscriptionparmois", $cout->getCoutInscriptionParMois(), PDO::PARAM_STR);
			$statement->bindValue(":identifiantcout", $cout->getIdentifiantCout(), PDO::PARAM_INT);
			$statement->execute();
			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	public function chargerListeCouts(): array {
		try {
			$listeCouts = array();
			$requete = "SELECT NOMPAYSCOUT, IDENTIFIANTCOUT, COUTMOYENPARMOIS, COUTLOGEMENTPARMOIS, COUTVIEPARMOIS, COUTINSCRIPTIONPARMOIS ".
					   "FROM COUT;";
			$statement = $this->pdo->prepare($requete);
			$statement->execute();
			$donnees = $statement->fetchAll();
			foreach ($donnees as $ligne) {
				$cout = new Cout();
				$cout->setNomPaysCout($ligne["NOMPAYSCOUT"]);
				$cout->setIdentifiantCout($ligne["IDENTIFIANTCOUT"]);
				$cout->setCoutMoyenParMois($ligne["COUTMOYENPARMOIS"]);
				$cout->setCoutLogementParMois($ligne["COUTLOGEMENTPARMOIS"]);
				$cout->setCoutVieParMois($ligne["COUTVIEPARMOIS"]);
				$cout->setCoutInscriptionParMois($ligne["COUTINSCRIPTIONPARMOIS"]);
				$listeCouts[] = $cout->getObjetSerializable();
			}
			return $listeCouts;
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