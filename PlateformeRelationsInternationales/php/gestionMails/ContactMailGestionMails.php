<?php

/**
 * ContactMail short summary.
 *
 * ContactMail description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class ContactMailGestionMails {
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

	public function __construct(string $nomContactMail, string $adresseMailContactMail) {
		$this->nomContactMail = $nomContactMail;
		$this->adresseMailContactMail = $adresseMailContactMail;
	}

}