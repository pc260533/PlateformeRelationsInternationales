import { IVuePlateforme } from "./ivuePlateforme";
import { Plateforme } from "./modelePlateforme/plateforme";
import { Partenaire } from "./modelePlateforme/partenaire";
import { Specialite } from "./modelePlateforme/specialite";
import { SousSpecialite } from "./modelePlateforme/sousspecialite";
import { Mobilite } from "./modelePlateforme/mobilite";
import { AideFinanciere } from "./modelePlateforme/aideFinanciere";
import { Contact } from "./modelePlateforme/contact";
import { Localisation } from "./modelePlateforme/localisation";
import { ImagePartenaire } from "./modelePlateforme/imagePartenaire";
import { Cout } from "./modelePlateforme/cout";
import { ErreurSerializable } from "./erreur/erreurSerializable";
import { EtatPartenaire } from "./modelePlateforme/etatpartenaire";
import { Voeu } from "./modelePlateforme/voeu";

export class ControleurPlateforme {
    private listeVuesPlateforme: IVuePlateforme[];
    private modelePlateforme: Plateforme;

    private creerErreurSerializable(erreurJson: any): ErreurSerializable {
        var erreurSerializable = new ErreurSerializable();
        erreurSerializable.MessageErreur = erreurJson.messageErreur;
        erreurSerializable.TitreErreur = erreurJson.titreErreur;
        erreurSerializable.StatusErreur = erreurJson.statusErreur;
        erreurSerializable.DeveloppeurMessageErreur = erreurJson.developpeurMessageErreur;
        erreurSerializable.StackTraceErreur = erreurJson.stackTraceErreur;
        return erreurSerializable;
    }

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

