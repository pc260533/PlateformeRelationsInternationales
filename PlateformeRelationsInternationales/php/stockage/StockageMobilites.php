<?php

/**
 *
 * StockageMobilites est la classe fournissant l'accès aux mobilités de la base de données Plateforme.
 * Elle hérite de StockageBaseDeDonnees.
 *
 * @version 1.0
 * @author Pierre-Nicolas
 */
class StockageMobilites extends StockageBaseDeDonnees {

	/**
	 * Constructeur StockageMobilites prenant en paramètre le dataSourceName, le nom d'utilisateur et le mot de passe de la base de données.
	 * @param string $dataSourceName Le dataSourceName de la base de données.
	 * @param string $username Le nom d'utilisateur de la base de données.
	 * @param string $password Le mot de passe de la base de données.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 */
	public function __construct(string $dataSourceName, string $username, string $password) {
		parent::__construct($dataSourceName, $username, $password);
	}

	/**
	 * Ajouter une mobilité.
	 * @param Mobilite $mobilite La mobilité à ajouter.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 */
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

	/**
	 * Supprimer une mobilité.
	 * @param Mobilite $mobilite La mobilité à supprimer.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 */
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

	/**
	 * Modifier une mobilité.
	 * @param Mobilite $mobilite La mobilité à modifier.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 */
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

	/**
	 * Retourner la liste des mobilités.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 * @return array[] La liste des mobilités.
	 */
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