<?php

/**
 * ExceptionUtilisateurDeconnecte est la classe qui représente une exception de déconnexion du serveur.
 *
 * @author Pierre-Nicolas
 */
class ExceptionUtilisateurDeconnecte extends ExceptionSerializable {

	/**
	 * Constructeur prennant en paramètre l'exception englobée.
	 * @param mixed $previous : exption englobée.
	 */
	public function __construct() {
		parent::__construct("Vous avez déconnecté du serveur. Veuillez vous reconnecter.", "Déconnexion du serveur", 302, 302, null, null);
	}

}