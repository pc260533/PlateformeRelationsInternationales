import { ProprietesDatatablesColonne } from "./proprietesDatatablesColonne";
import { ProprietesDatatablesBouton } from "./proprietesDatatablesBouton";

export class ProprietesDatatables {
    private ordreDesElementsDeControle: string;
    private listeColonnes: DataTables.ColumnSettings[];
    private listeBoutons: ProprietesDatatablesBouton[];

    public get OrdreDesElementsDeControle(): string {
        return this.ordreDesElementsDeControle;
    }

    public set OrdreDesElementsDeControle(ordreDesElementsDeControle: string) {
        this.ordreDesElementsDeControle = ordreDesElementsDeControle;
    }

    public get ListeColonnes(): DataTables.ColumnSettings[] {
        return this.listeColonnes;
    }

    public set ListeColonnes(listeColonnes: DataTables.ColumnSettings[]) {
        this.listeColonnes = listeColonnes;
    }

    public get ListeBoutons(): ProprietesDatatablesBouton[] {
        return this.listeBoutons;
    }

    public set ListeBoutons(listeBoutons: ProprietesDatatablesBouton[]) {
        this.listeBoutons = listeBoutons;
    }

    public constructor() {
        this.ordreDesElementsDeControle = "";
        this.listeColonnes = [];
        this.listeBoutons = [];
    }

    public ajouterColonne(colonne: ProprietesDatatablesColonne): void {
        this.listeColonnes.push({
            "title": colonne.TitreColonne,
            "data": colonne.DonneColonne
        });
    }

    public ajouterBouton(bouton: ProprietesDatatablesBouton): void {
        this.listeBoutons.push(bouton);
    }

}