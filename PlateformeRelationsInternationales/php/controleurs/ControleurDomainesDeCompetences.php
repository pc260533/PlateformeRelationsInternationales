<?php

/**
 * ControleurDomainesDeCompetences short summary.
 *
 * ControleurDomainesDeCompetences description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class ControleurDomainesDeCompetences implements IControleurPlateforme {
	private $stockageDomainesDeCompetences;

	private function creerDomaineDeCompetence(array $domaineDeCompetenceArray): DomaineDeCompetence {
		$domaineDeCompetence = new DomaineDeCompetence();
		if (isset($domaineDeCompetenceArray["identifiantDomaineDeCompetence"])) {
			$domaineDeCompetence->setIdentifiantDomaineDeCompetence($domaineDeCompetenceArray["identifiantDomaineDeCompetence"]);
		}
		if (isset($domaineDeCompetenceArray["nomDomaineDeCompetence"])) {
			$domaineDeCompetence->setNomDomaineDeCompetence($domaineDeCompetenceArray["nomDomaineDeCompetence"]);
		}
		return $domaineDeCompetence;
	}

	public function __construct() {
		$this->stockageDomainesDeCompetences = new StockageDomainesDeCompetences(getVariableEnvironnement("DATASOURCENAME_BASEDEDONNEEPLATEFORME"), getVariableEnvironnement("USERNAME_BASEDEDONNEE"), getVariableEnvironnement("PASSWORD_BASEDEDONNEE"));
	}

	public function ajouterDomaineDeCompetence(array $domaineDeCompetenceArray): DomaineDeCompetence {
		$domaineDeCompetence = $this->creerDomaineDeCompetence($domaineDeCompetenceArray);
		$this->stockageDomainesDeCompetences->ajouterDomaineDeCompetence($domaineDeCompetence);
		return $domaineDeCompetence;
	}

	public function supprimerDomaineDeCompetence(array $domaineDeCompetenceArray): DomaineDeCompetence {
		$domaineDeCompetence = $this->creerDomaineDeCompetence($domaineDeCompetenceArray);
		$this->stockageDomainesDeCompetences->supprimerDomaineDeCompetence($domaineDeCompetence);
		return $domaineDeCompetence;
	}

	public function modifierDomaineDeCompetence(array $domaineDeCompetenceArray): DomaineDeCompetence {
		$domaineDeCompetence = $this->creerDomaineDeCompetence($domaineDeCompetenceArray);
		$this->stockageDomainesDeCompetences->modifierDomaineDeCompetence($domaineDeCompetence);
		return $domaineDeCompetence;
	}

	public function chargerListeDomainesDeCompetences(): array {
		return  $this->stockageDomainesDeCompetences->chargerListeDomainesDeCompetences();
	}

}