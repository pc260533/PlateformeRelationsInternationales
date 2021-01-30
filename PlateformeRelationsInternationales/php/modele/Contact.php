<?php

/**
 * Contact short summary.
 *
 * Contact description.
 *
 * @version 1.0
 * @author Pierre-Nicolas
 */
abstract class Contact implements ISerializable {
	private $identifiantContact;
    private $nomContact;
    private $prenomContact;
    private $adresseMailContact;
    private $fonctionContact;

    public function getIdentifiantContact(): int {
        return $this->identifiantContact;
    }

    public function setIdentifiantContact(int $identifiantContact): void {
        $this->identifiantContact = $identifiantContact;
    }

    public function getNomContact(): string {
        return $this->nomContact;
    }

    public function setNomContact(string $nomContact): void {
        $this->nomContact = $nomContact;
    }

    public function getPrenomContact(): string {
        return $this->prenomContact;
    }

    public function setPrenomContact(string $prenomContact): void {
        $this->prenomContact = $prenomContact;
    }

    public function getAdresseMailContact(): string {
        return $this->adresseMailContact;
    }

    public function setAdresseMailContact(string $adresseMailContact): void {
        $this->adresseMailContact = $adresseMailContact;
    }

	public function getFonctionContact(): string {
        return $this->fonctionContact;
    }

    public function setFonctionContact(string $fonctionContact): void {
        $this->fonctionContact = $fonctionContact;
    }

	public function __construct() {
		$this->identifiantContact = 0;
		$this->nomContact = "";
		$this->prenomContact = "";
		$this->adresseMailContact = "";
		$this->fonctionContact = "";
	}


	#region ISerializable Members

	/**
	 *
	 * @return array
	 */
	public function getObjetSerializable(): array {
		return array(
			"identifiantContact" => $this->getIdentifiantContact(),
            "nomContact" => $this->getNomContact(),
            "prenomContact" => $this->getPrenomContact(),
            "adresseMailContact" => $this->getAdresseMailContact(),
            "fonctionContact" => $this->getFonctionContact()
        );
	}

	#endregion
}