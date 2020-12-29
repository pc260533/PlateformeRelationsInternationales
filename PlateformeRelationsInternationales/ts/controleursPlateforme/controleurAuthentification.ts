import { ControleurPlateforme } from "../controleurPlateforme";
import { Plateforme } from "../modelePlateforme/plateforme";
import { IVuePlateforme } from "../ivuePlateforme";
import { IVueAuthentification } from "../vuesPlateforme/ivueAuthentification";
import { Utilisateur } from "../modelePlateforme/utilisateur";

import store from "../store";

export class ControleurAuthentification extends ControleurPlateforme {

    public constructor(plateforme: Plateforme) {
        super(plateforme);
    }

    public connecterUtilisateur(utilisateur: Utilisateur): JQueryPromise<any> {
        var that = this;
        return $.ajax({
            url: "api/authentification/connecterUtilisateur",
            method: "post",
            data: utilisateur.getObjetSerializable(),
            success: function (resultat) {
                utilisateur.IdentifiantUtilisateur = resultat.identifiantUtilisateur;
                utilisateur.MotDePasseUtilisateur = "";
                utilisateur.AdresseMailUtilisateur = resultat.adresseMailUtilisateur;
                utilisateur.EstAdministrateur = resultat.estAdministrateur;
                that.modelePlateforme.UtilisateurConnecte = utilisateur;
                //importer le store
                store.state.storeModuleAuthentification.utilisateurConnecte = utilisateur;
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public deconnecterUtilisateur(utilisateur: Utilisateur): JQueryPromise<any> {
        var that = this;
        return $.ajax({
            url: "api/authentification/deconnecterUtilisateur",
            method: "post",
            data: utilisateur.getObjetSerializable(),
            success: function (resultat) {
                that.modelePlateforme.UtilisateurConnecte = null;
                //importer le store
                store.state.storeModuleAuthentification.utilisateurConnecte = null;
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

}