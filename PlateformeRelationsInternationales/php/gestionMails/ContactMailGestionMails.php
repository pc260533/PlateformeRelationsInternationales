<?php

/**
 *
 * ContactMailGestionMails est la classe représentant un contact de mail.
 *
 * @version 1.0
 * @author Pierre-Nicolas
 */
class ContactMailGestionMails {
	/**
	 * Le nom du contact mail.
	 * @var string
	 */
	private $nomContactMail;
	/**
	 * L'adresse mail du contact mail.
	 * @var string
	 */
	private $adresseMailContactMail;

	/**
	 * Retourner le nom du contact mail.
	 * @return null|string Le nom du contact mail.
	 */
	public function getNomContactMail(): string {
		return $this->nomContactMail;
	}

	/**
	 * Modifier le nom du contact mail.
	 * @param string $nomContactMail Le nom du contact mail.
	 */
	public function setNomContactMail(string $nomContactMail): void {
		$this->nomContactMail = $nomContactMail;
	}

	/**
	 * Retourner l'adresse mail du contact mail.
	 * @return null|string L'adresse mail du contact mail.
	 */
	public function getAdresseMailContactMail(): string {
		return $this->adresseMailContactMail;
	}

	/**
	 * Modifier l'adresse mail du contatc mail.
	 * @param string $adresseMailContactMail L'adresse mail du contact mail.
	 */
	public function setAdresseMailContactMail(string $adresseMailContactMail): void {
		$this->adresseMailContactMail = $adresseMailContactMail;
	}

	/**
	 * Constructeur ContactMail prenant en paramètres le nom et l'adresse mail du contact mail.
	 * @param string $nomContactMail
	 * @param string $adresseMailContactMail
	 */
	public function __construct(string $nomContactMail, string $adresseMailContactMail) {
		$this->nomContactMail = $nomContactMail;
		$this->adresseMailContactMail = $adresseMailContactMail;
	}

}