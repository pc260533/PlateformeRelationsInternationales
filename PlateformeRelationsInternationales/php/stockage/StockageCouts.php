<?php

/**
 *
 * StockageCouts est la classe fournissant l'accès aux couts de la base de données Plateforme.
 * Elle hérite de StockageBaseDeDonnees.
 *
 * @version 1.0
 * @author Pierre-Nicolas
 */
class StockageCouts extends StockageBaseDeDonnees {

	/**
	 * Constructeur StockageCouts prenant en paramètre le dataSourceName, le nom d'utilisateur et le mot de passe de la base de données.
	 * @param string $dataSourceName Le dataSourceName de la base de données.
	 * @param string $username Le nom d'utilisateur de la base de données.
	 * @param string $password Le mot de passe de la base de données.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 */
	public function __construct(string $dataSourceName, string $username, string $password) {
		parent::__construct($dataSourceName, $username, $password);
	}

	/**
	 * Ajouter un cout.
	 * @param Cout $cout Le cout à ajouter.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 */
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

	/**
	 * Modifier un cout.
	 * @param Cout $cout Le cout à modifier.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 */
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

	/**
	 * Retourner la liste des couts.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 * @return array[] La liste des couts.
	 */
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