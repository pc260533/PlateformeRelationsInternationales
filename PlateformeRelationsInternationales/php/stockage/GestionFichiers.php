<?php

/**
 * GestionFichiers short summary.
 *
 * GestionFichiers description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class GestionFichiers {

	public function __construct() {

	}

	public function supprimerFichier(string $cheminFichierASupprimer) {
		if (is_file($cheminFichierASupprimer)) {
			unlink($cheminFichierASupprimer);
		}
	}

	public function creerDossier(string $cheminDossierACreer) {
		if (!is_dir($cheminDossierACreer)) {
			mkdir($cheminDossierACreer);
		}
	}

	public function supprimerDossier(string $cheminDossierASupprimer) {
		if (is_dir($cheminDossierASupprimer)) {
			rmdir($cheminDossierASupprimer);
		}
	}

}