import { IVuePlateforme } from "../ivuePlateforme";
import { Plateforme } from "../modelePlateforme/plateforme";
import { ControleurPlateforme } from "../controleurPlateforme";
import { Partenaire } from "../modelePlateforme/partenaire";
import { SousSpecialite } from "../modelePlateforme/sousspecialite";
import { Mobilite } from "../modelePlateforme/mobilite";
import { AideFinanciere } from "../modelePlateforme/aideFinanciere";
import { Contact } from "../modelePlateforme/contact";
import { Cout } from "../modelePlateforme/cout";
import { ErreurSerializable } from "../erreur/erreurSerializable";
import { InformationSerializable } from "../information/informationSerializable";

import Datatables from "./composants/datatables";
import { ProprietesDatatables } from "./composants/proprietesDatatables";
import { ProprietesDatatablesColonne } from "./composants/proprietesDatatablesColonne";
import { ProprietesDatatablesBouton } from "./composants/proprietesDatatablesBouton";
import ModalSpecifique from "./composants/modalSpecifique";
import SpinnerSpecifique from "./composants/spinnerSpecifique";
import ModalErreur from "./composants/modalErreur";

import "../../scss/vues/vueCouts.scss";

import { Component, Prop, Vue, Ref } from "vue-property-decorator";

@Component({
    template: require("./templates/vueCouts.html"),
    components: {
        Datatables,
        ModalSpecifique,
        SpinnerSpecifique,
        ModalErreur
    }
})
export default class VueCouts extends Vue implements IVuePlateforme {
    @Prop() private plateforme!: Plateforme;
    @Prop() private controleurPlateforme!: ControleurPlateforme;

    @Ref("datatablesCouts") readonly datatablesCouts!: Datatables<Cout>;
    @Ref("modalEditeCout") readonly modalEditeCout!: ModalSpecifique;
    @Ref("spinner") readonly spinner!: SpinnerSpecifique;
    @Ref("modalErreur") readonly modalErreur!: ModalErreur;

    private proprietesDatatablesCouts: ProprietesDatatables;

    public afficheErreur(erreur: ErreurSerializable): void {
        this.modalErreur.afficherErreur(erreur);
    }

    public afficheInformation(information: InformationSerializable): void {

    }

    public ajoutPartenaire(partenaire: Partenaire): void {
        //this.datatablesCouts.modifierLigneSelectionneeDansDatatables(partenaire.CoutPartenaire);
    }

    public modificationPartenaire(partenaire: Partenaire): void {

    }

    public suppressionPartenaire(partenaire: Partenaire): void {

    }

    public ajoutAideFinanciere(aideFinanciere: AideFinanciere): void {

    }

    public suppressionAideFinanciere(aideFinanciere: AideFinanciere): void {

    }

    public modificationAideFinanciere(aideFinanciere: AideFinanciere): void {

    }

    public ajoutContact(contact: Contact): void {

    }

    public suppressionContact(contact: Contact): void {

    }

    public modificationContact(contact: Contact): void {

    }

    public ajoutCout(cout: Cout): void {
        this.datatablesCouts.ajouterLigneDansDatatables(cout);
    }

    public modificationCout(cout: Cout): void {
        this.datatablesCouts.modifierLigneSelectionneeDansDatatables(cout);
    }

    private initialiserDatatables() {
        this.proprietesDatatablesCouts = new ProprietesDatatables();
        this.proprietesDatatablesCouts.OrdreDesElementsDeControle = "Bfti";
        this.proprietesDatatablesCouts.ajouterColonne(new ProprietesDatatablesColonne("Identifiant Cout", "identifiantCout"));
        this.proprietesDatatablesCouts.ajouterColonne(new ProprietesDatatablesColonne("Nom Pays Cout", "nomPaysCout"));
        this.proprietesDatatablesCouts.ajouterColonne(new ProprietesDatatablesColonne("Liste Partenaires Pays Cout", "ListePartenairesCoutString"));
        this.proprietesDatatablesCouts.ajouterBouton(new ProprietesDatatablesBouton("Modifier Cout", this.onClickModifierCout));
    }

    private initialiserEvenementsModals(): void {
        this.modalEditeCout.onCacherModal(() => {
            $("form").trigger("reset");
        });
    }

    private creerCout(): Cout {
        var cout = new Cout();
        cout.CoutMoyenParMois = $("#inputCoutMoyenParMois").val() as string;
        cout.CoutLogementParMois = $("#inputCoutLogementParMois").val() as string;
        cout.CoutVieParMois = $("#inputCoutVieParMois").val() as string;
        cout.CoutInscriptionParMois = $("#inputCoutInscriptionParMois").val() as string;
        return cout;
    }

    public constructor() {
        super();
        this.initialiserDatatables();
    }

    mounted() {
        this.controleurPlateforme.inscrire(this);
        this.initialiserEvenementsModals();
        $.when(this.controleurPlateforme.chargerListeSpecialites(),
            this.controleurPlateforme.chargerListeMobilites(),
            this.controleurPlateforme.chargerListeAidesFinancieres(),
            this.controleurPlateforme.chargerListeContacts(),
            this.controleurPlateforme.chargerListeCouts()).done(() => {
                $.when(this.controleurPlateforme.chargerListePartenaires()).done(() => {
                    this.datatablesCouts.redessinerDatatables();
                });
            });
    }

    beforeDestroy() {
        this.controleurPlateforme.resilier(this);
    }

    private onClickModifierCout(): void {
        var listeCoutsSelectionne: Cout[] = this.datatablesCouts.getListeLignesSelectionnees();
        if (listeCoutsSelectionne.length > 0) {
            var premierCoutSelectionne: Cout = listeCoutsSelectionne[0];
            $("#inputTitreCout").text("Modifiaction Cout : " + premierCoutSelectionne.NomPaysCout);
            $("#inputIdentifiantCout").val(premierCoutSelectionne.IdentifiantCout);
            $("#inputCoutMoyenParMois").val(premierCoutSelectionne.CoutMoyenParMois);
            $("#inputCoutLogementParMois").val(premierCoutSelectionne.CoutLogementParMois);
            $("#inputCoutVieParMois").val(premierCoutSelectionne.CoutVieParMois);
            $("#inputCoutInscriptionParMois").val(premierCoutSelectionne.CoutInscriptionParMois);
            this.modalEditeCout.montrerModal();
            $("#boutonEditeCout").off();
            $("#boutonEditeCout").on("click", () => {
                this.controleurPlateforme.modifierCout(premierCoutSelectionne, this.creerCout());
                this.modalEditeCout.cacherModal();
            });
        }
    }

}