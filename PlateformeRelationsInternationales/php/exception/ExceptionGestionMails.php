<?php

/**
 * ExceptionGestionMails est la classe qui représente une exception du service de mails.
 *
 * @version 1.0
 * @author Pierre-Nicolas
 */
class ExceptionGestionMails extends ExceptionSerializable {

	/**
	 * Constructeur prennant en paramètre l'exception englobée.
	 * @param mixed $previous : exption englobée.
	 */
	public function __construct($previous, $ajoutDeveloppeurMessage) {
		parent::__construct("Une erreur générale du service de mails est survenue.", "Erreur générale du service de mail.", 500, 500, $previous, $ajoutDeveloppeurMessage);
	}

}