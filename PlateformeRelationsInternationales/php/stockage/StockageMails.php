<?php

/**
 *
 * StockageMails est la classe fournissant l'accès aux mails de la base de données Plateforme.
 * Elle hérite de StockageBaseDeDonnees.
 *
 * @version 1.0
 * @author Pierre-Nicolas
 */
class StockageMails extends StockageBaseDeDonnees {

	/**
	 * Charger les destinataires contacts étrangers dasn un mail.
	 * @param Mail $mail Le mail.
	 */
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

	/**
	 * Charger les destinataires coordianteurs dans un mail.
	 * @param Mail $mail Le mail.
	 */
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

	/**
	 * Charger les destinataires contacts mails dans un mail.
	 * @param Mail $mail Le mail.
	 */
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

	/**
	 * Charger les copies carbones contacts étrangers dans un mail.
	 * @param Mail $mail Le mail.
	 */
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

	/**
	 * Charger les copies carbones coordinateus dans un mail.
	 * @param Mail $mail Le mail.
	 */
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

	/**
	 * Charger les copies carbones contacts mail dans un mail.
	 * @param Mail $mail Le mail.
	 */
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

	/**
	 * Charger les copies carbones invisibles contacts étrangers dans un mail.
	 * @param Mail $mail Le mail.
	 */
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

	/**
	 * Charger les copies carbones invisibles cooridnateurs dans un mail.
	 * @param Mail $mail Le mail.
	 */
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

	/**
	 * Charger les copies carbones invisibles contacts mails dans un mail.
	 * @param Mail $mail Le mail.
	 */
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

	/**
	 * Ajouter un destinataire contatc étranger dans un mail.
	 * @param Mail $mail Le mail.
	 * @param ContactEtranger $contactEtranger Le contact étranger à ajouter.
	 */
	private function ajouterDestinataireContactEtrangerDansMail(Mail $mail, ContactEtranger $contactEtranger) {
		$requete = "INSERT INTO CORRESPONDANCE_MAIL_ACONTACTETRANGER(IDENTIFIANTMAIL, IDENTIFIANTCONTACT) VALUES (:identifiantmail, :identifiantcontact);";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantmail", $mail->getIdentifiantMail(), PDO::PARAM_INT);
		$statement->bindValue(":identifiantcontact", $contactEtranger->getIdentifiantContact(), PDO::PARAM_INT);
		$statement->execute();
	}

	/**
	 * Ajouter un destinataire coordinateur dans un mail.
	 * @param Mail $mail Le mail.
	 * @param Coordinateur $coordinateur Le coordinateur à ajouter.
	 */
	private function ajouterDestinataireCoordinateurDansMail(Mail $mail, Coordinateur $coordinateur) {
		$requete = "INSERT INTO CORRESPONDANCE_MAIL_ACOORDINATEUR(IDENTIFIANTMAIL, IDENTIFIANTCONTACT) VALUES (:identifiantmail, :identifiantcontact);";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantmail", $mail->getIdentifiantMail(), PDO::PARAM_INT);
		$statement->bindValue(":identifiantcontact", $coordinateur->getIdentifiantContact(), PDO::PARAM_INT);
		$statement->execute();
	}

	/**
	 * Ajouter un destinataire contact mail dans un mail.
	 * @param Mail $mail Le mail.
	 * @param ContactMail $contactMail Le contact mail à ajouter.
	 */
	private function ajouterDestinataireContactMailDansMail(Mail $mail, ContactMail $contactMail) {
		$requete = "INSERT INTO CORRESPONDANCE_MAIL_ACONTACTMAIL(IDENTIFIANTMAIL, ADRESSEMAILCONTACTMAIL) VALUES (:identifiantmail, :adressemailcontactmail);";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantmail", $mail->getIdentifiantMail(), PDO::PARAM_INT);
		$statement->bindValue(":adressemailcontactmail", $contactMail->getAdresseMailContactMail(), PDO::PARAM_STR);
		$statement->execute();
	}

	/**
	 * Ajouter une copie carbone contact étranger dans un mail.
	 * @param Mail $mail Le mail.
	 * @param ContactEtranger $contactEtranger Le contact étranger à ajouter.
	 */
	private function ajouterCopieCarboneContactEtrangerDansMail(Mail $mail, ContactEtranger $contactEtranger) {
		$requete = "INSERT INTO CORRESPONDANCE_MAIL_CCCONTACTETRANGER(IDENTIFIANTMAIL, IDENTIFIANTCONTACT) VALUES (:identifiantmail, :identifiantcontact);";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantmail", $mail->getIdentifiantMail(), PDO::PARAM_INT);
		$statement->bindValue(":identifiantcontact", $contactEtranger->getIdentifiantContact(), PDO::PARAM_INT);
		$statement->execute();
	}

