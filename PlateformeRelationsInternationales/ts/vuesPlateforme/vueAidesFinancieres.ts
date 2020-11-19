import { IVuePlateforme } from "../ivuePlateforme";
import { Plateforme } from "../modelePlateforme/plateforme";
import { ControleurPlateforme } from "../controleurPlateforme";
import { Partenaire } from "../modelePlateforme/partenaire";
import { SousSpecialite } from "../modelePlateforme/sousspecialite";
import { Mobilite } from "../modelePlateforme/mobilite";
import { AideFinanciere } from "../modelePlateforme/aideFinanciere";
import { Contact } from "../modelePlateforme/contact";

import Datatables from "./composants/datatables";
import { ProprietesDatatables } from "./composants/proprietesDatatables";
import { ProprietesDatatablesColonne } from "./composants/proprietesDatatablesColonne";
import { ProprietesDatatablesBouton } from "./composants/proprietesDatatablesBouton";
import ModalSpecifique from "./composants/modalSpecifique";
import SpinnerSpecifique from "./composants/spinnerSpecifique";

import { Component, Prop, Vue, Ref } from "vue-property-decorator";

@Component({
    template: require("./templates/vueAidesFinancieres.html"),
    components: {
        Datatables,
        ModalSpecifique,
        SpinnerSpecifique
    }
})
export default class VueAidesFinancieres extends Vue implements IVuePlateforme {
    @Prop() private plateforme!: Plateforme;
    @Prop() private controleurPlateforme!: ControleurPlateforme;

    @Ref("datatablesAidesFinancieres") readonly datatablesAidesFinancieres!: Datatables<AideFinanciere>;
    @Ref("modalEditeAideFinanciere") readonly modalEditeAideFinanciere!: ModalSpecifique;
    @Ref("spinner") readonly spinner!: SpinnerSpecifique;

    private proprietesDatatablesAidesFinancieres: ProprietesDatatables;

    public ajoutPartenaire(partenaire: Partenaire): void {

    }

    public modificationPartenaire(partenaire: Partenaire): void {

    }

    public suppressionPartenaire(partenaire: Partenaire): void {

    }

    public ajoutAideFinanciere(aideFinanciere: AideFinanciere): void {
        this.datatablesAidesFinancieres.ajouterLigneDansDatatables(aideFinanciere);
    }

    public suppressionAideFinanciere(aideFinanciere: AideFinanciere): void {
        this.datatablesAidesFinancieres.supprimerLigneSelectionneeDansDatatables();
    }

    public modificationAideFinanciere(aideFinanciere: AideFinanciere): void {
        this.datatablesAidesFinancieres.modifierLigneSelectionneeDansDatatables(aideFinanciere);
    }

    public ajoutContact(contact: Contact): void {

    }

    public suppressionContact(contact: Contact): void {

    }

    public modificationContact(contact: Contact): void {

    }

    private initialiserDatatables() {
        this.proprietesDatatablesAidesFinancieres = new ProprietesDatatables();
        this.proprietesDatatablesAidesFinancieres.OrdreDesElementsDeControle = "Bfti";
        this.proprietesDatatablesAidesFinancieres.ajouterColonne(new ProprietesDatatablesColonne("Identifiant Aide Financiere", "identifiantAideFinanciere"));
        this.proprietesDatatablesAidesFinancieres.ajouterColonne(new ProprietesDatatablesColonne("Nom Aide Financiere", "nomAideFinanciere"));
        this.proprietesDatatablesAidesFinancieres.ajouterBouton(new ProprietesDatatablesBouton("Ajouter Aide Financiere", this.onClickAjouterAideFinanciere));
        this.proprietesDatatablesAidesFinancieres.ajouterBouton(new ProprietesDatatablesBouton("Supprimer Aide Financiere", this.onClickSupprimerAideFinanciere));
        this.proprietesDatatablesAidesFinancieres.ajouterBouton(new ProprietesDatatablesBouton("Modifier Aide Financiere", this.onClickModifierAideFinanciere));
    }

    private initialiserEvenementsModals(): void {
        this.modalEditeAideFinanciere.onCacherModal(() => {
            $("form").trigger("reset");
        });

        $("#inputNomAideFinanciere").keypress((event) => {
            if (event.keyCode == 13) {
                event.preventDefault();
            }
        });
    }


    public constructor() {
        super();
        this.initialiserDatatables();
        //this.controleurPlateforme.inscrire(this);
        //this.controleurPlateforme.chargerListeAidesFinancieres();
    }

    mounted() {
        this.initialiserEvenementsModals();
        this.controleurPlateforme.inscrire(this);
        this.controleurPlateforme.chargerListeAidesFinancieres();
    }

    beforeDestroy() {
        this.controleurPlateforme.resilier(this);
    }

    private onClickAjouterAideFinanciere(): void {
        $("#inputTitreAideFinanciere").text("Ajout Aide Financiere");
        this.modalEditeAideFinanciere.montrerModal();
        $("#boutonEditeAideFinanciere").off();
        $("#boutonEditeAideFinanciere").on("click", () => {
            var aideFinanciere = new AideFinanciere();
            aideFinanciere.NomAideFinanciere = $("#inputNomAideFinanciere").val() as string;
            this.controleurPlateforme.ajouterAideFinanciere(aideFinanciere);
            this.modalEditeAideFinanciere.cacherModal();
        });
    }

    private onClickSupprimerAideFinanciere(): void {
        var listeAidesFinancieresSelectionnes: AideFinanciere[] = this.datatablesAidesFinancieres.getListeLignesSelectionnees();
        listeAidesFinancieresSelectionnes.forEach((aideFinanciere: AideFinanciere) => {
            this.controleurPlateforme.supprimerAideFinanciere(aideFinanciere);
        });
    }

    private onClickModifierAideFinanciere(): void {
        var listeAidesFinancieresSelectionnes: AideFinanciere[] = this.datatablesAidesFinancieres.getListeLignesSelectionnees();
        if (listeAidesFinancieresSelectionnes.length > 0) {
            var premiereAideFinanciereSelectionnee: AideFinanciere = listeAidesFinancieresSelectionnes[0];
            $("#inputTitreAideFinanciere").text("Modifiaction Aide Financiere : " + premiereAideFinanciereSelectionnee.NomAideFinanciere);
            $("#inputIdentifiantAideFinanciere").val(premiereAideFinanciereSelectionnee.IdentifiantAideFinanciere);
            $("#inputNomAideFinanciere").val(premiereAideFinanciereSelectionnee.NomAideFinanciere);
            this.modalEditeAideFinanciere.montrerModal();
            $("#boutonEditeAideFinanciere").off();
            $("#boutonEditeAideFinanciere").on("click", () => {
                premiereAideFinanciereSelectionnee.NomAideFinanciere = $("#inputNomAideFinanciere").val() as string;
                this.controleurPlateforme.modifierAideFinanciere(premiereAideFinanciereSelectionnee);
                this.modalEditeAideFinanciere.cacherModal();
            });
        }
    }

}