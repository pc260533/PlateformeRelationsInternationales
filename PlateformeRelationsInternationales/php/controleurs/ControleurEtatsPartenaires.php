<?php

/**
 * ControleurEtatsPartenaires short summary.
 *
 * ControleurEtatsPartenaires description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class ControleurEtatsPartenaires implements IControleurPlateforme {
	private $stockageEtatsPartenaires;

	public function __construct() {
		$this->stockageEtatsPartenaires = new StockageEtatsPartenaires(getVariableEnvironnement("DATASOURCENAME_BASEDEDONNEEPLATEFORME"), getVariableEnvironnement("USERNAME_BASEDEDONNEE"), getVariableEnvironnement("PASSWORD_BASEDEDONNEE"));
	}

	public function chargerListeEtatsPartenaires(): array {
		return $this->stockageEtatsPartenaires->chargerListeEtatsPartenaires();
	}
}