<?php

/**
 * Cout short summary.
 *
 * Cout description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class Cout implements ISerializable {
	private $identifiantCout;
	private $nomPaysCout;
	private $coutMoyenParMois;
	private $coutLogementParMois;
	private $coutVieParMois;
	private $coutInscriptionParMois;

	public function getIdentifiantCout(): int {
		return $this->identifiantCout;
	}

	public function setIdentifiantCout(int $identifiantCout): void {
		$this->identifiantCout = $identifiantCout;
	}

	public function getNomPaysCout(): string {
		return $this->nomPaysCout;
	}

	public function setNomPaysCout(string $nomPaysCout): void {
		$this->nomPaysCout = $nomPaysCout;
	}

	public function getCoutMoyenParMois(): string {
		return $this->coutMoyenParMois;
	}

	public function setCoutMoyenParMois(string $coutMoyenParMois): void {
		$this->coutMoyenParMois = $coutMoyenParMois;
	}

	public function getCoutLogementParMois(): string {
		return $this->coutLogementParMois;
	}

	public function setCoutLogementParMois(string $coutLogementParMois): void {
		$this->coutLogementParMois = $coutLogementParMois;
	}

	public function getCoutVieParMois(): string {
		return $this->coutVieParMois;
	}

	public function setCoutVieParMois(string $coutVieParMois): void {
		$this->coutVieParMois = $coutVieParMois;
	}

	public function getCoutInscriptionParMois(): string {
		return $this->coutInscriptionParMois;
	}

	public function setCoutInscriptionParMois(string $coutInscriptionParMois): void {
		$this->coutInscriptionParMois = $coutInscriptionParMois;
	}

	public function __construct() {
		$this->identifiantCout = 0;
		$this->nomPaysCout = "";
		$this->coutMoyenParMois = "";
		$this->coutLogementParMois = "";
		$this->coutVieParMois = "";
		$this->coutInscriptionParMois = "";
	}

	#region ISerializable Members

	/**
	 *
	 * @return array
	 */
	public function getObjetSerializable(): array {
		return array(
			"identifiantCout" => $this->getIdentifiantCout(),
            "nomPaysCout" => $this->getNomPaysCout(),
            "coutMoyenParMois" => $this->getCoutMoyenParMois(),
            "coutLogementParMois" => $this->getCoutLogementParMois(),
            "coutVieParMois" => $this->getCoutVieParMois(),
            "coutInscriptionParMois" => $this->getCoutInscriptionParMois()
        );
	}

	#endregion
}