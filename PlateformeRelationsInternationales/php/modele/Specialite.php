<?php

/**
 * Specialite short summary.
 *
 * Specialite description.
 *
 * @version 1.0
 * @author Pierre-Nicolas
 */
class Specialite implements ISerializable {
	private $identifiantSpecialite;
	private $nomSpecialite;
	private $couleurSpecialite;
	private $listeSousSpecialites;

	public function getIdentifiantSpecialite(): int {
		return $this->identifiantSpecialite;
	}

	public function setIdentifiantSpecialite(int $identifiantSpecialite): void {
        $this->identifiantSpecialite = $identifiantSpecialite;
    }

	public function getNomSpecialite(): string {
		return $this->nomSpecialite;
	}

	public function setNomSpecialite(string $nomSpecialite): void {
        $this->nomSpecialite = $nomSpecialite;
    }

	public function getCouleurSpecialite(): string {
		return $this->couleurSpecialite;
	}

	public function setCouleurSpecialite(string $couleurSpecialite): void {
        $this->couleurSpecialite = $couleurSpecialite;
    }

	public function getListeSousSpecialites(): array {
		return $this->listeSousSpecialites;
	}

	public function setListeSousSpecialites(array $listeSousSpecialites): void {
        $this->listeSousSpecialites = $listeSousSpecialites;
    }

	private function getListeSousSpecialitesSerializable() : array {
		$res = array();
		foreach ($this->listeSousSpecialites as $sousSpecialite) {
			$res[] = $sousSpecialite->getObjetSerializable();
		}
		return $res;
	}

	public function __construct() {
		$this->identifiantSpecialite = 0;
		$this->nomSpecialite = "";
		$this->couleurSpecialite = "";
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


	#region ISerializable Members

	/**
	 *
	 * @return array
	 */
	public function getObjetSerializable(): array {
		return array(
			"identifiantSpecialite" => $this->getIdentifiantSpecialite(),
            "nomSpecialite" => $this->getNomSpecialite(),
            "couleurSpecialite" => $this->getCouleurSpecialite(),
            "listeSousSpecialites" => $this->getListeSousSpecialitesSerializable()
        );
	}

	#endregion
}