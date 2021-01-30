<?php

/**
 *
 * StockageContacts est la classe fournissant l'accès aux contacts de la base de données Plateforme.
 * Elle hérite de StockageBaseDeDonnees.
 *
 * @version 1.0
 * @author Pierre-Nicolas
 */
class StockageContacts extends StockageBaseDeDonnees {

	/**
	 * Constructeur StockageContacts prenant en paramètre le dataSourceName, le nom d'utilisateur et le mot de passe de la base de données.
	 * @param string $dataSourceName Le dataSourceName de la base de données.
	 * @param string $username Le nom d'utilisateur de la base de données.
	 * @param string $password Le mot de passe de la base de données.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 */
	public function __construct(string $dataSourceName, string $username, string $password) {
		parent::__construct($dataSourceName, $username, $password);
	}

	/**
	 * Ajouter un contact.
	 * @param Contact $contact Le contact à ajouter.
	 * @param bool $estCoordinateur Le booléen indiquant si le contact est un coordinateur.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 */
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

	/**
	 * Supprimer un contact.
	 * @param Contact $contact Le contact à supprimer.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 */
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

	/**
	 * Modifier un contact.
	 * @param Contact $contact Le contact à modifier.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 */
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

	/**
	 * Retourner la liste de contacts étrangers.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 * @return array[] La liste de contacts étrangers.
	 */
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

	/**
	 * Retourner la liste de coordinateurs.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 * @return array[] La liste de coordinateurs.
	 */
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