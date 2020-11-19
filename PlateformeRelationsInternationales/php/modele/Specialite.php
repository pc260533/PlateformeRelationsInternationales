<?php

/**
 * Specialite short summary.
 *
 * Specialite description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class Specialite {
	private $identifiantNomSpecialite;
	private $nomSpecialite;
	private $listeSousSpecialites;

	public function getIdentifiantNomSpecialite(): int {
		return $this->identifiantNomSpecialite;
	}

	public function setIdentifiantNomSpecialite(int $identifiantNomSpecialite): void {
        $this->identifiantNomSpecialite = $identifiantNomSpecialite;
    }

	public function getNomSpecialite(): string {
		return $this->nomSpecialite;
	}

	public function setNomSpecialite(string $nomSpecialite): void {
        $this->nomSpecialite = $nomSpecialite;
    }

	public function getListeSousSpecialites(): array {
		return $this->listeSousSpecialites;
	}

	public function setListeSousSpecialites(array $listeSousSpecialites): void {
        $this->listeSousSpecialites = $listeSousSpecialites;
    }

	public function __construct() {
		$this->identifiantNomSpecialite = 0;
		$this->nomSpecialite = "";
		$this->listeSousSpecialites = array();
	}

	public function ajouterSousSpecialite(SousSpecialite $sousSpecialite) {
		$this->listeSousSpecialites[] = $sousSpecialite;
	}

	public function supprimerSousSpecialite(SousSpecialite $sousSpecialite) {
		if (($key = array_search($sousSpecialite, $this->listeSousSpecialites)) !== false) {
			unset($this->listeSousSpecialites[$key]);
		}
	}

}