	/**
	 * Ajouter une copie carbone coordinateur dans un mail.
	 * @param Mail $mail Le mail.
	 * @param Coordinateur $coordinateur Le coordinateur mail à ajouter.
	 */
	private function ajouterCopieCarboneCoordinateurDansMail(Mail $mail, Coordinateur $coordinateur) {
		$requete = "INSERT INTO CORRESPONDANCE_MAIL_CCOORDINATEUR(IDENTIFIANTMAIL, IDENTIFIANTCONTACT) VALUES (:identifiantmail, :identifiantcontact);";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantmail", $mail->getIdentifiantMail(), PDO::PARAM_INT);
		$statement->bindValue(":identifiantcontact", $coordinateur->getIdentifiantContact(), PDO::PARAM_INT);
		$statement->execute();
	}

	/**
	 * Ajouter une copie carbone contact mail dans un mail.
	 * @param Mail $mail Le mail.
	 * @param ContactMail $contactMail Le contact mail à ajouter.
	 */
	private function ajouterCopieCarboneContactMailDansMail(Mail $mail, ContactMail $contactMail) {
		$requete = "INSERT INTO CORRESPONDANCE_MAIL_CCCONTACTMAIL(IDENTIFIANTMAIL, ADRESSEMAILCONTACTMAIL) VALUES (:identifiantmail, :adressemailcontactmail);";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantmail", $mail->getIdentifiantMail(), PDO::PARAM_INT);
		$statement->bindValue(":adressemailcontactmail", $contactMail->getAdresseMailContactMail(), PDO::PARAM_STR);
		$statement->execute();
	}

	/**
	 * Ajouter une copie carbone invisible contact étranger dans un mail.
	 * @param Mail $mail Le mail.
	 * @param ContactEtranger $contactEtranger Le contact étranger à ajouter.
	 */
	private function ajouterCopieCarboneInvisibleContactEtrangerDansMail(Mail $mail, ContactEtranger $contactEtranger) {
		$requete = "INSERT INTO CORRESPONDANCE_MAIL_CCICONTACTETRANGER(IDENTIFIANTMAIL, IDENTIFIANTCONTACT) VALUES (:identifiantmail, :identifiantcontact);";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantmail", $mail->getIdentifiantMail(), PDO::PARAM_INT);
		$statement->bindValue(":identifiantcontact", $contactEtranger->getIdentifiantContact(), PDO::PARAM_INT);
		$statement->execute();
	}

	/**
	 * Ajouter une copie carbone invisible coordinateur dans un mail.
	 * @param Mail $mail Le mail.
	 * @param Coordinateur $coordinateur Le coordinateur mail à ajouter.
	 */
	private function ajouterCopieCarboneInvisibleCoordinateurDansMail(Mail $mail, Coordinateur $coordinateur) {
		$requete = "INSERT INTO CORRESPONDANCE_MAIL_CCIOORDINATEUR(IDENTIFIANTMAIL, IDENTIFIANTCONTACT) VALUES (:identifiantmail, :identifiantcontact);";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantmail", $mail->getIdentifiantMail(), PDO::PARAM_INT);
		$statement->bindValue(":identifiantcontact", $coordinateur->getIdentifiantContact(), PDO::PARAM_INT);
		$statement->execute();
	}

	/**
	 * Ajouter une copie carbone invisible contact mail dans un mail.
	 * @param Mail $mail Le mail.
	 * @param ContactMail $contactMail Le contact mail à ajouter.
	 */
	private function ajouterCopieCarboneInvisibleContactMailDansMail(Mail $mail, ContactMail $contactMail) {
		$requete = "INSERT INTO CORRESPONDANCE_MAIL_CCICONTACTMAIL(IDENTIFIANTMAIL, ADRESSEMAILCONTACTMAIL) VALUES (:identifiantmail, :adressemailcontactmail);";
		$statement = $this->pdo->prepare($requete);
		$statement->bindValue(":identifiantmail", $mail->getIdentifiantMail(), PDO::PARAM_INT);
		$statement->bindValue(":adressemailcontactmail", $contactMail->getAdresseMailContactMail(), PDO::PARAM_STR);
		$statement->execute();
	}

	/**
	 * Constructeur StockageMails prenant en paramètre le dataSourceName, le nom d'utilisateur et le mot de passe de la base de données.
	 * @param string $dataSourceName Le dataSourceName de la base de données.
	 * @param string $username Le nom d'utilisateur de la base de données.
	 * @param string $password Le mot de passe de la base de données.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 */
	public function __construct(string $dataSourceName, string $username, string $password) {
		parent::__construct($dataSourceName, $username, $password);
	}

	/**
	 * Ajouter un mail.
	 * @param Mail $mail Le mail à ajouter.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 */
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

	/**
	 * Supprimer un mail.
	 * @param Mail $mail Le mail à supprimer.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 */
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

	/**
	 * Modifier l'attribut est envoyé d'un mail.
	 * @param Mail $mail Le mail à ajouter.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 */
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

	/**
	 * Retourner la liste des mails.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 * @return array[] La liste des mails.
	 */
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

	/**
	 * Retourner la liste des mails non envoyés.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 * @return Mail[] La liste des mails non envoyés.
	 */
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