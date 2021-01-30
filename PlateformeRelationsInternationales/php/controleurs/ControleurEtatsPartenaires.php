<?php

/**
 *
 * ControleurEtatsPartenaires est la classe représentant un controleur d'états partenaire.
 * Elle implémente l'interface IControleurPlateforme.
 *
 * @version 1.0
 * @author Pierre-Nicolas
 */
class ControleurEtatsPartenaires implements IControleurPlateforme {
	/**
	 * Le stockage des états partenaires.
	 * @var StockageEtatsPartenaires
	 */
	private $stockageEtatsPartenaires;

	/**
	 * Créer un état partenaire à partir d'un tableau.
	 * @param array $etatPartenaireArray  Le tableau représentant un état partenaire.
	 * @return EtatPartenaire L'état partenaire créé.
	 */
	private function creerEtatPartenaire(array $etatPartenaireArray): EtatPartenaire {
		$etatPartenaire = new EtatPartenaire();
		if (isset($etatPartenaireArray["identifiantEtatPartenaire"])) {
			$etatPartenaire->setIdentifiantEtatPartenaire($etatPartenaireArray["identifiantEtatPartenaire"]);
		}
		if (isset($etatPartenaireArray["nomEtatPartenaire"])) {
			$etatPartenaire->setNomEtatPartenaire($etatPartenaireArray["nomEtatPartenaire"]);
		}
		return $etatPartenaire;
	}

	/**
	 * Constructeur ControleurEtatsPartenaires sans paramètres.
	 */
	public function __construct() {
		$this->stockageEtatsPartenaires = new StockageEtatsPartenaires(getVariableEnvironnement("DATASOURCENAME_BASEDEDONNEEPLATEFORME"), getVariableEnvironnement("USERNAME_BASEDEDONNEE"), getVariableEnvironnement("PASSWORD_BASEDEDONNEE"));
	}

	/**
	 * Ajouter un état partenaire.
	 * @param array $etatPartenaireArray Le tableau représentnant un état partenaire.
	 * @return EtatPartenaire L'état partenaire ajouté.
	 */
	public function ajouterEtatPartenaire(array $etatPartenaireArray): EtatPartenaire {
		$etatPartenaire = $this->creerEtatPartenaire($etatPartenaireArray);
		$this->stockageEtatsPartenaires->ajouterEtatPartenaire($etatPartenaire);
		return $etatPartenaire;
	}

	/**
	 * Supprimer un état partenaire.
	 * @param array $etatPartenaireArray Le tableau représentnant un état partenaire.
	 * @return EtatPartenaire L'état partenaire supprimé.
	 */
	public function supprimerEtatPartenaire(array $etatPartenaireArray): EtatPartenaire {
		$etatPartenaire = $this->creerEtatPartenaire($etatPartenaireArray);
		$this->stockageEtatsPartenaires->supprimerEtatPartenaire($etatPartenaire);
		return $etatPartenaire;
	}

	/**
	 * Modifier un état partenaire.
	 * @param array $etatPartenaireArray Le tableau représentnant un état partenaire.
	 * @return EtatPartenaire L'état partenaire modifié.
	 */
	public function modifierEtatPartenaire(array $etatPartenaireArray): EtatPartenaire {
		$etatPartenaire = $this->creerEtatPartenaire($etatPartenaireArray);
		$this->stockageEtatsPartenaires->modifierEtatPartenaire($etatPartenaire);
		return $etatPartenaire;
	}

	/**
	 * Retourner la liste des états partenaires.
	 * @return array La liste des états partenaires.
	 */
	public function chargerListeEtatsPartenaires(): array {
		return $this->stockageEtatsPartenaires->chargerListeEtatsPartenaires();
	}
}