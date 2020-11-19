import { IVuePlateforme } from "./ivuePlateforme";
import { Plateforme } from "./modelePlateforme/plateforme";
import { Partenaire } from "./modelePlateforme/partenaire";

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

    public chargerPartenaires(): void {

    }

    public ajouterPartenaire(partenaire: Partenaire): void {

    }

    public supprimerPartenaire(partenaire: Partenaire): void {

    }

    public modifierPartenaire(partenaire: Partenaire): void {

    }

}