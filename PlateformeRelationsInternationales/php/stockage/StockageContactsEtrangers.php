<?php

/**
 * StockageContactsEtrangers short summary.
 *
 * StockageContactsEtrangers description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class StockageContactsEtrangers extends StockageContacts  {

	public function __construct(string $dataSourceName, string $username, string $password) {
		parent::__construct($dataSourceName, $username, $password);
	}

	public function ajouterContactEtranger(ContactEtranger $contactEtranger): void {
		$this->ajouterContact($contactEtranger, false);
	}

	public function supprimerContactEtranger(ContactEtranger $contactEtranger): void {
		$this->supprimerContact($contactEtranger);
	}

	public function modifierContactEtranger(ContactEtranger $contactEtranger): void {
		$this->modifierContact($contactEtranger);
	}

	public function chargerListeContactsEtrangers(): array {
		return $this->chargerListeContactsContactsEtrangers();
	}

}