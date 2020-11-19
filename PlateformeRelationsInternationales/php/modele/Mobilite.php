<?php

/**
 * Mobilite short summary.
 *
 * Mobilite description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class Mobilite implements ISerializable {
	private $identifiantMobilite;
	private $typeMobilite;

	public function getIdentifiantMobilite(): int {
		return $this->identifiantMobilite;
	}

	public function setIdentifiantMobilite(int $identifiantMobilite): void {
        $this->identifiantMobilite = $identifiantMobilite;
    }

	public function getTypeMobilite(): string {
		return $this->typeMobilite;
	}

	public function setTypeMobilite(string $typeMobilite): void {
        $this->typeMobilite = $typeMobilite;
    }

	public function __construct() {
		$this->identifiantMobilite = 0;
		$this->typeMobilite = "";
	}


	#region ISerializable Members

	/**
	 *
	 * @return array
	 */
	public function getObjetSerializable(): array {
		return array(
			"identifiantMobilite" => $this->getIdentifiantMobilite(),
            "typeMobilite" => $this->getTypeMobilite()
        );
	}

	#endregion
}