import { Partenaire } from "./partenaire";

export class Plateforme {
    private listePartenairesPlateforme: Partenaire[];

    public get ListePartenairesPlateforme(): Partenaire[] {
        return this.listePartenairesPlateforme;
    }

    public constructor() {
        this.listePartenairesPlateforme = [];
    }

    public ajouterPartenaire(partenaire: Partenaire): void {
        this.listePartenairesPlateforme.push(partenaire);
    }

    public supprimerPartenaire(partenaire: Partenaire): void {
        var indexPartenaire = this.listePartenairesPlateforme.indexOf(partenaire);
        if (!(indexPartenaire === undefined) && !(indexPartenaire === null)) {
            this.listePartenairesPlateforme.splice(indexPartenaire, 1);
        }
    }

}