    protected notifieErreur(erreur: ErreurSerializable): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            ivuePlateforme.afficheErreur(erreur);
        });
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

    protected notifieAjoutCout(cout: Cout): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            ivuePlateforme.ajoutCout(cout);
        });
    }

    protected notifieModificationCout(cout: Cout): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            ivuePlateforme.modificationCout(cout);
        });
    }

    public chargerListeSpecialites(): JQueryPromise<any> {
        if (this.modelePlateforme.ListeSpecialitesPlateforme.length > 0) {
            return $.Deferred().resolve();
        }
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
                    specialiteObjet.CouleurSpecialite = specialite.couleurSpecialite;
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
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public chargerListeMobilites(): JQueryPromise<any> {
        if (this.modelePlateforme.ListeMobilitesPlateforme.length > 0) {
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
                    //console.log(that.modelePlateforme);
                });
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public chargerListeEtatsPartenaires(): JQueryPromise<any> {
        if (this.modelePlateforme.ListeEtatsPartenairesPlateforme.length > 0) {
            return $.Deferred().resolve();
        }
        var that = this;
        return $.ajax({
            url: "api/etatsPartenaires",
            method: "get",
            dataType: "json",
            success: function (resultat) {
                resultat.forEach(function (etatPartenaire: any) {
                    var etatPartenaireObjet = new EtatPartenaire();
                    etatPartenaireObjet.IdentifiantEtatPartenaire = etatPartenaire.identifiantEtatPartenaire;
                    etatPartenaireObjet.NomEtatPartenaire = etatPartenaire.nomEtatPartenaire;
                    that.modelePlateforme.ajouterEtatPartenaire(etatPartenaireObjet);
                    //console.log(that.modelePlateforme);
                });
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    private ajouterPartenaireAjax(partenaire: Partenaire) {
        var that = this;
        var formData = new FormData();
        partenaire.ListeImagesPartenaire.forEach((imagePartenaire: ImagePartenaire, indexImagePartenaire: number) => {
            formData.append("imagePartenaire" + indexImagePartenaire, imagePartenaire.FileImagePartenaireLocal);
        });
        formData.append("partenaire", JSON.stringify(partenaire.getObjetSerializable()));

        $.ajax({
            url: "api/partenaires",
            method: "post",
            data: formData,
            contentType: false,
            processData: false,
            success: function (resultat) {
                partenaire.IdentifiantPartenaire = resultat.identifiantPartenaire;
                partenaire.LocalisationPartenaire.IdentifiantLocalisation = resultat.localisationPartenaire.identifiantLocalisation;
                // On remplace les objets partenaires qui peuvent contenir des liens vers des fichiers locaux par des références au serveur.
                partenaire.ListeImagesPartenaire = [];
                resultat.listeImagesPartenaire.forEach((imagePartenaire: any) => {
                    var imagePartenaireObjet = new ImagePartenaire();
                    imagePartenaireObjet.IdentifiantImagePartenaire = imagePartenaire.identifiantImagePartenaire;
                    imagePartenaireObjet.CheminImagePartenaireServeur = imagePartenaire.cheminImagePartenaireServeur;
                    partenaire.ajouterImagePartenaire(imagePartenaireObjet);
                });
                partenaire.CoutPartenaire.ajouterPartenaireCout(partenaire);
                that.modelePlateforme.ajouterPartenaire(partenaire);
                that.notifieAjoutPartenaire(partenaire);
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public ajouterPartenaire(partenaire: Partenaire): void  {
        var coutPartenaire = this.modelePlateforme.getCoutAvecNomPays(partenaire.LocalisationPartenaire.NomPaysLocalisation);
        if (!coutPartenaire) {
            var cout = new Cout();
            cout.NomPaysCout = partenaire.LocalisationPartenaire.NomPaysLocalisation;
            $.when(this.ajouterCout(cout)).done(() => {
                partenaire.CoutPartenaire = cout;
                this.ajouterPartenaireAjax(partenaire);
            });
        }
        else {
            partenaire.CoutPartenaire = coutPartenaire;
            this.ajouterPartenaireAjax(partenaire);
        }
    }

    public supprimerPartenaire(partenaire: Partenaire): void {
        var that = this;
        $.ajax({
            url: "api/partenaires",
            method: "delete",
            //pour supprimer le partenaire il faut supprimer le partenaire et la localisation donc on passe l'id du partenaire et l'id de sa localisation
            data: partenaire.getObjetSerializable(),
            success: function (resultat) {
                partenaire.CoutPartenaire.supprimerPartenaireCout(partenaire);
                that.modelePlateforme.supprimerPartenaire(partenaire);
                that.notifieSuppressionPartenaire(partenaire);
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    private modifierPartenaireAjax(ancienPartenaire: Partenaire, nouveauPartenaire: Partenaire): void {
        console.log(nouveauPartenaire);
        console.log(ancienPartenaire);
        nouveauPartenaire.IdentifiantPartenaire = ancienPartenaire.IdentifiantPartenaire;
        nouveauPartenaire.LocalisationPartenaire.IdentifiantLocalisation = ancienPartenaire.LocalisationPartenaire.IdentifiantLocalisation;

        var formData = new FormData();
        var listeImagesPartenaireAAjouter: ImagePartenaire[] = [];
        nouveauPartenaire.ListeImagesPartenaire.forEach((imagePartenaire: ImagePartenaire, indexImagePartenaire: number) => {
            if (imagePartenaire.FileImagePartenaireLocal != null) {
                formData.append("imagePartenaire" + indexImagePartenaire, imagePartenaire.FileImagePartenaireLocal);
                listeImagesPartenaireAAjouter.push(imagePartenaire);
            }
        });
        listeImagesPartenaireAAjouter.forEach((imagePartenaire: ImagePartenaire) => {
            nouveauPartenaire.supprimerImagePartenaire(imagePartenaire);
        });
        formData.append("partenaire", JSON.stringify(nouveauPartenaire.getObjetSerializable()));

        var that = this;
        $.ajax({
            url: "api/putpartenaires",
            method: "post",
            data: formData,
            contentType: false,
            processData: false,
            success: function (resultat) {
                ancienPartenaire.NomPartenaire = nouveauPartenaire.NomPartenaire;
                ancienPartenaire.DomaineDeCompetencePartenaire = nouveauPartenaire.DomaineDeCompetencePartenaire;
                ancienPartenaire.LienPartenaire = nouveauPartenaire.LienPartenaire;
                ancienPartenaire.LocalisationPartenaire.LatitudeLocalisation = nouveauPartenaire.LocalisationPartenaire.LatitudeLocalisation;
                ancienPartenaire.LocalisationPartenaire.LongitudeLocalisation = nouveauPartenaire.LocalisationPartenaire.LongitudeLocalisation;
                ancienPartenaire.LocalisationPartenaire.NomLocalisation = nouveauPartenaire.LocalisationPartenaire.NomLocalisation;
                ancienPartenaire.LocalisationPartenaire.NomPaysLocalisation = nouveauPartenaire.LocalisationPartenaire.NomPaysLocalisation;
                ancienPartenaire.LocalisationPartenaire.CodePaysLocalisation = nouveauPartenaire.LocalisationPartenaire.CodePaysLocalisation;
                ancienPartenaire.ListeSousSpecialitesPartenaire = nouveauPartenaire.ListeSousSpecialitesPartenaire;
                ancienPartenaire.ListeMobilitesPartenaires = nouveauPartenaire.ListeMobilitesPartenaires;
                ancienPartenaire.ListeAidesFinancieresPartenaires = nouveauPartenaire.ListeAidesFinancieresPartenaires;
                ancienPartenaire.ListeContactsPartenaires = nouveauPartenaire.ListeContactsPartenaires;
                ancienPartenaire.InformationLogementPartenaire = nouveauPartenaire.InformationLogementPartenaire;
                ancienPartenaire.InformationCoutPartenaire = nouveauPartenaire.InformationCoutPartenaire;

                //On supprime les images qui ont été supprimés.
                nouveauPartenaire.ListeImagesPartenaire.forEach((imagePartenaire: ImagePartenaire) => {
                    ancienPartenaire.supprimerImagePartenaire(imagePartenaire);
                });
                console.log(ancienPartenaire.ListeImagesPartenaire);
                console.log(nouveauPartenaire.ListeImagesPartenaire);
                // On ajoute les images qui ont été ajoutés sans le lien vers le fichier local qui est maintenant inutile.
                resultat.listeImagesPartenaire.forEach((imagePartenaire: any) => {
                    var imagePartenaireObjet = new ImagePartenaire();
                    imagePartenaireObjet.IdentifiantImagePartenaire = imagePartenaire.identifiantImagePartenaire;
                    imagePartenaireObjet.CheminImagePartenaireServeur = imagePartenaire.cheminImagePartenaireServeur;
                    ancienPartenaire.ajouterImagePartenaire(imagePartenaireObjet);
                });

                ancienPartenaire.CoutPartenaire.supprimerPartenaireCout(ancienPartenaire);
                ancienPartenaire.CoutPartenaire = nouveauPartenaire.CoutPartenaire;
                ancienPartenaire.CoutPartenaire.ajouterPartenaireCout(ancienPartenaire);
                ancienPartenaire.EtatPartenaire = nouveauPartenaire.EtatPartenaire;

                that.notifieModificationPartenaire(ancienPartenaire);
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public modifierPartenaire(ancienPartenaire: Partenaire, nouveauPartenaire: Partenaire): void {
        var coutPartenaire = this.modelePlateforme.getCoutAvecNomPays(nouveauPartenaire.LocalisationPartenaire.NomPaysLocalisation);
        if (!coutPartenaire) {
            var cout = new Cout();
            cout.NomPaysCout = nouveauPartenaire.LocalisationPartenaire.NomPaysLocalisation;
            $.when(this.ajouterCout(cout)).done(() => {
                nouveauPartenaire.CoutPartenaire = cout;
                this.modifierPartenaireAjax(ancienPartenaire, nouveauPartenaire);
            });
        }
        else {
            nouveauPartenaire.CoutPartenaire = coutPartenaire;
            this.modifierPartenaireAjax(ancienPartenaire, nouveauPartenaire);
        }
    }

    public chargerListePartenaires(): JQueryPromise<any> {
        if (this.modelePlateforme.ListePartenairesPlateforme.length > 0) {
            this.modelePlateforme.ListePartenairesPlateforme.forEach((partenaire: Partenaire) => {
                this.notifieAjoutPartenaire(partenaire);
            });
            return $.Deferred().resolve();
        }
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
                    partenaireObjet.LienPartenaire = partenaire.lienPartenaire;

                    var localisationPartenaire = new Localisation();
                    localisationPartenaire.IdentifiantLocalisation = partenaire.localisationPartenaire.identifiantLocalisation;
                    localisationPartenaire.LatitudeLocalisation = partenaire.localisationPartenaire.latitudeLocalisation;
                    localisationPartenaire.LongitudeLocalisation = partenaire.localisationPartenaire.longitudeLocalisation;
                    localisationPartenaire.NomLocalisation = partenaire.localisationPartenaire.nomLocalisation;
                    localisationPartenaire.NomPaysLocalisation = partenaire.localisationPartenaire.nomPaysLocalisation;
                    localisationPartenaire.CodePaysLocalisation = partenaire.localisationPartenaire.codePaysLocalisation;
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
                    partenaire.listeVoeuxPartenaire.forEach((voeu: any) => {
                        partenaireObjet.ajouterVoeu(that.modelePlateforme.getVoeuAvecIdentifiant(voeu.identifiantVoeu));
                    });
                    partenaire.listeImagesPartenaire.forEach((imagePartenaire: any) => {
                        var imagePartenaireObjet = new ImagePartenaire();
                        imagePartenaireObjet.IdentifiantImagePartenaire = imagePartenaire.identifiantImagePartenaire;
                        imagePartenaireObjet.CheminImagePartenaireServeur = imagePartenaire.cheminImagePartenaireServeur;
                        partenaireObjet.ajouterImagePartenaire(imagePartenaireObjet);
                    });

                    partenaireObjet.InformationLogementPartenaire = partenaire.informationLogementPartenaire;
                    partenaireObjet.InformationCoutPartenaire = partenaire.informationCoutPartenaire;

                    partenaireObjet.CoutPartenaire = that.modelePlateforme.getCoutAvecIdentifiant(partenaire.coutPartenaire.identifiantCout);
                    partenaireObjet.CoutPartenaire.ajouterPartenaireCout(partenaireObjet);

                    partenaireObjet.EtatPartenaire = that.modelePlateforme.getEtatPartenaireAvecIdentifiant(partenaire.etatPartenaire.identifiantEtatPartenaire);

                    that.modelePlateforme.ajouterPartenaire(partenaireObjet);
                    that.notifieAjoutPartenaire(partenaireObjet);
                    //console.log(that.modelePlateforme);
                });
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
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
            data: aideFinanciere.getObjetSerializableId(),
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
            data: nouvelleAideFinanciere.getObjetSerializable(),
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
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
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
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public modifierContact(ancienContact: Contact, nouveauContact: Contact): void {
        nouveauContact.IdentifiantContact = ancienContact.IdentifiantContact;
        var that = this;
        $.ajax({
            url: "api/contacts",
            method: "put",
            data: nouveauContact.getObjetSerializable(),
            success: function (resultat) {
                ancienContact.NomContact = nouveauContact.NomContact;
                ancienContact.PrenomContact = nouveauContact.PrenomContact;
                ancienContact.AdresseMailContact = nouveauContact.AdresseMailContact;
                ancienContact.FonctionContact = nouveauContact.FonctionContact;
                that.notifieModificationContact(ancienContact);
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public chargerListeContacts(): JQueryPromise<any> {
        if (this.modelePlateforme.ListeContactsPlateforme.length > 0) {
            this.modelePlateforme.ListeContactsPlateforme.forEach((contact: Contact) => {
                this.notifieAjoutContact(contact);
            });
            return $.Deferred().resolve();
        }
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
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public supprimerVoeu(): void {
        //suprimer voeu
    }

    public chargerListeVoeux(): JQueryPromise<any> {
        if (this.modelePlateforme.ListeVoeuxPlateforme.length > 0) {
            this.modelePlateforme.ListeVoeuxPlateforme.forEach((voeu: Voeu) => {
                //notifier ajou voeu
                //page voeu
                //this.notifieAjoutVoeu(voeu);
            });
            return $.Deferred().resolve();
        }
        var that = this;
        return $.ajax({
            url: "api/voeux",
            method: "get",
            dataType: "json",
            success: function (resultat) {
                resultat.forEach(function (voeu: any) {
                    var voeuObjet = new Voeu();
                    voeuObjet.IdentifiantVoeu = voeu.identifiantVoeu;
                    voeuObjet.AdresseMailVoeu = voeu.adresseMailVoeu;
                    that.modelePlateforme.ajouterVoeu(voeuObjet);
                    //that.notifieAjoutVoeu(voeuObjet);
                    //console.log(that.modelePlateforme);
                });
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
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
            success: function (resultat) {
                //actualiser les voeux
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    private ajouterCout(cout: Cout): JQueryPromise<any> {
        var that = this;
        return $.ajax({
            url: "api/couts",
            method: "post",
            data: cout.getObjetSerializable(),
            success: function (resultat) {
                cout.IdentifiantCout = resultat.identifiantCout;
                that.modelePlateforme.ajouterCout(cout);
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public modifierCout(ancienCout: Cout, nouveauCout: Cout): void {
        nouveauCout.IdentifiantCout = ancienCout.IdentifiantCout;
        var that = this;
        $.ajax({
            url: "api/couts",
            method: "put",
            data: nouveauCout.getObjetSerializable(),
            success: function (resultat) {
                ancienCout.CoutMoyenParMois = nouveauCout.CoutMoyenParMois;
                ancienCout.CoutLogementParMois = nouveauCout.CoutLogementParMois;
                ancienCout.CoutVieParMois = nouveauCout.CoutVieParMois;
                ancienCout.CoutInscriptionParMois = nouveauCout.CoutInscriptionParMois;
                that.notifieModificationCout(ancienCout);
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public chargerListeCouts(): JQueryPromise<any> {
        if (this.modelePlateforme.ListeCoutsPlateforme.length > 0) {
            this.modelePlateforme.ListeCoutsPlateforme.forEach((cout: Cout) => {
                this.notifieAjoutCout(cout);
            });
            return $.Deferred().resolve();
        }
        var that = this;
        return $.ajax({
            url: "api/couts",
            method: "get",
            dataType: "json",
            success: function (resultat) {
                resultat.forEach(function (cout: any) {
                    var coutObjet = new Cout();
                    coutObjet.IdentifiantCout = cout.identifiantCout;
                    coutObjet.NomPaysCout = cout.nomPaysCout;
                    coutObjet.CoutMoyenParMois = cout.coutMoyenParMois;
                    coutObjet.CoutLogementParMois = cout.coutLogementParMois;
                    coutObjet.CoutVieParMois = cout.coutVieParMois;
                    coutObjet.CoutInscriptionParMois = cout.coutInscriptionParMois;
                    that.modelePlateforme.ajouterCout(coutObjet);
                    that.notifieAjoutCout(coutObjet);
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