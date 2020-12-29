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