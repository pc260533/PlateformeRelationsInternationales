import { IVueAidesFinancieres } from "./ivueAidesFinancieres";
import { Plateforme } from "../modelePlateforme/plateforme";
import { ControleurAidesFinancieres } from "../controleursPlateforme/controleurAidesFinancieres";
import { AideFinanciere } from "../modelePlateforme/aideFinanciere";
import { ErreurSerializable } from "../erreur/erreurSerializable";
import { InformationSerializable } from "../information/informationSerializable";

import Datatables from "./composants/datatables";
import { ProprietesDatatables } from "./composants/proprietesDatatables";
import { ProprietesDatatablesColonne } from "./composants/proprietesDatatablesColonne";
import { ProprietesDatatablesBouton } from "./composants/proprietesDatatablesBouton";
import ModalSpecifique from "./composants/modalSpecifique";
import SpinnerSpecifique from "./composants/spinnerSpecifique";
import ModalErreur from "./composants/modalErreur";

import "../../scss/vues/vueAidesFinancieres.scss";

import { Component, Prop, Vue, Ref } from "vue-property-decorator";

@Component({
    template: require("./templates/vueAidesFinancieres.html"),
    components: {
        Datatables,
        ModalSpecifique,
        SpinnerSpecifique,
        ModalErreur
    }
})
export default class VueAidesFinancieres extends Vue implements IVueAidesFinancieres {
    @Prop() private plateforme!: Plateforme;
    @Prop() private controleurAidesFinancieres!: ControleurAidesFinancieres;

    @Ref("datatablesAidesFinancieres") readonly datatablesAidesFinancieres!: Datatables<AideFinanciere>;
    @Ref("modalEditeAideFinanciere") readonly modalEditeAideFinanciere!: ModalSpecifique;
    @Ref("spinner") readonly spinner!: SpinnerSpecifique;
    @Ref("modalErreur") readonly modalErreur!: ModalErreur;

    private proprietesDatatablesAidesFinancieres: ProprietesDatatables;

    public afficheErreur(erreur: ErreurSerializable): void {
        this.modalErreur.afficherErreur(erreur);
    }

    public afficheInformation(information: InformationSerializable): void {

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

    private initialiserDatatables() {
        this.proprietesDatatablesAidesFinancieres = new ProprietesDatatables();
        this.proprietesDatatablesAidesFinancieres.OrdreDesElementsDeControle = "Bfti";
        this.proprietesDatatablesAidesFinancieres.ajouterColonne(new ProprietesDatatablesColonne("Identifiant Aide Financiere", "identifiantAideFinanciere"));
        this.proprietesDatatablesAidesFinancieres.ajouterColonne(new ProprietesDatatablesColonne("Nom Aide Financiere", "nomAideFinanciere"));
        if (this.plateforme.UtilisateurConnecte) {
            this.proprietesDatatablesAidesFinancieres.ajouterBouton(new ProprietesDatatablesBouton("Ajouter Aide Financiere", this.onClickAjouterAideFinanciere));
            this.proprietesDatatablesAidesFinancieres.ajouterBouton(new ProprietesDatatablesBouton("Supprimer Aide Financiere", this.onClickSupprimerAideFinanciere));
            this.proprietesDatatablesAidesFinancieres.ajouterBouton(new ProprietesDatatablesBouton("Modifier Aide Financiere", this.onClickModifierAideFinanciere));
        }
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

    private creerAideFinanciere(): AideFinanciere {
        var aideFinanciere = new AideFinanciere();
        aideFinanciere.NomAideFinanciere = $("#inputNomAideFinanciere").val() as string;
        aideFinanciere.DescriptionAideFinanciere = $("#textareaDescriptionAideFinanciere").val() as string;
        aideFinanciere.LienAideFinanciere = $("#inputLienAideFinanciere").val() as string;
        return aideFinanciere;
    }

    public constructor() {
        super();
        this.initialiserDatatables();
    }

    mounted() {
        this.initialiserEvenementsModals();
        this.controleurAidesFinancieres.inscrire(this);
        this.controleurAidesFinancieres.chargerListeAidesFinancieres();
    }

    beforeDestroy() {
        this.controleurAidesFinancieres.resilier(this);
    }

    private onClickAjouterAideFinanciere(): void {
        $("#inputTitreAideFinanciere").text("Ajout Aide Financiere");
        this.modalEditeAideFinanciere.montrerModal();
        $("#boutonEditeAideFinanciere").off();
        $("#boutonEditeAideFinanciere").on("click", () => {
            this.controleurAidesFinancieres.ajouterAideFinanciere(this.creerAideFinanciere());
            this.modalEditeAideFinanciere.cacherModal();
        });
    }

    private onClickSupprimerAideFinanciere(): void {
        var listeAidesFinancieresSelectionnes: AideFinanciere[] = this.datatablesAidesFinancieres.getListeLignesSelectionnees();
        listeAidesFinancieresSelectionnes.forEach((aideFinanciere: AideFinanciere) => {
            this.controleurAidesFinancieres.supprimerAideFinanciere(aideFinanciere);
        });
    }

    private onClickModifierAideFinanciere(): void {
        var listeAidesFinancieresSelectionnes: AideFinanciere[] = this.datatablesAidesFinancieres.getListeLignesSelectionnees();
        if (listeAidesFinancieresSelectionnes.length > 0) {
            var premiereAideFinanciereSelectionnee: AideFinanciere = listeAidesFinancieresSelectionnes[0];
            $("#inputTitreAideFinanciere").text("Modifiaction Aide Financiere : " + premiereAideFinanciereSelectionnee.NomAideFinanciere);
            $("#inputIdentifiantAideFinanciere").val(premiereAideFinanciereSelectionnee.IdentifiantAideFinanciere);
            $("#inputNomAideFinanciere").val(premiereAideFinanciereSelectionnee.NomAideFinanciere);
            $("#textareaDescriptionAideFinanciere").val(premiereAideFinanciereSelectionnee.DescriptionAideFinanciere);
            $("#inputLienAideFinanciere").val(premiereAideFinanciereSelectionnee.LienAideFinanciere);
            this.modalEditeAideFinanciere.montrerModal();
            $("#boutonEditeAideFinanciere").off();
            $("#boutonEditeAideFinanciere").on("click", () => {
                this.controleurAidesFinancieres.modifierAideFinanciere(premiereAideFinanciereSelectionnee, this.creerAideFinanciere());
                this.modalEditeAideFinanciere.cacherModal();
            });
        }
    }

}