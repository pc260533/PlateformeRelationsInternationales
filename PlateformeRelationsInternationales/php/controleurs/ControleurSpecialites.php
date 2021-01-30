<?php

/**
 *
 * ControleurSpecialites est la classe représentant un controleur de spécialités.
 * Elle implémente l'interface IControleurPlateforme.
 *
 * @version 1.0
 * @author Pierre-Nicolas
 */
class ControleurSpecialites implements IControleurPlateforme {
	/**
	 * Le stockage de spécialités.
	 * @var StockageSpecialites
	 */
	private $stockageSpecialites;

	/**
	 * Créer une spécialité à partir d'un tableau.
	 * @param array $specialiteArray Le tableau représentant une spécialité.
	 * @return Specialite La spécialité créée.
	 */
	private function creerSpecialite(array $specialiteArray): Specialite {
		$specialite = new Specialite();
		if (isset($specialiteArray["identifiantSpecialite"])) {
			$specialite->setIdentifiantSpecialite($specialiteArray["identifiantSpecialite"]);
		}
		if (isset($specialiteArray["nomSpecialite"])) {
			$specialite->setNomSpecialite($specialiteArray["nomSpecialite"]);
		}
		if (isset($specialiteArray["couleurSpecialite"])) {
			$specialite->setCouleurSpecialite($specialiteArray["couleurSpecialite"]);
		}
		if (isset($specialiteArray["listeSousSpecialites"])) {
			foreach ($specialiteArray["listeDomainesDeCompetencesPartenaire"] as $sousSpecialiteArray) {
				$specialite->ajouterSousSpecialite($this->creerSousSpecialite($sousSpecialiteArray));
			}
		}
		return $specialite;
	}

	/**
	 * Créer une sous spécialité à partir d'un tableau.
	 * @param array $sousSpecialiteArray Le tableau représentant la sous spécialité.
	 * @return SousSpecialite La sous spécialité créée.
	 */
	private function creerSousSpecialite(array $sousSpecialiteArray): SousSpecialite {
		$sousSpecialite = new SousSpecialite();
		if (isset($sousSpecialiteArray["identifiantSousSpecialite"])) {
			$sousSpecialite->setIdentifiantSousSpecialite($sousSpecialiteArray["identifiantSousSpecialite"]);
		}
		if (isset($sousSpecialiteArray["nomSousSpecialite"])) {
			$sousSpecialite->setNomSousSpecialite($sousSpecialiteArray["nomSousSpecialite"]);
		}
		return $sousSpecialite;
	}

	/**
	 * Constructeur ControleurSpecialites sans paramètres.
	 */
	public function __construct() {
		$this->stockageSpecialites = new StockageSpecialites(getVariableEnvironnement("DATASOURCENAME_BASEDEDONNEEPLATEFORME"), getVariableEnvironnement("USERNAME_BASEDEDONNEE"), getVariableEnvironnement("PASSWORD_BASEDEDONNEE"));
	}

	/**
	 * Ajouter une spécialité.
	 * @param array $specialiteArray Le tableau représentant une spécialité.
	 * @return Specialite La spécialité ajoutée.
	 */
	public function ajouterSpecialite(array $specialiteArray): Specialite {
		$specialite = $this->creerSpecialite($specialiteArray);
		$this->stockageSpecialites->ajouterSpecialite($specialite);
		return $specialite;
	}

	/**
	 * Supprimer une spécialité.
	 * @param array $specialiteArray Le tableau représentant une spécialité.
	 * @return Specialite La spécialité supprimée.
	 */
	public function supprimerSpecialite(array $specialiteArray): Specialite {
		$specialite = $this->creerSpecialite($specialiteArray);
		$this->stockageSpecialites->supprimerSpecialite($specialite);
		return $specialite;
	}

	/**
	 * Modifier une spécialité.
	 * @param array $specialiteArray Le tableau représentant une spécialité.
	 * @return Specialite La spécialité modifiée.
	 */
	public function modifierSpecialite(array $specialiteArray): Specialite {
		$specialite = $this->creerSpecialite($specialiteArray);
		$this->stockageSpecialites->modifierSpecialite($specialite);
		return $specialite;
	}

	/**
	 * Ajouter une sous spécialité dans une spécialité.
	 * @param array $specialite Le tableau repésentant une spécialité.
	 * @param array $sousSpecialiteArray Le tableau repésentant une sous spécialité.
	 * @return SousSpecialite La sous spécialité ajoutée.
	 */
	public function ajouterSousSpecialite(array $specialite, array $sousSpecialiteArray): SousSpecialite {
		$specialite = $this->creerSpecialite($specialite);
		$sousSpecialite = $this->creerSousSpecialite($sousSpecialiteArray);
		$this->stockageSpecialites->ajouterSousSpecialite($specialite, $sousSpecialite);
		return $sousSpecialite;
	}

	/**
	 * Supprimer une sous spécialité.
	 * @param array $sousSpecialiteArray Le tableau représentant une sous spécialité.
	 * @return SousSpecialite La sous spécialité supprimée.
	 */
	public function supprimerSousSpecialite(array $sousSpecialiteArray): SousSpecialite {
		$sousSpecialite = $this->creerSousSpecialite($sousSpecialiteArray);
		$this->stockageSpecialites->supprimerSousSpecialite($sousSpecialite);
		return $sousSpecialite;
	}

	/**
	 * Supprimer une sous spécialité dans une spécialité.
	 * @param array $specialite Le tableau repésentant une spécialité.
	 * @param array $sousSpecialiteArray Le tableau repésentant une sous spécialité.
	 * @return SousSpecialite La sous spécialité supprimée.
	 */
	public function modifierSousSpecialite(array $specialite, array $sousSpecialiteArray): SousSpecialite {
		$specialite = $this->creerSpecialite($specialite);
		$sousSpecialite = $this->creerSousSpecialite($sousSpecialiteArray);
		$this->stockageSpecialites->modifierSousSpecialite($specialite, $sousSpecialite);
		return $sousSpecialite;
	}

	/**
	 * Retourner la liste des spécialités et des sous spécialités.
	 * @return array La liste des spécialités et des sous spécialités.
	 */
	public function chargerListeSpecialites(): array {
		return $this->stockageSpecialites->chargerListeSpecialites();
	}
}