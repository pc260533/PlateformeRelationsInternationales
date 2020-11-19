import { IVuePlateforme } from "./ivuePlateforme";
import { Plateforme } from "./modelePlateforme/plateforme";
import { Partenaire } from "./modelePlateforme/partenaire";
import { Specialite } from "./modelePlateforme/specialite";
import { SousSpecialite } from "./modelePlateforme/sousspecialite";
import { Mobilite } from "./modelePlateforme/mobilite";
import { AideFinanciere } from "./modelePlateforme/aideFinanciere";
import { Contact } from "./modelePlateforme/contact";
import { Localisation } from "./modelePlateforme/localisation";

export class ControleurPlateforme {
    private listeVuesPlateforme: IVuePlateforme[];
    private modelePlateforme: Plateforme;

    public constructor(plateforme: Plateforme) {
        this.listeVuesPlateforme = [];
        this.modelePlateforme = plateforme;
    }

    public inscrire(ivuePlateforme: IVuePlateforme) {
        if (!this.listeVuesPlateforme.includes(ivuePlateforme)) {
            this.listeVuesPlateforme.push(ivuePlateforme);
        }
    }

    public resilier(ivuePlateforme: IVuePlateforme) {
        var indexVuePlateforme = this.listeVuesPlateforme.indexOf(ivuePlateforme);
        if (!(indexVuePlateforme === undefined) && !(indexVuePlateforme === null)) {
            this.listeVuesPlateforme.splice(indexVuePlateforme, 1);
        }
    }

