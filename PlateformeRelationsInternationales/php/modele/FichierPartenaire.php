<?php

/**
 * FichierPartenaire short summary.
 *
 * FichierPartenaire description.
 *
 * @version 1.0
 * @author Pierre-Nicolas
 */
class FichierPartenaire implements ISerializable {
	private $identifiantFichierPartenaire;
	private $cheminFichierPartenaireServeur;

	public function getIdentifiantFichierPartenaire(): int {
		return $this->identifiantFichierPartenaire;
	}

	public function setIdentifiantFichierPartenaire(int $identifiantFichierPartenaire): void {
		$this->identifiantFichierPartenaire = $identifiantFichierPartenaire;
	}

	public function getCheminFichierPartenaireServeur(): string {
		return $this->cheminFichierPartenaireServeur;
	}

	public function setCheminFichierPartenaireServeur(string $cheminFichierPartenaireServeur): void {
		$this->cheminFichierPartenaireServeur = $cheminFichierPartenaireServeur;
	}

	public function __construct() {
		$this->identifiantFichierPartenaire = 0;
		$this->cheminFichierPartenaireServeur = "";
	}

	#region ISerializable Members

	/**
	 *
	 * @return array
	 */
	public function getObjetSerializable(): array {
		return array(
			"identifiantFichierPartenaire" => $this->getIdentifiantFichierPartenaire(),
			"cheminFichierPartenaireServeur" => $this->getCheminFichierPartenaireServeur()
		);
	}

	#endregion
}