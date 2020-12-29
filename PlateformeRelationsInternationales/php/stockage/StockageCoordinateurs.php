<?php

/**
 * StockageCoordinateurs short summary.
 *
 * StockageCoordinateurs description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class StockageCoordinateurs extends StockageContacts  {

	public function __construct(string $dataSourceName, string $username, string $password) {
		parent::__construct($dataSourceName, $username, $password);
	}

	public function ajouterCoordinateur(Coordinateur $coordinateur): void {
		$this->ajouterContact($coordinateur, true);
	}

	public function supprimerCoordinateur(Coordinateur $coordinateur): void {
		$this->supprimerContact($coordinateur);
	}

	public function modifierCoordinateur(Coordinateur $coordinateur): void {
		$this->modifierContact($coordinateur);
	}

	public function chargerListeCoordinateurs(): array {
		return $this->chargerListeContactsCoordinateurs();
	}

}