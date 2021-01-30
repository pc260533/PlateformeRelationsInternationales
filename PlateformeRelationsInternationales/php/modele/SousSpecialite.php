<?php

/**
 * SousSpecialite short summary.
 *
 * SousSpecialite description.
 *
 * @version 1.0
 * @author Pierre-Nicolas
 */
class SousSpecialite implements ISerializable {
	private $identifiantSousSpecialite;
	private $nomSousSpecialite;

	public function getIdentifiantSousSpecialite(): int {
		return $this->identifiantSousSpecialite;
	}

	public function setIdentifiantSousSpecialite(int $identifiantSousSpecialite): void {
        $this->identifiantSousSpecialite = $identifiantSousSpecialite;
    }

	public function getNomSousSpecialite(): string {
		return $this->nomSousSpecialite;
	}

	public function setNomSousSpecialite(string $nomSousSpecialite): void {
        $this->nomSousSpecialite = $nomSousSpecialite;
    }

	public function __construct() {
		$this->identifiantSousSpecialite = 0;
		$this->nomSousSpecialite = "";
	}


	#region ISerializable Members

	/**
	 *
	 * @return array
	 */
	public function getObjetSerializable(): array {
		return array(
			"identifiantSousSpecialite" => $this->getIdentifiantSousSpecialite(),
            "nomSousSpecialite" => $this->getNomSousSpecialite()
        );
	}

	#endregion
}