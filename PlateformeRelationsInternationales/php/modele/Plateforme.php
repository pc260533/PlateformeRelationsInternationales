<?php

/**
 * Plateforme short summary.
 *
 * Plateforme description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class Plateforme {
	private $listePartenairesPlateforme;
    private $listeAidesFinancieresPlateforme;
    private $listeContactsPlateforme;

	public function getListePartenairesPlateforme(): array {
        return $this->listePartenairesPlateforme;
    }

	public function getListeAidesFinancieresPlateforme(): array {
        return $this->listeAidesFinancieresPlateforme;
    }

	public function getListeContactsPlateforme(): array {
        return $this->listeContactsPlateforme;
    }

	public function __construct() {
		$this->listePartenairesPlateforme = array();
		$this->listeAidesFinancieresPlateforme = array();
		$this->listeContactsPlateforme = array();
	}

	public function ajouterPartenaire(Partenaire $partenaire) {
		$this->listePartenairesPlateforme[] = $partenaire;
	}

	public function supprimerSpecialite(Partenaire $partenaire) {
		if (($key = array_search($partenaire, $this->listePartenairesPlateforme)) !== false) {
			unset($this->listePartenairesPlateforme[$key]);
		}
	}

	public function ajouterAideFinanciere(AideFinanciere $aideFinanciere) {
		$this->listeAidesFinancieresPlateforme[] = $aideFinanciere;
	}

	public function supprimerAideFinanciere(AideFinanciere $aideFinanciere) {
		if (($key = array_search($aideFinanciere, $this->listeAidesFinancieresPlateforme)) !== false) {
			unset($this->listeAidesFinancieresPlateforme[$key]);
		}
	}

	public function ajouterContact(Contact $contact) {
		$this->listeContactsPlateforme[] = $contact;
	}

	public function supprimerContact(Contact $contact) {
		if (($key = array_search($contact, $this->listeContactsPlateforme)) !== false) {
			unset($this->listeContactsPlateforme[$key]);
		}
	}

}