import { ControleurPlateforme } from "../controleurPlateforme";
import { Plateforme } from "../modelePlateforme/plateforme";
import { IVuePlateforme } from "../ivuePlateforme";
import { IVuePartenaires } from "../vuesPlateforme/ivuePartenaires";
import { IVueCouts } from "../vuesPlateforme/ivueCouts";
import { Partenaire } from "../modelePlateforme/partenaire";
import { Localisation } from "../modelePlateforme/localisation";
import { ImagePartenaire } from "../modelePlateforme/imagePartenaire";
import { Cout } from "../modelePlateforme/cout";

export class ControleurPartenaires extends ControleurPlateforme {

    public constructor(plateforme: Plateforme) {
        super(plateforme);
    }

    protected notifieAjoutPartenaire(partenaire: Partenaire): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            if ((ivuePlateforme as IVuePartenaires).ajoutPartenaire) {
                (ivuePlateforme as IVuePartenaires).ajoutPartenaire(partenaire);
            }
        });
    }

    protected notifieSuppressionPartenaire(partenaire: Partenaire): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            if ((ivuePlateforme as IVuePartenaires).suppressionPartenaire) {
                (ivuePlateforme as IVuePartenaires).suppressionPartenaire(partenaire);
            }
        });
    }

    protected notifieModificationPartenaire(partenaire: Partenaire): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            if ((ivuePlateforme as IVuePartenaires).modificationPartenaire) {
                (ivuePlateforme as IVuePartenaires).modificationPartenaire(partenaire);
            }
        });
    }

    protected notifieAjoutCout(cout: Cout): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            if ((ivuePlateforme as IVueCouts).ajoutCout) {
                (ivuePlateforme as IVueCouts).ajoutCout(cout);
            }
        });
    }

    protected notifieModificationCout(cout: Cout): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            if ((ivuePlateforme as IVueCouts).modificationCout) {
                (ivuePlateforme as IVueCouts).modificationCout(cout);
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
        formData.append("utilisateur", JSON.stringify(this.modelePlateforme.UtilisateurConnecte.getObjetSerializableId()));

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

    public ajouterPartenaire(partenaire: Partenaire): void {
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
            data: { utilisateur: this.modelePlateforme.UtilisateurConnecte.getObjetSerializableId(), partenaire: partenaire.getObjetSerializable() },
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
        formData.append("utilisateur", JSON.stringify(this.modelePlateforme.UtilisateurConnecte.getObjetSerializableId()));

        var that = this;
        $.ajax({
            url: "api/putpartenaires",
            method: "post",
            data: formData,
            contentType: false,
            processData: false,
            success: function (resultat) {
                ancienPartenaire.NomPartenaire = nouveauPartenaire.NomPartenaire;
                ancienPartenaire.LienPartenaire = nouveauPartenaire.LienPartenaire;
                ancienPartenaire.InformationLogementPartenaire = nouveauPartenaire.InformationLogementPartenaire;
                ancienPartenaire.InformationCoutPartenaire = nouveauPartenaire.InformationCoutPartenaire;
                ancienPartenaire.LocalisationPartenaire.LatitudeLocalisation = nouveauPartenaire.LocalisationPartenaire.LatitudeLocalisation;
                ancienPartenaire.LocalisationPartenaire.LongitudeLocalisation = nouveauPartenaire.LocalisationPartenaire.LongitudeLocalisation;
                ancienPartenaire.LocalisationPartenaire.NomLocalisation = nouveauPartenaire.LocalisationPartenaire.NomLocalisation;
                ancienPartenaire.LocalisationPartenaire.NomPaysLocalisation = nouveauPartenaire.LocalisationPartenaire.NomPaysLocalisation;
                ancienPartenaire.LocalisationPartenaire.CodePaysLocalisation = nouveauPartenaire.LocalisationPartenaire.CodePaysLocalisation;
                ancienPartenaire.CoutPartenaire.supprimerPartenaireCout(ancienPartenaire);
                ancienPartenaire.CoutPartenaire = nouveauPartenaire.CoutPartenaire;
                ancienPartenaire.CoutPartenaire.ajouterPartenaireCout(ancienPartenaire);
                ancienPartenaire.EtatPartenaire = nouveauPartenaire.EtatPartenaire;
                ancienPartenaire.ListeDomainesDeCompetencesPartenaire = nouveauPartenaire.ListeDomainesDeCompetencesPartenaire;
                ancienPartenaire.ListeSousSpecialitesPartenaire = nouveauPartenaire.ListeSousSpecialitesPartenaire;
                ancienPartenaire.ListeMobilitesPartenaires = nouveauPartenaire.ListeMobilitesPartenaires;
                ancienPartenaire.ListeAidesFinancieresPartenaires = nouveauPartenaire.ListeAidesFinancieresPartenaires;
                ancienPartenaire.ListeContactsEtrangersPartenaires = nouveauPartenaire.ListeContactsEtrangersPartenaires;
                ancienPartenaire.ListeCoordinateursPartenaires = nouveauPartenaire.ListeCoordinateursPartenaires;

                //On supprime les images qui ont été supprimés.
                nouveauPartenaire.ListeImagesPartenaire.forEach((imagePartenaire: ImagePartenaire) => {
                    ancienPartenaire.supprimerImagePartenaire(imagePartenaire);
                });
                // On ajoute les images qui ont été ajoutés sans le lien vers le fichier local qui est maintenant inutile.
                resultat.listeImagesPartenaire.forEach((imagePartenaire: any) => {
                    var imagePartenaireObjet = new ImagePartenaire();
                    imagePartenaireObjet.IdentifiantImagePartenaire = imagePartenaire.identifiantImagePartenaire;
                    imagePartenaireObjet.CheminImagePartenaireServeur = imagePartenaire.cheminImagePartenaireServeur;
                    ancienPartenaire.ajouterImagePartenaire(imagePartenaireObjet);
                });

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
                    partenaireObjet.LienPartenaire = partenaire.lienPartenaire;
                    partenaireObjet.InformationLogementPartenaire = partenaire.informationLogementPartenaire;
                    partenaireObjet.InformationCoutPartenaire = partenaire.informationCoutPartenaire;
                    var localisationPartenaire = new Localisation();
                    localisationPartenaire.IdentifiantLocalisation = partenaire.localisationPartenaire.identifiantLocalisation;
                    localisationPartenaire.LatitudeLocalisation = partenaire.localisationPartenaire.latitudeLocalisation;
                    localisationPartenaire.LongitudeLocalisation = partenaire.localisationPartenaire.longitudeLocalisation;
                    localisationPartenaire.NomLocalisation = partenaire.localisationPartenaire.nomLocalisation;
                    localisationPartenaire.NomPaysLocalisation = partenaire.localisationPartenaire.nomPaysLocalisation;
                    localisationPartenaire.CodePaysLocalisation = partenaire.localisationPartenaire.codePaysLocalisation;
                    partenaireObjet.LocalisationPartenaire = localisationPartenaire;
                    partenaireObjet.CoutPartenaire = that.modelePlateforme.getCoutAvecIdentifiant(partenaire.coutPartenaire.identifiantCout);
                    partenaireObjet.CoutPartenaire.ajouterPartenaireCout(partenaireObjet);
                    partenaireObjet.EtatPartenaire = that.modelePlateforme.getEtatPartenaireAvecIdentifiant(partenaire.etatPartenaire.identifiantEtatPartenaire);
                    partenaire.listeDomainesDeCompetencesPartenaire.forEach((domaineDeCompetence: any) => {
                        partenaireObjet.ajouterDomaineDeCompetence(that.modelePlateforme.getDomaineDeCompetenceAvecIdentifiant(domaineDeCompetence.identifiantDomaineDeCompetence));
                    });
                    partenaire.listeSousSpecialitesPartenaire.forEach((sousSpecialite: any) => {
                        partenaireObjet.ajouterSousSpecialite(that.modelePlateforme.getSousSpecialiteAvecIdentifiant(sousSpecialite.identifiantSousSpecialite));
                    });
                    partenaire.listeMobilitesPartenaire.forEach((mobilite: any) => {
                        partenaireObjet.ajouterMobilite(that.modelePlateforme.getMobiliteAvecIdentifiant(mobilite.identifiantMobilite));
                    });
                    partenaire.listeAidesFinancieresPartenaire.forEach((aideFinanciere: any) => {
                        partenaireObjet.ajouterAideFinanciere(that.modelePlateforme.getAideFinanciereAvecIdentifiant(aideFinanciere.identifiantAideFinanciere));
                    });
                    partenaire.listeContactsEtrangersPartenaire.forEach((contactEtranger: any) => {
                        partenaireObjet.ajouterContactEtranger(that.modelePlateforme.getContactEtrangerAvecIdentifiant(contactEtranger.identifiantContact));
                    });
                    partenaire.listeCoordinateursPartenaire.forEach((coordinateur: any) => {
                        partenaireObjet.ajouterCoordinateur(that.modelePlateforme.getCoordinateurAvecIdentifiant(coordinateur.identifiantContact));
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
            data: { utilisateur: this.modelePlateforme.UtilisateurConnecte.getObjetSerializableId(), cout: nouveauCout.getObjetSerializable() },
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