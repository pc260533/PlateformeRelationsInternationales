import { IVuePlateforme } from "../ivuePlateforme";
import { Plateforme } from "../modelePlateforme/plateforme";
import { ControleurPlateforme } from "../controleurPlateforme";
import { Partenaire } from "../modelePlateforme/partenaire";
import { AideFinanciere } from "../modelePlateforme/aideFinanciere";
import { Specialite } from "../modelePlateforme/specialite";
import { Mobilite } from "../modelePlateforme/mobilite";
import { Contact } from "../modelePlateforme/contact";
import { Localisation } from "../modelePlateforme/localisation";

import Datatables from "./composants/datatables";
import { ProprietesDatatables } from "./composants/proprietesDatatables";
import { ProprietesDatatablesColonne } from "./composants/proprietesDatatablesColonne";
import { ProprietesDatatablesBouton } from "./composants/proprietesDatatablesBouton";
import ModalSpecifique from "./composants/modalSpecifique";
import SpinnerSpecifique from "./composants/spinnerSpecifique";

import { Component, Prop, Vue, Ref } from "vue-property-decorator";

@Component({
    template: require("./templates/vuePartenaires.html"),
    components: {
        Datatables,
        ModalSpecifique,
        SpinnerSpecifique,
    }
})
export default class VuePartenaire extends Vue implements IVuePlateforme {
    @Prop() private plateforme!: Plateforme;
    @Prop() private controleurPlateforme!: ControleurPlateforme;
    private proprietesDatatablesPartenaires: ProprietesDatatables;
    private proprietesDatatablesSpecialitePartenaires: ProprietesDatatables;

    @Ref("datatablesPartenaires") readonly datatablesPartenaires!: Datatables<Partenaire>;
    @Ref("datatablesSpecialitesPartenaires") readonly datatablesSpecialitesPartenaires!: Datatables<Partenaire>;
    @Ref("modalEditePartenaire") readonly modalEditePartenaire!: ModalSpecifique;
    @Ref("modalEditeSpecialitePartenaire") readonly modalEditeSpecialitePartenaire!: ModalSpecifique;
    @Ref("spinner") readonly spinner!: SpinnerSpecifique;

    public ajoutPartenaire(partenaire: Partenaire): void {
        this.datatablesPartenaires.ajouterLigneDansDatatables(partenaire);
    }

    public suppressionPartenaire(partenaire: Partenaire): void {
        this.datatablesPartenaires.supprimerLigneSelectionneeDansDatatables();
    }

    public modificationPartenaire(partenaire: Partenaire): void {
        this.datatablesPartenaires.modifierLigneSelectionneeDansDatatables(partenaire);
    }

    public ajoutSpecialiteDansPartenaire(specialite: Specialite, partenaire: Partenaire): void {

    }

    public suppressionSpecialiteDansPartenaire(specialite: Specialite, partenaire: Partenaire): void {

    }

    public ajoutMobiliteDansPartenaire(mobilite: Mobilite, partenaire: Partenaire): void {

    }

    public suppressionMobiliteDansPartenaire(mobilite: Mobilite, partenaire: Partenaire): void {

    }

    public ajoutAideFinanciereDansPartenaire(aideFinanciere: AideFinanciere, partenaire: Partenaire): void {

    }

    public suppressionAideFinanciereDansPartenaire(aideFinanciere: AideFinanciere, partenaire: Partenaire): void {

    }

    public ajoutContactDansPartenaire(contact: Contact, partenaire: Partenaire): void {

    }

