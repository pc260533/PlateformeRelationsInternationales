<?php

/**
 * Partenaire short summary.
 *
 * Partenaire description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class Partenaire {
	private $identifiantPartenaire;
    private $nomPartenaire;
    private $domaineDeCompetencePartenaire;
    private $localisationPartenaire;
    private $listeSpecialitesPartenaire;
    private $listeMobilitesPartenaires;
    private $listeContactsPartenaires;
    private $listeAidesFinancieresPartenaires;
    private $informationLogementPartenaire;
    private $informationCoutPartenaire;

	public function getIdentifiantPartenaire(): int {
		return $this->identifiantPartenaire;
	}

	public function setIdentifiantPartenaire(int $identifiantPartenaire): void {
        $this->identifiantPartenaire = $identifiantPartenaire;
    }

	public function getNomPartenaire(): string {
		return $this->nomPartenaire;
	}

	public function setNomPartenaire(string $nomPartenaire): void {
        $this->nomPartenaire = $nomPartenaire;
    }

	public function getDomaineDeCompetencePartenaire(): string {
		return $this->domaineDeCompetencePartenaire;
	}

	public function setDomaineDeCompetence(string $domaineDeCompetencePartenaire): void {
        $this->domaineDeCompetencePartenaire = $domaineDeCompetencePartenaire;
    }

	public function getLocalisationPartenaire(): Localisation {
		return $this->localisationPartenaire;
	}

	public function setLocalisationPartenaire(Localisation $localisationPartenaire): void {
        $this->localisationPartenaire = $localisationPartenaire;
    }

	public function getListeSpecialitesPartenaire(): array {
		return $this->listeSpecialitesPartenaire;
	}

	public function setListeSpecialitesPartenaire(array $listeSpecialitesPartenaire): void {
        $this->listeSpecialitesPartenaire = $listeSpecialitesPartenaire;
    }

	public function getListeMobilitesPartenaires(): array {
		return $this->listeMobilitesPartenaires;
	}

	public function setListeMobilitesPartenaires(array $listeMobilitesPartenaires): void {
        $this->listeMobilitesPartenaires = $listeMobilitesPartenaires;
    }

	public function getListeContactsPartenaires(): array {
		return $this->listeContactsPartenaires;
	}

	public function setListeContactsPartenaires(array $listeContactsPartenaires): void {
        $this->listeContactsPartenaires = $listeContactsPartenaires;
    }

	public function getLlisteAidesFinancieresPartenaires(): array {
		return $this->listeAidesFinancieresPartenaires;
	}

	public function setListeAidesFinancieresPartenaires(array $listeAidesFinancieresPartenaires): void {
        $this->listeAidesFinancieresPartenaires = $listeAidesFinancieresPartenaires;
    }

	public function getInformationLogementPartenaire(): string {
		return $this->informationLogementPartenaire;
	}

	public function setInformationLogementPartenaire(string $informationLogementPartenaire): void {
        $this->informationLogementPartenaire = $informationLogementPartenaire;
    }

	public function getInformationCoutPartenaire(): string {
		return $this->informationCoutPartenaire;
	}

	public function setInformationCoutPartenaire(string $informationCoutPartenaire): void {
        $this->informationCoutPartenaire = $informationCoutPartenaire;
    }

	public function __construct() {
		$this->identifiantNomSpecialite = 0;
		$this->nomPartenaire = "";
		$this->domaineDeCompetencePartenaire = "";
		$this->localisationPartenaire = null;
		$this->listeSpecialitesPartenaire = array();
		$this->listeMobilitesPartenaires = array();
		$this->listeContactsPartenaires = array();
		$this->listeAidesFinancieresPartenaires = array();
		$this->informationLogementPartenaire = "";
		$this->informationCoutPartenaire = "";
	}

	public function ajouterSpecialite(Specialite $specialite) {
		$this->listeSpecialitesPartenaire[] = $specialite;
	}

	public function supprimerSpecialite(Specialite $specialite) {
		if (($key = array_search($specialite, $this->listeSpecialitesPartenaire)) !== false) {
			unset($this->listeSpecialitesPartenaire[$key]);
		}
	}

	public function ajouterMobilite(Mobilite $mobilite) {
		$this->listeMobilitesPartenaires[] = $mobilite;
	}

	public function supprimerMobilite(Mobilite $mobilite) {
		if (($key = array_search($mobilite, $this->listeMobilitesPartenaires)) !== false) {
			unset($this->listeMobilitesPartenaires[$key]);
		}
	}

	public function ajouterContact(Contact $contact) {
		$this->listeContactsPartenaires[] = $contact;
	}

	public function supprimerContact(Contact $contact) {
		if (($key = array_search($contact, $this->listeContactsPartenaires)) !== false) {
			unset($this->listeContactsPartenaires[$key]);
		}
	}

	public function ajouterAideFinanciere(AideFinanciere $aideFinanciere) {
		$this->listeAidesFinancieresPartenaires[] = $aideFinanciere;
	}

	public function supprimerAideFinanciere(AideFinanciere $aideFinanciere) {
		if (($key = array_search($aideFinanciere, $this->listeAidesFinancieresPartenaires)) !== false) {
			unset($this->listeAidesFinancieresPartenaires[$key]);
		}
	}

}