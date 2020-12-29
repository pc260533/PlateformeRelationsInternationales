<?php

/**
 * Mail short summary.
 *
 * Mail description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class MailGestionMails {
	private $expediteur;
	private $listeDestinataire;
	private $listeCopieCarbones;
	private $listeCopiesCarbonesInvisibles;
	private $sujetMail;
	private $messageHtml;

	public function getExpediteur(): ContactMailGestionMails {
		return $this->expediteur;
	}

	public function setExpediteur(ContactMailGestionMails $expediteur): void {
		$this->expediteur = $expediteur;
	}

	public function getSujetMail(): string {
		return $this->sujetMail;
	}

	public function setSujetMail(string $sujetMail): void {
		$this->sujetMail = $sujetMail;
	}

	public function getMessageHtml(): string {
		return $this->messageHtml;
	}

	public function setMessageHtml(string $messageHtml): void {
		$this->messageHtml = $messageHtml;
	}

	public function getListeDestinataire(): array {
		return $this->listeDestinataire;
	}

	public function getListeCopieCarbones(): array {
		return $this->listeCopieCarbones;
	}

	public function getListeCopiesCarbonesInvisibles(): array {
		return $this->listeCopiesCarbonesInvisibles;
	}

	public function __construct() {
		$this->expediteur = null;
		$this->listeDestinataire = array();
		$this->listeCopieCarbones = array();
		$this->listeCopiesCarbonesInvisibles = array();
		$this->sujetMail = "";
		$this->messageHtml = "";
	}

	public function ajouterDestinataire(ContactMailGestionMails $destinataire) {
		$this->listeDestinataire[] = $destinataire;
	}

	public function ajouterCopieCarbone(ContactMailGestionMails $copieCarbone) {
		$this->listeCopieCarbones[] = $copieCarbone;
	}

	public function ajouterCopieCarboneInvisible(ContactMailGestionMails $copieCarboneInvisible) {
		$this->listeCopiesCarbonesInvisibles[] = $copieCarboneInvisible;
	}

}