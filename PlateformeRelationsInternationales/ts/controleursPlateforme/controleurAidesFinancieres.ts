import { ControleurPlateforme } from "../controleurPlateforme";
import { Plateforme } from "../modelePlateforme/plateforme";
import { IVuePlateforme } from "../ivuePlateforme";
import { IVueAidesFinancieres } from "../vuesPlateforme/ivueAidesFinancieres";
import { Partenaire } from "../modelePlateforme/partenaire";
import { AideFinanciere } from "../modelePlateforme/aideFinanciere";

export class ControleurAidesFinancieres extends ControleurPlateforme {

    public constructor(plateforme: Plateforme) {
        super(plateforme);
    }

    protected notifieAjoutAideFinanciere(aideFinanciere: AideFinanciere): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            if ((ivuePlateforme as IVueAidesFinancieres).ajoutAideFinanciere) {
                (ivuePlateforme as IVueAidesFinancieres).ajoutAideFinanciere(aideFinanciere);
            }
        });
    }

    protected notifieSuppressionAideFinanciere(aideFinanciere: AideFinanciere): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            if ((ivuePlateforme as IVueAidesFinancieres).suppressionAideFinanciere) {
                (ivuePlateforme as IVueAidesFinancieres).suppressionAideFinanciere(aideFinanciere);
            }
        });
    }

    protected notifieModificationAideFinanciere(aideFinanciere: AideFinanciere): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            if ((ivuePlateforme as IVueAidesFinancieres).modificationAideFinanciere) {
                (ivuePlateforme as IVueAidesFinancieres).modificationAideFinanciere(aideFinanciere);
            }
        });
    }

    public ajouterAideFinanciere(aideFinanciere: AideFinanciere): void {
        var that = this;
        $.ajax({
            url: "api/aidesfinancieres",
            method: "post",
            data: { utilisateur: that.modelePlateforme.UtilisateurConnecte.getObjetSerializableId(), aideFinanciere: aideFinanciere.getObjetSerializable() },
            success: function (resultat) {
                aideFinanciere.IdentifiantAideFinanciere = resultat.identifiantAideFinanciere;
                that.modelePlateforme.ajouterAideFinanciere(aideFinanciere);
                that.notifieAjoutAideFinanciere(aideFinanciere);
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public supprimerAideFinanciere(aideFinanciere: AideFinanciere): void {
        var that = this;
        $.ajax({
            url: "api/aidesfinancieres",
            method: "delete",
            data: { utilisateur: that.modelePlateforme.UtilisateurConnecte.getObjetSerializableId(), aideFinanciere: aideFinanciere.getObjetSerializableId() },
            success: function (resultat) {
                that.modelePlateforme.ListePartenairesPlateforme.forEach((partenaire: Partenaire) => {
                    partenaire.supprimerAideFinanciere(aideFinanciere);
                });
                that.modelePlateforme.supprimerAideFinanciere(aideFinanciere);
                that.notifieSuppressionAideFinanciere(aideFinanciere);
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public modifierAideFinanciere(ancienneAideFinanciere: AideFinanciere, nouvelleAideFinanciere: AideFinanciere): void {
        nouvelleAideFinanciere.IdentifiantAideFinanciere = ancienneAideFinanciere.IdentifiantAideFinanciere;
        var that = this;
        $.ajax({
            url: "api/aidesfinancieres",
            method: "put",
            data: { utilisateur: that.modelePlateforme.UtilisateurConnecte.getObjetSerializableId(), aideFinanciere: nouvelleAideFinanciere.getObjetSerializable() },
            success: function (resultat) {
                ancienneAideFinanciere.NomAideFinanciere = nouvelleAideFinanciere.NomAideFinanciere;
                ancienneAideFinanciere.DescriptionAideFinanciere = nouvelleAideFinanciere.DescriptionAideFinanciere;
                ancienneAideFinanciere.LienAideFinanciere = nouvelleAideFinanciere.LienAideFinanciere;
                that.notifieModificationAideFinanciere(ancienneAideFinanciere);
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public chargerListeAidesFinancieres(): JQueryPromise<any> {
        if (this.modelePlateforme.ListeAidesFinancieresPlateforme.length > 0) {
            this.modelePlateforme.ListeAidesFinancieresPlateforme.forEach((aideFinanciere: AideFinanciere) => {
                this.notifieAjoutAideFinanciere(aideFinanciere);
            });
            return $.Deferred().resolve();
        }
        var that = this;
        return $.ajax({
            url: "api/aidesfinancieres",
            method: "get",
            dataType: "json",
            success: function (resultat) {
                resultat.forEach(function (aideFinanciere: any) {
                    var aideFinanciereObjet = new AideFinanciere();
                    aideFinanciereObjet.IdentifiantAideFinanciere = aideFinanciere.identifiantAideFinanciere;
                    aideFinanciereObjet.NomAideFinanciere = aideFinanciere.nomAideFinanciere;
                    aideFinanciereObjet.DescriptionAideFinanciere = aideFinanciere.descriptionAideFinanciere;
                    aideFinanciereObjet.LienAideFinanciere = aideFinanciere.lienAideFinanciere;
                    that.modelePlateforme.ajouterAideFinanciere(aideFinanciereObjet);
                    that.notifieAjoutAideFinanciere(aideFinanciereObjet);
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