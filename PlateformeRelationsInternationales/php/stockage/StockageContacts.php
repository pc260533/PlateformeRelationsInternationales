<?php

/**
 * StockageContacts short summary.
 *
 * StockageContacts description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class StockageContacts extends StockageBaseDeDonnees {

	public function __construct(string $dataSourceName, string $username, string $password) {
		parent::__construct($dataSourceName, $username, $password);
	}

	public function ajouterContact(Contact $contact, bool $estCoordinateur): void {
		try {
			$this->pdo->beginTransaction();
			$requete = "INSERT INTO CONTACT(NOMCONTACT, PRENOMCONTACT, ADRESSEMAILCONTACT, FONCTIONCONTACT, ESTCOORDINATEUR) VALUES (:nomcontact, :prenomcontact, :adressemailcontact, :fonctioncontact, :estcoordinateur);";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":nomcontact", $contact->getNomContact(), PDO::PARAM_STR);
			$statement->bindValue(":prenomcontact", $contact->getPrenomContact(), PDO::PARAM_STR);
			$statement->bindValue(":adressemailcontact", $contact->getAdresseMailContact(), PDO::PARAM_STR);
			$statement->bindValue(":fonctioncontact", $contact->getFonctionContact(), PDO::PARAM_STR);
			$statement->bindValue(":estcoordinateur", $estCoordinateur, PDO::PARAM_BOOL);
			$statement->execute();
			$contact->setIdentifiantContact(intval($this->pdo->lastInsertId()));
			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	public function supprimerContact(Contact $contact): void {
		try {
			$this->pdo->beginTransaction();
			$requete = "DELETE FROM CONTACT " .
					   "WHERE IDENTIFIANTCONTACT = :identifiantcontact;";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":identifiantcontact", $contact->getIdentifiantContact(), PDO::PARAM_INT);
			$statement->execute();
			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	public function modifierContact(Contact $contact): void {
		try {
			$this->pdo->beginTransaction();
			$requete = "UPDATE CONTACT " .
					   "SET NOMCONTACT = :nomcontact, PRENOMCONTACT = :prenomcontact, ADRESSEMAILCONTACT = :adressemailcontact, FONCTIONCONTACT = :fonctioncontact " .
					   "WHERE IDENTIFIANTCONTACT = :identifiantcontact;";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":nomcontact", $contact->getNomContact(), PDO::PARAM_STR);
			$statement->bindValue(":prenomcontact", $contact->getPrenomContact(), PDO::PARAM_STR);
			$statement->bindValue(":adressemailcontact", $contact->getAdresseMailContact(), PDO::PARAM_STR);
			$statement->bindValue(":fonctioncontact", $contact->getFonctionContact(), PDO::PARAM_STR);
			$statement->bindValue(":identifiantcontact", $contact->getIdentifiantContact(), PDO::PARAM_INT);
			$statement->execute();
			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	public function chargerListeContactsContactsEtrangers(): array {
		try {
			$listeContacts = array();
			$requete = "SELECT IDENTIFIANTCONTACT, NOMCONTACT, PRENOMCONTACT, ADRESSEMAILCONTACT, FONCTIONCONTACT, ESTCOORDINATEUR ".
					   "FROM CONTACT;";
			$statement = $this->pdo->prepare($requete);
			$statement->execute();
			$donnees = $statement->fetchAll();
			foreach ($donnees as $ligne) {
				$estCoordinateur = $ligne["ESTCOORDINATEUR"];
				if (!$estCoordinateur) {
					$contact = new Coordinateur();
					$contact->setIdentifiantContact($ligne["IDENTIFIANTCONTACT"]);
					$contact->setNomContact($ligne["NOMCONTACT"]);
					$contact->setPrenomContact($ligne["PRENOMCONTACT"]);
					$contact->setAdresseMailContact($ligne["ADRESSEMAILCONTACT"]);
					$contact->setFonctionContact($ligne["FONCTIONCONTACT"]);
					$listeContacts[] = $contact->getObjetSerializable();
				}
			}
			return $listeContacts;
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

	public function chargerListeContactsCoordinateurs(): array {
		try {
			$listeContacts = array();
			$requete = "SELECT IDENTIFIANTCONTACT, NOMCONTACT, PRENOMCONTACT, ADRESSEMAILCONTACT, FONCTIONCONTACT, ESTCOORDINATEUR ".
					   "FROM CONTACT;";
			$statement = $this->pdo->prepare($requete);
			$statement->execute();
			$donnees = $statement->fetchAll();
			foreach ($donnees as $ligne) {
				$estCoordinateur = $ligne["ESTCOORDINATEUR"];
				if ($estCoordinateur) {
					$contact = new Coordinateur();
					$contact->setIdentifiantContact($ligne["IDENTIFIANTCONTACT"]);
					$contact->setNomContact($ligne["NOMCONTACT"]);
					$contact->setPrenomContact($ligne["PRENOMCONTACT"]);
					$contact->setAdresseMailContact($ligne["ADRESSEMAILCONTACT"]);
					$contact->setFonctionContact($ligne["FONCTIONCONTACT"]);
					$listeContacts[] = $contact->getObjetSerializable();
				}
			}
			return $listeContacts;
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