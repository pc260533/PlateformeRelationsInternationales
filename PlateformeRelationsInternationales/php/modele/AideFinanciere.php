<?php

/**
 * AideFinanciere short summary.
 *
 * AideFinanciere description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class AideFinanciere implements ISerializable {
	private $identifiantAideFinanciere;
	private $nomAideFinanciere;

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

	public function __construct() {
		$this->identifiantAideFinanciere = 0;
		$this->nomAideFinanciere = "";
	}

	#region ISerializable Members

	/**
	 *
	 * @return array
	 */
	public function getObjetSerializable(): array {
		return array(
			"identifiantAideFinanciere" => $this->getIdentifiantAideFinanciere(),
            "nomAideFinanciere" => $this->getNomAideFinanciere()
        );
	}

	#endregion
}