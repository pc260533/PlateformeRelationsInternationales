<?php

/**
 * ExceptionBaseDeDonneesPlateforme est la classe qui repr�sente une exception du service de la base de donn�es.
 *
 * @author Pierre-Nicolas
 */
class ExceptionBaseDeDonneesPlateforme extends ExceptionSerializable {

	/**
	 * Constructeur prennant en param�tre l'exception englob�e.
	 * @param mixed $previous : exption englob�e.
	 */
	public function __construct($previous) {
		parent::__construct("Une erreur g�n�rale de la base de donn�es plateforme est survenue.", "Erreur g�n�rale de la base de donn�es plateforme", 500, 500, $previous);
	}

}