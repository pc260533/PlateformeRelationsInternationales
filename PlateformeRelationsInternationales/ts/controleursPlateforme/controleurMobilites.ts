import { ControleurPlateforme } from "../controleurPlateforme";
import { Plateforme } from "../modelePlateforme/plateforme";
import { IVuePlateforme } from "../ivuePlateforme";
import { IVueMobilites } from "../vuesPlateforme/ivueMobilites";
import { Partenaire } from "../modelePlateforme/partenaire";
import { Mobilite } from "../modelePlateforme/mobilite";

export class ControleurMobilites extends ControleurPlateforme {

    public constructor(plateforme: Plateforme) {
        super(plateforme);
    }

    protected notifieAjoutMobilite(mobilite: Mobilite): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            if ((ivuePlateforme as IVueMobilites).ajoutMobilite) {
                (ivuePlateforme as IVueMobilites).ajoutMobilite(mobilite);
            }
        });
    }

    protected notifieSuppressionMobilite(mobilite: Mobilite): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            if ((ivuePlateforme as IVueMobilites).suppressionMobilite) {
                (ivuePlateforme as IVueMobilites).suppressionMobilite(mobilite);
            }
        });
    }

    protected notifieModificationMobilite(mobilite: Mobilite): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            if ((ivuePlateforme as IVueMobilites).modificationMobilite) {
                (ivuePlateforme as IVueMobilites).modificationMobilite(mobilite);
            }
        });
    }

    public ajouterMobilite(mobilite: Mobilite): void {
        var that = this;
        $.ajax({
            url: "api/mobilites",
            method: "post",
            data: { utilisateur: that.modelePlateforme.UtilisateurConnecte.getObjetSerializableId(), mobilite: mobilite.getObjetSerializable() },
            success: function (resultat) {
                mobilite.IdentifiantMobilite = resultat.identifiantMobilite;
                that.modelePlateforme.ajouterMobilite(mobilite);
                that.notifieAjoutMobilite(mobilite);
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public supprimerMobilite(mobilite: Mobilite): void {
        var that = this;
        $.ajax({
            url: "api/mobilites",
            method: "delete",
            data: { utilisateur: that.modelePlateforme.UtilisateurConnecte.getObjetSerializableId(), mobilite: mobilite.getObjetSerializableId() },
            success: function (resultat) {
                that.modelePlateforme.ListePartenairesPlateforme.forEach((partenaire: Partenaire) => {
                    partenaire.supprimerMobilite(mobilite);
                });
                that.modelePlateforme.supprimerMobilite(mobilite);
                that.notifieSuppressionMobilite(mobilite);
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public modifierMobilite(ancienneMobilite: Mobilite, nouvelleMobilite: Mobilite): void {
        nouvelleMobilite.IdentifiantMobilite = ancienneMobilite.IdentifiantMobilite;
        var that = this;
        $.ajax({
            url: "api/mobilites",
            method: "put",
            data: { utilisateur: that.modelePlateforme.UtilisateurConnecte.getObjetSerializableId(), mobilite: nouvelleMobilite.getObjetSerializable() },
            success: function (resultat) {
                ancienneMobilite.TypeMobilite = nouvelleMobilite.TypeMobilite;
                that.notifieModificationMobilite(ancienneMobilite);
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public chargerListeMobilites(): JQueryPromise<any> {
        if (this.modelePlateforme.ListeMobilitesPlateforme.length > 0) {
            this.modelePlateforme.ListeMobilitesPlateforme.forEach((mobilite: Mobilite) => {
                this.notifieAjoutMobilite(mobilite);
            });
            return $.Deferred().resolve();
        }
        var that = this;
        return $.ajax({
            url: "api/mobilites",
            method: "get",
            dataType: "json",
            success: function (resultat) {
                resultat.forEach(function (mobilite: any) {
                    var mobiliteObjet = new Mobilite();
                    mobiliteObjet.IdentifiantMobilite = mobilite.identifiantMobilite;
                    mobiliteObjet.TypeMobilite = mobilite.typeMobilite;
                    that.modelePlateforme.ajouterMobilite(mobiliteObjet);
                    that.notifieAjoutMobilite(mobiliteObjet);
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