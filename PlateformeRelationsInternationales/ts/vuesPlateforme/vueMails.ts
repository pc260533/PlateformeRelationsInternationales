import { IVuePartenaires } from "./ivuePartenaires";
import { IVueMails } from "./ivueMails";
import { IVueTemplatesMails } from "./ivueTemplatesMails";
import { Plateforme } from "../modelePlateforme/plateforme";
import { ControleurAidesFinancieres } from "../controleursPlateforme/controleurAidesFinancieres";
import { ControleurContactsEtrangers } from "../controleursPlateforme/controleurContactsEtrangers";
import { ControleurCoordinateurs } from "../controleursPlateforme/controleurCoordinateurs";
import { ControleurDomainesDeCompetences } from "../controleursPlateforme/controleurDomainesDeCompetences";
import { ControleurEtatsPartenaires } from "../controleursPlateforme/controleurEtatsPartenaires";
import { ControleurMails } from "../controleursPlateforme/controleurMails";
import { ControleurMobilites } from "../controleursPlateforme/controleurMobilites";
import { ControleurPartenaires } from "../controleursPlateforme/controleurPartenaires";
import { ControleurSpecialites } from "../controleursPlateforme/controleurSpecialites";
import { ControleurVoeux } from "../controleursPlateforme/controleurVoeux";
import { ControleurTemplatesMails } from "../controleursPlateforme/controleurTemplatesMails";
import { Partenaire } from "../modelePlateforme/partenaire";
import { ContactEtranger } from "../modelePlateforme/contactEtranger";
import { Coordinateur } from "../modelePlateforme/coordinateur";
import { Mail } from "../modelePlateforme/mail";
import { ContactMail } from "../modelePlateforme/contactMail";
import { TemplateMail } from "../modelePlateforme/templateMail";
import { ErreurSerializable } from "../erreur/erreurSerializable";
import { InformationSerializable } from "../information/informationSerializable";

import Datatables from "./composants/datatables";
import { ProprietesDatatables } from "./composants/proprietesDatatables";
import { ProprietesDatatablesColonne } from "./composants/proprietesDatatablesColonne";
import { ProprietesDatatablesBouton } from "./composants/proprietesDatatablesBouton";
import EditeurHtml from "./composants/editeurHtml";
import MultipleSelectAvecTag from "./composants/multipleSelectAvecTag";
import { OptionMultipleSelectAvecTag } from "./composants/OptionMultipleSelectAvecTag";
import ModalSpecifique from "./composants/modalSpecifique";
import SpinnerSpecifique from "./composants/spinnerSpecifique";
import ModalErreur from "./composants/modalErreur";
import ModalInformation from "./composants/modalInformation";

import "../../scss/vues/vueMails.scss";

import { Component, Prop, Vue, Ref } from "vue-property-decorator";

@Component({
    template: require("./templates/vueMails.html"),
    components: {
        Datatables,
        ModalSpecifique,
        MultipleSelectAvecTag,
        EditeurHtml,
        SpinnerSpecifique,
        ModalErreur,
        ModalInformation
    }
})
export default class VueMails extends Vue implements IVuePartenaires, IVueMails, IVueTemplatesMails {
    @Prop() private plateforme!: Plateforme;
    @Prop() private controleurAidesFinancieres!: ControleurAidesFinancieres;
    @Prop() private controleurContactsEtrangers!: ControleurContactsEtrangers;
    @Prop() private controleurCoordinateurs!: ControleurCoordinateurs;
    @Prop() private controleurDomainesDeCompetences!: ControleurDomainesDeCompetences;
    @Prop() private controleurEtatsPartenaires!: ControleurEtatsPartenaires;
    @Prop() private controleurMails!: ControleurMails;
    @Prop() private controleurMobilites!: ControleurMobilites;
    @Prop() private controleurPartenaires!: ControleurPartenaires;
    @Prop() private controleurSpecialites!: ControleurSpecialites;
    @Prop() private controleurVoeux!: ControleurVoeux;
    @Prop() private controleurTemplatesMails!: ControleurTemplatesMails;

