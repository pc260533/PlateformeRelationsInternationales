<?php

/**
 * Partenaire short summary.
 *
 * Partenaire description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class Partenaire implements ISerializable {
	private $identifiantPartenaire;
    private $nomPartenaire;
    private $domaineDeCompetencePartenaire;
    private $localisationPartenaire;
    private $listeSpecialitesPartenaire;
    private $listeMobilitesPartenaire;
    private $listeContactsPartenaire;
    private $listeAidesFinancieresPartenaire;
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

	public function getListeMobilitesPartenaire(): array {
		return $this->listeMobilitesPartenaire;
	}

	public function setListeMobilitesPartenaire(array $listeMobilitesPartenaire): void {
        $this->listeMobilitesPartenaire = $listeMobilitesPartenaire;
    }

	public function getListeContactsPartenaire(): array {
		return $this->listeContactsPartenaire;
	}

	public function setListeContactsPartenaire(array $listeContactsPartenaire): void {
        $this->listeContactsPartenaire = $listeContactsPartenaire;
    }

	public function getListeAidesFinancieresPartenaire(): array {
		return $this->listeAidesFinancieresPartenaire;
	}

	public function setListeAidesFinancieresPartenaire(array $listeAidesFinancieresPartenaire): void {
        $this->listeAidesFinancieresPartenaire = $listeAidesFinancieresPartenaire;
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

	private function getListeSpecialitesSerializable() : array {
		$res = array();
		foreach ($this->listeSpecialitesPartenaire as $specialite) {
			$res[] = $specialite->getObjetSerializable();
		}
		return $res;
	}

	private function getListeMobilitesSerializable() : array {
		$res = array();
		foreach ($this->listeMobilitesPartenaire as $mobilite) {
			$res[] = $mobilite->getObjetSerializable();
		}
		return $res;
	}

	private function getListeContactsSerializable() : array {
		$res = array();
		foreach ($this->listeContactsPartenaire as $contact) {
			$res[] = $contact->getObjetSerializable();
		}
		return $res;
	}

	private function getListeAidesFinancieresSerializable() : array {
		$res = array();
		foreach ($this->listeAidesFinancieresPartenaire as $aideFinanciere) {
			$res[] = $aideFinanciere->getObjetSerializable();
		}
		return $res;
	}

	public function __construct() {
		$this->identifiantPartenaire = 0;
		$this->nomPartenaire = "";
		$this->domaineDeCompetencePartenaire = "";
		$this->localisationPartenaire = null;
		$this->listeSpecialitesPartenaire = array();
		$this->listeMobilitesPartenaire = array();
		$this->listeContactsPartenaire = array();
		$this->listeAidesFinancieresPartenaire = array();
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
		$this->listeMobilitesPartenaire[] = $mobilite;
	}

	public function supprimerMobilite(Mobilite $mobilite) {
		if (($key = array_search($mobilite, $this->listeMobilitesPartenaire)) !== false) {
			unset($this->listeMobilitesPartenaire[$key]);
		}
	}

	public function ajouterContact(Contact $contact) {
		$this->listeContactsPartenaire[] = $contact;
	}

	public function supprimerContact(Contact $contact) {
		if (($key = array_search($contact, $this->listeContactsPartenaire)) !== false) {
			unset($this->listeContactsPartenaire[$key]);
		}
	}

	public function ajouterAideFinanciere(AideFinanciere $aideFinanciere) {
		$this->listeAidesFinancieresPartenaire[] = $aideFinanciere;
	}

	public function supprimerAideFinanciere(AideFinanciere $aideFinanciere) {
		if (($key = array_search($aideFinanciere, $this->listeAidesFinancieresPartenaire)) !== false) {
			unset($this->listeAidesFinancieresPartenaire[$key]);
		}
	}

	#region ISerializable Members

	/**
	 *
	 * @return array
	 */
	public function getObjetSerializable(): array {
		return array(
			"identifiantPartenaire" => $this->getIdentifiantPartenaire(),
            "nomPartenaire" => $this->getNomPartenaire(),
            "domaineDeCompetencePartenaire" => $this->getDomaineDeCompetencePartenaire(),
            "localisationPartenaire" => $this->getLocalisationPartenaire()->getObjetSerializable(),
            "listeSpecialitesPartenaire" => $this->getListeSpecialitesSerializable(),
            "listeMobilitesPartenaire" => $this->getListeMobilitesSerializable(),
            "listeContactsPartenaire" => $this->getListeContactsSerializable(),
            "listeAidesFinancieresPartenaire" => $this->getListeAidesFinancieresSerializable(),
            "informationLogementPartenaire" => $this->getInformationLogementPartenaire(),
            "informationCoutPartenaire" => $this->getInformationCoutPartenaire()
        );
	}

	#endregion

}