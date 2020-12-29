<?php

/**
 * ControleurMobilites short summary.
 *
 * ControleurMobilites description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class ControleurMobilites implements IControleurPlateforme {
	private $stockageMobilites;

	private function creerMobilite(array $mobiliteArray): Mobilite {
		$mobilite = new Mobilite();
		if (isset($mobiliteArray["identifiantMobilite"])) {
			$mobilite->setIdentifiantMobilite($mobiliteArray["identifiantMobilite"]);
		}
		if (isset($mobiliteArray["typeMobilite"])) {
			$mobilite->setTypeMobilite($mobiliteArray["typeMobilite"]);
		}
		return $mobilite;
	}

	public function __construct() {
		$this->stockageMobilites = new StockageMobilites(getVariableEnvironnement("DATASOURCENAME_BASEDEDONNEEPLATEFORME"), getVariableEnvironnement("USERNAME_BASEDEDONNEE"), getVariableEnvironnement("PASSWORD_BASEDEDONNEE"));
	}

	public function ajouterMobilite(array $mobiliteArray): Mobilite {
		$mobilite = $this->creerMobilite($mobiliteArray);
		$this->stockageMobilites->ajouterMobilite($mobilite);
		return $mobilite;
	}

	public function supprimerMobilite(array $mobiliteArray): Mobilite {
		$mobilite = $this->creerMobilite($mobiliteArray);
		$this->stockageMobilites->supprimerMobilite($mobilite);
		return $mobilite;
	}

	public function modifierMobilite(array $mobiliteArray): Mobilite {
		$mobilite = $this->creerMobilite($mobiliteArray);
		$this->stockageMobilites->modifierMobilite($mobilite);
		return $mobilite;
	}

	public function chargerListeMobilites(): array {
		return  $this->stockageMobilites->chargerListeMobilites();
	}
}