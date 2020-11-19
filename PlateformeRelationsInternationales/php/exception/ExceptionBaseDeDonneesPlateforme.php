<?php

/**
 * ExceptionBaseDeDonneesPlateforme est la classe qui représente une exception du service de la base de données.
 *
 * @author Pierre-Nicolas
 */
class ExceptionBaseDeDonneesPlateforme extends ExceptionSerializable {

	/**
	 * Constructeur prennant en paramètre l'exception englobée.
	 * @param mixed $previous : exption englobée.
	 */
	public function __construct($previous) {
		parent::__construct("Une erreur générale de la base de données plateforme est survenue.", "Erreur générale de la base de données plateforme", 500, 500, $previous);
	}

}