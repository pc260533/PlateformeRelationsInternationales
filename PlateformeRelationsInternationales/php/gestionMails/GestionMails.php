<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

/**
 * GestionMails short summary.
 *
 * GestionMails description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class GestionMails {

	public function __construct() {

	}

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
			/*$mail->Host = "smtp.gmail.com";
			$mail->Port = 465;
			$mail->SMTPAuth = true;
			$mail->SMTPSecure = "ssl";
			$mail->Username = "PlatefRelationsInternationales";
			$mail->Password = "PlateformeRelationsInternationales@";*/

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