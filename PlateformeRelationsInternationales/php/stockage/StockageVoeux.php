<?php

/**
 *
 * StockageVoeux est la classe fournissant l'accès aux voeux de la base de données Plateforme.
 * Elle hérite de StockageBaseDeDonnees.
 *
 * @version 1.0
 * @author Pierre-Nicolas
 */
class StockageVoeux extends StockageBaseDeDonnees {

	/**
	 * Constructeur StockageVoeux prenant en paramètre le dataSourceName, le nom d'utilisateur et le mot de passe de la base de données.
	 * @param string $dataSourceName Le dataSourceName de la base de données.
	 * @param string $username Le nom d'utilisateur de la base de données.
	 * @param string $password Le mot de passe de la base de données.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 */
	public function __construct(string $dataSourceName, string $username, string $password) {
		parent::__construct($dataSourceName, $username, $password);
	}

	/**
	 * Ajouter un voeu.
	 * @param Voeu $voeu Le voeu à ajouter.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 */
	public function ajouterVoeu(Voeu $voeu): void {
		try {
			$this->pdo->beginTransaction();
			$requete = "INSERT INTO VOEU(ADRESSEMAILVOEU) VALUES (:adressemailvoeu);";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":adressemailvoeu", $voeu->getAdresseMailVoeu(), PDO::PARAM_STR);
			$statement->execute();
			$voeu->setIdentifiantVoeu(intval($this->pdo->lastInsertId()));
			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	/**
	 * Supprimer un voeu.
	 * @param Voeu $voeu Le voeu à supprimer.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 */
	public function supprimerVoeu(Voeu $voeu): void {
		try {
			$this->pdo->beginTransaction();
			$requete = "DELETE FROM VOEU " .
					   "WHERE IDENTIFIANTVOEU = :identifiantvoeu;";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":identifiantvoeu", $voeu->getIdentifiantVoeu(), PDO::PARAM_INT);
			$statement->execute();
			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	/**
	 * Retourner le voeu avec l'adresse mail du voeu.
	 * @param string $adresseMailVoeu L'adresse mail du voeu.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 * @return null|Voeu
	 */
	public function getVoeuAvecAdresseMailVoeu(string $adresseMailVoeu): ?Voeu {
		try {
			$voeu = null;
			$requete = "SELECT IDENTIFIANTVOEU, ADRESSEMAILVOEU ".
					   "FROM VOEU ".
					   "WHERE ADRESSEMAILVOEU = :adressemailvoeu;";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":adressemailvoeu", $adresseMailVoeu, PDO::PARAM_STR);
			$statement->execute();
			$donnees = $statement->fetchAll();
			foreach ($donnees as $ligne) {
				$voeu = new Voeu();
				$voeu->setIdentifiantVoeu($ligne["IDENTIFIANTVOEU"]);
				$voeu->setAdresseMailVoeu($ligne["ADRESSEMAILVOEU"]);
			}
			return $voeu;
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
	 * Rztourner la liste de voeu
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 * @return array[] La liste de voeu.
	 */
	public function chargerListeVoeux(): array {
		try {
			$listeVoeux = array();
			$requete = "SELECT IDENTIFIANTVOEU, ADRESSEMAILVOEU ".
					   "FROM VOEU;";
			$statement = $this->pdo->prepare($requete);
			$statement->execute();
			$donnees = $statement->fetchAll();
			foreach ($donnees as $ligne) {
				$voeu = new Voeu();
				$voeu->setIdentifiantVoeu($ligne["IDENTIFIANTVOEU"]);
				$voeu->setAdresseMailVoeu($ligne["ADRESSEMAILVOEU"]);
				$listeVoeux[] = $voeu->getObjetSerializable();
			}
			return $listeVoeux;
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