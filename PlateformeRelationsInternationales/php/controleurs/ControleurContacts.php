<?php

/**
 * ControleurContacts short summary.
 *
 * ControleurContacts description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class ControleurContacts implements IControleurPlateforme {
	private $stockageContacts;

	private function creerContact(array $contactArray): Contact {
		$contact = new Contact();
		if (isset($contactArray["identifiantContact"])) {
			$contact->setIdentifiantContact($contactArray["identifiantContact"]);
		}
		if (isset($contactArray["nomContact"])) {
			$contact->setNomContact($contactArray["nomContact"]);
		}
		if (isset($contactArray["prenomContact"])) {
			$contact->setPrenomContact($contactArray["prenomContact"]);
		}
		if (isset($contactArray["adresseMailContact"])) {
			$contact->setAdresseMailContact($contactArray["adresseMailContact"]);
		}
		if (isset($contactArray["fonctionContact"])) {
			$contact->setFonctionContact($contactArray["fonctionContact"]);
		}
		return $contact;
	}

	public function __construct() {
		$this->stockageContacts = new StockageContacts(getVariableEnvironnement("DATASOURCENAME_BASEDEDONNEEPLATEFORME"), getVariableEnvironnement("USERNAME_BASEDEDONNEE"), getVariableEnvironnement("PASSWORD_BASEDEDONNEE"));
	}

	public function ajouterContact(array $contactArray): Contact {
		$contact = $this->creerContact($contactArray);
		$this->stockageContacts->ajouterContact($contact);
		return $contact;
	}

	public function supprimerContact(array $contactArray): Contact {
		$contact = $this->creerContact($contactArray);
		$this->stockageContacts->supprimerContact($contact);
		return $contact;
	}

	public function modifierContact(array $contactArray): Contact {
		$contact = $this->creerContact($contactArray);
		$this->stockageContacts->modifierContact($contact);
		return $contact;
	}

	public function chargerListeContacts(): array {
		return $this->stockageContacts->chargerListeContacts();
	}
}