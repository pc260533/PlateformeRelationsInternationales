<?php

/**
 * ControleurMails short summary.
 *
 * ControleurMails description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class ControleurMails implements IControleurPlateforme {
	private $gestionMails;
	private $stockageMails;

	private function creerMail(array $mailArray): Mail {
		$mail = new Mail();
		if (isset($mailArray["identifiantMail"])) {
			$mail->setIdentifiantMail($mailArray["identifiantMail"]);
		}
		if (isset($mailArray["dateEnvoie"])) {
			$mail->setDateEnvoie(DateTime::createFromFormat("Y-m-d", $mailArray["dateEnvoie"]));
		}
		if (isset($mailArray["estEnvoye"])) {
			$mail->setEstEnvoye(filter_var($mailArray["estEnvoye"], FILTER_VALIDATE_BOOLEAN));
		}
		if (isset($mailArray["listeDestinatairesContactsEtrangers"])) {
			foreach ($mailArray["listeDestinatairesContactsEtrangers"] as $contactEtrangerArray) {
				$contactEtranger = new ContactEtranger();
				$contactEtranger->setIdentifiantContact($contactEtrangerArray["identifiantContact"]);
				$mail->ajouterDestinataireContactEtranger($contactEtranger);
			}
		}
		if (isset($mailArray["listeDestinatairesCoordinateurs"])) {
			foreach ($mailArray["listeDestinatairesCoordinateurs"] as $coordinateurArray) {
				$coordinateur = new Coordinateur();
				$coordinateur->setIdentifiantContact($coordinateurArray["identifiantContact"]);
				$mail->ajouterDestinataireCoordinateur($coordinateur);
			}
		}
		if (isset($mailArray["listeDestinatairesContactsMails"])) {
			foreach ($mailArray["listeDestinatairesContactsMails"] as $contactMailArray) {
				$contactMail = new ContactMail();
				$contactMail->setNomContactMail($contactMailArray["nomContactMail"]);
				$contactMail->setAdresseMailContactMail($contactMailArray["adresseMailContactMail"]);
				$mail->ajouterDestinataireContactMail($contactMail);
			}
		}
		if (isset($mailArray["listeCopiesCarbonesContactsEtrangers"])) {
			foreach ($mailArray["listeCopiesCarbonesContactsEtrangers"] as $contactEtrangerArray) {
				$contactEtranger = new ContactEtranger();
				$contactEtranger->setIdentifiantContact($contactEtrangerArray["identifiantContact"]);
				$mail->ajouterCopieCarboneContactEtranger($contactEtranger);
			}
		}
		if (isset($mailArray["listeCopiesCarbonesCoordinateurs"])) {
			foreach ($mailArray["listeCopiesCarbonesCoordinateurs"] as $coordinateurArray) {
				$coordinateur = new Coordinateur();
				$coordinateur->setIdentifiantContact($coordinateurArray["identifiantContact"]);
				$mail->ajouterCopieCarboneCoordinateur($coordinateur);
			}
		}
		if (isset($mailArray["listeCopiesCarbonesContactsMails"])) {
			foreach ($mailArray["listeCopiesCarbonesContactsMails"] as $contactMailArray) {
				$contactMail = new ContactMail();
				$contactMail->setNomContactMail($contactMailArray["nomContactMail"]);
				$contactMail->setAdresseMailContactMail($contactMailArray["adresseMailContactMail"]);
				$mail->ajouterCopieCarboneContactMail($contactMail);
			}
		}
		if (isset($mailArray["listeCopiesCarbonesInvisiablesContactsEtrangers"])) {
			foreach ($mailArray["listeCopiesCarbonesInvisiablesContactsEtrangers"] as $contactEtrangerArray) {
				$contactEtranger = new ContactEtranger();
				$contactEtranger->setIdentifiantContact($contactEtrangerArray["identifiantContact"]);
				$mail->ajouterCopieCarboneInvisibleContactEtranger($contactEtranger);
			}
		}
		if (isset($mailArray["listeCopiesCarbonesInvisiablesCoordinateurs"])) {
			foreach ($mailArray["listeCopiesCarbonesInvisiablesCoordinateurs"] as $coordinateurArray) {
				$coordinateur = new Coordinateur();
				$coordinateur->setIdentifiantContact($coordinateurArray["identifiantContact"]);
				$mail->ajouterCopieCarboneInvisibleCoordinateur($coordinateur);
			}
		}
		if (isset($mailArray["listeCopiesCarbonesInvisiablesContactsMails"])) {
			foreach ($mailArray["listeCopiesCarbonesInvisiablesContactsMails"] as $contactMailArray) {
				$contactMail = new ContactMail();
				$contactMail->setNomContactMail($contactMailArray["nomContactMail"]);
				$contactMail->setAdresseMailContactMail($contactMailArray["adresseMailContactMail"]);
				$mail->ajouterCopieCarboneInvisibleContactMail($contactMail);
			}
		}
		if (isset($mailArray["sujetMail"])) {
			$mail->setSujetMail($mailArray["sujetMail"]);
		}
		if (isset($mailArray["messageHtmlMail"])) {
			$mail->setMessageHtmlMail($mailArray["messageHtmlMail"]);
		}
		if (isset($mailArray["templateMail"])) {
			$templateMail = new TemplateMail();
			$templateMail->setIdentifiantTemplateMail($mailArray["templateMail"]["identifiantTemplateMail"]);
			$mail->setTemplateMail($templateMail);
		}
		if (isset($mailArray["partenaireMail"])) {
			$partenaireMail = new Partenaire();
			$partenaireMail->setIdentifiantPartenaire($mailArray["partenaireMail"]["identifiantPartenaire"]);
			$mail->setPartenaireMail($partenaireMail);
		}
		return $mail;
	}

	private function creerMailGestionMails(Mail $mail): MailGestionMails {
		$mailGestionMail = new MailGestionMails();
		$mailGestionMail->setExpediteur(new ContactMailGestionMails(getVariableEnvironnement("SMTP_NAME"), getVariableEnvironnement("SMTP_MAIL")));
		foreach ($mail->getListeDestinatairesContactsEtrangers() as $contactEtranger) {
			$contactMailGestionMail = new ContactMailGestionMails($contactEtranger->getNomContact(), $contactEtranger->getAdresseMailContact());
			$mailGestionMail->ajouterDestinataire($contactMailGestionMail);
		}
		foreach ($mail->getListeDestinatairesCoordinateurs() as $coordinateur) {
			$contactMailGestionMail = new ContactMailGestionMails($coordinateur->getNomContact(), $coordinateur->getAdresseMailContact());
			$mailGestionMail->ajouterDestinataire($contactMailGestionMail);
		}
		foreach ($mail->getListeDestinatairesContactsMails() as $contactMail) {
			$contactMailGestionMail = new ContactMailGestionMails($contactMail->getNomContactMail(), $contactMail->getAdresseMailContactMail());
			$mailGestionMail->ajouterDestinataire($contactMailGestionMail);
		}
		foreach ($mail->getListeCopiesCarbonesContactsEtrangers() as $contactEtranger) {
			$contactMailGestionMail = new ContactMailGestionMails($contactEtranger->getNomContact(), $contactEtranger->getAdresseMailContact());
			$mailGestionMail->ajouterCopieCarbone($contactMailGestionMail);
		}
		foreach ($mail->getListeCopiesCarbonesCoordinateurs() as $coordinateur) {
			$contactMailGestionMail = new ContactMailGestionMails($coordinateur->getNomContact(), $coordinateur->getAdresseMailContact());
			$mailGestionMail->ajouterCopieCarbone($contactMailGestionMail);
		}
		foreach ($mail->getListeCopiesCarbonesContactsMails() as $contactMail) {
			$contactMailGestionMail = new ContactMailGestionMails($contactMail->getNomContactMail(), $contactMail->getAdresseMailContactMail());
			$mailGestionMail->ajouterCopieCarbone($contactMailGestionMail);
		}
		foreach ($mail->getListeCopiesCarbonesInvisiblesContactsEtrangers() as $contactEtranger) {
			$contactMailGestionMail = new ContactMailGestionMails($contactEtranger->getNomContact(), $contactEtranger->getAdresseMailContact());
			$mailGestionMail->ajouterCopieCarboneInvisible($contactMailGestionMail);
		}
		foreach ($mail->getListeCopiesCarbonesInvisiblesCoordinateurs() as $coordinateur) {
			$contactMailGestionMail = new ContactMailGestionMails($coordinateur->getNomContact(), $coordinateur->getAdresseMailContact());
			$mailGestionMail->ajouterCopieCarboneInvisible($contactMailGestionMail);
		}
		foreach ($mail->getListeCopiesCarbonesInvisiblesContactsMails() as $contactMail) {
			$contactMailGestionMail = new ContactMailGestionMails($contactMail->getNomContactMail(), $contactMail->getAdresseMailContactMail());
			$mailGestionMail->ajouterCopieCarboneInvisible($contactMailGestionMail);
		}
		$mailGestionMail->setSujetMail($mail->getSujetMail());
		$mailGestionMail->setMessageHtml($mail->getMessageHtmlMail());
		return $mailGestionMail;
	}

	public function __construct() {
		$this->gestionMails = new GestionMails();
		$this->stockageMails = new StockageMails(getVariableEnvironnement("DATASOURCENAME_BASEDEDONNEEPLATEFORME"), getVariableEnvironnement("USERNAME_BASEDEDONNEE"), getVariableEnvironnement("PASSWORD_BASEDEDONNEE"));
	}

	public function envoyerMailsValidationListeVoeuxPartenaire(array $listePartenaires, string $adresseMailVoeu): void {
		$mail = new MailGestionMails();
		$mail->setExpediteur(new ContactMailGestionMails(getVariableEnvironnement("SMTP_NAME"), getVariableEnvironnement("SMTP_MAIL")));
		$mail->setSujetMail("Demande validation Voeux Relations Internationales");
		$res = "";
		foreach ($listePartenaires as $partenaire) {
			$res .= base64_encode($partenaire->getIdentifiantPartenaire()) . "/";
		}
		$res .= base64_encode($adresseMailVoeu);
		$lienApiVoeuxDansPartenaire = getVariableEnvironnement("URL_BASENAME").'api/voeuxDansPartenaire/'. urlencode($res);
		$mail->setMessageHtml(str_replace("%lienApiVoeuxDansPartenaire%", $lienApiVoeuxDansPartenaire, file_get_contents("./php/templates/validationListeVoeuxPartenaires.php")));
		$mail->ajouterDestinataire(new ContactMailGestionMails($adresseMailVoeu, $adresseMailVoeu));
		$this->gestionMails->envoyerMail($mail);
	}

	public function envoyerMailPartenaire(array $mailArray): void {
		$mailGestionMail = $this->creerMailGestionMails($this->creerMail($mailArray));
		$this->gestionMails->envoyerMail($mailGestionMail);
	}

	public function envoyerMailsPartenairesEnAttente(): void {
		$listeMails = $this->stockageMails->getMailsNonEnvoyes();
		$stockageTemplatesMails = new StockageTemplatesMails(getVariableEnvironnement("DATASOURCENAME_BASEDEDONNEEPLATEFORME"), getVariableEnvironnement("USERNAME_BASEDEDONNEE"), getVariableEnvironnement("PASSWORD_BASEDEDONNEE"));
		foreach ($listeMails as $mailNonEnvoye) {
			$dateAujourdhui = (new DateTime())->format("Y-m-d");
			$dateMailNonEnvoye = $mailNonEnvoye->getDateEnvoie()->format("Y-m-d");
			if ($dateAujourdhui == $dateMailNonEnvoye) {
				if ($mailNonEnvoye->getTemplateMail()) {
					$stockageTemplatesMails->chargerTemplateMailAvecIdentifiant($mailNonEnvoye->getTemplateMail());
					$mailNonEnvoye->setSujetMail($mailNonEnvoye->getTemplateMail()->getSujetTemplateMail());
					$mailNonEnvoye->setMessageHtmlMail($mailNonEnvoye->getTemplateMail()->getMessageHtmlTemplateMail());
				}
				$mailGestionMail = $this->creerMailGestionMails($mailNonEnvoye);
				$this->gestionMails->envoyerMail($mailGestionMail);
				$mailNonEnvoye->setEstEnvoye(true);
				$this->stockageMails->modifierEstEnvoyeMail($mailNonEnvoye);
			}
		}
	}

	public function ajouterMail(array $mailArray): Mail {
		$mail = $this->creerMail($mailArray);
		$this->stockageMails->ajouterMail($mail);
		return $mail;
	}

	public function supprimerMail(array $mailArray): Mail {
		$mail = $this->creerMail($mailArray);
		$this->stockageMails->supprimerMail($mail);
		return $mail;
	}

	public function chargerListeMails(): array {
		return $this->stockageMails->chargerListeMails();
	}

}