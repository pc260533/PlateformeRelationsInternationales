<?php

/**
 * PageAccueil est la classe représentant une page d'accueil de l'application cliente.
 *
 * @author Pierre-Nicolas
 */
class PageApplication extends Page {
	/**
	 * Constructeur sans paramètres.
	 */
	public function __construct() {
		parent::__construct("./php/templates/templatePageApplication.php");
	}

}