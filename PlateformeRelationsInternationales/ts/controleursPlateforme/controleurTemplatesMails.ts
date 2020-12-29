import { ControleurPlateforme } from "../controleurPlateforme";
import { Plateforme } from "../modelePlateforme/plateforme";
import { IVuePlateforme } from "../ivuePlateforme";
import { IVueTemplatesMails } from "../vuesPlateforme/ivueTemplatesMails";
import { Partenaire } from "../modelePlateforme/partenaire";
import { TemplateMail } from "../modelePlateforme/templateMail";

export class ControleurTemplatesMails extends ControleurPlateforme {

    public constructor(plateforme: Plateforme) {
        super(plateforme);
    }

    protected notifieAjoutTemplateMail(templateMail: TemplateMail): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            if ((ivuePlateforme as IVueTemplatesMails).ajoutTemplateMail) {
                (ivuePlateforme as IVueTemplatesMails).ajoutTemplateMail(templateMail);
            }
        });
    }

    protected notifieSuppressionTemplateMail(templateMail: TemplateMail): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            if ((ivuePlateforme as IVueTemplatesMails).suppressionTemplateMail) {
                (ivuePlateforme as IVueTemplatesMails).suppressionTemplateMail(templateMail);
            }
        });
    }

    protected notifieModificationTemplateMail(templateMail: TemplateMail): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            if ((ivuePlateforme as IVueTemplatesMails).modificationTemplateMail) {
                (ivuePlateforme as IVueTemplatesMails).modificationTemplateMail(templateMail);
            }
        });
    }

    public ajouterTemplateMail(templateMail: TemplateMail): void {
        var that = this;
        $.ajax({
            url: "api/templatesMails",
            method: "post",
            data: { utilisateur: that.modelePlateforme.UtilisateurConnecte.getObjetSerializableId(), templateMail: templateMail.getObjetSerializable() },
            success: function (resultat) {
                templateMail.IdentifiantTemplateMail = resultat.identifiantTemplateMail;
                that.modelePlateforme.ajouterTemplateMail(templateMail);
                that.notifieAjoutTemplateMail(templateMail);
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public supprimerTemplateMail(templateMail: TemplateMail): void {
        var that = this;
        $.ajax({
            url: "api/templatesMails",
            method: "delete",
            data: { utilisateur: that.modelePlateforme.UtilisateurConnecte.getObjetSerializableId(), templateMail: templateMail.getObjetSerializableId() },
            success: function (resultat) {
                that.modelePlateforme.supprimerTemplateMail(templateMail);
                that.notifieSuppressionTemplateMail(templateMail);
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public modifierTemplateMail(ancienTemplateMail: TemplateMail, nouveauTemplateHtml: TemplateMail): void {
        nouveauTemplateHtml.IdentifiantTemplateMail = ancienTemplateMail.IdentifiantTemplateMail;
        var that = this;
        $.ajax({
            url: "api/templatesMails",
            method: "put",
            data: { utilisateur: that.modelePlateforme.UtilisateurConnecte.getObjetSerializableId(), templateMail: nouveauTemplateHtml.getObjetSerializable() },
            success: function (resultat) {
                ancienTemplateMail.NomTemplateMail = nouveauTemplateHtml.NomTemplateMail;
                ancienTemplateMail.SujetTemplateMail = nouveauTemplateHtml.SujetTemplateMail;
                ancienTemplateMail.MessageHtmlTemplateMail = nouveauTemplateHtml.MessageHtmlTemplateMail;
                that.notifieModificationTemplateMail(ancienTemplateMail);
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public chargerListeTemplatesMails(): JQueryPromise<any> {
        if (this.modelePlateforme.ListeTemplatesMails.length > 0) {
            this.modelePlateforme.ListeTemplatesMails.forEach((templateMail: TemplateMail) => {
                this.notifieAjoutTemplateMail(templateMail);
            });
            return $.Deferred().resolve();
        }
        var that = this;
        return $.ajax({
            url: "api/templatesMails",
            method: "get",
            dataType: "json",
            success: function (resultat) {
                resultat.forEach(function (templateMail: any) {
                    var templateMailObjet = new TemplateMail();
                    templateMailObjet.IdentifiantTemplateMail = templateMail.identifiantTemplateMail;
                    templateMailObjet.NomTemplateMail = templateMail.nomTemplateMail;
                    templateMailObjet.SujetTemplateMail = templateMail.sujetTemplateMail;
                    templateMailObjet.MessageHtmlTemplateMail = templateMail.messageHtmlTemplateMail;
                    that.modelePlateforme.ajouterTemplateMail(templateMailObjet);
                    that.notifieAjoutTemplateMail(templateMailObjet);
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