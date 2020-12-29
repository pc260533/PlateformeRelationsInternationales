<?php

/**
 * StockageVoeux short summary.
 *
 * StockageVoeux description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class StockageVoeux extends StockageBaseDeDonnees {

	public function __construct(string $dataSourceName, string $username, string $password) {
		parent::__construct($dataSourceName, $username, $password);
	}

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