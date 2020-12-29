import { ControleurPlateforme } from "../controleurPlateforme";
import { Plateforme } from "../modelePlateforme/plateforme";
import { IVuePlateforme } from "../ivuePlateforme";
import { IVueVoeux } from "../vuesPlateforme/ivueVoeux";
import { Partenaire } from "../modelePlateforme/partenaire";
import { Voeu } from "../modelePlateforme/voeu";

export class ControleurVoeux extends ControleurPlateforme {

    public constructor(plateforme: Plateforme) {
        super(plateforme);
    }

    protected notifieAjoutVoeu(voeu: Voeu): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            if ((ivuePlateforme as IVueVoeux).ajoutVoeu) {
                (ivuePlateforme as IVueVoeux).ajoutVoeu(voeu);
            }
        });
    }

    protected notifieSuppressionVoeu(voeu: Voeu): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            if ((ivuePlateforme as IVueVoeux).suppressionVoeu) {
                (ivuePlateforme as IVueVoeux).suppressionVoeu(voeu);
            }
        });
    }

    public supprimerVoeu(voeu: Voeu): void {
        var that = this;
        $.ajax({
            url: "api/voeux",
            method: "delete",
            data: { utilisateur: that.modelePlateforme.UtilisateurConnecte.getObjetSerializableId(), voeu: voeu.getObjetSerializableId() },
            success: function (resultat) {
                that.modelePlateforme.ListePartenairesPlateforme.forEach((partenaire: Partenaire) => {
                    if (partenaire.ListeVoeuxPartenaire.includes(voeu)) {
                        partenaire.supprimerVoeu(voeu);
                    }
                });
                that.modelePlateforme.supprimerVoeu(voeu);
                that.notifieSuppressionVoeu(voeu);
            },
            error: function (erreur) {
                //console.log(erreur);
                that.notifieErreur(that.creerErreurSerializable(erreur.responseJSON));
            }
        });
    }

    public chargerListeVoeux(): JQueryPromise<any> {
        if (this.modelePlateforme.ListeVoeuxPlateforme.length > 0) {
            this.modelePlateforme.ListeVoeuxPlateforme.forEach((voeu: Voeu) => {
                this.notifieAjoutVoeu(voeu);
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
                    that.notifieAjoutVoeu(voeuObjet);
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