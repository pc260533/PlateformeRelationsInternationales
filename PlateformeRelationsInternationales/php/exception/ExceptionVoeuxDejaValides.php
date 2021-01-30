<?php

/**
 * ExceptionVoeuxDejaValides est la classe qui représente une exception correspondant à des voeux déjà validés.
 *
 * @author Pierre-Nicolas
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