    public suppressionContactDansPartenaire(contact: Contact, partenaire: Partenaire): void {

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

    private initialiserDatatables() {
        this.proprietesDatatablesPartenaires = new ProprietesDatatables();
        this.proprietesDatatablesPartenaires.OrdreDesElementsDeControle = "Bfti";
        this.proprietesDatatablesPartenaires.ajouterColonne(new ProprietesDatatablesColonne("Identifiant Partenaire", "identifiantPartenaire"));
        this.proprietesDatatablesPartenaires.ajouterColonne(new ProprietesDatatablesColonne("Nom Partenaire", "nomPartenaire"));
        this.proprietesDatatablesPartenaires.ajouterBouton(new ProprietesDatatablesBouton("Ajouter Partenaire", this.onAjouterPartenaireClick));
        this.proprietesDatatablesPartenaires.ajouterBouton(new ProprietesDatatablesBouton("Supprimer Partenaire", this.onSupprimerPartenaireClick));
        this.proprietesDatatablesPartenaires.ajouterBouton(new ProprietesDatatablesBouton("Modifier Partenaire", this.onModifierPartenaireClick));

        this.proprietesDatatablesSpecialitePartenaires = new ProprietesDatatables();
        this.proprietesDatatablesPartenaires.OrdreDesElementsDeControle = "Bft";
        this.proprietesDatatablesPartenaires.ajouterColonne(new ProprietesDatatablesColonne("Nom Specialité", "nomSpecialité"));
        this.proprietesDatatablesPartenaires.ajouterColonne(new ProprietesDatatablesColonne("Nom Partenaire", "nomPartenaire"));
        this.proprietesDatatablesPartenaires.ajouterBouton(new ProprietesDatatablesBouton("Ajouter Partenaire", this.onAjouterPartenaireClick));
        this.proprietesDatatablesPartenaires.ajouterBouton(new ProprietesDatatablesBouton("Supprimer Partenaire", this.onSupprimerPartenaireClick));
        this.proprietesDatatablesPartenaires.ajouterBouton(new ProprietesDatatablesBouton("Modifier Partenaire", this.onModifierPartenaireClick));
    }

    private initialiserEvenementsModals(): void {
        this.modalEditePartenaire.onCacherModal(() => {
            $("form").trigger("reset");
        });

        $("#boutonAjouterSpecialitePartenaire").on("click", () => {
            this.onClickAjouterSpecialitePartenaire();
        });
        $("#boutonSupprimerSpecialitePartenaire").on("click", () => {
            this.onClickSupprimerSpecialitePartenaire();
        });
        $("#boutonAjouterMobilitePartenaire").on("click", () => {
            this.onClickAjouterMobilitePartenaire();
        });
        $("#boutonSupprimerSpecialitePartenaire").on("click", () => {
            this.onClickSupprimerMobilitePartenaire();
        });
        $("#boutonAjouterAideFinancierePartenaire").on("click", () => {
            this.onClickAjouterAideFinancierePartenaire();
        });
        $("#boutonSupprimerAideFinancierePartenaire").on("click", () => {
            this.onClickSupprimerAideFinancierePartenaire();
        });
        $("#boutonAjouterContactPartenaire").on("click", () => {
            this.onClickAjouterContactPartenaire();
        });
        $("#boutonSupprimerContactPartenaire").on("click", () => {
            this.onClickSupprimerContactPartenaire();
        });
    }

    private ajouterSpecialiteDansSelect(specialite: Specialite): void {
        $("#selectListeMobilites").append($("<option>", {
            value: specialite.IdentifiantSpecialite,
            text: specialite.NomSpecialite
        }));
    }

    public constructor() {
        super();
        this.initialiserDatatables();
    }

    mounted() {
        this.initialiserEvenementsModals();
        this.controleurPlateforme.inscrire(this);
        $.when(this.controleurPlateforme.chargerListeSpecialites(),
            this.controleurPlateforme.chargerListeMobilites(),
            this.controleurPlateforme.chargerListeAidesFinancieres(),
            this.controleurPlateforme.chargerListeContacts()).done(() => {
                this.controleurPlateforme.chargerListePartenaires();
            });
    }

    beforeDestroy() {
        this.controleurPlateforme.resilier(this);
    }

    private onAjouterPartenaireClick(): void {
        $("#inputTitrePartenaire").text("Ajout Partenaire");
        this.modalEditePartenaire.montrerModal();
        $("#boutonEditePartenaire").off();
        $("#boutonEditePartenaire").on("click", () => {
            var partenaire = new Partenaire();
            partenaire.NomPartenaire = $("#inputNomPartenaire").val() as string;
            partenaire.DomaineDeCompetencePartenaire = $("#inputDomaineDeCompetencePartenaire").val() as string;
            var localisationPartenaire = new Localisation();
            localisationPartenaire.LatitudeLocalisation = $("#inputLatitudePartenaire").val() as string;
            localisationPartenaire.LongitudeLocalisation = $("#inputLongitudePartenaire").val() as string;
            partenaire.LocalisationPartenaire = localisationPartenaire;
            partenaire.InformationLogementPartenaire = $("#textareaInformationLogementPartenaire").val() as string;
            partenaire.InformationCoutPartenaire = $("#textareaInformationCoutPartenaire").val() as string;
            this.controleurPlateforme.ajouterPartenaire(partenaire);
            this.modalEditePartenaire.cacherModal();
        });
    }

    private onSupprimerPartenaireClick(): void {
        var listePartenairesSelectionnes: Partenaire[] = this.datatablesPartenaires.getListeLignesSelectionnees();
        listePartenairesSelectionnes.forEach((partenaire: Partenaire) => {
            this.controleurPlateforme.supprimerPartenaire(partenaire);
        });
    }

    private onModifierPartenaireClick(): void {
        this.modalEditeSpecialitePartenaire.montrerModal();
    }

    private onClickAjouterSpecialitePartenaire(): void {

    }
    private onClickSupprimerSpecialitePartenaire(): void {

    }
    private onClickAjouterMobilitePartenaire(): void {

    }
    private onClickSupprimerMobilitePartenaire(): void {

    }
    private onClickAjouterAideFinancierePartenaire(): void {

    }
    private onClickSupprimerAideFinancierePartenaire(): void {

    }
    private onClickAjouterContactPartenaire(): void {

    }
    private onClickSupprimerContactPartenaire(): void {

    }

}