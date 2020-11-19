<?php

/**
 * PageAccueil est la classe repr�sentant une page d'accueil de l'application cliente.
 *
 * @author Pierre-Nicolas
 */
class PageApplication extends Page {
	/**
	 * Constructeur sans param�tres.
	 */
	public function __construct() {
		parent::__construct("./php/templates/templatePageApplication.php");
	}

}