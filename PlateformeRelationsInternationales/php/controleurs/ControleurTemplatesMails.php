<?php

/**
 *
 * ControleurTemplatesMails est la classe représentant un controleur de templates mails.
 * Elle implémente l'interface IControleurPlateforme.
 *
 * @version 1.0
 * @author Pierre-Nicolas
 */
class ControleurTemplatesMails implements IControleurPlateforme {
	/**
	 * Le stockage de templates mails.
	 * @var StockageTemplatesMails
	 */
	private $stockageTemplatesMails;

	/**
	 * Créer un template mail à partir d'un tableau.
	 * @param array $templateMailArray Le tableau représentant un template mail.
	 * @return TemplateMail Le template mail créé.
	 */
	private function creerTemplateMail(array $templateMailArray): TemplateMail {
		$templateMail = new TemplateMail();
		if (isset($templateMailArray["identifiantTemplateMail"])) {
			$templateMail->setIdentifiantTemplateMail($templateMailArray["identifiantTemplateMail"]);
		}
		if (isset($templateMailArray["nomTemplateMail"])) {
			$templateMail->setNomTemplateMail($templateMailArray["nomTemplateMail"]);
		}
		if (isset($templateMailArray["sujetTemplateMail"])) {
			$templateMail->setSujetTemplateMail($templateMailArray["sujetTemplateMail"]);
		}
		if (isset($templateMailArray["messageHtmlTemplateMail"])) {
			$templateMail->setMessageHtmlTemplateMail($templateMailArray["messageHtmlTemplateMail"]);
		}
		return $templateMail;
	}

	/**
	 * Constructeur ControleurTemplatesMails sans paramètres.
	 */
	public function __construct() {
		$this->stockageTemplatesMails = new StockageTemplatesMails(getVariableEnvironnement("DATASOURCENAME_BASEDEDONNEEPLATEFORME"), getVariableEnvironnement("USERNAME_BASEDEDONNEE"), getVariableEnvironnement("PASSWORD_BASEDEDONNEE"));
	}

	/**
	 * Ajouter un template mail.
	 * @param array $templateMailArray Le tableau représentant un template mail.
	 * @return TemplateMail Le template mail ajouté.
	 */
	public function ajouterTemplateMail(array $templateMailArray): TemplateMail {
		$templateMail = $this->creerTemplateMail($templateMailArray);
		$this->stockageTemplatesMails->ajouterTemplateMail($templateMail);
		return $templateMail;
	}

	/**
	 * Supprimer un template mail.
	 * @param array $templateMailArray Le tableau représentant un template mail.
	 * @return TemplateMail Le template mail supprimé.
	 */
	public function supprimerTemplateMail(array $templateMailArray): TemplateMail {
		$templateMail = $this->creerTemplateMail($templateMailArray);
		$this->stockageTemplatesMails->supprimerTemplateMail($templateMail);
		return $templateMail;
	}

	/**
	 * Modifier un template mail.
	 * @param array $templateMailArray Le tableau représentant un template mail.
	 * @return TemplateMail Le template mail modifié.
	 */
	public function modifierTemplateMail(array $templateMailArray): TemplateMail {
		$templateMail = $this->creerTemplateMail($templateMailArray);
		$this->stockageTemplatesMails->modifierTemplateMail($templateMail);
		return $templateMail;
	}

	/**
	 * Retourner la liste des templates mails.
	 * @return array La liste des templates mails.
	 */
	public function chargerListeTemplatesMails(): array {
		return $this->stockageTemplatesMails->chargerListeTemplatesMails();
	}

}