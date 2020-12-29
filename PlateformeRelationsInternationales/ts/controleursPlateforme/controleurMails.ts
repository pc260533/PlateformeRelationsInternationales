import { ControleurPlateforme } from "../controleurPlateforme";
import { Plateforme } from "../modelePlateforme/plateforme";
import { IVuePlateforme } from "../ivuePlateforme";
import { IVueMails } from "../vuesPlateforme/ivueMails";
import { Partenaire } from "../modelePlateforme/partenaire";
import { Mail } from "../modelePlateforme/mail";

export class ControleurMails extends ControleurPlateforme {

    public constructor(plateforme: Plateforme) {
        super(plateforme);
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

}