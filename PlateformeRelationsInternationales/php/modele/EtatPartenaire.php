<?php

/**
 * EtatPartenaire short summary.
 *
 * EtatPartenaire description.
 *
 * @version 1.0
 * @author Pierre-Nicolas
 */
class EtatPartenaire implements ISerializable {
	private $identifiantEtatPartenaire;
	private $nomEtatPartenaire;

	public function getIdentifiantEtatPartenaire(): int {
		return $this->identifiantEtatPartenaire;
	}

	public function setIdentifiantEtatPartenaire(int $identifiantEtatPartenaire): void {
        $this->identifiantEtatPartenaire = $identifiantEtatPartenaire;
    }

	public function getNomEtatPartenaire(): string {
		return $this->nomEtatPartenaire;
	}

	public function setNomEtatPartenaire(string $nomEtatPartenaire): void {
        $this->nomEtatPartenaire = $nomEtatPartenaire;
    }

	public function __construct() {
		$this->identifiantEtatPartenaire = 0;
		$this->nomEtatPartenaire = "";
	}


	#region ISerializable Members

	/**
	 *
	 * @return array
	 */
	public function getObjetSerializable(): array {
		return array(
			"identifiantEtatPartenaire" => $this->getIdentifiantEtatPartenaire(),
            "nomEtatPartenaire" => $this->getNomEtatPartenaire()
        );
	}

	#endregion
}