    @Ref("datatablesPartenaires") readonly datatablesPartenaires!: Datatables<Partenaire>;
    @Ref("datatablesTemplatesMails") readonly datatablesTemplatesMails!: Datatables<TemplateMail>;
    @Ref("modalEditeMailPartenaire") readonly modalEditeMailPartenaire!: ModalSpecifique;
    @Ref("modalEditeTemplateMail") readonly modalEditeTemplateMail!: ModalSpecifique;
    @Ref("multipleSelectAvecTagDestinatairesMail") readonly multipleSelectAvecTagDestinatairesMail!: MultipleSelectAvecTag;
    @Ref("multipleSelectAvecTagCCMail") readonly multipleSelectAvecTagCCMail!: MultipleSelectAvecTag;
    @Ref("multipleSelectAvecTagCCIMail") readonly multipleSelectAvecTagCCIMail!: MultipleSelectAvecTag;
    @Ref("editeurHtmlMail") readonly editeurHtmlMail!: EditeurHtml;
    @Ref("editeurHtmlTemplateMail") readonly editeurHtmlTemplateMail!: EditeurHtml;
    @Ref("spinner") readonly spinner!: SpinnerSpecifique;
    @Ref("modalErreur") readonly modalErreur!: ModalErreur;
    @Ref("modalInformation") readonly modalInformation!: ModalInformation;

    private proprietesDatatablesPartenaires: ProprietesDatatables;
    private proprietesDatatablesTemplatesMails: ProprietesDatatables;

    public afficheErreur(erreur: ErreurSerializable): void {
        this.modalErreur.afficherErreur(erreur);
    }

    public afficheInformation(information: InformationSerializable): void {
        this.modalInformation.afficherInformation(information);
    }

    public ajoutPartenaire(partenaire: Partenaire): void {
        this.datatablesPartenaires.ajouterLigneDansDatatables(partenaire);
    }
    public suppressionPartenaire(partenaire: Partenaire): void {
        this.datatablesPartenaires.supprimerLigneSelectionneeDansDatatables();
    }
    public modificationPartenaire(partenaire: Partenaire): void {
        this.datatablesPartenaires.modifierLigneSelectionneeDansDatatables(partenaire);
    }

    public ajoutTemplateMail(templateMail: TemplateMail): void {
        this.datatablesTemplatesMails.ajouterLigneDansDatatables(templateMail);
    }
    public suppressionTemplateMail(templateMail: TemplateMail): void {
        this.datatablesTemplatesMails.supprimerLigneSelectionneeDansDatatables();
    }
    public modificationTemplateMail(templateMail: TemplateMail): void {
        this.datatablesTemplatesMails.modifierLigneSelectionneeDansDatatables(templateMail);
    }

