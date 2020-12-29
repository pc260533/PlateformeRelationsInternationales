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
	private $lienPartenaire;
	private $informationLogementPartenaire;
    private $informationCoutPartenaire;
    private $localisationPartenaire;
	private $coutPartenaire;
    private $etatPartenaire;
    private $listeDomainesDeCompetencesPartenaire;
    private $listeSousSpecialitesPartenaire;
    private $listeMobilitesPartenaire;
	private $listeAidesFinancieresPartenaire;
    private $listeContactsPartenaire;
    private $listeVoeuxPartenaire;
	private $listeImagesPartenaire;

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

	public function getLienPartenaire(): string {
		return $this->lienPartenaire;
	}

	public function setLienPartenaire(string $lienPartenaire): void {
        $this->lienPartenaire = $lienPartenaire;
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

	public function getLocalisationPartenaire(): Localisation {
		return $this->localisationPartenaire;
	}

	public function setLocalisationPartenaire(Localisation $localisationPartenaire): void {
        $this->localisationPartenaire = $localisationPartenaire;
    }

	public function getCoutPartenaire(): Cout {
		return $this->coutPartenaire;
	}

	public function setCoutPartenaire(Cout $coutPartenaire): void {
        $this->coutPartenaire = $coutPartenaire;
    }

	public function getEtatPartenaire(): EtatPartenaire {
		return $this->etatPartenaire;
	}

	public function setEtatPartenaire(EtatPartenaire $etatPartenaire): void {
        $this->etatPartenaire = $etatPartenaire;
    }

	public function getListeDomainesDeComeptencesPartenaire(): array {
		return $this->listeDomainesDeCompetencesPartenaire;
	}

	public function setListeDomainesDeComeptencesPartenaire(array $listeDomainesDeCompetencesPartenaire): void {
        $this->listeDomainesDeCompetencesPartenaire = $listeDomainesDeCompetencesPartenaire;
    }

	public function getListeSousSpecialitesPartenaire(): array {
		return $this->listeSousSpecialitesPartenaire;
	}

	public function setListeSousSpecialitesPartenaire(array $listeSousSpecialitesPartenaire): void {
        $this->listeSousSpecialitesPartenaire = $listeSousSpecialitesPartenaire;
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

	public function getListeVoeuxPartenaire(): array {
		return $this->listeVoeuxPartenaire;
	}

	public function setListeVoeuxPartenaire(array $listeVoeuxPartenaire): void {
        $this->listeVoeuxPartenaire = $listeVoeuxPartenaire;
    }

	public function getListeImagesPartenaire(): array {
		return $this->listeImagesPartenaire;
	}

	public function setListeImagesPartenaire(array $listeImagesPartenaire): void {
        $this->listeImagesPartenaire = $listeImagesPartenaire;
    }

	private function getCoutPartenaireSerializable() : array {
		return array(
			"identifiantCout" => $this->coutPartenaire->getIdentifiantCout(),
		);
	}

	private function getListeDomainesDeCompetencesSerializable() : array {
		$res = array();
		foreach ($this->listeDomainesDeCompetencesPartenaire as $domaineDeCompetence) {
			$res[] = $domaineDeCompetence->getObjetSerializable();
		}
		return $res;
	}

	private function getlisteSousSpecialitesSerializable() : array {
		$res = array();
		foreach ($this->listeSousSpecialitesPartenaire as $specialite) {
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

	private function getListeAidesFinancieresSerializable() : array {
		$res = array();
		foreach ($this->listeAidesFinancieresPartenaire as $aideFinanciere) {
			$res[] = $aideFinanciere->getObjetSerializable();
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

	private function getListeVoeuxSerializable() : array {
		$res = array();
		foreach ($this->listeVoeuxPartenaire as $voeu) {
			$res[] = $voeu->getObjetSerializable();
		}
		return $res;
	}

	private function getListeImagesPartenaireSerializable() : array {
		$res = array();
		foreach ($this->listeImagesPartenaire as $imagePartenaire) {
			$res[] = $imagePartenaire->getObjetSerializable();
		}
		return $res;
	}

	public function __construct() {
		$this->identifiantPartenaire = 0;
		$this->nomPartenaire = "";
		$this->lienPartenaire = "";
		$this->informationLogementPartenaire = "";
		$this->informationCoutPartenaire = "";
		$this->localisationPartenaire = null;
		$this->coutPartenaire = null;
		$this->etatPartenaire = null;
		$this->listeDomainesDeCompetencesPartenaire = array();
		$this->listeSousSpecialitesPartenaire = array();
		$this->listeMobilitesPartenaire = array();
		$this->listeContactsPartenaire = array();
		$this->listeAidesFinancieresPartenaire = array();
		$this->listeVoeuxPartenaire = array();
		$this->listeImagesPartenaire = array();
	}

	public function ajouterDomaineDeCompetence(DomaineDeCompetence $domaineDeCompetence) {
		$this->listeDomainesDeCompetencesPartenaire[] = $domaineDeCompetence;
	}

	public function supprimerDomaineDeCompetence(DomaineDeCompetence $domaineDeCompetence) {
		if (($key = array_search($domaineDeCompetence, $this->listeDomainesDeCompetencesPartenaire)) !== false) {
			unset($this->listeDomainesDeCompetencesPartenaire[$key]);
		}
	}

	public function ajouterSousSpecialite(SousSpecialite $sousSpecialite) {
		$this->listeSousSpecialitesPartenaire[] = $sousSpecialite;
	}

	public function supprimerSousSpecialite(SousSpecialite $sousSpecialite) {
		if (($key = array_search($sousSpecialite, $this->listeSousSpecialitesPartenaire)) !== false) {
			unset($this->listeSousSpecialitesPartenaire[$key]);
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

	public function ajouterAideFinanciere(AideFinanciere $aideFinanciere) {
		$this->listeAidesFinancieresPartenaire[] = $aideFinanciere;
	}

	public function supprimerAideFinanciere(AideFinanciere $aideFinanciere) {
		if (($key = array_search($aideFinanciere, $this->listeAidesFinancieresPartenaire)) !== false) {
			unset($this->listeAidesFinancieresPartenaire[$key]);
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

	public function ajouterVoeu(Voeu $voeu) {
		$this->listeVoeuxPartenaire[] = $voeu;
	}

	public function supprimerVoeu(Voeu $voeu) {
		if (($key = array_search($voeu, $this->listeVoeuxPartenaire)) !== false) {
			unset($this->listeVoeuxPartenaire[$key]);
		}
	}

	public function ajouterImagePartenaire(ImagePartenaire $imagePartenaire) {
		$this->listeImagesPartenaire[] = $imagePartenaire;
	}

	public function supprimerImagePartenaire(ImagePartenaire $imagePartenaire) {
		if (($key = array_search($imagePartenaire, $this->listeImagesPartenaire)) !== false) {
			unset($this->listeImagesPartenaire[$key]);
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
			"lienPartenaire" => $this->getLienPartenaire(),
			"informationLogementPartenaire" => $this->getInformationLogementPartenaire(),
            "informationCoutPartenaire" => $this->getInformationCoutPartenaire(),
            "localisationPartenaire" => $this->getLocalisationPartenaire()->getObjetSerializable(),
			"coutPartenaire" => $this->getCoutPartenaireSerializable(),
            "etatPartenaire" => $this->getEtatPartenaire()->getObjetSerializable(),
            "listeDomainesDeCompetencesPartenaire" => $this->getListeDomainesDeCompetencesSerializable(),
            "listeSousSpecialitesPartenaire" => $this->getListeSousSpecialitesSerializable(),
            "listeMobilitesPartenaire" => $this->getListeMobilitesSerializable(),
            "listeContactsPartenaire" => $this->getListeContactsSerializable(),
            "listeAidesFinancieresPartenaire" => $this->getListeAidesFinancieresSerializable(),
            "listeVoeuxPartenaire" => $this->getListeVoeuxSerializable(),
            "listeImagesPartenaire" => $this->getListeImagesPartenaireSerializable()
        );
	}

	#endregion

}