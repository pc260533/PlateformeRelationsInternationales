import { ControleurPlateforme } from "../controleurPlateforme";
import { Plateforme } from "../modelePlateforme/plateforme";
import { IVuePlateforme } from "../ivuePlateforme";
import { IVueCoordinateurs } from "../vuesPlateforme/ivueCoordinateurs";
import { Partenaire } from "../modelePlateforme/partenaire";
import { Coordinateur } from "../modelePlateforme/coordinateur";

export class ControleurCoordinateurs extends ControleurPlateforme {

    public constructor(plateforme: Plateforme) {
        super(plateforme);
    }

    protected notifieAjoutCoordinateur(coordinateur: Coordinateur): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            if ((ivuePlateforme as IVueCoordinateurs).ajoutCoordinateur) {
                (ivuePlateforme as IVueCoordinateurs).ajoutCoordinateur(coordinateur);
            }
        });
    }

    protected notifieSuppressionCoordinateur(coordinateur: Coordinateur): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            if ((ivuePlateforme as IVueCoordinateurs).suppressionCoordinateur) {
                (ivuePlateforme as IVueCoordinateurs).suppressionCoordinateur(coordinateur);
            }
        });
    }

    protected notifieModificationCoordinateur(coordinateur: Coordinateur): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            if ((ivuePlateforme as IVueCoordinateurs).modificationCoordinateur) {
                (ivuePlateforme as IVueCoordinateurs).modificationCoordinateur(coordinateur);
            }
        });
    }

    public ajouterCoordinateur(coordinateur: Coordinateur): void {
        var that = this;
        $.ajax({
            url: "api/coordinateurs",
            method: "post",
            data: { utilisateur: that.modelePlateforme.UtilisateurConnecte.getObjetSerializableId(), coordinateur: coordinateur.getObjetSerializable() },
            success: function (resultat) {
                coordinateur.IdentifiantContact = resultat.identifiantContact;
                that.modelePlateforme.ajouterCoordinateur(coordinateur);
                that.notifieAjoutCoordinateur(coordinateur);
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public supprimerCoordinateur(coordinateur: Coordinateur): void {
        var that = this;
        $.ajax({
            url: "api/coordinateurs",
            method: "delete",
            data: { utilisateur: that.modelePlateforme.UtilisateurConnecte.getObjetSerializableId(), coordinateur: coordinateur.getObjetSerializableId() },
            success: function (resultat) {
                that.modelePlateforme.ListePartenairesPlateforme.forEach((partenaire: Partenaire) => {
                    partenaire.supprimerCoordinateur(coordinateur);
                });
                that.modelePlateforme.supprimerCoordinateur(coordinateur);
                that.notifieSuppressionCoordinateur(coordinateur);
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public modifierCoordinateur(ancienCoordinateur: Coordinateur, nouveauCoordinateur: Coordinateur): void {
        nouveauCoordinateur.IdentifiantContact = ancienCoordinateur.IdentifiantContact;
        var that = this;
        $.ajax({
            url: "api/coordinateurs",
            method: "put",
            data: { utilisateur: that.modelePlateforme.UtilisateurConnecte.getObjetSerializableId(), coordinateur: nouveauCoordinateur.getObjetSerializable() },
            success: function (resultat) {
                ancienCoordinateur.NomContact = nouveauCoordinateur.NomContact;
                ancienCoordinateur.PrenomContact = nouveauCoordinateur.PrenomContact;
                ancienCoordinateur.AdresseMailContact = nouveauCoordinateur.AdresseMailContact;
                ancienCoordinateur.FonctionContact = nouveauCoordinateur.FonctionContact;
                that.notifieModificationCoordinateur(ancienCoordinateur);
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public chargerListeCoordinateurs(): JQueryPromise<any> {
        if (this.modelePlateforme.ListeCoordinateursPlateforme.length > 0) {
            this.modelePlateforme.ListeCoordinateursPlateforme.forEach((Coordinateur: Coordinateur) => {
                this.notifieAjoutCoordinateur(Coordinateur);
            });
            return $.Deferred().resolve();
        }
        var that = this;
        return $.ajax({
            url: "api/coordinateurs",
            method: "get",
            dataType: "json",
            success: function (resultat) {
                resultat.forEach(function (coordinateur: any) {
                    var coordinateurObjet = new Coordinateur();
                    coordinateurObjet.IdentifiantContact = coordinateur.identifiantContact;
                    coordinateurObjet.NomContact = coordinateur.nomContact;
                    coordinateurObjet.PrenomContact = coordinateur.prenomContact;
                    coordinateurObjet.AdresseMailContact = coordinateur.adresseMailContact;
                    coordinateurObjet.FonctionContact = coordinateur.fonctionContact;
                    that.modelePlateforme.ajouterCoordinateur(coordinateurObjet);
                    that.notifieAjoutCoordinateur(coordinateurObjet);
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