    private initialiserDatatables() {
        this.proprietesDatatablesPartenaires = new ProprietesDatatables();
        this.proprietesDatatablesPartenaires.OrdreDesElementsDeControle = "Bfti";
        this.proprietesDatatablesPartenaires.ajouterColonne(new ProprietesDatatablesColonne("Identifiant Partenaire", "identifiantPartenaire"));
        this.proprietesDatatablesPartenaires.ajouterColonne(new ProprietesDatatablesColonne("Nom Partenaire", "nomPartenaire"));
        this.proprietesDatatablesTemplatesMails = new ProprietesDatatables();
        this.proprietesDatatablesTemplatesMails.OrdreDesElementsDeControle = "Bfti";
        this.proprietesDatatablesTemplatesMails.ajouterColonne(new ProprietesDatatablesColonne("Identifiant Template Mail", "identifiantTemplateMail"));
        this.proprietesDatatablesTemplatesMails.ajouterColonne(new ProprietesDatatablesColonne("Nom Template Mail", "nomTemplateMail"));
        if (this.plateforme.UtilisateurConnecte) {
            this.proprietesDatatablesPartenaires.ajouterBouton(new ProprietesDatatablesBouton("Envoyer mail partenaire", this.onClickEnvoyerMailPartenaire));
            this.proprietesDatatablesPartenaires.ajouterBouton(new ProprietesDatatablesBouton("Envoyer un mail à partir d'un template", this.onClickSupprimerAideFinanciere));
            this.proprietesDatatablesPartenaires.ajouterBouton(new ProprietesDatatablesBouton("Planifier l'envoie d'un mail", this.onClickModifierAideFinanciere));
            this.proprietesDatatablesTemplatesMails.ajouterBouton(new ProprietesDatatablesBouton("Ajouter Template Mail", this.onClickAjouterTemplateMail));
            this.proprietesDatatablesTemplatesMails.ajouterBouton(new ProprietesDatatablesBouton("Supprimer Template Mail", this.onClickSupprimerTemplateMail));
            this.proprietesDatatablesTemplatesMails.ajouterBouton(new ProprietesDatatablesBouton("Modifier Template Mail", this.onClickModifierTemplateMail));
        }
    }

    private initialiserEvenementsModals(): void {
        this.modalEditeMailPartenaire.onCacherModal(() => {
            $("form").trigger("reset");
            $("#selectTemplateMail").empty();
            this.editeurHtmlMail.viderContenuHtml();
            this.multipleSelectAvecTagDestinatairesMail.viderSelect();
            this.multipleSelectAvecTagCCMail.viderSelect();
            this.multipleSelectAvecTagCCIMail.viderSelect();
        });
        this.modalEditeTemplateMail.onCacherModal(() => {
            $("form").trigger("reset");
            this.editeurHtmlTemplateMail.viderContenuHtml();
        });
        $("#inputNomTemplateMail").keypress((event) => {
            if (event.keyCode == 13) {
                event.preventDefault();
            }
        });
        $("#selectTemplateMail").on("change", (event) => {
            this.editeurHtmlMail.viderContenuHtml();
            if ($("#selectTemplateMail").val() != "0") {
                this.editeurHtmlMail.setContenuHtml(this.plateforme.getTemplateMailAvecIdentifiant(Number($("#selectTemplateMail").val())).MessageHtmlTemplateMail);
            }
        });
    }

    private ajouterTemplateMailDansSelect(templateMail: TemplateMail): void {
        $("#selectTemplateMail").append($("<option>", {
            value: templateMail.IdentifiantTemplateMail,
            text: templateMail.NomTemplateMail
        }));
    }

    private creerMail(): Mail {
        var mail = new Mail();
        this.multipleSelectAvecTagDestinatairesMail.getListeOptionsSelectionnee().forEach((optionMultipleSelectAvecTag: OptionMultipleSelectAvecTag) => {
            mail.ajouterDestinataire(new ContactMail(optionMultipleSelectAvecTag.TexteOption, optionMultipleSelectAvecTag.IdentifiantOption));
        });
        this.multipleSelectAvecTagCCMail.getListeOptionsSelectionnee().forEach((optionMultipleSelectAvecTag: OptionMultipleSelectAvecTag) => {
            mail.ajouterCopieCarbone(new ContactMail(optionMultipleSelectAvecTag.TexteOption, optionMultipleSelectAvecTag.IdentifiantOption));
        });
        this.multipleSelectAvecTagCCIMail.getListeOptionsSelectionnee().forEach((optionMultipleSelectAvecTag: OptionMultipleSelectAvecTag) => {
            mail.ajouterCopieCarboneInvisible(new ContactMail(optionMultipleSelectAvecTag.TexteOption, optionMultipleSelectAvecTag.IdentifiantOption));
        });
        mail.SujetMail = $("#inputSujetMail").val() as string;
        mail.MessageHtml = this.editeurHtmlMail.getContenuHtml();
        return mail;
    }

