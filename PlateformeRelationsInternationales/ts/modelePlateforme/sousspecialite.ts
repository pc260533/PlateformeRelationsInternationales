export class SousSpecialite {
    private identifiantSousSpecialite: number;
    private nomSousSpecialite: string;

    public get IdentifiantSousSpecialite(): number {
        return this.identifiantSousSpecialite;
    }

    public set IdentifiantSousSpecialite(identifiantSousSpecialite: number) {
        this.identifiantSousSpecialite = identifiantSousSpecialite;
    }

    public get NomSousSpecialite(): string {
        return this.nomSousSpecialite;
    }

    public set NomSousSpecialite(nomSousSpecialite: string) {
        this.nomSousSpecialite = nomSousSpecialite;
    }

    public constructor() {
        this.identifiantSousSpecialite = 0;
        this.nomSousSpecialite = "";
    }

}