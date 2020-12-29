import { ControleurPlateforme } from "../controleurPlateforme";
import { Plateforme } from "../modelePlateforme/plateforme";
import { IVuePlateforme } from "../ivuePlateforme";
import { IVueMails } from "../vuesPlateforme/ivueMails";
import { Partenaire } from "../modelePlateforme/partenaire";
import { Mail } from "../modelePlateforme/mail";

import * as moment from "moment";
import { ContactMail } from "../modelePlateforme/contactMail";

export class ControleurMails extends ControleurPlateforme {

    public constructor(plateforme: Plateforme) {
        super(plateforme);
    }

    protected notifieAjoutMail(mail: Mail): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            if ((ivuePlateforme as IVueMails).ajoutMail) {
                (ivuePlateforme as IVueMails).ajoutMail(mail);
            }
        });
    }

    protected notifieSuppressionMail(mail: Mail): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            if ((ivuePlateforme as IVueMails).suppressionMail) {
                (ivuePlateforme as IVueMails).suppressionMail(mail);
            }
        });
    }

    public validerListeVoeuxPartenaires(listePartenaire: Partenaire[], adresseMailVoeu: string): void {
        var listePartenaireSerializable = [];
        listePartenaire.forEach((partenaire: Partenaire) => {
            listePartenaireSerializable.push(partenaire.getObjetSerializable());
        });
        var that = this;
        $.ajax({
            url: "api/mails/validerVoeuxPartenaires",
            method: "post",
            data: { listePartenaires: listePartenaireSerializable, adresseMailVoeu: adresseMailVoeu },
            success: function (information) {
                //console.log(information);
                that.notifieInformation(that.creerInformationSerializable(information));

            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public envoyerMailPartenaire(mail: Mail): void {
        var that = this;
        $.ajax({
            url: "api/mails/envoyerMailPartenaire",
            method: "post",
            data: { utilisateur: this.modelePlateforme.UtilisateurConnecte.getObjetSerializableId(), mail: mail.getObjetSerializable() },
            success: function (resultat) {
                //console.log(resultat);
                mail.IdentifiantMail = resultat.mail.identifiantMail;
                mail.EstEnvoye = resultat.mail.estEnvoye;
                that.modelePlateforme.ajouterMail(mail);
                that.notifieAjoutMail(mail);
                that.notifieInformation(that.creerInformationSerializable(resultat.information));
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public supprimerMail(mail: Mail): void {
        var that = this;
        $.ajax({
            url: "api/mails",
            method: "delete",
            data: { utilisateur: that.modelePlateforme.UtilisateurConnecte.getObjetSerializableId(), mail: mail.getObjetSerializableId() },
            success: function (resultat) {
                that.modelePlateforme.supprimerMail(mail);
                that.notifieSuppressionMail(mail);
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public chargerListeMails(): JQueryPromise<any> {
        if (this.modelePlateforme.ListeMails.length > 0) {
            this.modelePlateforme.ListeMails.forEach((mail: Mail) => {
                this.notifieAjoutMail(mail);
            });
            return $.Deferred().resolve();
        }
        var that = this;
        return $.ajax({
            url: "api/mails",
            method: "get",
            dataType: "json",
            success: function (resultat) {
                resultat.forEach(function (mail: any) {
                    var mailObjet = new Mail();
                    mailObjet.IdentifiantMail = mail.identifiantMail;
                    mailObjet.DateEnvoie = moment(mail.dateEnvoie, "YYYY-MM-DD").toDate();
                    mailObjet.EstEnvoye = mail.estEnvoye;
                    mail.listeDestinatairesContactsEtrangers.forEach((contactEtranger: any) => {
                        mailObjet.ajouterDestinataireContactEtranger(that.modelePlateforme.getContactEtrangerAvecIdentifiant(contactEtranger.identifiantContact));
                    });
                    mail.listeDestinatairesCoordinateurs.forEach((coordinateur: any) => {
                        mailObjet.ajouterDestinataireCoordinateur(that.modelePlateforme.getCoordinateurAvecIdentifiant(coordinateur.identifiantContact));
                    });
                    mail.listeDestinatairesContactsMails.forEach((contactMail: any) => {
                        mailObjet.ajouterDestinataire(new ContactMail(contactMail.nomContactMail, contactMail.adresseMailContactMail));
                    });
                    mail.listeCopiesCarbonesContactsEtrangers.forEach((contactEtranger: any) => {
                        mailObjet.ajouterCopieCarboneContactEtranger(that.modelePlateforme.getContactEtrangerAvecIdentifiant(contactEtranger.identifiantContact));
                    });
                    mail.listeCopiesCarbonesCoordinateurs.forEach((coordinateur: any) => {
                        mailObjet.ajouterCopieCarboneCoordinateur(that.modelePlateforme.getCoordinateurAvecIdentifiant(coordinateur.identifiantContact));
                    });
                    mail.listeCopiesCarbonesContactsMails.forEach((contactMail: any) => {
                        mailObjet.ajouterCopieCarbone(new ContactMail(contactMail.nomContactMail, contactMail.adresseMailContactMail));
                    });
                    mail.listeCopiesCarbonesInvisiblesContactsEtrangers.forEach((contactEtranger: any) => {
                        mailObjet.ajouterCopieCarboneInvisibleContactEtranger(that.modelePlateforme.getContactEtrangerAvecIdentifiant(contactEtranger.identifiantContact));
                    });
                    mail.listeCopiesCarbonesInvisiblesCoordinateurs.forEach((coordinateur: any) => {
                        mailObjet.ajouterCopieCarboneInvisibleCoordinateur(that.modelePlateforme.getCoordinateurAvecIdentifiant(coordinateur.identifiantContact));
                    });
                    mail.listeCopiesCarbonesInvisiblesContactsMails.forEach((contactMail: any) => {
                        mailObjet.ajouterCopieCarboneInvisible(new ContactMail(contactMail.nomContactMail, contactMail.adresseMailContactMail));
                    });
                    if (mail.sujetMail) {
                        mailObjet.SujetMail = mail.sujetMail;
                    }
                    if (mail.messageHtmlMail) {
                        mailObjet.MessageHtmlMail = mail.messageHtmlMail;
                    }
                    if (mail.templateMail) {
                        mailObjet.TemplateMail = that.modelePlateforme.getTemplateMailAvecIdentifiant(mail.templateMail.identifiantTemplateMail);
                    }
                    mailObjet.PartenaireMail = that.modelePlateforme.getPartenaireAvecIdentifiant(mail.partenaireMail);
                    that.modelePlateforme.ajouterMail(mailObjet);
                    that.notifieAjoutMail(mailObjet);
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