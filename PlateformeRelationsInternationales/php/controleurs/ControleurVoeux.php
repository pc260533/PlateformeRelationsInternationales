<?php

/**
 * ControleurVoeux short summary.
 *
 * ControleurVoeux description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class ControleurVoeux implements IControleurPlateforme {
	private $stockageVoeux;

	private function creerVoeu(array $voeuArray): Voeu {
		$voeu = new Voeu();
		if (isset($voeuArray["identifiantVoeu"])) {
			$voeu->setIdentifiantVoeu($voeuArray["identifiantVoeu"]);
		}
		if (isset($voeuArray["adresseMailVoeu"])) {
			$voeu->setAdresseMailVoeu($voeuArray["adresseMailVoeu"]);
		}
		return $voeu;
	}

	public function __construct() {
		$this->stockageVoeux = new StockageVoeux(getVariableEnvironnement("DATASOURCENAME_BASEDEDONNEEPLATEFORME"), getVariableEnvironnement("USERNAME_BASEDEDONNEE"), getVariableEnvironnement("PASSWORD_BASEDEDONNEE"));
	}

	public function getVoeuAvecAdressMailVoeu(string $adresseMailVoeu): ?Voeu {
		return $this->stockageVoeux->getVoeuAvecAdresseMailVoeu($adresseMailVoeu);
	}

	public function ajouterVoeux(array $voeuArray): Voeu {
		$voeu = $this->creerVoeu($voeuArray);
		$this->stockageVoeux->ajouterVoeu($voeu);
		return $voeu;
	}

	public function supprimerVoeu(array $voeuArray): Voeu {
		$voeu = $this->creerVoeu($voeuArray);
		$this->stockageVoeux->supprimerVoeu($voeu);
		return $voeu;
	}

	public function chargerListeVoeux(): array {
		return  $this->stockageVoeux->chargerListeVoeux();
	}

}