    protected notifieAjoutPartenaire(partenaire: Partenaire): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            ivuePlateforme.ajoutPartenaire(partenaire);
        });
    }

    protected notifieSuppressionPartenaire(partenaire: Partenaire): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            ivuePlateforme.suppressionPartenaire(partenaire);
        });
    }

    protected notifieModificationPartenaire(partenaire: Partenaire): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            ivuePlateforme.modificationPartenaire(partenaire);
        });
    }

    protected notifieAjoutSousSpecialiteDansPartenaire(sousSpecialite: SousSpecialite, partenaire: Partenaire): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            ivuePlateforme.ajoutSousSpecialiteDansPartenaire(sousSpecialite, partenaire);
        });
    }

    protected notifieSuppressionSpecialiteDansPartenaire(sousSpecialite: SousSpecialite, partenaire: Partenaire): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            ivuePlateforme.suppressionSousSpecialiteDansPartenaire(sousSpecialite, partenaire);
        });
    }

    protected notifieAjoutMobiliteDansPartenaire(mobilite: Mobilite, partenaire: Partenaire): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            ivuePlateforme.ajoutMobiliteDansPartenaire(mobilite, partenaire);
        });
    }

    protected notifieSuppressionMobiliteDansPartenaire(mobilite: Mobilite, partenaire: Partenaire): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            ivuePlateforme.suppressionMobiliteDansPartenaire(mobilite, partenaire);
        });
    }

    protected notifieAjoutAideFinanciereDansPartenaire(aideFinanciere: AideFinanciere, partenaire: Partenaire): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            ivuePlateforme.ajoutAideFinanciereDansPartenaire(aideFinanciere, partenaire);
        });
    }

    protected notifieSuppressionAideFinanciereDansPartenaire(aideFinanciere: AideFinanciere, partenaire: Partenaire): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            ivuePlateforme.suppressionAideFinanciereDansPartenaire(aideFinanciere, partenaire);
        });
    }

    protected notifieAjoutContactDansPartenaire(contact: Contact, partenaire: Partenaire): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            ivuePlateforme.ajoutContactDansPartenaire(contact, partenaire);
        });
    }

    protected notifieSuppressionContactDansPartenaire(contact: Contact, partenaire: Partenaire): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            ivuePlateforme.ajoutContactDansPartenaire(contact, partenaire);
        });
    }

    protected notifieAjoutAideFinanciere(aideFinanciere: AideFinanciere): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            ivuePlateforme.ajoutAideFinanciere(aideFinanciere);
        });
    }

    protected notifieSuppressionAideFinanciere(aideFinanciere: AideFinanciere): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            ivuePlateforme.suppressionAideFinanciere(aideFinanciere);
        });
    }

    protected notifieModificationAideFinanciere(aideFinanciere: AideFinanciere): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            ivuePlateforme.modificationAideFinanciere(aideFinanciere);
        });
    }

    protected notifieAjoutContact(contact: Contact): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            ivuePlateforme.ajoutContact(contact);
        });
    }

    protected notifieSuppressionContact(contact: Contact): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            ivuePlateforme.suppressionContact(contact);
        });
    }

    protected notifieModificationContact(contact: Contact): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            ivuePlateforme.modificationContact(contact);
        });
    }

    public chargerListeSpecialites(): JQueryPromise<any> {
        var that = this;
        return $.ajax({
            url: "api/specialites",
            method: "get",
            dataType: "json",
            success: function (resultat) {
                resultat.forEach(function (specialite: any) {
                    var specialiteObjet = new Specialite();
                    specialiteObjet.IdentifiantSpecialite = specialite.identifiantSpecialite;
                    specialiteObjet.NomSpecialite = specialite.nomSpecialite;
                    specialite.listeSousSpecialites.forEach((sousSpecialite: any) => {
                        var sousSpecialiteObjet = new SousSpecialite();
                        sousSpecialiteObjet.IdentifiantSousSpecialite = sousSpecialite.identifiantSousSpecialite;
                        sousSpecialiteObjet.NomSousSpecialite = sousSpecialite.nomSousSpecialite;
                        specialiteObjet.ajouterSousSpecialite(sousSpecialiteObjet);
                    });
                    that.modelePlateforme.ajouterSpecialite(specialiteObjet);
                    //console.log(that.modelePlateforme);
                });
            },
            error: function (erreur) {
                console.log(erreur);
                //that.notifieErreur(erreur.responseJSON);
            }
        });
    }

    public chargerListeMobilites(): JQueryPromise<any> {
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
                    //console.log(that.modelePlateforme);
                });
            },
            error: function (erreur) {
                console.log(erreur);
                //that.notifieErreur(erreur.responseJSON);
            }
        });
    }

    public ajouterPartenaire(partenaire: Partenaire): void  {
        var that = this;
        $.ajax({
            url: "api/partenaires",
            method: "post",
            data: partenaire.getObjetSerializable(),
            success: function (resultat) {
                console.log(resultat);
                partenaire.IdentifiantPartenaire = resultat.identifiantPartenaire;
                partenaire.LocalisationPartenaire.IdentifiantLocalisation = resultat.localisationPartenaire.identifiantLocalisation;
                that.modelePlateforme.ajouterPartenaire(partenaire);
                that.notifieAjoutPartenaire(partenaire);
            },
            error: function (erreur) {
                console.log(erreur);
                //that.notifieErreur(erreur.responseJSON);
            }
        });
    }

    public supprimerPartenaire(partenaire: Partenaire): void {
        var that = this;
        $.ajax({
            url: "api/partenaires",
            method: "delete",
            //pour supprimer le partenaire il faut supprimer le aprtenaire et a localisation donc on pass l'id du partenaire et l'id de sa localisation
            data: partenaire.getObjetSerializable(),
            success: function (resultat) {
                that.modelePlateforme.supprimerPartenaire(partenaire);
                that.notifieSuppressionPartenaire(partenaire);
            },
            error: function (erreur) {
                console.log(erreur);
                //that.notifieErreur(erreur.responseJSON);
            }
        });
    }

    public modifierPartenaire(partenaire: Partenaire): void {
        var that = this;
        $.ajax({
            url: "api/partenaire",
            method: "put",
            data: partenaire.getObjetSerializable(),
            success: function (resultat) {
                that.notifieModificationPartenaire(partenaire);
            },
            error: function (erreur) {
                console.log(erreur);
                //that.notifieErreur(erreur.responseJSON);
            }
        });
    }

    public chargerListePartenaires(): JQueryPromise<any> {
        var that = this;
        return $.ajax({
            url: "api/partenaires",
            method: "get",
            dataType: "json",
            success: function (resultat) {
                resultat.forEach(function (partenaire: any) {
                    var partenaireObjet = new Partenaire();
                    partenaireObjet.IdentifiantPartenaire = partenaire.identifiantPartenaire;
                    partenaireObjet.NomPartenaire = partenaire.nomPartenaire;
                    partenaireObjet.DomaineDeCompetencePartenaire = partenaire.domaineDeCompetencePartenaire;

                    var localisationPartenaire = new Localisation();
                    localisationPartenaire.IdentifiantLocalisation = partenaire.localisationPartenaire.identifiantLocalisation;
                    localisationPartenaire.LatitudeLocalisation = partenaire.localisationPartenaire.latitudeLocalisation;
                    localisationPartenaire.LongitudeLocalisation = partenaire.localisationPartenaire.longitudeLocalisation;
                    partenaireObjet.LocalisationPartenaire = localisationPartenaire;

                    partenaire.listeSousSpecialitesPartenaire.forEach((sousSpecialite: any) => {
                        partenaireObjet.ajouterSousSpecialite(that.modelePlateforme.getSousSpecialiteAvecIdentifiant(sousSpecialite.identifiantSousSpecialite));
                    });
                    partenaire.listeMobilitesPartenaire.forEach((mobilite: any) => {
                        partenaireObjet.ajouterMobilite(that.modelePlateforme.getMobiliteAvecIdentifiant(mobilite.identifiantMobilite));
                    });
                    partenaire.listeAidesFinancieresPartenaire.forEach((aideFinanciere: any) => {
                        partenaireObjet.ajouterAideFinanciere(that.modelePlateforme.getAideFinanciereAvecIdentifiant(aideFinanciere.identifiantAideFinanciere));
                    });
                    partenaire.listeContactsPartenaire.forEach((contact: any) => {
                        partenaireObjet.ajouterContact(that.modelePlateforme.getContactAvecIdentifiant(contact.identifiantContact));
                    });

                    partenaireObjet.InformationLogementPartenaire = partenaire.informationLogementPartenaire;
                    partenaireObjet.InformationCoutPartenaire = partenaire.informationCoutPartenaire;

                    that.modelePlateforme.ajouterPartenaire(partenaireObjet);
                    that.notifieAjoutPartenaire(partenaireObjet);
                    console.log(that.modelePlateforme);
                });
            },
            error: function (erreur) {
                console.log(erreur);
                //that.notifieErreur(erreur.responseJSON);
            }
        });
    }

    public ajouterSousSpecialiteDansPartenaire(sousSpecialite: SousSpecialite, partenaire: Partenaire): void {
        var that = this;
        $.ajax({
            url: "api/specialitePartenaire",
            method: "post",
            data: { sousspecialite: sousSpecialite.getObjetSerializableId(), partenaire: partenaire.getObjetSerializableId() },
            success: function (resultat) {
                partenaire.ajouterSousSpecialite(sousSpecialite);
                that.notifieAjoutSousSpecialiteDansPartenaire(sousSpecialite, partenaire);
            },
            error: function (erreur) {
                console.log(erreur);
                //that.notifieErreur(erreur.responseJSON);
            }
        });
    }

    public supprimerSpecialiteDansPartenaire(specialite: Specialite, partenaire: Partenaire): void {

    }

    public ajouterMobiliteDansPartenaire(mobilite: Mobilite, partenaire: Partenaire): void {
        var that = this;
        $.ajax({
            url: "api/mobilitePartenaire",
            method: "post",
            data: { specialite: mobilite.getObjetSerializableId(), partenaire: partenaire.getObjetSerializableId() },
            success: function (resultat) {
                partenaire.ajouterMobilite(mobilite);
                that.notifieAjoutMobiliteDansPartenaire(mobilite, partenaire);
            },
            error: function (erreur) {
                console.log(erreur);
                //that.notifieErreur(erreur.responseJSON);
            }
        });
    }

    public supprimerMobiliteDansPartenaire(mobilite: Mobilite, partenaire: Partenaire): void {

    }

    public ajouterAideFinanciereDansPartenaire(aideFinanciere: AideFinanciere, partenaire: Partenaire): void {
        var that = this;
        $.ajax({
            url: "api/aideFinancierePartenaire",
            method: "post",
            data: { specialite: aideFinanciere.getObjetSerializableId(), partenaire: partenaire.getObjetSerializableId() },
            success: function (resultat) {
                partenaire.ajouterAideFinanciere(aideFinanciere);
                that.notifieAjoutAideFinanciereDansPartenaire(aideFinanciere, partenaire);
            },
            error: function (erreur) {
                console.log(erreur);
                //that.notifieErreur(erreur.responseJSON);
            }
        });
    }

    public supprimerAideFinanciereDansPartenaire(aideFinanciere: AideFinanciere, partenaire: Partenaire): void {

    }

    public ajouterContactDansPartenaire(contact: Contact, partenaire: Partenaire): void {
        var that = this;
        $.ajax({
            url: "api/contactPartenaire",
            method: "post",
            data: { specialite: contact.getObjetSerializableId(), partenaire: partenaire.getObjetSerializableId() },
            success: function (resultat) {
                partenaire.ajouterContact(contact);
                that.notifieAjoutContactDansPartenaire(contact, partenaire);
            },
            error: function (erreur) {
                console.log(erreur);
                //that.notifieErreur(erreur.responseJSON);
            }
        });
    }

    public supprimerContactDansPartenaire(contact: Contact, partenaire: Partenaire): void {

    }

    public ajouterAideFinanciere(aideFinanciere: AideFinanciere): void {
        var that = this;
        $.ajax({
            url: "api/aidesfinancieres",
            method: "post",
            data: aideFinanciere.getObjetSerializable(),
            success: function (resultat) {
                aideFinanciere.IdentifiantAideFinanciere = resultat.identifiantAideFinanciere;
                that.modelePlateforme.ajouterAideFinanciere(aideFinanciere);
                that.notifieAjoutAideFinanciere(aideFinanciere);
            },
            error: function (erreur) {
                console.log(erreur);
                //that.notifieErreur(erreur.responseJSON);
            }
        });
    }

    public supprimerAideFinanciere(aideFinanciere: AideFinanciere): void {
        var that = this;
        $.ajax({
            url: "api/aidesfinancieres",
            method: "delete",
            data: aideFinanciere.getObjetSerializableId(),
            success: function (resultat) {
                that.modelePlateforme.ListePartenairesPlateforme.forEach((partenaire: Partenaire) => {
                    partenaire.supprimerAideFinanciere(aideFinanciere);
                });
                that.modelePlateforme.supprimerAideFinanciere(aideFinanciere);
                that.notifieSuppressionAideFinanciere(aideFinanciere);
            },
            error: function (erreur) {
                console.log(erreur);
                //that.notifieErreur(erreur.responseJSON);
            }
        });
    }

    public modifierAideFinanciere(aideFinanciere: AideFinanciere): void {
        var that = this;
        $.ajax({
            url: "api/aidesfinancieres",
            method: "put",
            data: aideFinanciere.getObjetSerializable(),
            success: function (resultat) {
                that.notifieModificationAideFinanciere(aideFinanciere);
            },
            error: function (erreur) {
                console.log(erreur);
                //that.notifieErreur(erreur.responseJSON);
            }
        });
    }

    public chargerListeAidesFinancieres(): JQueryPromise<any> {
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
                    that.modelePlateforme.ajouterAideFinanciere(aideFinanciereObjet);
                    that.notifieAjoutAideFinanciere(aideFinanciereObjet);
                    //console.log(that.modelePlateforme);
                });
            },
            error: function (erreur) {
                console.log(erreur);
                //that.notifieErreur(erreur.responseJSON);
            }
        });
    }

    public ajouterContact(contact: Contact): void {
        var that = this;
        $.ajax({
            url: "api/contacts",
            method: "post",
            data: contact.getObjetSerializable(),
            success: function (resultat) {
                contact.IdentifiantContact = resultat.identifiantContact;
                that.modelePlateforme.ajouterContact(contact);
                that.notifieAjoutContact(contact);
            },
            error: function (erreur) {
                console.log(erreur);
                //that.notifieErreur(erreur.responseJSON);
            }
        });
    }

    public supprimerContact(contact: Contact): void {
        var that = this;
        $.ajax({
            url: "api/contacts",
            method: "delete",
            data: contact.getObjetSerializableId(),
            success: function (resultat) {
                that.modelePlateforme.ListePartenairesPlateforme.forEach((partenaire: Partenaire) => {
                    partenaire.supprimerContact(contact);
                });
                that.modelePlateforme.supprimerContact(contact);
                that.notifieSuppressionContact(contact);
            },
            error: function (erreur) {
                console.log(erreur);
                //that.notifieErreur(erreur.responseJSON);
            }
        });
    }

    public modifierContact(contact: Contact): void {
        var that = this;
        $.ajax({
            url: "api/contacts",
            method: "put",
            data: contact.getObjetSerializable(),
            success: function (resultat) {
                that.notifieModificationContact(contact);
            },
            error: function (erreur) {
                console.log(erreur);
                //that.notifieErreur(erreur.responseJSON);
            }
        });
    }

    public chargerListeContacts(): JQueryPromise<any> {
        var that = this;
        return $.ajax({
            url: "api/contacts",
            method: "get",
            dataType: "json",
            success: function (resultat) {
                resultat.forEach(function (contact: any) {
                    var contactObjet = new Contact();
                    contactObjet.IdentifiantContact = contact.identifiantContact;
                    contactObjet.NomContact = contact.nomContact;
                    contactObjet.PrenomContact = contact.prenomContact;
                    contactObjet.AdresseMailContact = contact.adresseMailContact;
                    contactObjet.FonctionContact = contact.fonctionContact;
                    that.modelePlateforme.ajouterContact(contactObjet);
                    that.notifieAjoutContact(contactObjet);
                    //console.log(that.modelePlateforme);
                });
            },
            error: function (erreur) {
                console.log(erreur);
                //that.notifieErreur(erreur.responseJSON);
            }
        });
    }

}