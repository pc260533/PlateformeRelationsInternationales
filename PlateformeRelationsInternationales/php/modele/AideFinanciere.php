<?php

/**
 * AideFinanciere short summary.
 *
 * AideFinanciere description.
 *
 * @version 1.0
 * @author Pierre-Nicolas
 */
class AideFinanciere implements ISerializable {
	private $identifiantAideFinanciere;
	private $nomAideFinanciere;
	private $descriptionAideFinanciere;
	private $lienAideFinanciere;

	public function getIdentifiantAideFinanciere(): int {
		return $this->identifiantAideFinanciere;
	}

	public function setIdentifiantAideFinanciere(int $identifiantAideFinanciere): void {
		$this->identifiantAideFinanciere = $identifiantAideFinanciere;
	}

	public function getNomAideFinanciere(): string {
		return $this->nomAideFinanciere;
	}

	public function setNomAideFinanciere(string $nomAideFinanciere): void {
		$this->nomAideFinanciere = $nomAideFinanciere;
	}

	public function getDescriptionAideFinanciere(): string {
		return $this->descriptionAideFinanciere;
	}

	public function setDescriptionAideFinanciere(string $descriptionAideFinanciere): void {
		$this->descriptionAideFinanciere = $descriptionAideFinanciere;
	}

	public function getLienAideFinanciere(): string {
		return $this->lienAideFinanciere;
	}

	public function setLienAideFinanciere(string $lienAideFinanciere): void {
		$this->lienAideFinanciere = $lienAideFinanciere;
	}

	public function __construct() {
		$this->identifiantAideFinanciere = 0;
		$this->nomAideFinanciere = "";
		$this->descriptionAideFinanciere = "";
		$this->lienAideFinanciere = "";
	}

	#region ISerializable Members

	/**
	 *
	 * @return array
	 */
	public function getObjetSerializable(): array {
		return array(
			"identifiantAideFinanciere" => $this->getIdentifiantAideFinanciere(),
            "nomAideFinanciere" => $this->getNomAideFinanciere(),
            "descriptionAideFinanciere" => $this->getDescriptionAideFinanciere(),
            "lienAideFinanciere" => $this->getLienAideFinanciere()
        );
	}

	#endregion
}