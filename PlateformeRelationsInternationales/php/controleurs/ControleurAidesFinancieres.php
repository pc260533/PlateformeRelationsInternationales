<?php

/**
 * ControleurAidesFinancieres short summary.
 *
 * ControleurAidesFinancieres description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class ControleurAidesFinancieres implements IControleurPlateforme {
	private $stockageAidesFinancieres;

	private function creerAideFinanciere(array $aideFinanciereArray): AideFinanciere {
		$aideFinanciere = new AideFinanciere();
		if (isset($aideFinanciereArray["identifiantAideFinanciere"])) {
			$aideFinanciere->setIdentifiantAideFinanciere($aideFinanciereArray["identifiantAideFinanciere"]);
		}
		if (isset($aideFinanciereArray["nomAideFinanciere"])) {
			$aideFinanciere->setNomAideFinanciere($aideFinanciereArray["nomAideFinanciere"]);
		}
		if (isset($aideFinanciereArray["descriptionAideFinanciere"])) {
			$aideFinanciere->setDescriptionAideFinanciere($aideFinanciereArray["descriptionAideFinanciere"]);
		}
		if (isset($aideFinanciereArray["lienAideFinanciere"])) {
			$aideFinanciere->setLienAideFinanciere($aideFinanciereArray["lienAideFinanciere"]);
		}
		return $aideFinanciere;
	}

	public function __construct() {
		$this->stockageAidesFinancieres = new StockageAidesFinancieres(getVariableEnvironnement("DATASOURCENAME_BASEDEDONNEEPLATEFORME"), getVariableEnvironnement("USERNAME_BASEDEDONNEE"), getVariableEnvironnement("PASSWORD_BASEDEDONNEE"));
	}

	public function ajouterAideFinanciere(array $aideFinanciereArray): AideFinanciere {
		$aideFinanciere = $this->creerAideFinanciere($aideFinanciereArray);
		$this->stockageAidesFinancieres->ajouterAideFinanciere($aideFinanciere);
		return $aideFinanciere;
	}

	public function supprimerAideFinanciere(array $aideFinanciereArray): AideFinanciere {
		$aideFinanciere = $this->creerAideFinanciere($aideFinanciereArray);
		$this->stockageAidesFinancieres->supprimerAideFinanciere($aideFinanciere);
		return $aideFinanciere;
	}

	public function modifierAideFinanciere(array $aideFinanciereArray): AideFinanciere {
		$aideFinanciere = $this->creerAideFinanciere($aideFinanciereArray);
		$this->stockageAidesFinancieres->modifierAideFinanciere($aideFinanciere);
		return $aideFinanciere;
	}

	public function chargerListeAidesFinancieres(): array {
		return $this->stockageAidesFinancieres->chargerListeAidesFinancieres();
	}

}