<?php

/**
 * ExceptionAuthentification short summary.
 *
 * ExceptionAuthentification description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class ExceptionAuthentification extends ExceptionSerializable {

	/**
	 * Constructeur prennant en paramètre l'exception englobée.
	 * @param mixed $previous : exption englobée.
	 */
	public function __construct() {
		parent::__construct("Le nom d'utilisateur et le mot de passe sont incorrects.", "Erreur mauvais nom d'utilisateur et mot de passe", 500, 500, null, null);
	}

}