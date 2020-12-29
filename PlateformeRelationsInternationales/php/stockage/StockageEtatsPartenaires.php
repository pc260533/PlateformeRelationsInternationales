<?php

/**
 * StockageEtatsPartenaires short summary.
 *
 * StockageEtatsPartenaires description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class StockageEtatsPartenaires extends StockageBaseDeDonnees {

	public function __construct(string $dataSourceName, string $username, string $password) {
		parent::__construct($dataSourceName, $username, $password);
	}

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