<?php

/**
 * Mail short summary.
 *
 * Mail description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class Mail implements ISerializable {
	private $identifiantMail;
	private $dateEnvoie;
	private $estEnvoye;
	private $listeDestinatairesContactsEtrangers;
	private $listeDestinatairesCoordinateurs;
	private $listeDestinatairesContactsMails;
	private $listeCopiesCarbonesContactsEtrangers;
	private $listeCopiesCarbonesCoordinateurs;
	private $listeCopiesCarbonesContactsMails;
	private $listeCopiesCarbonesInvisiblesContactsEtrangers;
	private $listeCopiesCarbonesInvisiblesCoordinateurs;
	private $listeCopiesCarbonesInvisiblesContactsMails;
	private $sujetMail;
	private $messageHtmlMail;
	private $templateMail;
	private $partenaireMail;

	public function getIdentifiantMail(): int {
		return $this->identifiantMail;
	}

	public function setIdentifiantMail(int $identifiantMail): void {
		$this->identifiantMail = $identifiantMail;
	}

	public function getDateEnvoie(): DateTime {
		return $this->dateEnvoie;
	}

	public function setDateEnvoie(DateTime $dateEnvoie): void {
		$this->dateEnvoie = $dateEnvoie;
	}

	public function getEstEnvoye(): bool {
		return $this->estEnvoye;
	}

	public function setEstEnvoye(bool $estEnvoye): void {
		$this->estEnvoye = $estEnvoye;
	}

	public function getListeDestinatairesContactsEtrangers(): array {
		return $this->listeDestinatairesContactsEtrangers;
	}

	public function getListeDestinatairesCoordinateurs(): array {
		return $this->listeDestinatairesCoordinateurs;
	}

	public function getListeDestinatairesContactsMails(): array {
		return $this->listeDestinatairesContactsMails;
	}

	public function getListeCopiesCarbonesContactsEtrangers(): array {
		return $this->listeCopiesCarbonesContactsEtrangers;
	}

	public function getListeCopiesCarbonesCoordinateurs(): array {
		return $this->listeCopiesCarbonesCoordinateurs;
	}

	public function getListeCopiesCarbonesContactsMails(): array {
		return $this->listeCopiesCarbonesContactsMails;
	}

	public function getListeCopiesCarbonesInvisiblesContactsEtrangers(): array {
		return $this->listeCopiesCarbonesInvisiblesContactsEtrangers;
	}

	public function getListeCopiesCarbonesInvisiblesCoordinateurs(): array {
		return $this->listeCopiesCarbonesInvisiblesCoordinateurs;
	}

	public function getListeCopiesCarbonesInvisiblesContactsMails(): array {
		return $this->listeCopiesCarbonesInvisiblesContactsMails;
	}

	public function getSujetMail(): ?string {
		return $this->sujetMail;
	}

	public function setSujetMail(?string $sujetMail): void {
		$this->sujetMail = $sujetMail;
	}

	public function getMessageHtmlMail(): ?string {
		return $this->messageHtmlMail;
	}

	public function setMessageHtmlMail(?string $messageHtmlMail): void {
		$this->messageHtmlMail = $messageHtmlMail;
	}

	public function getTemplateMail(): ?TemplateMail {
		return $this->templateMail;
	}

	public function setTemplateMail(?TemplateMail $templateMail): void {
		$this->templateMail = $templateMail;
	}

	public function getPartenaireMail(): Partenaire {
		return $this->partenaireMail;
	}

	public function setPartenaireMail(Partenaire $partenaireMail): void {
		$this->partenaireMail = $partenaireMail;
	}

	private function getListeDestinatairesContactsEtrangersSerializable() : array {
		$res = array();
		foreach ($this->listeDestinatairesContactsEtrangers as $contactEtranger) {
			$res[] = $contactEtranger->getObjetSerializable();
		}
		return $res;
	}

	private function getListeDestinatairesCoordinateursSerializable() : array {
		$res = array();
		foreach ($this->listeDestinatairesCoordinateurs as $coordinateur) {
			$res[] = $coordinateur->getObjetSerializable();
		}
		return $res;
	}

	private function getListeDestinatairesContactsMailsSerializable() : array {
		$res = array();
		foreach ($this->listeDestinatairesContactsMails as $contactMail) {
			$res[] = $contactMail->getObjetSerializable();
		}
		return $res;
	}

	private function getListeCopiesCarbonesContactsEtrangersSerializable() : array {
		$res = array();
		foreach ($this->listeCopiesCarbonesContactsEtrangers as $contactEtranger) {
			$res[] = $contactEtranger->getObjetSerializable();
		}
		return $res;
	}

	private function getListeCopiesCarbonesCoordinateursSerializable() : array {
		$res = array();
		foreach ($this->listeCopiesCarbonesCoordinateurs as $coordinateur) {
			$res[] = $coordinateur->getObjetSerializable();
		}
		return $res;
	}

	private function getListeCopiesCarbonesContactsMailsSerializable() : array {
		$res = array();
		foreach ($this->listeCopiesCarbonesContactsMails as $contactMail) {
			$res[] = $contactMail->getObjetSerializable();
		}
		return $res;
	}

	private function getListeCopiesCarbonesInvisiblesContactsEtrangersSerializable() : array {
		$res = array();
		foreach ($this->listeCopiesCarbonesInvisiblesContactsEtrangers as $contactEtranger) {
			$res[] = $contactEtranger->getObjetSerializable();
		}
		return $res;
	}

	private function getListeCopiesCarbonesInvisiblesCoordinateursSerializable() : array {
		$res = array();
		foreach ($this->listeCopiesCarbonesInvisiblesCoordinateurs as $coordinateur) {
			$res[] = $coordinateur->getObjetSerializable();
		}
		return $res;
	}

	private function getListeCopiesCarbonesInvisiblesContactsMailsSerializable() : array {
		$res = array();
		foreach ($this->listeCopiesCarbonesInvisiblesContactsMails as $contactMail) {
			$res[] = $contactMail->getObjetSerializable();
		}
		return $res;
	}

	public function __construct() {
		$this->identifiantMail = 0;
		$this->dateEnvoie = null;
		$this->estEnvoye = false;
		$this->listeDestinatairesContactsEtrangers = array();
		$this->listeDestinatairesCoordinateurs = array();
		$this->listeDestinatairesContactsMails = array();
		$this->listeCopiesCarbonesContactsEtrangers = array();
		$this->listeCopiesCarbonesCoordinateurs = array();
		$this->listeCopiesCarbonesContactsMails = array();
		$this->listeCopiesCarbonesInvisiblesContactsEtrangers = array();
		$this->listeCopiesCarbonesInvisiblesCoordinateurs = array();
		$this->listeCopiesCarbonesInvisiblesContactsMails = array();
		$this->sujetMail = "";
		$this->messageHtmlMail = "";
		$this->templateMail = null;
		$this->partenaireMail = null;
	}

	public function ajouterDestinataireContactEtranger(ContactEtranger $contactEtranger) {
		$this->listeDestinatairesContactsEtrangers[] = $contactEtranger;
	}

	public function supprimerDestinataireContactEtranger(ContactEtranger $contactEtranger) {
		if (($key = array_search($contactEtranger, $this->listeDestinatairesContactsEtrangers)) !== false) {
			unset($this->listeDestinatairesContactsEtrangers[$key]);
		}
	}

	public function ajouterDestinataireCoordinateur(Coordinateur $coordinateur) {
		$this->listeDestinatairesCoordinateurs[] = $coordinateur;
	}

	public function supprimerDestinataireCoordinateur(Coordinateur $coordinateur) {
		if (($key = array_search($coordinateur, $this->listeDestinatairesCoordinateurs)) !== false) {
			unset($this->listeDestinatairesCoordinateurs[$key]);
		}
	}

	public function ajouterDestinataireContactMail(ContactMail $contactMail) {
		$this->listeDestinatairesContactsMails[] = $contactMail;
	}

	public function supprimerDestinataireContactMail(ContactMail $contactMail) {
		if (($key = array_search($contactMail, $this->listeDestinatairesContactsMails)) !== false) {
			unset($this->listeDestinatairesContactsMails[$key]);
		}
	}

	public function ajouterCopieCarboneContactEtranger(ContactEtranger $contactEtranger) {
		$this->listeCopiesCarbonesContactsEtrangers[] = $contactEtranger;
	}

	public function supprimerCopieCarboneContactEtranger(ContactEtranger $contactEtranger) {
		if (($key = array_search($contactEtranger, $this->listeCopiesCarbonesContactsEtrangers)) !== false) {
			unset($this->listeCopiesCarbonesContactsEtrangers[$key]);
		}
	}

	public function ajouterCopieCarboneCoordinateur(Coordinateur $coordinateur) {
		$this->listeCopiesCarbonesCoordinateurs[] = $coordinateur;
	}

	public function supprimerCopieCarboneCoordinateur(Coordinateur $coordinateur) {
		if (($key = array_search($coordinateur, $this->listeCopiesCarbonesCoordinateurs)) !== false) {
			unset($this->listeCopiesCarbonesCoordinateurs[$key]);
		}
	}

	public function ajouterCopieCarboneContactMail(ContactMail $contactMail) {
		$this->listeCopiesCarbonesContactsMails[] = $contactMail;
	}

	public function supprimerCopieCarboneContactMail(ContactMail $contactMail) {
		if (($key = array_search($contactMail, $this->listeCopiesCarbonesContactsMails)) !== false) {
			unset($this->listeCopiesCarbonesContactsMails[$key]);
		}
	}

	public function ajouterCopieCarboneInvisibleContactEtranger(ContactEtranger $contactEtranger) {
		$this->listeCopiesCarbonesInvisiblesContactsEtrangers[] = $contactEtranger;
	}

	public function supprimerCopieCarboneInvisibleContactEtranger(ContactEtranger $contactEtranger) {
		if (($key = array_search($contactEtranger, $this->listeCopiesCarbonesInvisiblesContactsEtrangers)) !== false) {
			unset($this->listeCopiesCarbonesInvisiblesContactsEtrangers[$key]);
		}
	}

	public function ajouterCopieCarboneInvisibleCoordinateur(Coordinateur $coordinateur) {
		$this->listeCopiesCarbonesInvisiblesCoordinateurs[] = $coordinateur;
	}

	public function supprimerCopieCarboneInvisibleCoordinateur(Coordinateur $coordinateur) {
		if (($key = array_search($coordinateur, $this->listeCopiesCarbonesInvisiblesCoordinateurs)) !== false) {
			unset($this->listeCopiesCarbonesInvisiblesCoordinateurs[$key]);
		}
	}

	public function ajouterCopieCarboneInvisibleContactMail(ContactMail $contactMail) {
		$this->listeCopiesCarbonesInvisiblesContactsMails[] = $contactMail;
	}

	public function supprimerCopieCarboneInvisibleContactMail(ContactMail $contactMail) {
		if (($key = array_search($contactMail, $this->listeCopiesCarbonesInvisiblesContactsMails)) !== false) {
			unset($this->listeCopiesCarbonesInvisiblesContactsMails[$key]);
		}
	}

	#region ISerializable Members

	/**
	 *
	 * @return array
	 */
	public function getObjetSerializable(): array {
		$mailSerializable = array(
			"identifiantMail" => $this->getIdentifiantMail(),
            "dateEnvoie" => $this->getDateEnvoie()->format("Y-m-d"),
            "estEnvoye" => $this->getEstEnvoye(),
            "listeDestinatairesContactsEtrangers" => $this->getListeDestinatairesContactsEtrangersSerializable(),
            "listeDestinatairesCoordinateurs" => $this->getListeDestinatairesCoordinateursSerializable(),
            "listeDestinatairesContactsMails" => $this->getListeDestinatairesContactsMailsSerializable(),
            "listeCopiesCarbonesContactsEtrangers" => $this->getListeCopiesCarbonesContactsEtrangersSerializable(),
            "listeCopiesCarbonesCoordinateurs" => $this->getListeCopiesCarbonesCoordinateursSerializable(),
            "listeCopiesCarbonesContactsMails" => $this->getListeCopiesCarbonesContactsMailsSerializable(),
            "listeCopiesCarbonesInvisiblesContactsEtrangers" => $this->getListeCopiesCarbonesInvisiblesContactsEtrangersSerializable(),
            "listeCopiesCarbonesInvisiblesCoordinateurs" => $this->getListeCopiesCarbonesInvisiblesCoordinateursSerializable(),
            "listeCopiesCarbonesInvisiblesContactsMails" => $this->getListeCopiesCarbonesInvisiblesContactsMailsSerializable(),
            "partenaireMail" => $this->getPartenaireMail()->getIdentifiantPartenaire()
        );
		if ($this->getSujetMail()) {
			$mailSerializable["sujetMail"] = $this->getSujetMail();
		}
		if ($this->getMessageHtmlMail()) {
			$mailSerializable["messageHtmlMail"] = $this->getMessageHtmlMail();
		}
		if ($this->getTemplateMail()) {
			$mailSerializable["templateMail"] = $this->getTemplateMail()->getObjetSerializable();
		}
		/*$mailSerializable = array(
			"identifiantMail" => $this->getIdentifiantMail(),
			"dateEnvoie" => $this->getDateEnvoie()->format("Y-m-d"),
			"estEnvoye" => $this->getEstEnvoye(),
			"listeDestinatairesContactsEtrangers" => $this->getListeDestinatairesContactsEtrangersSerializable(),
			"listeDestinatairesCoordinateurs" => $this->getListeDestinatairesCoordinateursSerializable(),
			"listeDestinatairesContactsMails" => $this->getListeDestinatairesContactsMailsSerializable(),
			"listeCopiesCarbonesContactsEtrangers" => $this->getListeCopiesCarbonesContactsEtrangersSerializable(),
			"listeCopiesCarbonesCoordinateurs" => $this->getListeCopiesCarbonesCoordinateursSerializable(),
			"listeCopiesCarbonesContactsMails" => $this->getListeCopiesCarbonesContactsMailsSerializable(),
			"listeCopiesCarbonesInvisiblesContactsEtrangers" => $this->getListeCopiesCarbonesInvisiblesContactsEtrangersSerializable(),
			"listeCopiesCarbonesInvisiblesCoordinateurs" => $this->getListeCopiesCarbonesInvisiblesCoordinateursSerializable(),
			"listeCopiesCarbonesInvisiblesContactsMails" => $this->getListeCopiesCarbonesInvisiblesContactsMailsSerializable(),
			"sujetMail" => $this->getSujetMail(),
			"messageHtmlMail" => $this->getMessageHtmlMail()
		);
		if ($this->getTemplateMail()) {
			$mailSerializable["templateMail"] = $this->getTemplateMail()->getObjetSerializable();
		}
		else {
			$mailSerializable["templateMail"] = $this->getTemplateMail();
		}*/
		return $mailSerializable;
	}

	#endregion

}