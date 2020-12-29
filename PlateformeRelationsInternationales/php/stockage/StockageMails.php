<?php

/**
 * StockageMails short summary.
 *
 * StockageMails description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class StockageMails extends StockageBaseDeDonnees {

	private function chargerDestinatairesContactsEtrangersDansMail(Mail $mail): void {
		$requete = "SELECT IDENTIFIANTCONTACT ".
				   "FROM CORRESPONDANCE_MAIL_ACONTACTETRANGER ".
				   "WHERE IDENTIFIANTMAIL = :identifiantmail;";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantmail", $mail->getIdentifiantMail(), PDO::PARAM_INT);
		$statement->execute();
		$donnees = $statement->fetchAll();
		foreach ($donnees as $ligne) {
			$contactEtranger = new ContactEtranger();
			$contactEtranger->setIdentifiantContact($ligne["IDENTIFIANTCONTACT"]);
			$mail->ajouterDestinataireContactEtranger($contactEtranger);
		}
	}

	private function chargerDestinatairesCoordinateursDansMail(Mail $mail): void {
		$requete = "SELECT IDENTIFIANTCONTACT ".
				   "FROM CORRESPONDANCE_MAIL_ACOORDINATEUR ".
				   "WHERE IDENTIFIANTMAIL = :identifiantmail;";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantmail", $mail->getIdentifiantMail(), PDO::PARAM_INT);
		$statement->execute();
		$donnees = $statement->fetchAll();
		foreach ($donnees as $ligne) {
			$coordinateur = new Coordinateur();
			$coordinateur->setIdentifiantContact($ligne["IDENTIFIANTCONTACT"]);
			$mail->ajouterDestinataireCoordinateur($coordinateur);
		}
	}

	private function chargerDestinatairesContactsMailsDansMail(Mail $mail): void {
		$requete = "SELECT ADRESSEMAILCONTACTMAIL ".
				   "FROM CORRESPONDANCE_MAIL_ACONTACTMAIL ".
				   "WHERE IDENTIFIANTMAIL = :identifiantmail;";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantmail", $mail->getIdentifiantMail(), PDO::PARAM_INT);
		$statement->execute();
		$donnees = $statement->fetchAll();
		foreach ($donnees as $ligne) {
			$contactMail = new ContactMail();
			$contactMail->setAdresseMailContactMail($ligne["ADRESSEMAILCONTACTMAIL"]);
			$mail->ajouterDestinataireContactMail($contactMail);
		}
	}

	private function chargerCopiesCarbonesContactsEtrangersDansMail(Mail $mail): void {
		$requete = "SELECT IDENTIFIANTCONTACT ".
				   "FROM CORRESPONDANCE_MAIL_CCCONTACTETRANGER ".
				   "WHERE IDENTIFIANTMAIL = :identifiantmail;";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantmail", $mail->getIdentifiantMail(), PDO::PARAM_INT);
		$statement->execute();
		$donnees = $statement->fetchAll();
		foreach ($donnees as $ligne) {
			$contactEtranger = new ContactEtranger();
			$contactEtranger->setIdentifiantContact($ligne["IDENTIFIANTCONTACT"]);
			$mail->ajouterCopieCarboneContactEtranger($contactEtranger);
		}
	}

	private function chargerCopiesCarbonesCoordinateursDansMail(Mail $mail): void {
		$requete = "SELECT IDENTIFIANTCONTACT ".
				   "FROM CORRESPONDANCE_MAIL_CCCOORDINATEUR ".
				   "WHERE IDENTIFIANTMAIL = :identifiantmail;";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantmail", $mail->getIdentifiantMail(), PDO::PARAM_INT);
		$statement->execute();
		$donnees = $statement->fetchAll();
		foreach ($donnees as $ligne) {
			$coordinateur = new Coordinateur();
			$coordinateur->setIdentifiantContact($ligne["IDENTIFIANTCONTACT"]);
			$mail->ajouterCopieCarboneCoordinateur($coordinateur);
		}
	}

	private function chargerCopiesCarbonesContactsMailsDansMail(Mail $mail): void {
		$requete = "SELECT ADRESSEMAILCONTACTMAIL ".
				   "FROM CORRESPONDANCE_MAIL_CCCONTACTMAIL ".
				   "WHERE IDENTIFIANTMAIL = :identifiantmail;";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantmail", $mail->getIdentifiantMail(), PDO::PARAM_INT);
		$statement->execute();
		$donnees = $statement->fetchAll();
		foreach ($donnees as $ligne) {
			$contactMail = new ContactMail();
			$contactMail->setAdresseMailContactMail($ligne["ADRESSEMAILCONTACTMAIL"]);
			$mail->ajouterCopieCarboneContactMail($contactMail);
		}
	}

	private function chargerCopiesCarbonesInvisiblesContactsEtrangersDansMail(Mail $mail): void {
		$requete = "SELECT IDENTIFIANTCONTACT ".
				   "FROM CORRESPONDANCE_MAIL_CCICONTACTETRANGER ".
				   "WHERE IDENTIFIANTMAIL = :identifiantmail;";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantmail", $mail->getIdentifiantMail(), PDO::PARAM_INT);
		$statement->execute();
		$donnees = $statement->fetchAll();
		foreach ($donnees as $ligne) {
			$contactEtranger = new ContactEtranger();
			$contactEtranger->setIdentifiantContact($ligne["IDENTIFIANTCONTACT"]);
			$mail->ajouterCopieCarboneInvisibleContactEtranger($contactEtranger);
		}
	}

	private function chargerCopiesCarbonesInvisiblesCoordinateursDansMail(Mail $mail): void {
		$requete = "SELECT IDENTIFIANTCONTACT ".
				   "FROM CORRESPONDANCE_MAIL_CCICOORDINATEUR ".
				   "WHERE IDENTIFIANTMAIL = :identifiantmail;";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantmail", $mail->getIdentifiantMail(), PDO::PARAM_INT);
		$statement->execute();
		$donnees = $statement->fetchAll();
		foreach ($donnees as $ligne) {
			$coordinateur = new Coordinateur();
			$coordinateur->setIdentifiantContact($ligne["IDENTIFIANTCONTACT"]);
			$mail->ajouterCopieCarboneInvisibleCoordinateur($coordinateur);
		}
	}

	private function chargerCopiesCarbonesInvisiblesContactsMailsDansMail(Mail $mail): void {
		$requete = "SELECT ADRESSEMAILCONTACTMAIL ".
				   "FROM CORRESPONDANCE_MAIL_CCICONTACTMAIL ".
				   "WHERE IDENTIFIANTMAIL = :identifiantmail;";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantmail", $mail->getIdentifiantMail(), PDO::PARAM_INT);
		$statement->execute();
		$donnees = $statement->fetchAll();
		foreach ($donnees as $ligne) {
			$contactMail = new ContactMail();
			$contactMail->setAdresseMailContactMail($ligne["ADRESSEMAILCONTACTMAIL"]);
			$mail->ajouterCopieCarboneInvisibleContactMail($contactMail);
		}
	}

	private function ajouterDestinataireContactEtrangerDansMail(Mail $mail, ContactEtranger $contactEtranger) {
		$requete = "INSERT INTO CORRESPONDANCE_MAIL_ACONTACTETRANGER(IDENTIFIANTMAIL, IDENTIFIANTCONTACT) VALUES (:identifiantmail, :identifiantcontact);";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantmail", $mail->getIdentifiantMail(), PDO::PARAM_INT);
		$statement->bindValue(":identifiantcontact", $contactEtranger->getIdentifiantContact(), PDO::PARAM_INT);
		$statement->execute();
	}

	private function ajouterDestinataireCoordinateurDansMail(Mail $mail, Coordinateur $coordinateur) {
		$requete = "INSERT INTO CORRESPONDANCE_MAIL_ACOORDINATEUR(IDENTIFIANTMAIL, IDENTIFIANTCONTACT) VALUES (:identifiantmail, :identifiantcontact);";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantmail", $mail->getIdentifiantMail(), PDO::PARAM_INT);
		$statement->bindValue(":identifiantcontact", $coordinateur->getIdentifiantContact(), PDO::PARAM_INT);
		$statement->execute();
	}

	private function ajouterDestinataireContactMailDansMail(Mail $mail, ContactMail $contactMail) {
		$requete = "INSERT INTO CORRESPONDANCE_MAIL_ACONTACTMAIL(IDENTIFIANTMAIL, ADRESSEMAILCONTACTMAIL) VALUES (:identifiantmail, :adressemailcontactmail);";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantmail", $mail->getIdentifiantMail(), PDO::PARAM_INT);
		$statement->bindValue(":adressemailcontactmail", $contactMail->getAdresseMailContactMail(), PDO::PARAM_STR);
		$statement->execute();
	}

	private function ajouterCopieCarboneContactEtrangerDansMail(Mail $mail, ContactEtranger $contactEtranger) {
		$requete = "INSERT INTO CORRESPONDANCE_MAIL_CCCONTACTETRANGER(IDENTIFIANTMAIL, IDENTIFIANTCONTACT) VALUES (:identifiantmail, :identifiantcontact);";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantmail", $mail->getIdentifiantMail(), PDO::PARAM_INT);
		$statement->bindValue(":identifiantcontact", $contactEtranger->getIdentifiantContact(), PDO::PARAM_INT);
		$statement->execute();
	}

	private function ajouterCopieCarboneCoordinateurDansMail(Mail $mail, Coordinateur $coordinateur) {
		$requete = "INSERT INTO CORRESPONDANCE_MAIL_CCOORDINATEUR(IDENTIFIANTMAIL, IDENTIFIANTCONTACT) VALUES (:identifiantmail, :identifiantcontact);";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantmail", $mail->getIdentifiantMail(), PDO::PARAM_INT);
		$statement->bindValue(":identifiantcontact", $coordinateur->getIdentifiantContact(), PDO::PARAM_INT);
		$statement->execute();
	}

	private function ajouterCopieCarboneContactMailDansMail(Mail $mail, ContactMail $contactMail) {
		$requete = "INSERT INTO CORRESPONDANCE_MAIL_CCCONTACTMAIL(IDENTIFIANTMAIL, ADRESSEMAILCONTACTMAIL) VALUES (:identifiantmail, :adressemailcontactmail);";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantmail", $mail->getIdentifiantMail(), PDO::PARAM_INT);
		$statement->bindValue(":adressemailcontactmail", $contactMail->getAdresseMailContactMail(), PDO::PARAM_STR);
		$statement->execute();
	}

	private function ajouterCopieCarboneInvisibleContactEtrangerDansMail(Mail $mail, ContactEtranger $contactEtranger) {
		$requete = "INSERT INTO CORRESPONDANCE_MAIL_CCICONTACTETRANGER(IDENTIFIANTMAIL, IDENTIFIANTCONTACT) VALUES (:identifiantmail, :identifiantcontact);";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantmail", $mail->getIdentifiantMail(), PDO::PARAM_INT);
		$statement->bindValue(":identifiantcontact", $contactEtranger->getIdentifiantContact(), PDO::PARAM_INT);
		$statement->execute();
	}

	private function ajouterCopieCarboneInvisibleCoordinateurDansMail(Mail $mail, Coordinateur $coordinateur) {
		$requete = "INSERT INTO CORRESPONDANCE_MAIL_CCIOORDINATEUR(IDENTIFIANTMAIL, IDENTIFIANTCONTACT) VALUES (:identifiantmail, :identifiantcontact);";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantmail", $mail->getIdentifiantMail(), PDO::PARAM_INT);
		$statement->bindValue(":identifiantcontact", $coordinateur->getIdentifiantContact(), PDO::PARAM_INT);
		$statement->execute();
	}

	private function ajouterCopieCarboneInvisibleContactMailDansMail(Mail $mail, ContactMail $contactMail) {
		$requete = "INSERT INTO CORRESPONDANCE_MAIL_CCICONTACTMAIL(IDENTIFIANTMAIL, ADRESSEMAILCONTACTMAIL) VALUES (:identifiantmail, :adressemailcontactmail);";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantmail", $mail->getIdentifiantMail(), PDO::PARAM_INT);
		$statement->bindValue(":adressemailcontactmail", $contactMail->getAdresseMailContactMail(), PDO::PARAM_STR);
		$statement->execute();
	}

	public function __construct(string $dataSourceName, string $username, string $password) {
		parent::__construct($dataSourceName, $username, $password);
	}

	public function ajouterMail(Mail $mail): void {
		try {
			$this->pdo->beginTransaction();
			$requete = "INSERT INTO MAIL(DATEENVOIE, ESTENVOYE, SUJETMAIL, MESSAGEHTMLMAIL, IDENTIFIANTTEMPLATEMAIL, IDENTIFIANTPARTENAIRE) VALUES (:dateenvoie, :estenvoye, :sujetmail, :messagehtmlmail, :identifianttemplatemail, :identifiantpartenaire);";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":dateenvoie", $mail->getDateEnvoie()->format("Y-m-d"), PDO::PARAM_STR);
			$statement->bindValue(":estenvoye", $mail->getEstEnvoye(), PDO::PARAM_BOOL);
			$statement->bindValue(":identifiantpartenaire", $mail->getPartenaireMail()->getIdentifiantPartenaire(), PDO::PARAM_INT);
			if ($mail->getTemplateMail()) {
				$statement->bindValue(":sujetmail", $mail->getSujetMail(), PDO::PARAM_NULL);
				$statement->bindValue(":messagehtmlmail", $mail->getMessageHtmlMail(), PDO::PARAM_NULL);
				$statement->bindValue(":identifianttemplatemail", $mail->getTemplateMail()->getIdentifiantTemplateMail(), PDO::PARAM_INT);
			}
			else {
				$statement->bindValue(":sujetmail", $mail->getSujetMail(), PDO::PARAM_STR);
				$statement->bindValue(":messagehtmlmail", $mail->getMessageHtmlMail(), PDO::PARAM_STR);
				$statement->bindValue(":identifianttemplatemail", $mail->getTemplateMail(), PDO::PARAM_NULL);
			}
			$statement->execute();
			$mail->setIdentifiantMail(intval($this->pdo->lastInsertId()));
			foreach ($mail->getListeDestinatairesContactsEtrangers() as $contactEtranger) {
				$this->ajouterDestinataireContactEtrangerDansMail($mail, $contactEtranger);
			}
			foreach ($mail->getListeDestinatairesCoordinateurs() as $coordinateur) {
				$this->ajouterDestinataireCoordinateurDansMail($mail, $coordinateur);
			}
			foreach ($mail->getListeDestinatairesContactsMails() as $contactMail) {
				$this->ajouterDestinataireContactMailDansMail($mail, $contactMail);
			}
			foreach ($mail->getListeCopiesCarbonesContactsEtrangers() as $contactEtranger) {
				$this->ajouterCopieCarboneContactEtrangerDansMail($mail, $contactEtranger);
			}
			foreach ($mail->getListeCopiesCarbonesCoordinateurs() as $coordinateur) {
				$this->ajouterCopieCarboneCoordinateurDansMail($mail, $coordinateur);
			}
			foreach ($mail->getListeCopiesCarbonesContactsMails() as $contactMail) {
				$this->ajouterCopieCarboneContactMailDansMail($mail, $contactMail);
			}
			foreach ($mail->getListeCopiesCarbonesInvisiblesContactsEtrangers() as $contactEtranger) {
				$this->ajouterCopieCarboneInvisibleContactEtrangerDansMail($mail, $contactEtranger);
			}
			foreach ($mail->getListeCopiesCarbonesInvisiblesCoordinateurs() as $coordinateur) {
				$this->ajouterCopieCarboneInvisibleCoordinateurDansMail($mail, $coordinateur);
			}
			foreach ($mail->getListeCopiesCarbonesInvisiblesContactsMails() as $contactMail) {
				$this->ajouterCopieCarboneInvisibleContactMailDansMail($mail, $contactMail);
			}
			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	public function supprimerMail(Mail $mail): void {
		try {
			$this->pdo->beginTransaction();
			$requete = "DELETE FROM MAIL " .
					   "WHERE IDENTIFIANTMAIL = :identifiantmail;";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":identifiantmail", $mail->getIdentifiantMail(), PDO::PARAM_INT);
			$statement->execute();
			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	public function modifierEstEnvoyeMail(Mail $mail): void {
		try {
			$this->pdo->beginTransaction();
			$requete = "UPDATE MAIL " .
					   "SET ESTENVOYE = :estenvoye " .
					   "WHERE IDENTIFIANTMAIL = :identifiantmail;";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":estenvoye", $mail->getEstEnvoye(), PDO::PARAM_BOOL);
			$statement->bindValue(":identifiantmail", $mail->getIdentifiantMail(), PDO::PARAM_INT);
			$statement->execute();
			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	public function chargerListeMails(): array {
		try {
			$listeMails = array();
			$requete = "SELECT IDENTIFIANTMAIL, DATEENVOIE, ESTENVOYE, SUJETMAIL, MESSAGEHTMLMAIL, IDENTIFIANTTEMPLATEMAIL, IDENTIFIANTPARTENAIRE ".
					   "FROM MAIL;";
			$statement = $this->pdo->prepare($requete);
			$statement->execute();
			$donnees = $statement->fetchAll();
			foreach ($donnees as $ligne) {
				$mail = new Mail();
				$mail->setIdentifiantMail($ligne["IDENTIFIANTMAIL"]);
				$mail->setDateEnvoie(DateTime::createFromFormat("Y-m-d", $ligne["DATEENVOIE"]));
				$mail->setEstEnvoye($ligne["ESTENVOYE"]);
				$mail->setSujetMail($ligne["SUJETMAIL"]);
				$mail->setMessageHtmlMail($ligne["MESSAGEHTMLMAIL"]);
				if ($ligne["IDENTIFIANTTEMPLATEMAIL"]) {
					$templateMail = new TemplateMail();
					$templateMail->setIdentifiantTemplateMail($ligne["IDENTIFIANTTEMPLATEMAIL"]);
					$mail->setTemplateMail($templateMail);
				}
				$partenaireMail = new Partenaire();
				$partenaireMail->setIdentifiantPartenaire($ligne["IDENTIFIANTPARTENAIRE"]).
				$mail->setPartenaireMail($partenaireMail);
				$mail->setIdentifiantMail($ligne["IDENTIFIANTMAIL"]);
				$this->chargerDestinatairesContactsEtrangersDansMail($mail);
				$this->chargerDestinatairesCoordinateursDansMail($mail);
				$this->chargerDestinatairesContactsMailsDansMail($mail);
				$this->chargerCopiesCarbonesContactsEtrangersDansMail($mail);
				$this->chargerCopiesCarbonesCoordinateursDansMail($mail);
				$this->chargerCopiesCarbonesContactsMailsDansMail($mail);
				$this->chargerCopiesCarbonesInvisiblesContactsEtrangersDansMail($mail);
				$this->chargerCopiesCarbonesInvisiblesCoordinateursDansMail($mail);
				$this->chargerCopiesCarbonesInvisiblesContactsMailsDansMail($mail);
				$listeMails[] = $mail->getObjetSerializable();
			}
			return $listeMails;
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

	public function getMailsNonEnvoyes(): array {
		try {
			$listeMails = array();
			$requete = "SELECT IDENTIFIANTMAIL, DATEENVOIE, ESTENVOYE, SUJETMAIL, MESSAGEHTMLMAIL, IDENTIFIANTTEMPLATEMAIL, IDENTIFIANTPARTENAIRE ".
					   "FROM MAIL ".
					   "WHERE ESTENVOYE = FALSE";
			$statement = $this->pdo->prepare($requete);
			$statement->execute();
			$donnees = $statement->fetchAll();
			foreach ($donnees as $ligne) {
				$mail = new Mail();
				$mail->setIdentifiantMail($ligne["IDENTIFIANTMAIL"]);
				$mail->setDateEnvoie(DateTime::createFromFormat("Y-m-d", $ligne["DATEENVOIE"]));
				$mail->setEstEnvoye($ligne["ESTENVOYE"]);
				$mail->setSujetMail($ligne["SUJETMAIL"]);
				$mail->setMessageHtmlMail($ligne["MESSAGEHTMLMAIL"]);
				if ($ligne["IDENTIFIANTTEMPLATEMAIL"]) {
					$templateMail = new TemplateMail();
					$templateMail->setIdentifiantTemplateMail($ligne["IDENTIFIANTTEMPLATEMAIL"]);
					$mail->setTemplateMail($templateMail);
				}
				$partenaireMail = new Partenaire();
				$partenaireMail->setIdentifiantPartenaire($ligne["IDENTIFIANTPARTENAIRE"]).
				$mail->setPartenaireMail($partenaireMail);
				$mail->setIdentifiantMail($ligne["IDENTIFIANTMAIL"]);
				$this->chargerDestinatairesContactsEtrangersDansMail($mail);
				$this->chargerDestinatairesCoordinateursDansMail($mail);
				$this->chargerDestinatairesContactsMailsDansMail($mail);
				$this->chargerCopiesCarbonesContactsEtrangersDansMail($mail);
				$this->chargerCopiesCarbonesCoordinateursDansMail($mail);
				$this->chargerCopiesCarbonesContactsMailsDansMail($mail);
				$this->chargerCopiesCarbonesInvisiblesContactsEtrangersDansMail($mail);
				$this->chargerCopiesCarbonesInvisiblesCoordinateursDansMail($mail);
				$this->chargerCopiesCarbonesInvisiblesContactsMailsDansMail($mail);
				$listeMails[] = $mail;
			}
			return $listeMails;
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