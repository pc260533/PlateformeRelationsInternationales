<?php

/**
 * ControleurEtatsPartenaires short summary.
 *
 * ControleurEtatsPartenaires description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class ControleurEtatsPartenaires implements IControleurPlateforme {
	private $stockageEtatsPartenaires;

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

	public function __construct() {
		$this->stockageEtatsPartenaires = new StockageEtatsPartenaires(getVariableEnvironnement("DATASOURCENAME_BASEDEDONNEEPLATEFORME"), getVariableEnvironnement("USERNAME_BASEDEDONNEE"), getVariableEnvironnement("PASSWORD_BASEDEDONNEE"));
	}

	public function ajouterEtatPartenaire(array $etatPartenaireArray): EtatPartenaire {
		$etatPartenaire = $this->creerEtatPartenaire($etatPartenaireArray);
		$this->stockageEtatsPartenaires->ajouterEtatPartenaire($etatPartenaire);
		return $etatPartenaire;
	}

	public function supprimerEtatPartenaire(array $etatPartenaireArray): EtatPartenaire {
		$etatPartenaire = $this->creerEtatPartenaire($etatPartenaireArray);
		$this->stockageEtatsPartenaires->supprimerEtatPartenaire($etatPartenaire);
		return $etatPartenaire;
	}

	public function modifierEtatPartenaire(array $etatPartenaireArray): EtatPartenaire {
		$etatPartenaire = $this->creerEtatPartenaire($etatPartenaireArray);
		$this->stockageEtatsPartenaires->modifierEtatPartenaire($etatPartenaire);
		return $etatPartenaire;
	}

	public function chargerListeEtatsPartenaires(): array {
		return $this->stockageEtatsPartenaires->chargerListeEtatsPartenaires();
	}
}