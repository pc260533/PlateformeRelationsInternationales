import { SousSpecialite } from "./sousspecialite";

export class Specialite {
    private identifiantSpecialite: number;
    private nomSpecialite: string;
    private listeSousSpecialites: SousSpecialite[];

    public get IdentifiantSpecialite(): number {
        return this.identifiantSpecialite;
    }

    public set IdentifiantSpecialite(identifiantSpecialite: number) {
        this.identifiantSpecialite = identifiantSpecialite;
    }

    public get NomSpecialite(): string {
        return this.nomSpecialite;
    }

    public set NomSpecialite(nomSpecialite: string) {
        this.nomSpecialite = nomSpecialite;
    }

    public constructor() {
        this.identifiantSpecialite = 0;
        this.nomSpecialite = "";
        this.listeSousSpecialites = [];
    }

    public ajouterSousSpecialite(sousSpecialite: SousSpecialite): void {
        this.listeSousSpecialites.push(sousSpecialite);
    }

    public supprimerSousSpecialite(sousSpecialite: SousSpecialite): void {
        var indexSousSpecialite = this.listeSousSpecialites.indexOf(sousSpecialite);
        if (!(indexSousSpecialite === undefined) && !(indexSousSpecialite === null)) {
            this.listeSousSpecialites.splice(indexSousSpecialite, 1);
        }
    }

}