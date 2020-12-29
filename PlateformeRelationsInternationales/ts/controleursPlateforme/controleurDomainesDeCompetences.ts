import { ControleurPlateforme } from "../controleurPlateforme";
import { Plateforme } from "../modelePlateforme/plateforme";
import { IVuePlateforme } from "../ivuePlateforme";
import { IVueDomainesDeCompetences } from "../vuesPlateforme/ivueDomainesDeCompetences";
import { Partenaire } from "../modelePlateforme/partenaire";
import { DomaineDeCompetence } from "../modelePlateforme/domaineDeCompetence";

export class ControleurDomainesDeCompetences extends ControleurPlateforme {

    public constructor(plateforme: Plateforme) {
        super(plateforme);
    }

    protected notifieAjoutDomaineDeCompetence(domaineDeCompetence: DomaineDeCompetence): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            if ((ivuePlateforme as IVueDomainesDeCompetences).ajoutDomaineDeCompetence) {
                (ivuePlateforme as IVueDomainesDeCompetences).ajoutDomaineDeCompetence(domaineDeCompetence);
            }
        });
    }

    protected notifieSuppressionDomaineDeCompetence(domaineDeCompetence: DomaineDeCompetence): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            if ((ivuePlateforme as IVueDomainesDeCompetences).suppressionDomaineDeCompetence) {
                (ivuePlateforme as IVueDomainesDeCompetences).suppressionDomaineDeCompetence(domaineDeCompetence);
            }
        });
    }

    protected notifieModificationDomaineDeCompetence(domaineDeCompetence: DomaineDeCompetence): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            if ((ivuePlateforme as IVueDomainesDeCompetences).modificationDomaineDeCompetence) {
                (ivuePlateforme as IVueDomainesDeCompetences).modificationDomaineDeCompetence(domaineDeCompetence);
            }
        });
    }

    public ajouterDomaineDeCompetence(domaineDeCompetence: DomaineDeCompetence): void {
        var that = this;
        $.ajax({
            url: "api/domainesDeCompetences",
            method: "post",
            data: { utilisateur: that.modelePlateforme.UtilisateurConnecte.getObjetSerializableId(), domaineDeCompetence: domaineDeCompetence.getObjetSerializable() },
            success: function (resultat) {
                domaineDeCompetence.IdentifiantDomaineDeCompetence = resultat.identifiantDomaineDeCompetence;
                that.modelePlateforme.ajouterDomaineDeCompetence(domaineDeCompetence);
                that.notifieAjoutDomaineDeCompetence(domaineDeCompetence);
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public supprimerDomaineDeCompetence(domaineDeCompetence: DomaineDeCompetence): void {
        var that = this;
        $.ajax({
            url: "api/domainesDeCompetences",
            method: "delete",
            data: { utilisateur: that.modelePlateforme.UtilisateurConnecte.getObjetSerializableId(), domaineDeCompetence: domaineDeCompetence.getObjetSerializableId() },
            success: function (resultat) {
                that.modelePlateforme.ListePartenairesPlateforme.forEach((partenaire: Partenaire) => {
                    partenaire.supprimerDomaineDeCompetence(domaineDeCompetence);
                });
                that.modelePlateforme.supprimerDomaineDeCompetence(domaineDeCompetence);
                that.notifieSuppressionDomaineDeCompetence(domaineDeCompetence);
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public modifierDomaineDeCompetence(ancienDomaineDeCompetence: DomaineDeCompetence, nouveauDomaineDeCompetence: DomaineDeCompetence): void {
        nouveauDomaineDeCompetence.IdentifiantDomaineDeCompetence = ancienDomaineDeCompetence.IdentifiantDomaineDeCompetence;
        var that = this;
        $.ajax({
            url: "api/domainesDeCompetences",
            method: "put",
            data: { utilisateur: that.modelePlateforme.UtilisateurConnecte.getObjetSerializableId(), domaineDeCompetence: nouveauDomaineDeCompetence.getObjetSerializable() },
            success: function (resultat) {
                ancienDomaineDeCompetence.NomDomaineDeCompetence = nouveauDomaineDeCompetence.NomDomaineDeCompetence;
                that.notifieModificationDomaineDeCompetence(ancienDomaineDeCompetence);
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public chargerListeDomainesDeCompetences(): JQueryPromise<any> {
        if (this.modelePlateforme.ListeDomainesDeCompetences.length > 0) {
            this.modelePlateforme.ListeDomainesDeCompetences.forEach((domaineDeCompetence: DomaineDeCompetence) => {
                this.notifieAjoutDomaineDeCompetence(domaineDeCompetence);
            });
            return $.Deferred().resolve();
        }
        var that = this;
        return $.ajax({
            url: "api/domainesDeCompetences",
            method: "get",
            dataType: "json",
            success: function (resultat) {
                resultat.forEach(function (domaineDeCompetence: any) {
                    var domaineDeCompetenceObjet = new DomaineDeCompetence();
                    domaineDeCompetenceObjet.IdentifiantDomaineDeCompetence = domaineDeCompetence.identifiantDomaineDeCompetence;
                    domaineDeCompetenceObjet.NomDomaineDeCompetence = domaineDeCompetence.nomDomaineDeCompetence;
                    that.modelePlateforme.ajouterDomaineDeCompetence(domaineDeCompetenceObjet);
                    that.notifieAjoutDomaineDeCompetence(domaineDeCompetenceObjet);
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