<?php

/**
 * ControleurTemplateMail short summary.
 *
 * ControleurTemplateMail description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class ControleurTemplatesMails implements IControleurPlateforme {
	private $stockageTemplatesMails;

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

	public function __construct() {
		$this->stockageTemplatesMails = new StockageTemplatesMails(getVariableEnvironnement("DATASOURCENAME_BASEDEDONNEEPLATEFORME"), getVariableEnvironnement("USERNAME_BASEDEDONNEE"), getVariableEnvironnement("PASSWORD_BASEDEDONNEE"));
	}

	public function ajouterTemplateMail(array $templateMailArray): TemplateMail {
		$templateMail = $this->creerTemplateMail($templateMailArray);
		$this->stockageTemplatesMails->ajouterTemplateMail($templateMail);
		return $templateMail;
	}

	public function supprimerTemplateMail(array $templateMailArray): TemplateMail {
		$templateMail = $this->creerTemplateMail($templateMailArray);
		$this->stockageTemplatesMails->supprimerTemplateMail($templateMail);
		return $templateMail;
	}

	public function modifierTemplateMail(array $templateMailArray): TemplateMail {
		$templateMail = $this->creerTemplateMail($templateMailArray);
		$this->stockageTemplatesMails->modifierTemplateMail($templateMail);
		return $templateMail;
	}

	public function chargerListeTemplatesMails(): array {
		return $this->stockageTemplatesMails->chargerListeTemplatesMails();
	}

}