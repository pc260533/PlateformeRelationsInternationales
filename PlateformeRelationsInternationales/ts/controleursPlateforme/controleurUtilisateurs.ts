import { ControleurPlateforme } from "../controleurPlateforme";
import { Plateforme } from "../modelePlateforme/plateforme";
import { IVuePlateforme } from "../ivuePlateforme";
import { IVueUtilisateurs } from "../vuesPlateforme/ivueUtilisateurs";
import { Utilisateur } from "../modelePlateforme/utilisateur";

export class ControleurUtilisateurs extends ControleurPlateforme {

    public constructor(plateforme: Plateforme) {
        super(plateforme);
    }

    protected notifieAjoutUtilisateur(utilisateur: Utilisateur): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            if ((ivuePlateforme as IVueUtilisateurs).ajoutUtilisateur) {
                (ivuePlateforme as IVueUtilisateurs).ajoutUtilisateur(utilisateur);
            }
        });
    }

    protected notifieSuppressionUtilisateur(utilisateur: Utilisateur): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            if ((ivuePlateforme as IVueUtilisateurs).suppressionUtilisateur) {
                (ivuePlateforme as IVueUtilisateurs).suppressionUtilisateur(utilisateur);
            }
        });
    }

    protected notifieModificationUtilisateur(utilisateur: Utilisateur): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            if ((ivuePlateforme as IVueUtilisateurs).modificationUtilisateur) {
                (ivuePlateforme as IVueUtilisateurs).modificationUtilisateur(utilisateur);
            }
        });
    }

    public ajouterUtilisateur(utilisateur: Utilisateur): void {
        var that = this;
        $.ajax({
            url: "api/utilisateurs",
            method: "post",
            data: { utilisateur: that.modelePlateforme.UtilisateurConnecte.getObjetSerializableId(), utilisateurAAjouter: utilisateur.getObjetSerializable() },
            success: function (resultat) {
                utilisateur.IdentifiantUtilisateur = resultat.identifiantUtilisateur;
                utilisateur.MotDePasseUtilisateur = "";
                that.modelePlateforme.ajouterUtilisateur(utilisateur);
                that.notifieAjoutUtilisateur(utilisateur);
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public supprimerUtilisateur(utilisateur: Utilisateur): void {
        var that = this;
        $.ajax({
            url: "api/utilisateurs",
            method: "delete",
            data: { utilisateur: that.modelePlateforme.UtilisateurConnecte.getObjetSerializableId(), utilisateurASupprimer: utilisateur.getObjetSerializableId() },
            success: function (resultat) {
                that.modelePlateforme.supprimerUtilisateur(utilisateur);
                that.notifieSuppressionUtilisateur(utilisateur);
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public modifierUtilisateur(ancienUtilisateur: Utilisateur, nouvelUtilisateur: Utilisateur): void {
        nouvelUtilisateur.IdentifiantUtilisateur = ancienUtilisateur.IdentifiantUtilisateur;
        var that = this;
        $.ajax({
            url: "api/utilisateurs",
            method: "put",
            data: { utilisateur: that.modelePlateforme.UtilisateurConnecte.getObjetSerializableId(), utilisateurAModifier: nouvelUtilisateur.getObjetSerializable() },
            success: function (resultat) {
                ancienUtilisateur.NomUtilisateur = nouvelUtilisateur.NomUtilisateur;
                ancienUtilisateur.AdresseMailUtilisateur = nouvelUtilisateur.AdresseMailUtilisateur;
                ancienUtilisateur.EstAdministrateur = nouvelUtilisateur.EstAdministrateur;
                that.notifieModificationUtilisateur(ancienUtilisateur);
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public modifierMotDePasseUtilisateur(utlisateurAModifier: Utilisateur, nouveauMotDePasse: string): void {
        var that = this;
        $.ajax({
            url: "api/utilisateurs/motDePasse",
            method: "put",
            data: { utilisateur: that.modelePlateforme.UtilisateurConnecte.getObjetSerializableId(), utilisateurAModifier: utlisateurAModifier.getObjetSerializableId(), motDePasse: nouveauMotDePasse },
            success: function (resultat) {
                that.notifieModificationUtilisateur(utlisateurAModifier);
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public chargerListeUtilisateur(): JQueryPromise<any> {
        if (this.modelePlateforme.ListeUtilisateursPlateforme.length > 0) {
            this.modelePlateforme.ListeUtilisateursPlateforme.forEach((utilisateur: Utilisateur) => {
                this.notifieAjoutUtilisateur(utilisateur);
            });
            return $.Deferred().resolve();
        }
        var that = this;
        return $.ajax({
            url: "api/utilisateurs",
            method: "get",
            dataType: "json",
            success: function (resultat) {
                resultat.forEach(function (utilisateur: any) {
                    var utilisateurObjet = new Utilisateur();
                    utilisateurObjet.IdentifiantUtilisateur = utilisateur.identifiantUtilisateur;
                    utilisateurObjet.NomUtilisateur = utilisateur.nomUtilisateur;
                    utilisateurObjet.AdresseMailUtilisateur = utilisateur.adresseMailUtilisateur;
                    utilisateurObjet.EstAdministrateur = utilisateur.estAdministrateur;
                    that.modelePlateforme.ajouterUtilisateur(utilisateurObjet);
                    that.notifieAjoutUtilisateur(utilisateurObjet);
                    //console.log(that.modelePlateforme);
                });
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

}