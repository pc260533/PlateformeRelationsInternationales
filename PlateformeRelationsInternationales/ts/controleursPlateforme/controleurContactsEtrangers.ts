import { ControleurPlateforme } from "../controleurPlateforme";
import { Plateforme } from "../modelePlateforme/plateforme";
import { IVuePlateforme } from "../ivuePlateforme";
import { IVueContactsEtrangers } from "../vuesPlateforme/ivueContactsEtrangers";
import { Partenaire } from "../modelePlateforme/partenaire";
import { ContactEtranger } from "../modelePlateforme/contactEtranger";

export class ControleurContactsEtrangers extends ControleurPlateforme {

    public constructor(plateforme: Plateforme) {
        super(plateforme);
    }

    protected notifieAjoutContactEtranger(contactEtranger: ContactEtranger): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            if ((ivuePlateforme as IVueContactsEtrangers).ajoutContactEtranger) {
                (ivuePlateforme as IVueContactsEtrangers).ajoutContactEtranger(contactEtranger);
            }
        });
    }

    protected notifieSuppressionContactEtranger(contactEtranger: ContactEtranger): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            if ((ivuePlateforme as IVueContactsEtrangers).suppressionContactEtranger) {
                (ivuePlateforme as IVueContactsEtrangers).suppressionContactEtranger(contactEtranger);
            }
        });
    }

    protected notifieModificationContactEtranger(contactEtranger: ContactEtranger): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            if ((ivuePlateforme as IVueContactsEtrangers).modificationContactEtranger) {
                (ivuePlateforme as IVueContactsEtrangers).modificationContactEtranger(contactEtranger);
            }
        });
    }

    public ajouterContactEtranger(contactEtranger: ContactEtranger): void {
        var that = this;
        $.ajax({
            url: "api/contactsEtrangers",
            method: "post",
            data: { utilisateur: that.modelePlateforme.UtilisateurConnecte.getObjetSerializableId(), contactEtranger: contactEtranger.getObjetSerializable() },
            success: function (resultat) {
                contactEtranger.IdentifiantContact = resultat.identifiantContact;
                that.modelePlateforme.ajouterContactEtranger(contactEtranger);
                that.notifieAjoutContactEtranger(contactEtranger);
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public supprimerContactEtranger(contactEtranger: ContactEtranger): void {
        var that = this;
        $.ajax({
            url: "api/contactsEtrangers",
            method: "delete",
            data: { utilisateur: that.modelePlateforme.UtilisateurConnecte.getObjetSerializableId(), contactEtranger: contactEtranger.getObjetSerializableId() },
            success: function (resultat) {
                that.modelePlateforme.ListePartenairesPlateforme.forEach((partenaire: Partenaire) => {
                    partenaire.supprimerContactEtranger(contactEtranger);
                });
                that.modelePlateforme.supprimerContactEtranger(contactEtranger);
                that.notifieSuppressionContactEtranger(contactEtranger);
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public modifierContactEtranger(ancienContactEtranger: ContactEtranger, nouveauContactEtranger: ContactEtranger): void {
        nouveauContactEtranger.IdentifiantContact = ancienContactEtranger.IdentifiantContact;
        var that = this;
        $.ajax({
            url: "api/contactsEtrangers",
            method: "put",
            data: { utilisateur: that.modelePlateforme.UtilisateurConnecte.getObjetSerializableId(), contactEtranger: nouveauContactEtranger.getObjetSerializable() },
            success: function (resultat) {
                ancienContactEtranger.NomContact = nouveauContactEtranger.NomContact;
                ancienContactEtranger.PrenomContact = nouveauContactEtranger.PrenomContact;
                ancienContactEtranger.AdresseMailContact = nouveauContactEtranger.AdresseMailContact;
                ancienContactEtranger.FonctionContact = nouveauContactEtranger.FonctionContact;
                that.notifieModificationContactEtranger(ancienContactEtranger);
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public chargerListeContactsEtrangers(): JQueryPromise<any> {
        if (this.modelePlateforme.ListeContactsEtrangersPlateforme.length > 0) {
            this.modelePlateforme.ListeContactsEtrangersPlateforme.forEach((contactEtranger: ContactEtranger) => {
                this.notifieAjoutContactEtranger(contactEtranger);
            });
            return $.Deferred().resolve();
        }
        var that = this;
        return $.ajax({
            url: "api/contactsEtrangers",
            method: "get",
            dataType: "json",
            success: function (resultat) {
                resultat.forEach(function (contactEtranger: any) {
                    var contactEtrangerObjet = new ContactEtranger();
                    contactEtrangerObjet.IdentifiantContact = contactEtranger.identifiantContact;
                    contactEtrangerObjet.NomContact = contactEtranger.nomContact;
                    contactEtrangerObjet.PrenomContact = contactEtranger.prenomContact;
                    contactEtrangerObjet.AdresseMailContact = contactEtranger.adresseMailContact;
                    contactEtrangerObjet.FonctionContact = contactEtranger.fonctionContact;
                    that.modelePlateforme.ajouterContactEtranger(contactEtrangerObjet);
                    that.notifieAjoutContactEtranger(contactEtrangerObjet);
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