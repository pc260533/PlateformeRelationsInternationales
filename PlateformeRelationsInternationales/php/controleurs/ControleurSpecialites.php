<?php

/**
 * ControleurSpecialites short summary.
 *
 * ControleurSpecialites description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class ControleurSpecialites implements IControleurPlateforme {
	private $stockageSpecialites;

	public function __construct() {
		$this->stockageSpecialites = new StockageSpecialites(getVariableEnvironnement("DATASOURCENAME_BASEDEDONNEEPLATEFORME"), getVariableEnvironnement("USERNAME_BASEDEDONNEE"), getVariableEnvironnement("PASSWORD_BASEDEDONNEE"));
	}

	public function chargerListeSpecialites(): array {
		return $this->stockageSpecialites->chargerListeSpecialites();
	}
}