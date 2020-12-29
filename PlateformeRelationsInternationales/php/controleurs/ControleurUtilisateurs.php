<?php

/**
 * ControleurUtilisateurs short summary.
 *
 * ControleurUtilisateurs description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class ControleurUtilisateurs implements IControleurPlateforme {
	private $stockageUtilisateurs;

	private function hasherMotDePasse(Utilisateur $utilisateur): void {
		if ($utilisateur->getMotDePasseUtilisateur() != "") {
			$utilisateur->setMotDePasseUtilisateur(password_hash($utilisateur->getMotDePasseUtilisateur(), PASSWORD_DEFAULT));
		}
	}

	public function __construct() {
		$this->stockageUtilisateurs = new StockageUtilisateurs(getVariableEnvironnement("DATASOURCENAME_BASEDEDONNEEPLATEFORME"), getVariableEnvironnement("USERNAME_BASEDEDONNEE"), getVariableEnvironnement("PASSWORD_BASEDEDONNEE"));
	}

	public function creerUtilisateur(array $utilisateurArray): Utilisateur {
		$utilisateur = new Utilisateur();
		if (isset($utilisateurArray["identifiantUtilisateur"])) {
			$utilisateur->setIdentifiantUtilisateur($utilisateurArray["identifiantUtilisateur"]);
		}
		if (isset($utilisateurArray["nomUtilisateur"])) {
			$utilisateur->setNomUtilisateur($utilisateurArray["nomUtilisateur"]);
		}
		if (isset($utilisateurArray["motDePasseUtilisateur"])) {
			$utilisateur->setMotDePasseUtilisateur($utilisateurArray["motDePasseUtilisateur"]);
		}
		if (isset($utilisateurArray["adresseMailUtilisateur"])) {
			$utilisateur->setAdresseMailUtilisateur($utilisateurArray["adresseMailUtilisateur"]);
		}
		if (isset($utilisateurArray["estAdministrateur"])) {
			$utilisateur->setEstAdministrateur(filter_var($utilisateurArray["estAdministrateur"], FILTER_VALIDATE_BOOLEAN));
		}
		return $utilisateur;
	}

	public function getUtilisateurAvecNomUtilisateur(array $utilisateurArray): Utilisateur {
		$utilisateur = null;
		if (isset($utilisateurArray["nomUtilisateur"])) {
			$utilisateur = $this->stockageUtilisateurs->getUtilisateurAvecNomUtilisateur($utilisateurArray["nomUtilisateur"]);
		}
		return $utilisateur;
	}

	public function ajouterUtilisateur(array $utilisateurArray): Utilisateur {
		$utilisateur = $this->creerUtilisateur($utilisateurArray);
		$this->hasherMotDePasse($utilisateur);
		$this->stockageUtilisateurs->ajouterUtilisateur($utilisateur);
		return $utilisateur;
	}

	public function supprimerUtilisateur(array $utilisateurArray): Utilisateur {
		$utilisateur = $this->creerUtilisateur($utilisateurArray);
		$this->stockageUtilisateurs->supprimerUtilisateur($utilisateur);
		return $utilisateur;
	}

	public function modifierUtilisateur(array $utilisateurArray): Utilisateur {
		$utilisateur = $this->creerUtilisateur($utilisateurArray);
		$this->stockageUtilisateurs->modifierUtilisateur($utilisateur);
		return $utilisateur;
	}

	public function modifierMotDePasseUtilisateur(array $utilisateurArray): Utilisateur {
		$utilisateur = $this->creerUtilisateur($utilisateurArray);
		$this->hasherMotDePasse($utilisateur);
		$this->stockageUtilisateurs->modifierMotDePasseUtilisateur($utilisateur);
		return $utilisateur;
	}

	public function chargerListeUtilisateurs(): array {
		return $this->stockageUtilisateurs->chargerListeUtilisateurs();
	}

}