    private creerTemplateMail(): TemplateMail {
        var templateMail = new TemplateMail();
        templateMail.NomTemplateMail = $("#inputNomTemplateMail").val() as string;
        templateMail.MessageHtmlTemplateMail = this.editeurHtmlTemplateMail.getContenuHtml();
        return templateMail;
    }

    public constructor() {
        super();
        this.initialiserDatatables();
    }

    mounted() {
        this.initialiserEvenementsModals();
        this.controleurAidesFinancieres.inscrire(this);
        this.controleurContactsEtrangers.inscrire(this);
        this.controleurCoordinateurs.inscrire(this);
        this.controleurDomainesDeCompetences.inscrire(this);
        this.controleurEtatsPartenaires.inscrire(this);
        this.controleurMails.inscrire(this);
        this.controleurMobilites.inscrire(this);
        this.controleurPartenaires.inscrire(this);
        this.controleurSpecialites.inscrire(this);
        this.controleurVoeux.inscrire(this);
        this.controleurTemplatesMails.inscrire(this);
        $.when(this.controleurDomainesDeCompetences.chargerListeDomainesDeCompetences(),
            this.controleurSpecialites.chargerListeSpecialites(),
            this.controleurMobilites.chargerListeMobilites(),
            this.controleurAidesFinancieres.chargerListeAidesFinancieres(),
            this.controleurContactsEtrangers.chargerListeContactsEtrangers(),
            this.controleurCoordinateurs.chargerListeCoordinateurs(),
            this.controleurVoeux.chargerListeVoeux(),
            this.controleurPartenaires.chargerListeCouts(),
            this.controleurEtatsPartenaires.chargerListeEtatsPartenaires()).done(() => {
                this.controleurPartenaires.chargerListePartenaires();
                this.controleurTemplatesMails.chargerListeTemplatesMails();
            });
    }

    beforeDestroy() {
        this.controleurAidesFinancieres.resilier(this);
        this.controleurContactsEtrangers.resilier(this);
        this.controleurCoordinateurs.resilier(this);
        this.controleurDomainesDeCompetences.resilier(this);
        this.controleurEtatsPartenaires.resilier(this);
        this.controleurMails.resilier(this);
        this.controleurMobilites.resilier(this);
        this.controleurPartenaires.resilier(this);
        this.controleurSpecialites.resilier(this);
        this.controleurVoeux.resilier(this);
        this.controleurTemplatesMails.resilier(this);
    }

