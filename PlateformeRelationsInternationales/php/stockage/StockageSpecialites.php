<?php

/**
 * StockageSpecialites short summary.
 *
 * StockageSpecialites description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class StockageSpecialites extends StockageBaseDeDonnees {

	private function chargerListeSousSpecialites(Specialite $specialite): void {
		$requete = "SELECT IDENTIFIANTSOUSSPECIALITE, NOMSOUSSPECIALITE ".
				   "FROM SOUSSPECIALITE ".
				   "WHERE IDENTIFIANTSPECIALITE = :identifiantspecialite;";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantspecialite", $specialite->getIdentifiantSpecialite(), PDO::PARAM_INT);
		$statement->execute();
		$donnees = $statement->fetchAll();
		foreach ($donnees as $ligne) {
			$sousSpecialite = new SousSpecialite();
			$sousSpecialite->setIdentifiantSousSpecialite($ligne["IDENTIFIANTSOUSSPECIALITE"]);
			$sousSpecialite->setNomSousSpecialite($ligne["NOMSOUSSPECIALITE"]);
			$specialite->ajouterSousSpecialite($sousSpecialite);
		}
	}

	public function __construct(string $dataSourceName, string $username, string $password) {
		parent::__construct($dataSourceName, $username, $password);
	}

	public function chargerListeSpecialites(): array {
		try {
			$listeSpecialites = array();
			$requete = "SELECT IDENTIFIANTSPECIALITE, NOMSPECIALITE, COULEURSPECIALITE ".
					   "FROM SPECIALITE;";
			$statement = $this->pdo->prepare($requete);
			$statement->execute();
			$donnees = $statement->fetchAll();
			foreach ($donnees as $ligne) {
				$specialite = new Specialite();
				$specialite->setIdentifiantSpecialite($ligne["IDENTIFIANTSPECIALITE"]);
				$specialite->setNomSpecialite($ligne["NOMSPECIALITE"]);
				$specialite->setCouleurSpecialite($ligne["COULEURSPECIALITE"]);
				$this->chargerListeSousSpecialites($specialite);
				$listeSpecialites[] = $specialite->getObjetSerializable();
			}
			return $listeSpecialites;
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