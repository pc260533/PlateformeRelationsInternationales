<?php

/**
 * ExceptionVoeuxDejaValides short summary.
 *
 * ExceptionVoeuxDejaValides description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class ExceptionVoeuxDejaValides extends ExceptionSerializable {

	/**
	 * Constructeur prennant en paramètre l'exception englobée.
	 * @param mixed $previous : exption englobée.
	 */
	public function __construct() {
		parent::__construct("Les voeux ont déjà été validés.", "Erreur voeux déjà validés", 500, 500, null, null);
	}

}