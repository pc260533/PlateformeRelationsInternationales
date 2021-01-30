<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

/**
 *
 * GestionMails est la classe représentant un gesitonnaire de mails.
 *
 * @version 1.0
 * @author Pierre-Nicolas
 */
class GestionMails {

	/**
	 * Constructeur sans paramètres.
	 */
	public function __construct() {

	}

	/**
	 * Envoyer un mail gestion mails.
	 * @param MailGestionMails $mailAEnvoyer Le mail gestion mails à envoyer.
	 * @throws ExceptionGestionMails L'exception gestion mails.
	 */
	public function envoyerMail(MailGestionMails $mailAEnvoyer) {
		$mail = new PHPMailer(true);
		$erreurDebug = array();
		try {
			$mail->CharSet = "UTF-8";
			$mail->isSMTP();
			$mail->SMTPDebug = 2;
			$mail->Host = getVariableEnvironnement("SMTP_HOST");
			$mail->Port = intval(getVariableEnvironnement("SMTP_PORT"));
			$mail->SMTPAuth = boolval(getVariableEnvironnement("SMTP_AUTHENTIFICATION"));
			$mail->SMTPSecure = getVariableEnvironnement("SMTP_SECURE");
			$mail->Username = getVariableEnvironnement("SMTP_USERNAME");
			$mail->Password = getVariableEnvironnement("SMTP_PASSWORD");

			$mail->setFrom($mailAEnvoyer->getExpediteur()->getAdresseMailContactMail(), $mailAEnvoyer->getExpediteur()->getNomContactMail());
			foreach ($mailAEnvoyer->getListeDestinataire() as $contactMailDestinatire) {
				$mail->addAddress($contactMailDestinatire->getAdresseMailContactMail(), $contactMailDestinatire->getNomContactMail());
			}
			foreach ($mailAEnvoyer->getListeCopiesCarbonesInvisibles() as $contactMailCopieCarbone) {
				$mail->addCC($contactMailCopieCarbone->getAdresseMailContactMail(), $contactMailCopieCarbone->getNomContactMail());
			}
			foreach ($mailAEnvoyer->getListeCopieCarbones() as $contactMailCopieCarboneInvisible) {
				$mail->addBCC($contactMailCopieCarboneInvisible->getAdresseMailContactMail(), $contactMailCopieCarboneInvisible->getNomContactMail());
			}
			$mail->Subject = $mailAEnvoyer->getSujetMail();
			$mail->msgHTML($mailAEnvoyer->getMessageHtml(), __DIR__);
			$mail->Debugoutput = function($debugMessage, $niveau) use(&$erreurDebug) {
				$erreurDebug[] = "Debug level $niveau; message: $debugMessage\n";
			};
			$mail->Send();
		}
		catch (Exception $exception) {
			throw new ExceptionGestionMails($exception, implode("\n", $erreurDebug));
		}

	}

}