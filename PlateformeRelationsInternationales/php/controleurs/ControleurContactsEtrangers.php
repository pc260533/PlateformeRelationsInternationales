<?php

/**
 *
 * ControleurContactsEtrangers est la classe représentant un controleur de contacts étrangers.
 * Elle implémente l'interface IControleurPlateforme.
 *
 * @version 1.0
 * @author Pierre-Nicolas
 */
class ControleurContactsEtrangers implements IControleurPlateforme {
	/**
	 * Le stockage de contacts étrangers.
	 * @var StockageContactsEtrangers
	 */
	private $stockageContactsEtrangers;

	/**
	 * Créer un contact étranger à partir d'un tableau.
	 * @param array $contactEtrangerArray Le tablea représentant le contact étranger.
	 * @return ContactEtranger Le contact étranger créé.
	 */
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

	/**
	 * Constructeur ControleurContactsEtrangers sans paramètres.
	 */
	public function __construct() {
		$this->stockageContactsEtrangers = new StockageContactsEtrangers(getVariableEnvironnement("DATASOURCENAME_BASEDEDONNEEPLATEFORME"), getVariableEnvironnement("USERNAME_BASEDEDONNEE"), getVariableEnvironnement("PASSWORD_BASEDEDONNEE"));
	}

	/**
	 * Ajouter un contact étranger.
	 * @param array $contactEtrangerArray Le tableau représentant le contact étranger.
	 * @return ContactEtranger Le contatc étranger ajouté.
	 */
	public function ajouterContactEtrange(array $contactEtrangerArray): ContactEtranger {
		$contactEtranger = $this->creerContactEtranger($contactEtrangerArray);
		$this->stockageContactsEtrangers->ajouterContactEtranger($contactEtranger);
		return $contactEtranger;
	}

	/**
	 * Supprimer un contact étranger.
	 * @param array $contactEtrangerArray Le tableau représentant le contact étranger.
	 * @return ContactEtranger Le contatc étranger supprimé.
	 */
	public function supprimerContactEtrange(array $contactEtrangerArray): ContactEtranger {
		$contactEtranger = $this->creerContactEtranger($contactEtrangerArray);
		$this->stockageContactsEtrangers->supprimerContactEtranger($contactEtranger);
		return $contactEtranger;
	}

	/**
	 * Modifier un contact étranger.
	 * @param array $contactEtrangerArray Le tableau représentant le contact étranger.
	 * @return ContactEtranger Le contatc étranger modifié.
	 */
	public function modifierContactEtrange(array $contactEtrangerArray): ContactEtranger {
		$contactEtranger = $this->creerContactEtranger($contactEtrangerArray);
		$this->stockageContactsEtrangers->modifierContactEtranger($contactEtranger);
		return $contactEtranger;
	}

	/**
	 * Retourner la liste des contacts étrangers.
	 * @return array La liste des contacts étrangers.
	 */
	public function chargerListeContactsEtrangers(): array {
		return $this->stockageContactsEtrangers->chargerListeContactsEtrangers();
	}
}