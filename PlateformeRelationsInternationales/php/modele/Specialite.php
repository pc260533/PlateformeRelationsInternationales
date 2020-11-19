<?php

/**
 * Specialite short summary.
 *
 * Specialite description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class Specialite implements ISerializable {
	private $identifiantSpecialite;
	private $nomSpecialite;
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
            "listeSousSpecialites" => $this->getListeSousSpecialitesSerializable()
        );
	}

	#endregion
}