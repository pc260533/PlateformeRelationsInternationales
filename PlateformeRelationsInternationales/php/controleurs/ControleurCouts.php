<?php

/**
 * ControleurCouts short summary.
 *
 * ControleurCouts description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class ControleurCouts implements IControleurPlateforme {
	private $stockageCout;

	private function creerCout(array $coutArray): Cout {
		$cout = new Cout();
		if (isset($coutArray["identifiantCout"])) {
			$cout->setIdentifiantCout($coutArray["identifiantCout"]);
		}
		if (isset($coutArray["nomPaysCout"])) {
			$cout->setNomPaysCout($coutArray["nomPaysCout"]);
		}
		if (isset($coutArray["coutMoyenParMois"])) {
			$cout->setCoutMoyenParMois($coutArray["coutMoyenParMois"]);
		}
		if (isset($coutArray["coutLogementParMois"])) {
			$cout->setCoutLogementParMois($coutArray["coutLogementParMois"]);
		}
		if (isset($coutArray["coutVieParMois"])) {
			$cout->setCoutVieParMois($coutArray["coutVieParMois"]);
		}
		if (isset($coutArray["coutInscriptionParMois"])) {
			$cout->setCoutInscriptionParMois($coutArray["coutInscriptionParMois"]);
		}
		return $cout;
	}

	public function __construct() {
		$this->stockageCout = new StockageCouts(getVariableEnvironnement("DATASOURCENAME_BASEDEDONNEEPLATEFORME"), getVariableEnvironnement("USERNAME_BASEDEDONNEE"), getVariableEnvironnement("PASSWORD_BASEDEDONNEE"));
	}

	public function ajouterCout(array $coutArray): Cout {
		$cout = $this->creerCout($coutArray);
		$this->stockageCout->ajouterCout($cout);
		return $cout;
	}

	public function modifierCout(array $coutArray): Cout {
		$cout = $this->creerCout($coutArray);
		$this->stockageCout->modifierCout($cout);
		return $cout;
	}

	public function chargerListeCouts(): array {
		return $this->stockageCout->chargerListeCouts();
	}

}