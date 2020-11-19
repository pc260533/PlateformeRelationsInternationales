<?php

/**
 * Localisation short summary.
 *
 * Localisation description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class Localisation implements ISerializable {
	private $identifiantLocalisation;
	private $latitudeLocalisation;
	private $longitudeLocalisation;

	public function getIdentifiantLocalisation(): int {
        return $this->identifiantLocalisation;
    }

    public function setIdentifiantLocalisation(int $identifiantLocalisation): void {
        $this->identifiantLocalisation = $identifiantLocalisation;
    }

	public function getLatitudeLocalisation(): string {
        return $this->latitudeLocalisation;
    }

    public function setLatitudeLocalisation(string $latitudeLocalisation): void {
        $this->latitudeLocalisation = $latitudeLocalisation;
    }

	public function getLongitudeLocalisation(): string {
        return $this->longitudeLocalisation;
    }

    public function setLongitudeLocalisation(string $longitudeLocalisation): void {
        $this->longitudeLocalisation = $longitudeLocalisation;
    }

	public function __construct() {
		$this->identifiantLocalisation = 0;
		$this->latitudeLocalisation = "";
		$this->longitudeLocalisation = "";
	}


	#region ISerializable Members

	/**
	 *
	 * @return array
	 */
	public function getObjetSerializable(): array {
		return array(
			"identifiantLocalisation" => $this->getIdentifiantLocalisation(),
            "latitudeLocalisation" => $this->getLatitudeLocalisation(),
            "longitudeLocalisation" => $this->getLongitudeLocalisation()
        );
	}

	#endregion
}