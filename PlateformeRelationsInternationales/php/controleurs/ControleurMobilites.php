<?php

/**
 *
 * ControleurMobilites est la classe représentant un controleur de mobilités.
 * Elle implémente l'interface IControleurPlateforme.
 *
 * @version 1.0
 * @author Pierre-Nicolas
 */
class ControleurMobilites implements IControleurPlateforme {
	/**
	 * Le stockage de mobilités.
	 * @var StockageMobilites
	 */
	private $stockageMobilites;

	/**
	 * Créer une mobilité à partir d'un tableau.
	 * @param array $mobiliteArray Le tableau représentant une mobilité.
	 * @return Mobilite La mobilité créée.
	 */
	private function creerMobilite(array $mobiliteArray): Mobilite {
		$mobilite = new Mobilite();
		if (isset($mobiliteArray["identifiantMobilite"])) {
			$mobilite->setIdentifiantMobilite($mobiliteArray["identifiantMobilite"]);
		}
		if (isset($mobiliteArray["typeMobilite"])) {
			$mobilite->setTypeMobilite($mobiliteArray["typeMobilite"]);
		}
		return $mobilite;
	}

	/**
	 * Constructeur ControleurMobilites sans paramètres.
	 */
	public function __construct() {
		$this->stockageMobilites = new StockageMobilites(getVariableEnvironnement("DATASOURCENAME_BASEDEDONNEEPLATEFORME"), getVariableEnvironnement("USERNAME_BASEDEDONNEE"), getVariableEnvironnement("PASSWORD_BASEDEDONNEE"));
	}

	/**
	 * Ajouter une mobilité.
	 * @param array $mobiliteArray Le tableau représentant une mobilité.
	 * @return Mobilite La mobilité ajouté.
	 */
	public function ajouterMobilite(array $mobiliteArray): Mobilite {
		$mobilite = $this->creerMobilite($mobiliteArray);
		$this->stockageMobilites->ajouterMobilite($mobilite);
		return $mobilite;
	}

	/**
	 * Supprimer une mobilité.
	 * @param array $mobiliteArray Le tableau représentant une mobilité.
	 * @return Mobilite La mobilité supprimé.
	 */
	public function supprimerMobilite(array $mobiliteArray): Mobilite {
		$mobilite = $this->creerMobilite($mobiliteArray);
		$this->stockageMobilites->supprimerMobilite($mobilite);
		return $mobilite;
	}

	/**
	 * Modifier une mobilité.
	 * @param array $mobiliteArray Le tableau représentant une mobilité.
	 * @return Mobilite La mobilité modifié.
	 */
	public function modifierMobilite(array $mobiliteArray): Mobilite {
		$mobilite = $this->creerMobilite($mobiliteArray);
		$this->stockageMobilites->modifierMobilite($mobilite);
		return $mobilite;
	}

	/**
	 * Retourner la liste des mobilités.
	 * @return array La liste des mobilités.
	 */
	public function chargerListeMobilites(): array {
		return  $this->stockageMobilites->chargerListeMobilites();
	}
}