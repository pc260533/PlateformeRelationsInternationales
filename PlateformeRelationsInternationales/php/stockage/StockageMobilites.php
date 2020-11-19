<?php

/**
 * StockageMobilites short summary.
 *
 * StockageMobilites description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class StockageMobilites extends StockageBaseDeDonnees {

	public function __construct(string $dataSourceName, string $username, string $password) {
		parent::__construct($dataSourceName, $username, $password);
	}

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