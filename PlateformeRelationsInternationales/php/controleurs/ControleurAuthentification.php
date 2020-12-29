<?php

/**
 * ControleurAuthentification short summary.
 *
 * ControleurAuthentification description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class ControleurAuthentification {

	public function __construct() {

	}

	public function getUtilisateurEnSessionAvecIdentifiantUtilisateur(int $identifiantUtilisateur): Utilisateur {
		$res = null;
		session_start();
		if (isset($_SESSION["listeUtilisateurs"])) {
			foreach ($_SESSION["listeUtilisateurs"] as $utilisateurConnecte) {
				if ($utilisateurConnecte["identifiantUtilisateur"] == $identifiantUtilisateur) {
					$res = new Utilisateur();
					$res->setIdentifiantUtilisateur($utilisateurConnecte["identifiantUtilisateur"]);
					$res->setNomUtilisateur($utilisateurConnecte["nomUtilisateur"]);
					$res->setAdresseMailUtilisateur($utilisateurConnecte["adresseMailUtilisateur"]);
					$res->setEstAdministrateur($utilisateurConnecte["estAdministrateur"]);
				}
			}
		}
		return $res;
	}

	public function connecterUtilisateur(Utilisateur $utilisateurATester, Utilisateur $utilisateurRecuperer): void {
		if (password_verify($utilisateurATester->getMotDePasseUtilisateur(), $utilisateurRecuperer->getMotDePasseUtilisateur())) {
			$utilisateurRecuperer->setMotDePasseUtilisateur("");
			session_start();
			if (!isset($_SESSION["listeUtilisateurs"])) {
				$_SESSION["listeUtilisateurs"] = array();
			}
			$_SESSION["listeUtilisateurs"][] = $utilisateurRecuperer->getObjetSerializable();
		}
		else {
			throw new ExceptionAuthentification();
		}
	}

	public function deconnecterUtilisateur(Utilisateur $utilisateurADeconnecter): void {
		session_start();
		if (isset($_SESSION["listeUtilisateurs"])) {
			$indexUtilisateurASupprimer = null;
			foreach ($_SESSION["listeUtilisateurs"] as $key => $utilisateurConnecte) {
				if ($utilisateurConnecte["identifiantUtilisateur"] == $utilisateurADeconnecter->getIdentifiantUtilisateur()) {
					$indexUtilisateurASupprimer = $key;
				}
			}
			if (!is_null($indexUtilisateurASupprimer)) {
				unset($_SESSION["listeUtilisateurs"][$indexUtilisateurASupprimer]);
			}
			else {
				throw new ExceptionAuthentification();
			}
		}
		else {
			throw new ExceptionAuthentification();
		}
	}

}