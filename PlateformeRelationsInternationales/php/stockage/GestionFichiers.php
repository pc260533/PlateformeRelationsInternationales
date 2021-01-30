<?php

/**
 *
 * GestionFichiers est la classe représentant un gesitonnaire de fichiers.
 *
 * @version 1.0
 * @author Pierre-Nicolas
 */
class GestionFichiers {

	/**
	 * Constructeur GestionFichiers sans paramètres.
	 */
	public function __construct() {

	}

	/**
	 * Supprimer un fichier.
	 * @param string $cheminFichierASupprimer Le chmein du fichier à supprimer.
	 */
	public function supprimerFichier(string $cheminFichierASupprimer) {
		if (is_file($cheminFichierASupprimer)) {
			unlink($cheminFichierASupprimer);
		}
	}

	/**
	 * Créer un dossier.
	 * @param string $cheminDossierACreer Le chemin du dossier à créer.
	 */
	public function creerDossier(string $cheminDossierACreer) {
		if (!is_dir($cheminDossierACreer)) {
			mkdir($cheminDossierACreer);
		}
	}

	/**
	 * Suprimer un dossier.
	 * @param string $cheminDossierASupprimer Le chemin du dossier à créer.
	 */
	public function supprimerDossier(string $cheminDossierASupprimer) {
		if (is_dir($cheminDossierASupprimer)) {
			rmdir($cheminDossierASupprimer);
		}
	}

}