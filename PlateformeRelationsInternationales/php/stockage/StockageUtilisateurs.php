<?php

/**
 * StockageUtilisateurs short summary.
 *
 * StockageUtilisateurs description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class StockageUtilisateurs extends StockageBaseDeDonnees {

	public function __construct(string $dataSourceName, string $username, string $password) {
		parent::__construct($dataSourceName, $username, $password);
	}

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