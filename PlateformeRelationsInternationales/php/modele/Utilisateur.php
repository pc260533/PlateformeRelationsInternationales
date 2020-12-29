<?php

/**
 * Utilisateur short summary.
 *
 * Utilisateur description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class Utilisateur implements ISerializable {
	private $identifiantUtilisateur;
	private $nomUtilisateur;
	private $motDePasseUtilisateur;
	private $adresseMailUtilisateur;
	private $estAdministrateur;

	public function getIdentifiantUtilisateur(): int {
		return $this->identifiantUtilisateur;
	}

	public function setIdentifiantUtilisateur(int $identifiantUtilisateur): void {
		$this->identifiantUtilisateur = $identifiantUtilisateur;
	}

	public function getNomUtilisateur(): string {
		return $this->nomUtilisateur;
	}

	public function setNomUtilisateur(string $nomUtilisateur): void {
		$this->nomUtilisateur = $nomUtilisateur;
	}

	public function getMotDePasseUtilisateur(): string {
		return $this->motDePasseUtilisateur;
	}

	public function setMotDePasseUtilisateur(string $motDePasseUtilisateur): void {
		$this->motDePasseUtilisateur = $motDePasseUtilisateur;
	}

	public function getAdresseMailUtilisateur(): string {
		return $this->adresseMailUtilisateur;
	}

	public function setAdresseMailUtilisateur(string $adresseMailUtilisateur): void {
		$this->adresseMailUtilisateur = $adresseMailUtilisateur;
	}

	public function getEstAdministrateur(): bool {
		return $this->estAdministrateur;
	}

	public function setEstAdministrateur(bool $estAdministrateur): void {
		$this->estAdministrateur = $estAdministrateur;
	}

	public function __construct() {
		$this->identifiantUtilisateur = 0;
		$this->nomUtilisateur = "";
		$this->motDePasseUtilisateur = "";
		$this->adresseMailUtilisateur = "";
		$this->estAdministrateur = false;
	}

	#region ISerializable Members

	/**
	 *
	 * @return array
	 */
	public function getObjetSerializable(): array {
		return array(
			"identifiantUtilisateur" => $this->getIdentifiantUtilisateur(),
            "nomUtilisateur" => $this->getNomUtilisateur(),
            "motDePasseUtilisateur" => $this->getMotDePasseUtilisateur(),
            "adresseMailUtilisateur" => $this->getAdresseMailUtilisateur(),
            "estAdministrateur" => $this->getEstAdministrateur()
        );
	}

	#endregion
}