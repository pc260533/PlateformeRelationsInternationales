export class AideFinanciere {
    private identifiantAideFinanciere: number;
    private nomAideFinanciere: string;

    public get IdentifiantAideFinanciere(): number {
        return this.identifiantAideFinanciere;
    }

    public set IdentifiantAideFinanciere(identifiantAideFinanciere: number) {
        this.identifiantAideFinanciere = identifiantAideFinanciere;
    }

    public get NomAideFinanciere(): string {
        return this.nomAideFinanciere;
    }

    public set NomAideFinanciere(nomAideFinanciere: string) {
        this.nomAideFinanciere = nomAideFinanciere;
    }

    public constructor() {
        this.identifiantAideFinanciere = 0;
        this.nomAideFinanciere = "";
    }

}