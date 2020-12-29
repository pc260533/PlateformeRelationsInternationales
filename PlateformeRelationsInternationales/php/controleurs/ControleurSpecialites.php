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

	private function creerSpecialite(array $specialiteArray): Specialite {
		$specialite = new Specialite();
		if (isset($specialiteArray["identifiantSpecialite"])) {
			$specialite->setIdentifiantSpecialite($specialiteArray["identifiantSpecialite"]);
		}
		if (isset($specialiteArray["nomSpecialite"])) {
			$specialite->setNomSpecialite($specialiteArray["nomSpecialite"]);
		}
		if (isset($specialiteArray["couleurSpecialite"])) {
			$specialite->setCouleurSpecialite($specialiteArray["couleurSpecialite"]);
		}
		if (isset($specialiteArray["listeSousSpecialites"])) {
			foreach ($specialiteArray["listeDomainesDeCompetencesPartenaire"] as $sousSpecialiteArray) {
				$specialite->ajouterSousSpecialite($this->creerSousSpecialite($sousSpecialiteArray));
			}
		}
		return $specialite;
	}

	private function creerSousSpecialite(array $sousSpecialiteArray): SousSpecialite {
		$sousSpecialite = new SousSpecialite();
		if (isset($sousSpecialiteArray["identifiantSousSpecialite"])) {
			$sousSpecialite->setIdentifiantSousSpecialite($sousSpecialiteArray["identifiantSousSpecialite"]);
		}
		if (isset($sousSpecialiteArray["nomSousSpecialite"])) {
			$sousSpecialite->setNomSousSpecialite($sousSpecialiteArray["nomSousSpecialite"]);
		}
		return $sousSpecialite;
	}

	public function __construct() {
		$this->stockageSpecialites = new StockageSpecialites(getVariableEnvironnement("DATASOURCENAME_BASEDEDONNEEPLATEFORME"), getVariableEnvironnement("USERNAME_BASEDEDONNEE"), getVariableEnvironnement("PASSWORD_BASEDEDONNEE"));
	}

	public function ajouterSpecialite(array $specialiteArray): Specialite {
		$specialite = $this->creerSpecialite($specialiteArray);
		$this->stockageSpecialites->ajouterSpecialite($specialite);
		return $specialite;
	}

	public function supprimerSpecialite(array $specialiteArray): Specialite {
		$specialite = $this->creerSpecialite($specialiteArray);
		$this->stockageSpecialites->supprimerSpecialite($specialite);
		return $specialite;
	}

	public function modifierSpecialite(array $specialiteArray): Specialite {
		$specialite = $this->creerSpecialite($specialiteArray);
		$this->stockageSpecialites->modifierSpecialite($specialite);
		return $specialite;
	}

	public function ajouterSousSpecialite(array $specialite, array $sousSpecialiteArray): SousSpecialite {
		$specialite = $this->creerSpecialite($specialite);
		$sousSpecialite = $this->creerSousSpecialite($sousSpecialiteArray);
		$this->stockageSpecialites->ajouterSousSpecialite($specialite, $sousSpecialite);
		return $sousSpecialite;
	}

	public function supprimerSousSpecialite(array $sousSpecialiteArray): SousSpecialite {
		$sousSpecialite = $this->creerSousSpecialite($sousSpecialiteArray);
		$this->stockageSpecialites->supprimerSousSpecialite($sousSpecialite);
		return $sousSpecialite;
	}

	public function modifierSousSpecialite(array $specialite, array $sousSpecialiteArray): SousSpecialite {
		$specialite = $this->creerSpecialite($specialite);
		$sousSpecialite = $this->creerSousSpecialite($sousSpecialiteArray);
		$this->stockageSpecialites->modifierSousSpecialite($specialite, $sousSpecialite);
		return $sousSpecialite;
	}

	public function chargerListeSpecialites(): array {
		return $this->stockageSpecialites->chargerListeSpecialites();
	}
}