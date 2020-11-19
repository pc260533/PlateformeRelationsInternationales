<?php

/**
 * SousSpecialite short summary.
 *
 * SousSpecialite description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class SousSpecialite {
	private $identifiantSousSpecialite;
	private $nomSousSpecialite;

	public function getIdentifiantSousSpecialite(): int {
		return $this->identifiantSousSpecialite;
	}

	public function setIdentifiantSousSpecialite(int $identifiantSousSpecialite): void {
        $this->identifiantSousSpecialite = $identifiantSousSpecialite;
    }

	public function getNomSousSpecialite(): string {
		return $this->NomSousSpecialite;
	}

	public function setNomSousSpecialite(string $nomSousSpecialite): void {
        $this->nomSousSpecialite = $nomSousSpecialite;
    }

	public function __construct() {
		$this->identifiantSousSpecialite = 0;
		$this->nomSousSpecialite = "";
	}

}