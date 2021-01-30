<?php

/**
 *
 * StockageCoordinateurs est la classe fournissant l'accès aux coordinateurs de la base de données Plateforme.
 * Elle hérite de StockageContacts.
 *
 * @version 1.0
 * @author Pierre-Nicolas
 */
class StockageCoordinateurs extends StockageContacts  {

	/**
	 * Constructeur StockageCoordinateurs prenant en paramètre le dataSourceName, le nom d'utilisateur et le mot de passe de la base de données.
	 * @param string $dataSourceName Le dataSourceName de la base de données.
	 * @param string $username Le nom d'utilisateur de la base de données.
	 * @param string $password Le mot de passe de la base de données.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 */
	public function __construct(string $dataSourceName, string $username, string $password) {
		parent::__construct($dataSourceName, $username, $password);
	}

	/**
	 * Ajouter un coordinateur.
	 * @param Coordinateur $coordinateur Le coordinateur à ajouter.
	 */
	public function ajouterCoordinateur(Coordinateur $coordinateur): void {
		$this->ajouterContact($coordinateur, true);
	}

	/**
	 * Supprimer un coordinateur.
	 * @param Coordinateur $coordinateur Le coordinateur à supprimer.
	 */
	public function supprimerCoordinateur(Coordinateur $coordinateur): void {
		$this->supprimerContact($coordinateur);
	}

	/**
	 * Modifier un coordinateur.
	 * @param Coordinateur $coordinateur Le coordinateur à modifier.
	 */
	public function modifierCoordinateur(Coordinateur $coordinateur): void {
		$this->modifierContact($coordinateur);
	}

	/**
	 * Retoruner la liste des coordinateurs.
	 * @return array La liste des coordinateurs.
	 */
	public function chargerListeCoordinateurs(): array {
		return $this->chargerListeContactsCoordinateurs();
	}

}