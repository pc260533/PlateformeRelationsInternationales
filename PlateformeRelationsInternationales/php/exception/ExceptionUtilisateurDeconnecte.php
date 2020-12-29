<?php

/**
 * ExceptionUtilisateurDeconnecte short summary.
 *
 * ExceptionUtilisateurDeconnecte description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class ExceptionUtilisateurDeconnecte extends ExceptionSerializable {

	/**
	 * Constructeur prennant en paramètre l'exception englobée.
	 * @param mixed $previous : exption englobée.
	 */
	public function __construct() {
		parent::__construct("Vous avez déconnecté du serveur. Veuiilez vous reconnecter.", "Déconnexion du serveur", 302, 302, null, null);
	}

}