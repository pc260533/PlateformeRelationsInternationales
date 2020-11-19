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

	public function __construct() {
		$this->stockageMobilites = new StockageMobilites(getVariableEnvironnement("DATASOURCENAME_BASEDEDONNEEPLATEFORME"), getVariableEnvironnement("USERNAME_BASEDEDONNEE"), getVariableEnvironnement("PASSWORD_BASEDEDONNEE"));
	}

	public function chargerListeMobilites(): array {
		return  $this->stockageMobilites->chargerListeMobilites();
	}
}