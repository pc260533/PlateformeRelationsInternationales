<?php

/**
 * ControleurContactEtranger short summary.
 *
 * ControleurContactEtranger description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class ControleurContactsEtrangers implements IControleurPlateforme {
	private $stockageContactsEtrangers;

	private function creerContactEtranger(array $contactEtrangerArray): ContactEtranger {
		$contactEtranger = new ContactEtranger();
		if (isset($contactEtrangerArray["identifiantContact"])) {
			$contactEtranger->setIdentifiantContact($contactEtrangerArray["identifiantContact"]);
		}
		if (isset($contactEtrangerArray["nomContact"])) {
			$contactEtranger->setNomContact($contactEtrangerArray["nomContact"]);
		}
		if (isset($contactEtrangerArray["prenomContact"])) {
			$contactEtranger->setPrenomContact($contactEtrangerArray["prenomContact"]);
		}
		if (isset($contactEtrangerArray["adresseMailContact"])) {
			$contactEtranger->setAdresseMailContact($contactEtrangerArray["adresseMailContact"]);
		}
		if (isset($contactEtrangerArray["fonctionContact"])) {
			$contactEtranger->setFonctionContact($contactEtrangerArray["fonctionContact"]);
		}
		return $contactEtranger;
	}

	public function __construct() {
		$this->stockageContactsEtrangers = new StockageContactsEtrangers(getVariableEnvironnement("DATASOURCENAME_BASEDEDONNEEPLATEFORME"), getVariableEnvironnement("USERNAME_BASEDEDONNEE"), getVariableEnvironnement("PASSWORD_BASEDEDONNEE"));
	}

	public function ajouterContactEtrange(array $contactEtrangerArray): ContactEtranger {
		$contactEtranger = $this->creerContactEtranger($contactEtrangerArray);
		$this->stockageContactsEtrangers->ajouterContactEtranger($contactEtranger);
		return $contactEtranger;
	}

	public function supprimerContactEtrange(array $contactEtrangerArray): ContactEtranger {
		$contactEtranger = $this->creerContactEtranger($contactEtrangerArray);
		$this->stockageContactsEtrangers->supprimerContactEtranger($contactEtranger);
		return $contactEtranger;
	}

	public function modifierContactEtrange(array $contactEtrangerArray): ContactEtranger {
		$contactEtranger = $this->creerContactEtranger($contactEtrangerArray);
		$this->stockageContactsEtrangers->modifierContactEtranger($contactEtranger);
		return $contactEtranger;
	}

	public function chargerListeContactsEtrangers(): array {
		return $this->stockageContactsEtrangers->chargerListeContactsEtrangers();
	}
}