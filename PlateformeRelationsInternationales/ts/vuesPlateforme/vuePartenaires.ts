import { IVuePlateforme } from "../ivuePlateforme";
import { Plateforme } from "../modelePlateforme/plateforme";
import { ControleurPlateforme } from "../controleurPlateforme";
import { Partenaire } from "../modelePlateforme/partenaire";

import Datatables from "./composants/datatables";
import ModalSpecifique from "./composants/modalSpecifique";
import SpinnerSpecifique from "./composants/spinnerSpecifique";

import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import { ProprietesDatatables } from "./composants/proprietesDatatables";
import { ProprietesDatatablesColonne } from "./composants/proprietesDatatablesColonne";
import { ProprietesDatatablesBouton } from "./composants/proprietesDatatablesBouton";

@Component({
    template: require("./templates/vuePartenaires.html"),
    components: {
        Datatables,
        ModalSpecifique,
        SpinnerSpecifique
    }
})
export default class VuePartenaire extends Vue implements IVuePlateforme {
    afficherImages(): void {
        throw new Error("Method not implemented.");
    }
    @Prop() private plateforme!: Plateforme;
    @Prop() private controleurPlateforme!: ControleurPlateforme;
    private proprietesDatatables: ProprietesDatatables;

    @Ref("datatablesPartenaires") readonly datatablesPartenaires!: Datatables<Partenaire>;
    @Ref("modalEditePartenaire") readonly modalEditePartenaire!: ModalSpecifique;
    @Ref("spinner") readonly spinner!: SpinnerSpecifique;

    private initialiserDatatables() {
        this.proprietesDatatables = new ProprietesDatatables();
        this.proprietesDatatables.OrdreDesElementsDeControle = "Bfti";
        this.proprietesDatatables.ajouterColonne(new ProprietesDatatablesColonne("Identifiant Partenaire", "identifiantPartenaire"));
        this.proprietesDatatables.ajouterBouton(new ProprietesDatatablesBouton("Ajouter Partenaire", this.onAjouterPartenaireClick));
        this.proprietesDatatables.ajouterBouton(new ProprietesDatatablesBouton("Supprimer Partenaire", this.onSupprimerPartenaireClick));
        this.proprietesDatatables.ajouterBouton(new ProprietesDatatablesBouton("Modifier Partenaire", this.onModifierPartenaireClick));
    }

    public ajoutPartenaire(partenaire: Partenaire): void {

    }

    public modificationPartenaire(partenaire: Partenaire): void {

    }

    public suppressionPartenaire(partenaire: Partenaire): void {

    }

    public constructor() {
        super();
        this.initialiserDatatables();
        this.controleurPlateforme.inscrire(this);
        this.controleurPlateforme.chargerPartenaires();
    }

    mounted() {
        let partenaire = new Partenaire();
        partenaire.IdentifiantPartenaire = 0;
        this.datatablesPartenaires.ajouterLigneDansDatatables(partenaire);
    }

    beforeDestroy() {
        this.controleurPlateforme.resilier(this);
    }

    private onAjouterPartenaireClick(): void {
        /*console.log(this);
        console.log(this.datatables.getListeLignesSelectionnees());
        console.log((this.datatables.getListeLignesSelectionnees()[0] as Partenaire).IdentifiantPartenaire);
        console.log(this.datatables.getListeLignesSelectionnees()[0].IdentifiantPartenaire);*/
        this.spinner.montrerSpinner();
        if (this.datatablesPartenaires.getListeLignesSelectionnees().length == 0) {
            this.spinner.caherSpinner();
        }
    }

    private onSupprimerPartenaireClick(): void {

    }

    private onModifierPartenaireClick(): void {

    }

}