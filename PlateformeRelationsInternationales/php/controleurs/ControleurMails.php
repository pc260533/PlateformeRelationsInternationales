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

	private function creerMail(array $mailArray): Mail {
		$mail = new Mail();
		$mail->setExpediteur(new ContactMail(getVariableEnvironnement("SMTP_NAME"), getVariableEnvironnement("SMTP_MAIL")));
		if (isset($mailArray["listeDestinataires"])) {
			foreach ($mailArray["listeDestinataires"] as $destinataireArray) {
				$contactMail = new ContactMail($destinataireArray["nomContactMail"], $destinataireArray["adresseMailContactMail"]);
				$mail->ajouterDestinataire($contactMail);
			}
		}
		if (isset($mailArray["listeCopieCarbones"])) {
			foreach ($mailArray["listeCopieCarbones"] as $copieCarboneArray) {
				$contactMail = new ContactMail($copieCarboneArray["nomContactMail"], $copieCarboneArray["adresseMailContactMail"]);
				$mail->ajouterCopieCarbone($contactMail);
			}
		}
		if (isset($mailArray["listeCopiesCarbonesInvisibles"])) {
			foreach ($mailArray["listeCopiesCarbonesInvisibles"] as $copieCarboneInvisibleArray) {
				$contactMail = new ContactMail($copieCarboneInvisibleArray["nomContactMail"], $copieCarboneInvisibleArray["adresseMailContactMail"]);
				$mail->ajouterCopieCarboneInvisible($contactMail);
			}
		}
		if (isset($mailArray["sujetMail"])) {
			$mail->setSujetMail($mailArray["sujetMail"]);
		}
		if (isset($mailArray["messageHtml"])) {
			$mail->setMessageHtml($mailArray["messageHtml"]);
		}
		return $mail;
	}

	public function __construct() {
		$this->gestionMails = new GestionMails();
	}

	public function envoyerMailsValidationListeVoeuxPartenaire(array $listePartenaires, string $adresseMailVoeu): void {
		$mail = new Mail();
		$mail->setExpediteur(new ContactMail(getVariableEnvironnement("SMTP_NAME"), getVariableEnvironnement("SMTP_MAIL")));
		$mail->setSujetMail("Demande validation Voeux Relations Internationales");
		$res = "";
		foreach ($listePartenaires as $partenaire) {
			$res .= base64_encode($partenaire->getIdentifiantPartenaire()) . "/";
		}
		$res .= base64_encode($adresseMailVoeu);
		$lienApiVoeuxDansPartenaire = getVariableEnvironnement("URL_BASENAME").'api/voeuxDansPartenaire/'. urlencode($res);
		$mail->setMessageHtml(str_replace("%lienApiVoeuxDansPartenaire%", $lienApiVoeuxDansPartenaire, file_get_contents("./php/templates/validationListeVoeuxPartenaires.php")));
		$mail->ajouterDestinataire(new ContactMail($adresseMailVoeu, $adresseMailVoeu));
		$this->gestionMails->envoyerMail($mail);
	}

	public function envoyerMailPartenaire(array $mailArray): void {
		$mail = $this->creerMail($mailArray);
		$this->gestionMails->envoyerMail($mail);
	}

}