import { ControleurPlateforme } from "../controleurPlateforme";
import { Plateforme } from "../modelePlateforme/plateforme";
import { IVuePlateforme } from "../ivuePlateforme";
import { IVueSpecialites } from "../vuesPlateforme/ivueSpecialites";
import { Partenaire } from "../modelePlateforme/partenaire";
import { Specialite } from "../modelePlateforme/specialite";
import { SousSpecialite } from "../modelePlateforme/sousspecialite";

export class ControleurSpecialites extends ControleurPlateforme {

    public constructor(plateforme: Plateforme) {
        super(plateforme);
    }

    protected notifieAjoutSpecialite(specialite: Specialite): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            if ((ivuePlateforme as IVueSpecialites).ajoutSpecialite) {
                (ivuePlateforme as IVueSpecialites).ajoutSpecialite(specialite);
            }
        });
    }

    protected notifieSuppressionSpecialite(specialite: Specialite): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            if ((ivuePlateforme as IVueSpecialites).suppressionSpecialite) {
                (ivuePlateforme as IVueSpecialites).suppressionSpecialite(specialite);
            }
        });
    }

    protected notifieModificationSpecialite(specialite: Specialite): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            if ((ivuePlateforme as IVueSpecialites).modificationSpecialite) {
                (ivuePlateforme as IVueSpecialites).modificationSpecialite(specialite);
            }
        });
    }

    protected notifieAjoutSousSpecialite(sousSpecialite: SousSpecialite): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            if ((ivuePlateforme as IVueSpecialites).ajoutSousSpecialite) {
                (ivuePlateforme as IVueSpecialites).ajoutSousSpecialite(sousSpecialite);
            }
        });
    }

    protected notifieSuppressionSousSpecialite(sousSpecialite: SousSpecialite): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            if ((ivuePlateforme as IVueSpecialites).suppressionSousSpecialite) {
                (ivuePlateforme as IVueSpecialites).suppressionSousSpecialite(sousSpecialite);
            }
        });
    }

    protected notifieModificationSousSpecialite(sousSpecialite: SousSpecialite): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            if ((ivuePlateforme as IVueSpecialites).modificationSousSpecialite) {
                (ivuePlateforme as IVueSpecialites).modificationSousSpecialite(sousSpecialite);
            }
        });
    }

    public ajouterSpecialite(specialite: Specialite): void {
        var that = this;
        $.ajax({
            url: "api/specialites",
            method: "post",
            data: { utilisateur: that.modelePlateforme.UtilisateurConnecte.getObjetSerializableId(), specialite: specialite.getObjetSerializable() },
            success: function (resultat) {
                specialite.IdentifiantSpecialite = resultat.identifiantSpecialite;
                that.modelePlateforme.ajouterSpecialite(specialite);
                that.notifieAjoutSpecialite(specialite);
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public supprimerSpecialite(specialite: Specialite): void {
        var that = this;
        $.ajax({
            url: "api/specialites",
            method: "delete",
            data: { utilisateur: that.modelePlateforme.UtilisateurConnecte.getObjetSerializableId(), specialite: specialite.getObjetSerializableId() },
            success: function (resultat) {
                specialite.ListeSousSpecialites.forEach((sousSpecialite: SousSpecialite) => {
                    that.modelePlateforme.ListePartenairesPlateforme.forEach((partenaire: Partenaire) => {
                        if (partenaire.ListeSousSpecialitesPartenaire.includes(sousSpecialite)) {
                            partenaire.supprimerSousSpecialite(sousSpecialite);
                        }
                    });
                    that.notifieSuppressionSousSpecialite(sousSpecialite);
                });
                that.modelePlateforme.supprimerSpecialite(specialite);
                that.notifieSuppressionSpecialite(specialite);
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public modifierSpecialite(ancienneSpecialite: Specialite, nouvelleSpecialite: Specialite): void {
        nouvelleSpecialite.IdentifiantSpecialite = ancienneSpecialite.IdentifiantSpecialite;
        var that = this;
        $.ajax({
            url: "api/specialites",
            method: "put",
            data: { utilisateur: that.modelePlateforme.UtilisateurConnecte.getObjetSerializableId(), specialite: nouvelleSpecialite.getObjetSerializable() },
            success: function (resultat) {
                ancienneSpecialite.NomSpecialite = nouvelleSpecialite.NomSpecialite;
                ancienneSpecialite.CouleurSpecialite = nouvelleSpecialite.CouleurSpecialite;
                ancienneSpecialite.ListeSousSpecialites = nouvelleSpecialite.ListeSousSpecialites;
                that.notifieModificationSpecialite(ancienneSpecialite);
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public ajouterSousSpecialite(specialite: Specialite, sousSpecialite: SousSpecialite): void {
        var that = this;
        $.ajax({
            url: "api/sousSpecialites",
            method: "post",
            data: { utilisateur: that.modelePlateforme.UtilisateurConnecte.getObjetSerializableId(), specialite: specialite.getObjetSerializableId(), sousSpecialite: sousSpecialite.getObjetSerializable() },
            success: function (resultat) {
                sousSpecialite.IdentifiantSousSpecialite = resultat.identifiantSousSpecialite;
                specialite.ajouterSousSpecialite(sousSpecialite);
                that.notifieAjoutSousSpecialite(sousSpecialite);
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public supprimerSousSpecialite(specialite: Specialite, sousSpecialite: SousSpecialite): void {
        var that = this;
        $.ajax({
            url: "api/sousSpecialites",
            method: "delete",
            data: { utilisateur: that.modelePlateforme.UtilisateurConnecte.getObjetSerializableId(), sousSpecialite: sousSpecialite.getObjetSerializableId() },
            success: function (resultat) {
                specialite.supprimerSousSpecialite(sousSpecialite);
                that.modelePlateforme.ListePartenairesPlateforme.forEach((partenaire: Partenaire) => {
                    if (partenaire.ListeSousSpecialitesPartenaire.includes(sousSpecialite)) {
                        partenaire.supprimerSousSpecialite(sousSpecialite);
                    }
                });
                that.notifieSuppressionSousSpecialite(sousSpecialite);
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public modifierSousSpecialite(specialite: Specialite, ancienneSousSpecialite: SousSpecialite, nouvelleSousSpecialite: SousSpecialite): void {
        nouvelleSousSpecialite.IdentifiantSousSpecialite = ancienneSousSpecialite.IdentifiantSousSpecialite;
        var that = this;
        $.ajax({
            url: "api/sousSpecialites",
            method: "put",
            data: { utilisateur: that.modelePlateforme.UtilisateurConnecte.getObjetSerializableId(), specialite: specialite.getObjetSerializableId(), sousSpecialite: nouvelleSousSpecialite.getObjetSerializable() },
            success: function (resultat) {
                ancienneSousSpecialite.NomSousSpecialite = nouvelleSousSpecialite.NomSousSpecialite;
                if (that.modelePlateforme.getSpecialiteAvecSousSpecialite(ancienneSousSpecialite) != specialite) {
                    that.modelePlateforme.getSpecialiteAvecSousSpecialite(ancienneSousSpecialite).supprimerSousSpecialite(ancienneSousSpecialite);
                    specialite.ajouterSousSpecialite(ancienneSousSpecialite);
                }
                that.notifieModificationSousSpecialite(ancienneSousSpecialite);
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public chargerListeSpecialites(): JQueryPromise<any> {
        if (this.modelePlateforme.ListeSpecialitesPlateforme.length > 0) {
            this.modelePlateforme.ListeSpecialitesPlateforme.forEach((specialite: Specialite) => {
                specialite.ListeSousSpecialites.forEach((sousSpecialite: SousSpecialite) => {
                    this.notifieAjoutSousSpecialite(sousSpecialite);
                });
                this.notifieAjoutSpecialite(specialite);
            });
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
                        that.notifieAjoutSousSpecialite(sousSpecialiteObjet);
                    });
                    that.modelePlateforme.ajouterSpecialite(specialiteObjet);
                    that.notifieAjoutSpecialite(specialiteObjet);
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