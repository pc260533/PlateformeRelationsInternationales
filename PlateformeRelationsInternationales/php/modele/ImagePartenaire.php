<?php

/**
 * ImagePartenaire short summary.
 *
 * ImagePartenaire description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class ImagePartenaire implements ISerializable {
	private $identifiantImagePartenaire;
	private $cheminImagePartenaireServeur;

	public function getIdentifiantImagePartenaire(): int {
		return $this->identifiantImagePartenaire;
	}

	public function setIdentifiantImagePartenaire(int $identifiantImagePartenaire): void {
		$this->identifiantImagePartenaire = $identifiantImagePartenaire;
	}

	public function getCheminImagePartenaireServeur(): string {
		return $this->cheminImagePartenaireServeur;
	}

	public function setCheminImagePartenaireServeur(string $cheminImagePartenaireServeur): void {
		$this->cheminImagePartenaireServeur = $cheminImagePartenaireServeur;
	}

	public function __construct() {
		$this->identifiantImagePartenaire = 0;
		$this->cheminImagePartenaireServeur = "";
	}

	#region ISerializable Members

	/**
	 *
	 * @return array
	 */
	public function getObjetSerializable(): array {
		return array(
			"identifiantImagePartenaire" => $this->getIdentifiantImagePartenaire(),
			"cheminImagePartenaireServeur" => $this->getCheminImagePartenaireServeur()
		);
	}

	#endregion
}