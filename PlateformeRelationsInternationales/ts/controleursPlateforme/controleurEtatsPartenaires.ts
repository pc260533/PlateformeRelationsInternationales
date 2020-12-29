import { ControleurPlateforme } from "../controleurPlateforme";
import { Plateforme } from "../modelePlateforme/plateforme";
import { IVuePlateforme } from "../ivuePlateforme";
import { IVueEtatsPartenaires } from "../vuesPlateforme/ivueEtatsPartenaires";
import { Partenaire } from "../modelePlateforme/partenaire";
import { EtatPartenaire } from "../modelePlateforme/etatpartenaire";


export class ControleurEtatsPartenaires extends ControleurPlateforme {

    public constructor(plateforme: Plateforme) {
        super(plateforme);
    }

    protected notifieAjoutEtatPartenaire(etatPartenaire: EtatPartenaire): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            if ((ivuePlateforme as IVueEtatsPartenaires).ajoutEtatPartenaire) {
                (ivuePlateforme as IVueEtatsPartenaires).ajoutEtatPartenaire(etatPartenaire);
            }
        });
    }

    protected notifieSuppressionEtatPartenaire(etatPartenaire: EtatPartenaire): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            if ((ivuePlateforme as IVueEtatsPartenaires).suppressionEtatPartenaire) {
                (ivuePlateforme as IVueEtatsPartenaires).suppressionEtatPartenaire(etatPartenaire);
            }
        });
    }

    protected notifieModificationEtatPartenaire(etatPartenaire: EtatPartenaire): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            if ((ivuePlateforme as IVueEtatsPartenaires).modificationEtatPartenaire) {
                (ivuePlateforme as IVueEtatsPartenaires).modificationEtatPartenaire(etatPartenaire);
            }
        });
    }

    public ajouterEtatPartenaire(etatPartenaire: EtatPartenaire): void {
        var that = this;
        $.ajax({
            url: "api/etatsPartenaires",
            method: "post",
            data: { utilisateur: that.modelePlateforme.UtilisateurConnecte.getObjetSerializableId(), etatPartenaire: etatPartenaire.getObjetSerializable() },
            success: function (resultat) {
                etatPartenaire.IdentifiantEtatPartenaire = resultat.identifiantEtatPartenaire;
                that.modelePlateforme.ajouterEtatPartenaire(etatPartenaire);
                that.notifieAjoutEtatPartenaire(etatPartenaire);
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public supprimerEtatPartenaire(etatPartenaire: EtatPartenaire): void {
        var that = this;
        $.ajax({
            url: "api/etatsPartenaires",
            method: "delete",
            data: { utilisateur: that.modelePlateforme.UtilisateurConnecte.getObjetSerializableId(), etatPartenaire: etatPartenaire.getObjetSerializableId() },
            success: function (resultat) {
                that.modelePlateforme.ListePartenairesPlateforme.forEach((partenaire: Partenaire) => {
                    if (partenaire.EtatPartenaire == etatPartenaire) {
                        partenaire.EtatPartenaire = null;
                    }
                });
                that.modelePlateforme.supprimerEtatPartenaire(etatPartenaire);
                that.notifieSuppressionEtatPartenaire(etatPartenaire);
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public modifierEtatPartenaire(ancienEtatPartenaire: EtatPartenaire, nouveauEtatPartenaire: EtatPartenaire): void {
        nouveauEtatPartenaire.IdentifiantEtatPartenaire = ancienEtatPartenaire.IdentifiantEtatPartenaire;
        var that = this;
        $.ajax({
            url: "api/etatsPartenaires",
            method: "put",
            data: { utilisateur: that.modelePlateforme.UtilisateurConnecte.getObjetSerializableId(), etatPartenaire: nouveauEtatPartenaire.getObjetSerializable() },
            success: function (resultat) {
                ancienEtatPartenaire.NomEtatPartenaire = nouveauEtatPartenaire.NomEtatPartenaire;
                that.notifieModificationEtatPartenaire(ancienEtatPartenaire);
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public chargerListeEtatsPartenaires(): JQueryPromise<any> {
        if (this.modelePlateforme.ListeEtatsPartenairesPlateforme.length > 0) {
            this.modelePlateforme.ListeEtatsPartenairesPlateforme.forEach((etatPartenaire: EtatPartenaire) => {
                this.notifieAjoutEtatPartenaire(etatPartenaire);
            });
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
                    that.notifieAjoutEtatPartenaire(etatPartenaireObjet);
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