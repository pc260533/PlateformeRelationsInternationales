<?php

/**
 * ContactMail short summary.
 *
 * ContactMail description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class ContactMail implements ISerializable {
	private $nomContactMail;
	private $adresseMailContactMail;

	public function getNomContactMail(): string {
		return $this->nomContactMail;
	}

	public function setNomContactMail(string $nomContactMail): void {
		$this->nomContactMail = $nomContactMail;
	}

	public function getAdresseMailContactMail(): string {
		return $this->adresseMailContactMail;
	}

	public function setAdresseMailContactMail(string $adresseMailContactMail): void {
		$this->adresseMailContactMail = $adresseMailContactMail;
	}

	public function __construct() {
		$this->nomContactMail = "";
		$this->adresseMailContactMail = "";
	}

	#region ISerializable Members

	/**
	 *
	 * @return array
	 */
	public function getObjetSerializable(): array {
		return array(
			"nomContactMail" => $this->getNomContactMail(),
            "adresseMailContactMail" => $this->getAdresseMailContactMail()
        );
	}

	#endregion

}