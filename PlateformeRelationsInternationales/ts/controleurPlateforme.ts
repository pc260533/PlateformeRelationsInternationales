import { IVuePlateforme } from "./ivuePlateforme";
import { Plateforme } from "./modelePlateforme/plateforme";
import { ErreurSerializable } from "./erreur/erreurSerializable";
import { InformationSerializable } from "./information/informationSerializable";

export class ControleurPlateforme {
    protected listeVuesPlateforme: IVuePlateforme[];
    protected modelePlateforme: Plateforme;

    protected creerErreurSerializable(erreurJson: any): ErreurSerializable {
        var erreurSerializable = new ErreurSerializable();
        erreurSerializable.MessageErreur = erreurJson.messageErreur;
        erreurSerializable.TitreErreur = erreurJson.titreErreur;
        erreurSerializable.StatusErreur = erreurJson.statusErreur;
        erreurSerializable.DeveloppeurMessageErreur = erreurJson.developpeurMessageErreur;
        erreurSerializable.StackTraceErreur = erreurJson.stackTraceErreur;
        return erreurSerializable;
    }

    protected creerInformationSerializable(informationJson: any): InformationSerializable {
        var informationSerializable = new InformationSerializable();
        informationSerializable.TitreInformation = informationJson.titreInformation;
        informationSerializable.MessageInformation = informationJson.messageInformation;
        informationSerializable.DetailsInformation = informationJson.detailsInformation;
        return informationSerializable;
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

    protected notifieInformation(information: InformationSerializable): void {
        this.listeVuesPlateforme.forEach((ivuePlateforme: IVuePlateforme) => {
            ivuePlateforme.afficheInformation(information);
        });
    }

}