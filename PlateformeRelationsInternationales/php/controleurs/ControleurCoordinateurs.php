<?php

/**
 * ControleurCoordinateur short summary.
 *
 * ControleurCoordinateur description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class ControleurCoordinateurs implements IControleurPlateforme {
	private $stockageCoordinateurs;

	private function creerCoordinateur(array $coordinateurArray): Coordinateur {
		$coordinateur = new Coordinateur();
		if (isset($coordinateurArray["identifiantContact"])) {
			$coordinateur->setIdentifiantContact($coordinateurArray["identifiantContact"]);
		}
		if (isset($coordinateurArray["nomContact"])) {
			$coordinateur->setNomContact($coordinateurArray["nomContact"]);
		}
		if (isset($coordinateurArray["prenomContact"])) {
			$coordinateur->setPrenomContact($coordinateurArray["prenomContact"]);
		}
		if (isset($coordinateurArray["adresseMailContact"])) {
			$coordinateur->setAdresseMailContact($coordinateurArray["adresseMailContact"]);
		}
		if (isset($coordinateurArray["fonctionContact"])) {
			$coordinateur->setFonctionContact($coordinateurArray["fonctionContact"]);
		}
		return $coordinateur;
	}

	public function __construct() {
		$this->stockageCoordinateurs = new StockageCoordinateurs(getVariableEnvironnement("DATASOURCENAME_BASEDEDONNEEPLATEFORME"), getVariableEnvironnement("USERNAME_BASEDEDONNEE"), getVariableEnvironnement("PASSWORD_BASEDEDONNEE"));
	}

	public function ajouterCoordinateur(array $coordinateurArray): Coordinateur {
		$coordinateur = $this->creerCoordinateur($coordinateurArray);
		$this->stockageCoordinateurs->ajouterCoordinateur($coordinateur);
		return $coordinateur;
	}

	public function supprimerCoordinateur(array $coordinateurArray): Coordinateur {
		$coordinateur = $this->creerCoordinateur($coordinateurArray);
		$this->stockageCoordinateurs->supprimerCoordinateur($coordinateur);
		return $coordinateur;
	}

	public function modifierCoordinateur(array $coordinateurArray): Coordinateur {
		$coordinateur = $this->creerCoordinateur($coordinateurArray);
		$this->stockageCoordinateurs->modifierCoordinateur($coordinateur);
		return $coordinateur;
	}

	public function chargerListeCoordinateurs(): array {
		return $this->stockageCoordinateurs->chargerListeCoordinateurs();
	}
}