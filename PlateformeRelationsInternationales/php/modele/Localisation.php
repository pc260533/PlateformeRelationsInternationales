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
	private $nomLocalisation;
	private $nomPaysLocalisation;
	private $codePaysLocalisation;

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

	public function getNomLocalisation(): string {
        return $this->nomLocalisation;
    }

    public function setNomLocalisation(string $nomLocalisation): void {
        $this->nomLocalisation = $nomLocalisation;
    }

	public function getNomPaysLocalisation(): string {
        return $this->nomPaysLocalisation;
    }

    public function setNomPaysLocalisation(string $nomPaysLocalisation): void {
        $this->nomPaysLocalisation = $nomPaysLocalisation;
    }

	public function getCodePaysLocalisation(): string {
        return $this->codePaysLocalisation;
    }

    public function setCodePaysLocalisation(string $codePaysLocalisation): void {
        $this->codePaysLocalisation = $codePaysLocalisation;
    }

	public function __construct() {
		$this->identifiantLocalisation = 0;
		$this->latitudeLocalisation = "";
		$this->longitudeLocalisation = "";
		$this->nomLocalisation = "";
		$this->nomPaysLocalisation = "";
		$this->codePaysLocalisation = "";
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
            "longitudeLocalisation" => $this->getLongitudeLocalisation(),
            "nomLocalisation" => $this->getNomLocalisation(),
            "nomPaysLocalisation" => $this->getNomPaysLocalisation(),
            "codePaysLocalisation" => $this->getCodePaysLocalisation()
        );
	}

	#endregion
}