import { IVueCoordinateurs } from "./ivueCoordinateurs";
import { Plateforme } from "../modelePlateforme/plateforme";
import { ControleurCoordinateurs } from "../controleursPlateforme/controleurCoordinateurs";
import { Contact } from "../modelePlateforme/contact";
import { ErreurSerializable } from "../erreur/erreurSerializable";
import { InformationSerializable } from "../information/informationSerializable";

import Datatables from "./composants/datatables";
import { ProprietesDatatables } from "./composants/proprietesDatatables";
import { ProprietesDatatablesColonne } from "./composants/proprietesDatatablesColonne";
import { ProprietesDatatablesBouton } from "./composants/proprietesDatatablesBouton";
import ModalSpecifique from "./composants/modalSpecifique";
import SpinnerSpecifique from "./composants/spinnerSpecifique";
import ModalErreur from "./composants/modalErreur";

import "../../scss/vues/vueCoordinateurs.scss";

import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import { Coordinateur } from "../modelePlateforme/coordinateur";

@Component({
    template: require("./templates/vueCoordinateurs.html"),
    components: {
        Datatables,
        ModalSpecifique,
        SpinnerSpecifique,
        ModalErreur
    }
})
export default class VueContacts extends Vue implements IVueCoordinateurs {
    @Prop() private plateforme!: Plateforme;
    @Prop() private controleurCoordinateurs!: ControleurCoordinateurs;

    @Ref("datatablesCoordinateurs") readonly datatablesCoordinateurs!: Datatables<Coordinateur>;
    @Ref("modalEditeCoordinateur") readonly modalEditeCoordinateur!: ModalSpecifique;
    @Ref("spinner") readonly spinner!: SpinnerSpecifique;
    @Ref("modalErreur") readonly modalErreur!: ModalErreur;

    private proprietesDatatablesCoordinateurs: ProprietesDatatables;

    public afficheErreur(erreur: ErreurSerializable): void {
        this.modalErreur.afficherErreur(erreur);
    }

    public afficheInformation(information: InformationSerializable): void {

    }

    public ajoutCoordinateur(coordinateur: Coordinateur): void {
        this.datatablesCoordinateurs.ajouterLigneDansDatatables(coordinateur);
    }

    public suppressionCoordinateur(coordinateur: Coordinateur): void {
        this.datatablesCoordinateurs.supprimerLigneSelectionneeDansDatatables();
    }

    public modificationCoordinateur(coordinateur: Coordinateur): void {
        this.datatablesCoordinateurs.modifierLigneSelectionneeDansDatatables(coordinateur);
    }

    private initialiserDatatables() {
        this.proprietesDatatablesCoordinateurs = new ProprietesDatatables();
        this.proprietesDatatablesCoordinateurs.OrdreDesElementsDeControle = "Bfti";
        this.proprietesDatatablesCoordinateurs.ajouterColonne(new ProprietesDatatablesColonne("Identifiant Coordinateur", "identifiantContact"));
        this.proprietesDatatablesCoordinateurs.ajouterColonne(new ProprietesDatatablesColonne("Nom Coordinateur", "nomContact"));
        this.proprietesDatatablesCoordinateurs.ajouterColonne(new ProprietesDatatablesColonne("Prénom Coordinateur", "prenomContact"));
        this.proprietesDatatablesCoordinateurs.ajouterColonne(new ProprietesDatatablesColonne("Adresse Mail Coordinateur", "adresseMailContact"));
        this.proprietesDatatablesCoordinateurs.ajouterColonne(new ProprietesDatatablesColonne("Fonction Coordinateur", "fonctionContact"));
        if (this.plateforme.UtilisateurConnecte) {
            this.proprietesDatatablesCoordinateurs.ajouterBouton(new ProprietesDatatablesBouton("Ajouter Coordinateur", this.onClickAjouterCoordinateur));
            this.proprietesDatatablesCoordinateurs.ajouterBouton(new ProprietesDatatablesBouton("Supprimer Coordinateur", this.onClickSupprimerCoordinateur));
            this.proprietesDatatablesCoordinateurs.ajouterBouton(new ProprietesDatatablesBouton("Modifier Coordinateur", this.onClickModifierCoordinateur));
        }
    }

    private initialiserEvenementsModals(): void {
        this.modalEditeCoordinateur.onCacherModal(() => {
            $("form").trigger("reset");
        });
    }

    private creerCoordinateur(): Coordinateur {
        var coordinateur = new Coordinateur();
        coordinateur.NomContact = $("#inputNomCoordinateur").val() as string;
        coordinateur.PrenomContact = $("#inputPrenomCoordinateur").val() as string;
        coordinateur.AdresseMailContact = $("#inputAdresseMailCoordinateur").val() as string;
        coordinateur.FonctionContact = $("#inputFonctionCoordinateur").val() as string;
        return coordinateur;
    }

    public constructor() {
        super();
        this.initialiserDatatables();
    }

    mounted() {
        this.controleurCoordinateurs.inscrire(this);
        this.controleurCoordinateurs.chargerListeCoordinateurs();
        this.initialiserEvenementsModals();
    }

    beforeDestroy() {
        this.controleurCoordinateurs.resilier(this);
    }

    private onClickAjouterCoordinateur(): void {
        $("#inputTitreCoordinateur").text("Ajout Coordinateur");
        this.modalEditeCoordinateur.montrerModal();
        $("#boutonEditeCoordinateur").off();
        $("#boutonEditeCoordinateur").on("click", () => {
            this.controleurCoordinateurs.ajouterCoordinateur(this.creerCoordinateur());
            this.modalEditeCoordinateur.cacherModal();
        });
    }

    private onClickSupprimerCoordinateur(): void {
        var listeCoordinateursSelectionnes: Coordinateur[] = this.datatablesCoordinateurs.getListeLignesSelectionnees();
        listeCoordinateursSelectionnes.forEach((coordinateur: Coordinateur) => {
            this.controleurCoordinateurs.supprimerCoordinateur(coordinateur);
        });
    }

    private onClickModifierCoordinateur(): void {
        var listeCoordinateursSelectionnes: Coordinateur[] = this.datatablesCoordinateurs.getListeLignesSelectionnees();
        if (listeCoordinateursSelectionnes.length > 0) {
            var premierCoordinateurSelectionne: Contact = listeCoordinateursSelectionnes[0];
            $("#inputTitreCoordinateur").text("Modification Coordinateur : " + premierCoordinateurSelectionne.NomContact + " " + premierCoordinateurSelectionne.PrenomContact);
            $("#inputIdentifiantCoordinateur").val(premierCoordinateurSelectionne.IdentifiantContact);
            $("#inputNomCoordinateur").val(premierCoordinateurSelectionne.NomContact);
            $("#inputPrenomCoordinateur").val(premierCoordinateurSelectionne.PrenomContact);
            $("#inputAdresseMailCoordinateur").val(premierCoordinateurSelectionne.AdresseMailContact);
            $("#inputFonctionCoordinateur").val(premierCoordinateurSelectionne.FonctionContact);
            this.modalEditeCoordinateur.montrerModal();
            $("#boutonEditeCoordinateur").off();
            $("#boutonEditeCoordinateur").on("click", () => {
                this.controleurCoordinateurs.modifierCoordinateur(premierCoordinateurSelectionne, this.creerCoordinateur());
                this.modalEditeCoordinateur.cacherModal();
            });
        }
    }

}