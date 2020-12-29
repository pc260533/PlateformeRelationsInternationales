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