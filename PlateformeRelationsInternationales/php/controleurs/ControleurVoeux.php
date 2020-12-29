<?php

/**
 * ControleurVoeux short summary.
 *
 * ControleurVoeux description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class ControleurVoeux implements IControleurPlateforme {
	private $stockageVoeux;

	public function __construct() {
		$this->stockageVoeux = new StockageVoeux(getVariableEnvironnement("DATASOURCENAME_BASEDEDONNEEPLATEFORME"), getVariableEnvironnement("USERNAME_BASEDEDONNEE"), getVariableEnvironnement("PASSWORD_BASEDEDONNEE"));
	}

	public function chargerListeVoeux(): array {
		return  $this->stockageVoeux->chargerListeVoeux();
	}
}