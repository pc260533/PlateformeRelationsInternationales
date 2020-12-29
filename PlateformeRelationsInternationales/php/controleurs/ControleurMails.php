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

}