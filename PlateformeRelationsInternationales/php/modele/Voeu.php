<?php

/**
 * Voeu short summary.
 *
 * Voeu description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class Voeu implements ISerializable {
	private $identifiantVoeu;
	private $adresseMailVoeu;

	public function getIdentifiantVoeu(): int {
		return $this->identifiantVoeu;
	}

	public function setIdentifiantVoeu(int $identifiantVoeu): void {
        $this->identifiantVoeu = $identifiantVoeu;
    }

	public function getAdresseMailVoeu(): string {
		return $this->adresseMailVoeu;
	}

	public function setAdresseMailVoeu(string $adresseMailVoeu): void {
        $this->adresseMailVoeu = $adresseMailVoeu;
    }

	public function __construct() {
		$this->identifiantVoeu = 0;
		$this->adresseMailVoeu = "";
	}


	#region ISerializable Members

	/**
	 *
	 * @return array
	 */
	public function getObjetSerializable(): array {
		return array(
			"identifiantVoeu" => $this->getIdentifiantVoeu(),
            "adresseMailVoeu" => $this->getAdresseMailVoeu()
        );
	}

	#endregion
}