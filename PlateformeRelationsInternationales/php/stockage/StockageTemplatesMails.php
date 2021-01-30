<?php

/**
 *
 * StockageTemplatesMails est la classe fournissant l'accès aux templates mails de la base de données Plateforme.
 * Elle hérite de StockageBaseDeDonnees.
 *
 * @version 1.0
 * @author Pierre-Nicolas
 */
class StockageTemplatesMails extends StockageBaseDeDonnees {

	/**
	 * Constructeur StockageTemplatesMails prenant en paramètre le dataSourceName, le nom d'utilisateur et le mot de passe de la base de données.
	 * @param string $dataSourceName Le dataSourceName de la base de données.
	 * @param string $username Le nom d'utilisateur de la base de données.
	 * @param string $password Le mot de passe de la base de données.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 */
	public function __construct(string $dataSourceName, string $username, string $password) {
		parent::__construct($dataSourceName, $username, $password);
	}

	/**
	 * Ajouter un template mail
	 * @param TemplateMail $templateMail Le template mail à ajouter.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 */
	public function ajouterTemplateMail(TemplateMail $templateMail): void {
		try {
			$this->pdo->beginTransaction();
			$requete = "INSERT INTO TEMPLATEMAIL(NOMTEMPLATEMAIL, SUJETTEMPLATEMAIL, MESSAGEHTMLTEMPLATEMAIL) VALUES (:nomtemplatemail, :sujettemplatemail, :messagehtmltemplatemail);";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":nomtemplatemail", $templateMail->getNomTemplateMail(), PDO::PARAM_STR);
			$statement->bindValue(":sujettemplatemail", $templateMail->getSujetTemplateMail(), PDO::PARAM_STR);
			$statement->bindValue(":messagehtmltemplatemail", $templateMail->getMessageHtmlTemplateMail(), PDO::PARAM_STR);
			$statement->execute();
			$templateMail->setIdentifiantTemplateMail(intval($this->pdo->lastInsertId()));
			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	/**
	 * Supprimer un template mail
	 * @param TemplateMail $templateMail Le template mail à supprimer.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 */
	public function supprimerTemplateMail(TemplateMail $templateMail): void {
		try {
			$this->pdo->beginTransaction();
			$requete = "DELETE FROM TEMPLATEMAIL " .
					   "WHERE IDENTIFIANTTEMPLATEMAIL= :identifianttemplatemail;";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":identifianttemplatemail", $templateMail->getIdentifiantTemplateMail(), PDO::PARAM_INT);
			$statement->execute();
			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	/**
	 * Modifier un template mail
	 * @param TemplateMail $templateMail Le template mail à modifier.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 */
	public function modifierTemplateMail(TemplateMail $templateMail): void {
		try {
			$this->pdo->beginTransaction();
			$requete = "UPDATE TEMPLATEMAIL " .
					   "SET NOMTEMPLATEMAIL = :nomtemplatemail, SUJETTEMPLATEMAIL = :sujettemplatemail, MESSAGEHTMLTEMPLATEMAIL = :messagehtmltemplatemail " .
					   "WHERE IDENTIFIANTTEMPLATEMAIL = :identifianttemplatemail;";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":nomtemplatemail", $templateMail->getNomTemplateMail(), PDO::PARAM_STR);
			$statement->bindValue(":sujettemplatemail", $templateMail->getSujetTemplateMail(), PDO::PARAM_STR);
			$statement->bindValue(":messagehtmltemplatemail", $templateMail->getMessageHtmlTemplateMail(), PDO::PARAM_STR);
			$statement->bindValue(":identifianttemplatemail", $templateMail->getIdentifiantTemplateMail(), PDO::PARAM_INT);
			$statement->execute();
			$this->pdo->commit();
		}
		catch (PDOException $exception) {
			$this->pdo->rollBack();
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

	/**
	 * Charger le tempalte mail avec l'identifiant du template mail.
	 * @param TemplateMail $templateMail  Le tempalte mail à charger.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 */
	public function chargerTemplateMailAvecIdentifiant(TemplateMail $templateMail): void {
		try {
			$requete = "SELECT IDENTIFIANTTEMPLATEMAIL, NOMTEMPLATEMAIL, SUJETTEMPLATEMAIL, MESSAGEHTMLTEMPLATEMAIL ".
					   "FROM TEMPLATEMAIL ".
					   "WHERE IDENTIFIANTTEMPLATEMAIL = :identifianttemplatemail";
			$statement = $this->pdo->prepare($requete);
			$statement->bindValue(":identifianttemplatemail", $templateMail->getIdentifiantTemplateMail(), PDO::PARAM_INT);
			$statement->execute();
			$donnees = $statement->fetchAll();
			foreach ($donnees as $ligne) {
				$templateMail->setIdentifiantTemplateMail($ligne["IDENTIFIANTTEMPLATEMAIL"]);
				$templateMail->setNomTemplateMail($ligne["NOMTEMPLATEMAIL"]);
				$templateMail->setSujetTemplateMail($ligne["SUJETTEMPLATEMAIL"]);
				$templateMail->setMessageHtmlTemplateMail($ligne["MESSAGEHTMLTEMPLATEMAIL"]);
			}
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
	 * Retourner la liste des templates mails.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 * @return array[] La liste des templates mails.
	 */
	public function chargerListeTemplatesMails(): array {
		try {
			$listeTemplatesMails = array();
			$requete = "SELECT IDENTIFIANTTEMPLATEMAIL, NOMTEMPLATEMAIL, SUJETTEMPLATEMAIL, MESSAGEHTMLTEMPLATEMAIL ".
					   "FROM TEMPLATEMAIL;";
			$statement = $this->pdo->prepare($requete);
			$statement->execute();
			$donnees = $statement->fetchAll();
			foreach ($donnees as $ligne) {
				$templateMail = new TemplateMail();
				$templateMail->setIdentifiantTemplateMail($ligne["IDENTIFIANTTEMPLATEMAIL"]);
				$templateMail->setNomTemplateMail($ligne["NOMTEMPLATEMAIL"]);
				$templateMail->setSujetTemplateMail($ligne["SUJETTEMPLATEMAIL"]);
				$templateMail->setMessageHtmlTemplateMail($ligne["MESSAGEHTMLTEMPLATEMAIL"]);
				$listeTemplatesMails[] = $templateMail->getObjetSerializable();
			}
			return $listeTemplatesMails;
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