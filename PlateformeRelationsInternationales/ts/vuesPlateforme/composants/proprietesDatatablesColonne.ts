export class ProprietesDatatablesColonne {
    private titreColonne: string;
    private donneColonne: string;

    public get TitreColonne(): string {
        return this.titreColonne;
    }

    public set TitreColonne(titreColonne: string) {
        this.titreColonne = titreColonne;
    }

    public get DonneColonne(): string {
        return this.donneColonne;
    }

    public set DonneColonne(donneColonne: string) {
        this.donneColonne = donneColonne;
    }

    public constructor(titreColonne: string, donneColonne: string) {
        this.titreColonne = titreColonne;
        this.donneColonne = donneColonne;
    }

}