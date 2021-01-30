<?php

/**
 *
 * ControleurDomainesDeCompetences est la classe représentant un controleur de domaines de competences.
 * Elle implémente l'interface IControleurPlateforme.
 *
 * @version 1.0
 * @author Pierre-Nicolas
 */
class ControleurDomainesDeCompetences implements IControleurPlateforme {
	/**
	 * Le stockage de domaines de compétences.
	 * @var StockageDomainesDeCompetences
	 */
	private $stockageDomainesDeCompetences;

	/**
	 * Créer un domaine de compétence à partir d'un tableau.
	 * @param array $domaineDeCompetenceArray Le tableau représentant un domaine de compétence.
	 * @return DomaineDeCompetence Le domaine de compétence créé.
	 */
	private function creerDomaineDeCompetence(array $domaineDeCompetenceArray): DomaineDeCompetence {
		$domaineDeCompetence = new DomaineDeCompetence();
		if (isset($domaineDeCompetenceArray["identifiantDomaineDeCompetence"])) {
			$domaineDeCompetence->setIdentifiantDomaineDeCompetence($domaineDeCompetenceArray["identifiantDomaineDeCompetence"]);
		}
		if (isset($domaineDeCompetenceArray["nomDomaineDeCompetence"])) {
			$domaineDeCompetence->setNomDomaineDeCompetence($domaineDeCompetenceArray["nomDomaineDeCompetence"]);
		}
		return $domaineDeCompetence;
	}

	/**
	 * Constructeur ControleurDomainesDeCompetences sans paramètres.
	 */
	public function __construct() {
		$this->stockageDomainesDeCompetences = new StockageDomainesDeCompetences(getVariableEnvironnement("DATASOURCENAME_BASEDEDONNEEPLATEFORME"), getVariableEnvironnement("USERNAME_BASEDEDONNEE"), getVariableEnvironnement("PASSWORD_BASEDEDONNEE"));
	}

	/**
	 * Ajouter un domaine de compétence.
	 * @param array $domaineDeCompetenceArray Le tableau représentant un doamine de compétence.
	 * @return DomaineDeCompetence Le domaine de compétence ajouté.
	 */
	public function ajouterDomaineDeCompetence(array $domaineDeCompetenceArray): DomaineDeCompetence {
		$domaineDeCompetence = $this->creerDomaineDeCompetence($domaineDeCompetenceArray);
		$this->stockageDomainesDeCompetences->ajouterDomaineDeCompetence($domaineDeCompetence);
		return $domaineDeCompetence;
	}

	/**
	 * Supprimer un domaine de compétence.
	 * @param array $domaineDeCompetenceArray Le tableau représentant un doamine de compétence.
	 * @return DomaineDeCompetence Le domaine de compétence supprimé.
	 */
	public function supprimerDomaineDeCompetence(array $domaineDeCompetenceArray): DomaineDeCompetence {
		$domaineDeCompetence = $this->creerDomaineDeCompetence($domaineDeCompetenceArray);
		$this->stockageDomainesDeCompetences->supprimerDomaineDeCompetence($domaineDeCompetence);
		return $domaineDeCompetence;
	}

	/**
	 * Modifier un domaine de compétence.
	 * @param array $domaineDeCompetenceArray Le tableau représentant un doamine de compétence.
	 * @return DomaineDeCompetence Le domaine de compétence modifié.
	 */
	public function modifierDomaineDeCompetence(array $domaineDeCompetenceArray): DomaineDeCompetence {
		$domaineDeCompetence = $this->creerDomaineDeCompetence($domaineDeCompetenceArray);
		$this->stockageDomainesDeCompetences->modifierDomaineDeCompetence($domaineDeCompetence);
		return $domaineDeCompetence;
	}

	/**
	 * Retourner la liste des domaines de compétences.
	 * @return array La liste des domaines de compétences.
	 */
	public function chargerListeDomainesDeCompetences(): array {
		return  $this->stockageDomainesDeCompetences->chargerListeDomainesDeCompetences();
	}

}