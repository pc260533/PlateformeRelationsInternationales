<?php

/**
 *
 * StockageEtatsPartenaires est la classe fournissant l'accès aux états partenaires de la base de données Plateforme.
 * Elle hérite de StockageBaseDeDonnees.
 *
 * @version 1.0
 * @author Pierre-Nicolas
 */
class StockageEtatsPartenaires extends StockageBaseDeDonnees {

	/**
	 * Constructeur StockageEtatsPartenaires prenant en paramètre le dataSourceName, le nom d'utilisateur et le mot de passe de la base de données.
	 * @param string $dataSourceName Le dataSourceName de la base de données.
	 * @param string $username Le nom d'utilisateur de la base de données.
	 * @param string $password Le mot de passe de la base de données.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 */
	public function __construct(string $dataSourceName, string $username, string $password) {
		parent::__construct($dataSourceName, $username, $password);
	}

	/**
	 * Ajouter un état partenaire.
	 * @param EtatPartenaire $etatPartenaire L'état partenaire à ajouter.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 */
	public function ajouterEtatPartenaire(EtatPartenaire $etatPartenaire): void {
		try {
			$this->pdo->beginTransaction();
			$requete = "INSERT INTO ETATPARTENAIRE(NOMETATPARTENAIRE) VALUES (:nometatpartenaire);";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":nometatpartenaire", $etatPartenaire->getNomEtatPartenaire(), PDO::PARAM_STR);
			$statement->execute();
			$etatPartenaire->setIdentifiantEtatPartenaire(intval($this->pdo->lastInsertId()));
			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	/**
	 * Supprimer un état partenaire.
	 * @param EtatPartenaire $etatPartenaire L'état partenaire à supprimer.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 */
	public function supprimerEtatPartenaire(EtatPartenaire $etatPartenaire): void {
		try {
			$this->pdo->beginTransaction();
			$requete = "DELETE FROM ETATPARTENAIRE " .
					   "WHERE IDENTIFIANTETATPARTENAIRE = :identifiantetatpartenaire;";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":identifiantetatpartenaire", $etatPartenaire->getIdentifiantEtatPartenaire(), PDO::PARAM_INT);
			$statement->execute();
			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	/**
	 * Modifier un état partenaire.
	 * @param EtatPartenaire $etatPartenaire L'état partenaire à modifier.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 */
	public function modifierEtatPartenaire(EtatPartenaire $etatPartenaire): void {
		try {
			$this->pdo->beginTransaction();
			$requete = "UPDATE ETATPARTENAIRE " .
					   "SET NOMETATPARTENAIRE = :nometatpartenaire " .
					   "WHERE IDENTIFIANTETATPARTENAIRE = :identifiantetatpartenaire;";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":nometatpartenaire", $etatPartenaire->getNomEtatPartenaire(), PDO::PARAM_STR);
			$statement->bindValue(":identifiantetatpartenaire", $etatPartenaire->getIdentifiantEtatPartenaire(), PDO::PARAM_INT);
			$statement->execute();
			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	/**
	 * Retourner la liste des états partenaires.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 * @return array[] La liste des états partenaires.
	 */
	public function chargerListeEtatsPartenaires(): array {
		try {
			$listeEtatsPartenaires = array();
			$requete = "SELECT IDENTIFIANTETATPARTENAIRE, NOMETATPARTENAIRE ".
					   "FROM ETATPARTENAIRE;";
			$statement = $this->pdo->prepare($requete);
			$statement->execute();
			$donnees = $statement->fetchAll();
			foreach ($donnees as $ligne) {
				$etatPartenaire = new EtatPartenaire();
				$etatPartenaire->setIdentifiantEtatPartenaire($ligne["IDENTIFIANTETATPARTENAIRE"]);
				$etatPartenaire->setNomEtatPartenaire($ligne["NOMETATPARTENAIRE"]);
				$listeEtatsPartenaires[] = $etatPartenaire->getObjetSerializable();
			}
			return $listeEtatsPartenaires;
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