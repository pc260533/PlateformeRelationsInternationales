<?php

/**
 * Page est la classe abstraite représentant une page de l'application cliente.
 *
 * @author Pierre-Nicolas
 */
abstract class Page {

	/**
	 * Le chemin du fichier de template.
	 * @var mixed
	 */
	private $cheminFichierTemplate;

	/**
	 * Contrsuteur prenant en paramètre le chemin Le chemin du fichier de template.
	 * @param string $cheminFichierTemplate Le chemin Le chemin du fichier de template.
	 */
	public function __construct(string $cheminFichierTemplate) {
		$this->cheminFichierTemplate = $cheminFichierTemplate;
	}

	/**
	 * Charger le template de la page.
	 */
	public function chargerTemplatePage(): void {
		include($this->cheminFichierTemplate);
	}
}