    private onClickEnvoyerMailPartenaire(): void {
        var listePartenairesSelectionnes: Partenaire[] = this.datatablesPartenaires.getListeLignesSelectionnees();
        if (listePartenairesSelectionnes.length > 0) {
            var premierPartenaireSelectionne: Partenaire = listePartenairesSelectionnes[0];
            $("#inputTitreMailPartenaire").text("Envoyer mail au partenaire: " + premierPartenaireSelectionne.NomPartenaire);
            $("#selectTemplateMail").append($("<option>", {
                value: "0",
                text: "Pas de template sélectionné"
            }));
            this.plateforme.ListeTemplatesMails.forEach((templateMail: TemplateMail) => {
                this.ajouterTemplateMailDansSelect(templateMail);
            });
            this.multipleSelectAvecTagDestinatairesMail.ajouterOptionGroupDansSelect("Contact Etranger");
            this.multipleSelectAvecTagCCMail.ajouterOptionGroupDansSelect("Contact Etranger");
            this.multipleSelectAvecTagCCIMail.ajouterOptionGroupDansSelect("Contact Etranger");
            premierPartenaireSelectionne.ListeContactsEtrangersPartenaires.forEach((contactEtranger: ContactEtranger) => {
                this.multipleSelectAvecTagDestinatairesMail.ajouterOptionDansSelect(new OptionMultipleSelectAvecTag(contactEtranger.AdresseMailContact, contactEtranger.NomContact));
                this.multipleSelectAvecTagCCMail.ajouterOptionDansSelect(new OptionMultipleSelectAvecTag(contactEtranger.AdresseMailContact, contactEtranger.NomContact));
                this.multipleSelectAvecTagCCIMail.ajouterOptionDansSelect(new OptionMultipleSelectAvecTag(contactEtranger.AdresseMailContact, contactEtranger.NomContact));
            });
            this.multipleSelectAvecTagDestinatairesMail.ajouterOptionGroupDansSelect("Coordinateur");
            this.multipleSelectAvecTagCCMail.ajouterOptionGroupDansSelect("Coordinateur");
            this.multipleSelectAvecTagCCIMail.ajouterOptionGroupDansSelect("Coordinateur");
            premierPartenaireSelectionne.ListeCoordinateursPartenaires.forEach((coordinateur: Coordinateur) => {
                this.multipleSelectAvecTagDestinatairesMail.ajouterOptionDansSelect(new OptionMultipleSelectAvecTag(coordinateur.AdresseMailContact, coordinateur.NomContact));
                this.multipleSelectAvecTagCCMail.ajouterOptionDansSelect(new OptionMultipleSelectAvecTag(coordinateur.AdresseMailContact, coordinateur.NomContact));
                this.multipleSelectAvecTagCCIMail.ajouterOptionDansSelect(new OptionMultipleSelectAvecTag(coordinateur.AdresseMailContact, coordinateur.NomContact));
            });
            this.modalEditeMailPartenaire.montrerModal();
            $("#boutonEditeMailPartenaire").off();
            $("#boutonEditeMailPartenaire").on("click", () => {
                this.controleurMails.envoyerMailPartenaire(this.creerMail());
                this.modalEditeMailPartenaire.cacherModal();
            });
        }
    }

    private onClickSupprimerAideFinanciere(): void {

    }

    private onClickModifierAideFinanciere(): void {

    }

    private onClickAjouterTemplateMail(): void {
        $("#inputTitreTemplateMail").text("Ajout Template Mail");
        this.modalEditeTemplateMail.montrerModal();
        $("#boutonEditeTemplateMail").off();
        $("#boutonEditeTemplateMail").on("click", () => {
            this.controleurTemplatesMails.ajouterTemplateMail(this.creerTemplateMail());
            this.modalEditeTemplateMail.cacherModal();
        });
    }

    private onClickSupprimerTemplateMail(): void {
        var listeTemplatesMailsSelectionnes: TemplateMail[] = this.datatablesTemplatesMails.getListeLignesSelectionnees();
        listeTemplatesMailsSelectionnes.forEach((templateMail: TemplateMail) => {
            this.controleurTemplatesMails.supprimerTemplateMail(templateMail);
        });
    }

    private onClickModifierTemplateMail(): void {
        var listeTemplatesMailsSelectionnes: TemplateMail[] = this.datatablesTemplatesMails.getListeLignesSelectionnees();
        if (listeTemplatesMailsSelectionnes.length > 0) {
            var premiereTemplateMailSelectionne: TemplateMail = listeTemplatesMailsSelectionnes[0];
            $("#inputTitreTemplateMail").text("Modifiaction Template Mail : " + premiereTemplateMailSelectionne.NomTemplateMail);
            $("#inputIdentifiantTemplateMail").val(premiereTemplateMailSelectionne.IdentifiantTemplateMail);
            $("#inputNomTemplateMail").val(premiereTemplateMailSelectionne.NomTemplateMail);
            this.editeurHtmlTemplateMail.setContenuHtml(premiereTemplateMailSelectionne.MessageHtmlTemplateMail);
            this.modalEditeTemplateMail.montrerModal();
            $("#boutonEditeTemplateMail").off();
            $("#boutonEditeTemplateMail").on("click", () => {
                this.controleurTemplatesMails.modifierTemplateMail(premiereTemplateMailSelectionne, this.creerTemplateMail());
                this.modalEditeTemplateMail.cacherModal();
            });
        }
    }

}