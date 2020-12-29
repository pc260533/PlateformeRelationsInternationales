export class NoeudTreeSpecifique {
    private identifiantNoeud: string;
    private texteNoeud: string;
    private estOuvert: boolean;
    private estInactive: boolean;
    private estSelectionne: boolean;

    public get IdentifiantNoeud(): string {
        return this.identifiantNoeud;
    }

    public set IdentifiantNoeud(identifiantNoeud: string) {
        this.identifiantNoeud = identifiantNoeud;
    }

    public get TexteNoeud(): string {
        return this.texteNoeud;
    }

    public set TexteNoeud(texteNoeud: string) {
        this.texteNoeud = texteNoeud;
    }

    public get EstOuvert(): boolean {
        return this.estOuvert;
    }

    public set EstOuvert(estOuvert: boolean) {
        this.estOuvert = estOuvert;
    }

    public get EstInactive(): boolean {
        return this.estInactive;
    }

    public set EstInactive(estInactive: boolean) {
        this.estInactive = estInactive;
    }

    public get EstSelectionne(): boolean {
        return this.estSelectionne;
    }

    public set EstSelectionne(estSelectionne: boolean) {
        this.estSelectionne = estSelectionne;
    }

    public constructor(identifiantNoeud: string, texteNoeud: string) {
        this.identifiantNoeud = identifiantNoeud;
        this.texteNoeud = texteNoeud;
        this.estOuvert = true;
        this.estInactive = false;
        this.estSelectionne = false;
    }

}