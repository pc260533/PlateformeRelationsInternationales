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
    template: require("./templates/vueContacts.html"),
    components: {
        Datatables,
        ModalSpecifique,
        SpinnerSpecifique
    }
})
export default class VueContacts extends Vue implements IVuePlateforme {
    @Prop() private plateforme!: Plateforme;
    @Prop() private controleurPlateforme!: ControleurPlateforme;

    @Ref("datatablesContact") readonly datatablesContact!: Datatables<Contact>;
    @Ref("modalEditeContact") readonly modalEditeContact!: ModalSpecifique;
    @Ref("spinner") readonly spinner!: SpinnerSpecifique;

    private proprietesDatatablesContact: ProprietesDatatables;

    public ajoutPartenaire(partenaire: Partenaire): void {

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
        this.datatablesContact.ajouterLigneDansDatatables(contact);
    }

    public suppressionContact(contact: Contact): void {
        this.datatablesContact.supprimerLigneSelectionneeDansDatatables();
    }

    public modificationContact(contact: Contact): void {
        this.datatablesContact.modifierLigneSelectionneeDansDatatables(contact);
    }

    private initialiserDatatables() {
        this.proprietesDatatablesContact = new ProprietesDatatables();
        this.proprietesDatatablesContact.OrdreDesElementsDeControle = "Bfti";
        this.proprietesDatatablesContact.ajouterColonne(new ProprietesDatatablesColonne("Identifiant Contact", "identifiantContact"));
        this.proprietesDatatablesContact.ajouterColonne(new ProprietesDatatablesColonne("Nom Contact", "nomContact"));
        this.proprietesDatatablesContact.ajouterColonne(new ProprietesDatatablesColonne("Prénom Contact", "prenomContact"));
        this.proprietesDatatablesContact.ajouterColonne(new ProprietesDatatablesColonne("Adresse Mail Contact", "adresseMailContact"));
        this.proprietesDatatablesContact.ajouterColonne(new ProprietesDatatablesColonne("Fonction Contact", "fonctionContact"));
        this.proprietesDatatablesContact.ajouterBouton(new ProprietesDatatablesBouton("Ajouter Contact", this.onClickAjouterContact));
        this.proprietesDatatablesContact.ajouterBouton(new ProprietesDatatablesBouton("Supprimer Contact", this.onClickSupprimerContact));
        this.proprietesDatatablesContact.ajouterBouton(new ProprietesDatatablesBouton("Modifier Contact", this.onClickModifierContact));
    }

    private initialiserEvenementsModals(): void {
        this.modalEditeContact.onCacherModal(() => {
            $("form").trigger("reset");
        });
    }

    public constructor() {
        super();
        this.initialiserDatatables();
        //this.controleurPlateforme.inscrire(this);
        //this.controleurPlateforme.chargerListeContacts();
    }

    mounted() {
        this.controleurPlateforme.inscrire(this);
        this.controleurPlateforme.chargerListeContacts();
        this.initialiserEvenementsModals();
    }

    beforeDestroy() {
        this.controleurPlateforme.resilier(this);
    }

    private onClickAjouterContact(): void {
        $("#inputTitreContact").text("Ajout Contact");
        this.modalEditeContact.montrerModal();
        $("#boutonEditeContact").off();
        $("#boutonEditeContact").on("click", () => {
            var contact = new Contact();
            contact.NomContact = $("#inputNomContact").val() as string;
            contact.PrenomContact = $("#inputPrenomContact").val() as string;
            contact.AdresseMailContact = $("#inputAdresseMailContact").val() as string;
            contact.FonctionContact = $("#inputFonctionContact").val() as string;
            this.controleurPlateforme.ajouterContact(contact);
            this.modalEditeContact.cacherModal();
        });
    }

    private onClickSupprimerContact(): void {
        var listeContactsSelectionnes: Contact[] = this.datatablesContact.getListeLignesSelectionnees();
        listeContactsSelectionnes.forEach((contact: Contact) => {
            this.controleurPlateforme.supprimerContact(contact);
        });
    }

    private onClickModifierContact(): void {
        var listeContactsSelectionnes: Contact[] = this.datatablesContact.getListeLignesSelectionnees();
        if (listeContactsSelectionnes.length > 0) {
            var premierContactSelectionne: Contact = listeContactsSelectionnes[0];
            $("#inputTitreContact").text("Modifiaction Contact : " + premierContactSelectionne.NomContact + " " + premierContactSelectionne.PrenomContact);
            $("#inputIdentifiantContact").val(premierContactSelectionne.IdentifiantContact);
            $("#inputNomContact").val(premierContactSelectionne.NomContact);
            $("#inputPrenomContact").val(premierContactSelectionne.PrenomContact);
            $("#inputAdresseMailContact").val(premierContactSelectionne.AdresseMailContact);
            $("#inputFonctionContact").val(premierContactSelectionne.FonctionContact);
            this.modalEditeContact.montrerModal();
            $("#boutonEditeContact").off();
            $("#boutonEditeContact").on("click", () => {
                premierContactSelectionne.NomContact = $("#inputNomContact").val() as string;
                premierContactSelectionne.PrenomContact = $("#inputPrenomContact").val() as string;
                premierContactSelectionne.AdresseMailContact = $("#inputAdresseMailContact").val() as string;
                premierContactSelectionne.FonctionContact = $("#inputFonctionContact").val() as string;
                this.controleurPlateforme.modifierContact(premierContactSelectionne);
                this.modalEditeContact.cacherModal();
            });
        }
    }

}