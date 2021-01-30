<?php

/**
 *
 * StockageContactsEtrangers est la classe fournissant l'accès aux contacts étrangers de la base de données Plateforme.
 * Elle hérite de StockageContacts.
 *
 * @version 1.0
 * @author Pierre-Nicolas
 */
class StockageContactsEtrangers extends StockageContacts  {

	/**
	 * Constructeur StockageContactsEtrangers prenant en paramètre le dataSourceName, le nom d'utilisateur et le mot de passe de la base de données.
	 * @param string $dataSourceName Le dataSourceName de la base de données.
	 * @param string $username Le nom d'utilisateur de la base de données.
	 * @param string $password Le mot de passe de la base de données.
	 * @throws ExceptionBaseDeDonneesPlateforme L'exception du service de base de données.
	 */
	public function __construct(string $dataSourceName, string $username, string $password) {
		parent::__construct($dataSourceName, $username, $password);
	}

	/**
	 * Ajouter un contact étranger.
	 * @param ContactEtranger $contactEtranger Le contact étranger à ajouter.
	 */
	public function ajouterContactEtranger(ContactEtranger $contactEtranger): void {
		$this->ajouterContact($contactEtranger, false);
	}

	/**
	 * Supprimer un contact étranger.
	 * @param ContactEtranger $contactEtranger Le contact étranger à supprimer.
	 */
	public function supprimerContactEtranger(ContactEtranger $contactEtranger): void {
		$this->supprimerContact($contactEtranger);
	}

	/**
	 * Modifier un contact étranger.
	 * @param ContactEtranger $contactEtranger Le contact étranger à modifier.
	 */
	public function modifierContactEtranger(ContactEtranger $contactEtranger): void {
		$this->modifierContact($contactEtranger);
	}

	/**
	 * Retourner la liste des contacts étrangers.
	 * @return array La liste des contacts étrangers.
	 */
	public function chargerListeContactsEtrangers(): array {
		return $this->chargerListeContactsContactsEtrangers();
	}

}