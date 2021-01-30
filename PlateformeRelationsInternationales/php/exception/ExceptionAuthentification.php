<?php

/**
 * ExceptionAuthentification est la classe qui représente une exception d'authentification.
 *
 * @author Pierre-Nicolas
 */
class ExceptionAuthentification extends ExceptionSerializable {

	/**
	 * Constructeur prennant en paramètre l'exception englobée.
	 * @param mixed $previous : exeption englobée.
	 */
	public function __construct() {
		parent::__construct("Le nom d'utilisateur et le mot de passe sont incorrects.", "Erreur mauvais nom d'utilisateur et mot de passe", 500, 500, null, null);
	}

}