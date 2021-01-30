<?php

/**
 * DomaineDeCompetence short summary.
 *
 * DomaineDeCompetence description.
 *
 * @version 1.0
 * @author Pierre-Nicolas
 */
class DomaineDeCompetence implements ISerializable {
	private $identifiantDomaineDeCompetence;
	private $nomDomaineDeCompetence;

	public function getIdentifiantDomaineDeCompetence(): int {
		return $this->identifiantDomaineDeCompetence;
	}

	public function setIdentifiantDomaineDeCompetence(int $identifiantDomaineDeCompetence): void {
        $this->identifiantDomaineDeCompetence = $identifiantDomaineDeCompetence;
    }

	public function getNomDomaineDeCompetence(): string {
		return $this->nomDomaineDeCompetence;
	}

	public function setNomDomaineDeCompetence(string $nomDomaineDeCompetence): void {
        $this->nomDomaineDeCompetence = $nomDomaineDeCompetence;
    }

	public function __construct() {
		$this->identifiantDomaineDeCompetence = 0;
		$this->nomDomaineDeCompetence = "";
	}


	#region ISerializable Members

	/**
	 *
	 * @return array
	 */
	public function getObjetSerializable(): array {
		return array(
			"identifiantDomaineDeCompetence" => $this->getIdentifiantDomaineDeCompetence(),
            "nomDomaineDeCompetence" => $this->getNomDomaineDeCompetence()
        );
	}

	#endregion
}