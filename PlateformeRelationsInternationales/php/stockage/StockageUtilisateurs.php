<?php

/**
 *
 * StockageUtilisateurs est la classe fournissant l'accès aux utilisateurs de la base de données Plateforme.
 * Elle hérite de StockageBaseDeDonnees.
 *
 * @version 1.0
 * @author Pierre-Nicolas
 */
class StockageUtilisateurs extends StockageBaseDeDonnees {

	/**
	 * Constructeur StockageUtilisateurs prenant en paramètre le dataSourceName, le nom d'utilisateur et le mot de passe de la base de données.
	 * @param string $dataSourceName Le dataSourceName de la base de données.
	 * @param string $username Le nom d'utilisateur de la base de données.
	 * @param string $password Le mot de passe de la base de données.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 */
	public function __construct(string $dataSourceName, string $username, string $password) {
		parent::__construct($dataSourceName, $username, $password);
	}

	/**
	 * Ajouter un utilisateur.
	 * @param Utilisateur $utiisateur L'utilisateur à ajouter.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 */
	public function ajouterUtilisateur(Utilisateur $utiisateur): void {
		try {
			$this->pdo->beginTransaction();
			$requete = "INSERT INTO UTILISATEUR(NOMUTILISATEUR, MOTDEPASSEUTILISATEUR, ADRESSEMAILUTILISATEUR, ESTADMINISTRATEUR) VALUES (:nomutilisateur, :motdepasseutilisateur, :adressemailutilisateur, :estadministrateur);";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":nomutilisateur", $utiisateur->getNomUtilisateur(), PDO::PARAM_STR);
			$statement->bindValue(":motdepasseutilisateur", $utiisateur->getMotDePasseUtilisateur(), PDO::PARAM_STR);
			$statement->bindValue(":adressemailutilisateur", $utiisateur->getAdresseMailUtilisateur(), PDO::PARAM_STR);
			$statement->bindValue(":estadministrateur", $utiisateur->getEstAdministrateur(), PDO::PARAM_BOOL);
			$statement->execute();
			$utiisateur->setIdentifiantUtilisateur(intval($this->pdo->lastInsertId()));
			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	/**
	 * Supprimer un utilisateur.
	 * @param Utilisateur $utiisateur L'utilisateur à supprimer.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 */
	public function supprimerUtilisateur(Utilisateur $utilisateur): void {
		try {
			$this->pdo->beginTransaction();
			$requete = "DELETE FROM UTILISATEUR " .
					   "WHERE IDENTIFIANTUTILISATEUR= :identifiantutilisateur;";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":identifiantutilisateur", $utilisateur->getIdentifiantUtilisateur(), PDO::PARAM_INT);
			$statement->execute();
			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	/**
	 * Modifier un utilisateur.
	 * @param Utilisateur $utiisateur L'utilisateur à modifier.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 */
	public function modifierUtilisateur(Utilisateur $utilisateur): void {
		try {
			$this->pdo->beginTransaction();
			$requete = "UPDATE UTILISATEUR " .
					   "SET NOMUTILISATEUR = :nomutilisateur, ADRESSEMAILUTILISATEUR = :adressemailutilisateur, ESTADMINISTRATEUR = :estadministrateur " .
					   "WHERE IDENTIFIANTUTILISATEUR = :identifiantutilisateur;";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":nomutilisateur", $utilisateur->getNomUtilisateur(), PDO::PARAM_STR);
			$statement->bindValue(":adressemailutilisateur", $utilisateur->getAdresseMailUtilisateur(), PDO::PARAM_STR);
			$statement->bindValue(":estadministrateur", $utilisateur->getEstAdministrateur(), PDO::PARAM_BOOL);
			$statement->bindValue(":identifiantutilisateur", $utilisateur->getIdentifiantUtilisateur(), PDO::PARAM_INT);
			$statement->execute();
			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	/**
	 * Modifier le mot de passe d'un utilisateur.
	 * @param Utilisateur $utiisateur L'utilisateur à modifier.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 */
	public function modifierMotDePasseUtilisateur(Utilisateur $utilisateur): void {
		try {
			$this->pdo->beginTransaction();
			$requete = "UPDATE UTILISATEUR " .
					   "SET MOTDEPASSEUTILISATEUR = :motdepasseutilisateur " .
					   "WHERE IDENTIFIANTUTILISATEUR = :identifiantutilisateur;";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":motdepasseutilisateur", $utilisateur->getMotDePasseUtilisateur(), PDO::PARAM_STR);
			$statement->bindValue(":identifiantutilisateur", $utilisateur->getIdentifiantUtilisateur(), PDO::PARAM_INT);
			$statement->execute();
			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	/**
	 * Retourner l'utilisateur avec son nom d'utilisateur.
	 * @param string $nomUtilisateur Le nom d'utilisateur.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 * @return Utilisateur L'utilisateur.
	 */
	public function getUtilisateurAvecNomUtilisateur(string $nomUtilisateur): Utilisateur {
		try {
			$utilisateur = new Utilisateur();
			$requete = "SELECT IDENTIFIANTUTILISATEUR, NOMUTILISATEUR, MOTDEPASSEUTILISATEUR, ADRESSEMAILUTILISATEUR, ESTADMINISTRATEUR ".
					   "FROM UTILISATEUR ".
					   "WHERE NOMUTILISATEUR = :nomutilisateur";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":nomutilisateur", $nomUtilisateur, PDO::PARAM_STR);
			$statement->execute();
			$donnees = $statement->fetchAll();
			foreach ($donnees as $ligne) {
				$utilisateur->setIdentifiantUtilisateur($ligne["IDENTIFIANTUTILISATEUR"]);
				$utilisateur->setNomUtilisateur($ligne["NOMUTILISATEUR"]);
				$utilisateur->setMotDePasseUtilisateur($ligne["MOTDEPASSEUTILISATEUR"]);
				$utilisateur->setAdresseMailUtilisateur($ligne["ADRESSEMAILUTILISATEUR"]);
				$utilisateur->setEstAdministrateur($ligne["ESTADMINISTRATEUR"]);
			}
			return $utilisateur;
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

	/**
	 * Retourner la liste des utilisateurs.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 * @return array[] La liste des utilisateurs.
	 */
	public function chargerListeUtilisateurs(): array {
		try {
			$listeUtilisateurs = array();
			$requete = "SELECT IDENTIFIANTUTILISATEUR, NOMUTILISATEUR, ADRESSEMAILUTILISATEUR, ESTADMINISTRATEUR ".
					   "FROM UTILISATEUR;";
			$statement = $this->pdo->prepare($requete);
			$statement->execute();
			$donnees = $statement->fetchAll();
			foreach ($donnees as $ligne) {
				$utilisateur = new Utilisateur();
				$utilisateur->setIdentifiantUtilisateur($ligne["IDENTIFIANTUTILISATEUR"]);
				$utilisateur->setNomUtilisateur($ligne["NOMUTILISATEUR"]);
				$utilisateur->setAdresseMailUtilisateur($ligne["ADRESSEMAILUTILISATEUR"]);
				$utilisateur->setEstAdministrateur($ligne["ESTADMINISTRATEUR"]);
				$listeUtilisateurs[] = $utilisateur->getObjetSerializable();
			}
			return $listeUtilisateurs;
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