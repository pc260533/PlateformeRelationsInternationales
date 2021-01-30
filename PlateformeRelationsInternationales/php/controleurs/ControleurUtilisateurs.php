<?php

/**
 *
 * ControleurUtilisateurs est la classe représentant un controleur d'utilisateurs.
 * Elle implémente l'interface IControleurPlateforme.
 *
 * @version 1.0
 * @author Pierre-Nicolas
 */
class ControleurUtilisateurs implements IControleurPlateforme {
	/**
	 * Le stockage d'utilisateurs.
	 * @var StockageUtilisateurs
	 */
	private $stockageUtilisateurs;

	/**
	 * Hasher le mot de passe d'un utilisateur.
	 * @param Utilisateur $utilisateur L'utilisateur dont on veut hasher le mot de passe.
	 */
	private function hasherMotDePasse(Utilisateur $utilisateur): void {
		if ($utilisateur->getMotDePasseUtilisateur() != "") {
			$utilisateur->setMotDePasseUtilisateur(password_hash($utilisateur->getMotDePasseUtilisateur(), PASSWORD_DEFAULT));
		}
	}

	/**
	 * Constructeur ControleurUtilisateurs sans paramètres.
	 */
	public function __construct() {
		$this->stockageUtilisateurs = new StockageUtilisateurs(getVariableEnvironnement("DATASOURCENAME_BASEDEDONNEEPLATEFORME"), getVariableEnvironnement("USERNAME_BASEDEDONNEE"), getVariableEnvironnement("PASSWORD_BASEDEDONNEE"));
	}

	/**
	 * Créer un utilisateur à partir d'un tableau.
	 * @param array $utilisateurArray Le tableau représentant un utilisateur.
	 * @return Utilisateur L'utilisateur à créé.
	 */
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

	/**
	 * Retourner l'utilisateur avec son nom d'utilisateur.
	 * @param array $utilisateurArray Le tableau représentant l'utilisateur dont on connait le nom.
	 * @return null|Utilisateur L'utilisateur retourné.
	 */
	public function getUtilisateurAvecNomUtilisateur(array $utilisateurArray): Utilisateur {
		$utilisateur = null;
		if (isset($utilisateurArray["nomUtilisateur"])) {
			$utilisateur = $this->stockageUtilisateurs->getUtilisateurAvecNomUtilisateur($utilisateurArray["nomUtilisateur"]);
		}
		return $utilisateur;
	}

	/**
	 * Ajouter un utilisateur.
	 * @param array $utilisateurArray Le tableau représentant un utilisateur.
	 * @return Utilisateur L'utilisateur ajouté.
	 */
	public function ajouterUtilisateur(array $utilisateurArray): Utilisateur {
		$utilisateur = $this->creerUtilisateur($utilisateurArray);
		$this->hasherMotDePasse($utilisateur);
		$this->stockageUtilisateurs->ajouterUtilisateur($utilisateur);
		return $utilisateur;
	}

	/**
	 * Supprimer un utilisateur.
	 * @param array $utilisateurArray Le tableau représentant un utilisateur.
	 * @return Utilisateur L'utilisateur supprimé.
	 */
	public function supprimerUtilisateur(array $utilisateurArray): Utilisateur {
		$utilisateur = $this->creerUtilisateur($utilisateurArray);
		$this->stockageUtilisateurs->supprimerUtilisateur($utilisateur);
		return $utilisateur;
	}

	/**
	 * Modifier un utilisateur.
	 * @param array $utilisateurArray Le tableau représentant un utilisateur.
	 * @return Utilisateur L'utilisateur modifié.
	 */
	public function modifierUtilisateur(array $utilisateurArray): Utilisateur {
		$utilisateur = $this->creerUtilisateur($utilisateurArray);
		$this->stockageUtilisateurs->modifierUtilisateur($utilisateur);
		return $utilisateur;
	}

	/**
	 * Modifier le mot de passe d'un utilisateur.
	 * @param array $utilisateurArray Le tableau représentant un utilisateur.
	 * @return Utilisateur L'utilisateur modifié.
	 */
	public function modifierMotDePasseUtilisateur(array $utilisateurArray): Utilisateur {
		$utilisateur = $this->creerUtilisateur($utilisateurArray);
		$this->hasherMotDePasse($utilisateur);
		$this->stockageUtilisateurs->modifierMotDePasseUtilisateur($utilisateur);
		return $utilisateur;
	}

	/**
	 * Retourner la liste des utilisateur.
	 * @return array La liste des utilisateurs.
	 */
	public function chargerListeUtilisateurs(): array {
		return $this->stockageUtilisateurs->chargerListeUtilisateurs();
	}

}