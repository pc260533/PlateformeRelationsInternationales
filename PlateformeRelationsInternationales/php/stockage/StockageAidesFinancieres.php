<?php

/**
 *
 * StockageAidesFinancieres est la classe fournissant l'accès aux aides financières de la base de données Plateforme.
 * Elle hérite de StockageBaseDeDonnees.
 *
 * @version 1.0
 * @author Pierre-Nicolas
 */
class StockageAidesFinancieres extends StockageBaseDeDonnees {

	/**
	 * Constructeur StockageAidesFinancieres prenant en paramètre le dataSourceName, le nom d'utilisateur et le mot de passe de la base de données.
	 * @param string $dataSourceName Le dataSourceName de la base de données.
	 * @param string $username Le nom d'utilisateur de la base de données.
	 * @param string $password Le mot de passe de la base de données.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 */
	public function __construct(string $dataSourceName, string $username, string $password) {
		parent::__construct($dataSourceName, $username, $password);
	}

	/**
	 * Ajouter une aide financière.
	 * @param AideFinanciere $aideFinanciere L'aide financière à ajouter.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 */
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

	/**
	 * Supprimer une aide financière.
	 * @param AideFinanciere $aideFinanciere L'aide financière à supprimer.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 */
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

	/**
	 * Modifier une aide financière.
	 * @param AideFinanciere $aideFinanciere L'aide financière à modifier.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 */
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

	/**
	 * Retourner la liste des aides financières.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 * @return array[] La liste des aides financières.
	 */
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