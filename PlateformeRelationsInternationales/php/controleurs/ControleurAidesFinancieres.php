<?php

/**
 *
 * ControleurAidesFinancieres est la classe représentant un controleur d'aides financières.
 * Elle implémente l'interface IControleurPlateforme.
 *
 * @version 1.0
 * @author Pierre-Nicolas
 */
class ControleurAidesFinancieres implements IControleurPlateforme {
	/**
	 * Le stockage d'aides financières associés.
	 * @var StockageAidesFinancieres
	 */
	private $stockageAidesFinancieres;

	/**
	 * Créer une aide financière à partir d'un tableau.
	 * @param array $aideFinanciereArray Le tableau représentant l'aide financière.
	 * @return AideFinanciere L'aide financière créée.
	 */
	private function creerAideFinanciere(array $aideFinanciereArray): AideFinanciere {
		$aideFinanciere = new AideFinanciere();
		if (isset($aideFinanciereArray["identifiantAideFinanciere"])) {
			$aideFinanciere->setIdentifiantAideFinanciere($aideFinanciereArray["identifiantAideFinanciere"]);
		}
		if (isset($aideFinanciereArray["nomAideFinanciere"])) {
			$aideFinanciere->setNomAideFinanciere($aideFinanciereArray["nomAideFinanciere"]);
		}
		if (isset($aideFinanciereArray["descriptionAideFinanciere"])) {
			$aideFinanciere->setDescriptionAideFinanciere($aideFinanciereArray["descriptionAideFinanciere"]);
		}
		if (isset($aideFinanciereArray["lienAideFinanciere"])) {
			$aideFinanciere->setLienAideFinanciere($aideFinanciereArray["lienAideFinanciere"]);
		}
		return $aideFinanciere;
	}

	/**
	 * Constructeur AideFinanciere sans paramètres.
	 */
	public function __construct() {
		$this->stockageAidesFinancieres = new StockageAidesFinancieres(getVariableEnvironnement("DATASOURCENAME_BASEDEDONNEEPLATEFORME"), getVariableEnvironnement("USERNAME_BASEDEDONNEE"), getVariableEnvironnement("PASSWORD_BASEDEDONNEE"));
	}

	/**
	 * Ajouter une aide financière.
	 * @param array $aideFinanciereArray Le tableau représentant l'aide financière.
	 * @return AideFinanciere L'aide financière ajoutée.
	 */
	public function ajouterAideFinanciere(array $aideFinanciereArray): AideFinanciere {
		$aideFinanciere = $this->creerAideFinanciere($aideFinanciereArray);
		$this->stockageAidesFinancieres->ajouterAideFinanciere($aideFinanciere);
		return $aideFinanciere;
	}

	/**
	 * Supprimer une aide financière.
	 * @param array $aideFinanciereArray Le tableau représentant l'aide financière.
	 * @return AideFinanciere L'aide financière supprimée.
	 */
	public function supprimerAideFinanciere(array $aideFinanciereArray): AideFinanciere {
		$aideFinanciere = $this->creerAideFinanciere($aideFinanciereArray);
		$this->stockageAidesFinancieres->supprimerAideFinanciere($aideFinanciere);
		return $aideFinanciere;
	}

	/**
	 * Modifier une aide financière.
	 * @param array $aideFinanciereArray Le tableau représentant l'aide financière.
	 * @return AideFinanciere L'aide financière modifiée.
	 */
	public function modifierAideFinanciere(array $aideFinanciereArray): AideFinanciere {
		$aideFinanciere = $this->creerAideFinanciere($aideFinanciereArray);
		$this->stockageAidesFinancieres->modifierAideFinanciere($aideFinanciere);
		return $aideFinanciere;
	}

	/**
	 * Retourner la liste des aides financières.
	 * @return array La liste des aides financières.
	 */
	public function chargerListeAidesFinancieres(): array {
		return $this->stockageAidesFinancieres->chargerListeAidesFinancieres();
	}

}