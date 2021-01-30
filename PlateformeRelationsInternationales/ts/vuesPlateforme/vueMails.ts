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
import { OptionMultipleSelectAvecTag } from "./composants/optionMultipleSelectAvecTag";
import ModalSpecifique from "./composants/modalSpecifique";
import SpinnerSpecifique from "./composants/spinnerSpecifique";
import ModalErreur from "./composants/modalErreur";
import ModalInformation from "./composants/modalInformation";

import "../../scss/vues/vueMails.scss";

import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import { ErreurChampsNonRemplis } from "../erreur/erreurChampsNonRemplis";

import * as moment from "moment";

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
    @Ref("datatablesHistoriqueMailsPartenaire") readonly datatablesHistoriqueMailsPartenaire!: Datatables<Mail>;
    @Ref("modalEditeMailPartenaire") readonly modalEditeMailPartenaire!: ModalSpecifique;
    @Ref("modalEditeHistoriqueMailsPartenaire") readonly modalEditeHistoriqueMailsPartenaire!: ModalSpecifique;
    @Ref("modalDetailsMailPartenaire") readonly modalDetailsMailPartenaire!: ModalSpecifique;
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
    private proprietesHistoriqueMailsPartenaire: ProprietesDatatables;
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

    public ajoutMail(mail: Mail): void {
        this.datatablesHistoriqueMailsPartenaire.ajouterLigneDansDatatables(mail);
    }
    public suppressionMail(mail: Mail): void {
        this.datatablesHistoriqueMailsPartenaire.supprimerLigneSelectionneeDansDatatables();
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
        this.proprietesHistoriqueMailsPartenaire = new ProprietesDatatables();
        this.proprietesHistoriqueMailsPartenaire.OrdreDesElementsDeControle = "Bfti";
        this.proprietesHistoriqueMailsPartenaire.ajouterColonne(new ProprietesDatatablesColonne("Identifiant Mail", "identifiantMail"));
        this.proprietesHistoriqueMailsPartenaire.ajouterColonne(new ProprietesDatatablesColonne("Nom Partenaire", "partenaireMail.nomPartenaire"));
        this.proprietesHistoriqueMailsPartenaire.ajouterColonne(new ProprietesDatatablesColonne("Sujet Mail", "SujetMail"));
        this.proprietesDatatablesTemplatesMails = new ProprietesDatatables();
        this.proprietesDatatablesTemplatesMails.OrdreDesElementsDeControle = "Bfti";
        this.proprietesDatatablesTemplatesMails.ajouterColonne(new ProprietesDatatablesColonne("Identifiant Template Mail", "identifiantTemplateMail"));
        this.proprietesDatatablesTemplatesMails.ajouterColonne(new ProprietesDatatablesColonne("Nom Template Mail", "nomTemplateMail"));
        if (this.plateforme.UtilisateurConnecte) {
            this.proprietesDatatablesPartenaires.ajouterBouton(new ProprietesDatatablesBouton("Envoyer mail partenaire", this.onClickEnvoyerMailPartenaire));
            this.proprietesDatatablesPartenaires.ajouterBouton(new ProprietesDatatablesBouton("Voir l'historique des envois partenaire", this.onClickVoirHistoriqueMailsPartenaire));
            this.proprietesHistoriqueMailsPartenaire.ajouterBouton(new ProprietesDatatablesBouton("Voir le détail du mail", this.onClickVoirDetailMailPartenaire));
            this.proprietesHistoriqueMailsPartenaire.ajouterBouton(new ProprietesDatatablesBouton("Supprimer Mail", this.onClickSupprimerMail));
            this.proprietesDatatablesTemplatesMails.ajouterBouton(new ProprietesDatatablesBouton("Ajouter Template Mail", this.onClickAjouterTemplateMail));
            this.proprietesDatatablesTemplatesMails.ajouterBouton(new ProprietesDatatablesBouton("Supprimer Template Mail", this.onClickSupprimerTemplateMail));
            this.proprietesDatatablesTemplatesMails.ajouterBouton(new ProprietesDatatablesBouton("Modifier Template Mail", this.onClickModifierTemplateMail));
        }
    }

    private initialiserEvenementsModals(): void {
        $("#inputDateEnvoie").attr("min", moment().add(1, "days").format("YYYY-MM-DD"));
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
            $("#inputSujetMail").val("");
            this.editeurHtmlMail.viderContenuHtml();
            if ($("#selectTemplateMail").val() != "0") {
                $("#inputSujetMail").val(this.plateforme.getTemplateMailAvecIdentifiant(Number($("#selectTemplateMail").val())).SujetTemplateMail);
                this.editeurHtmlMail.setContenuHtml(this.plateforme.getTemplateMailAvecIdentifiant(Number($("#selectTemplateMail").val())).MessageHtmlTemplateMail);
            }
        });
        this.modalEditeHistoriqueMailsPartenaire.onMontrerModal(() => {
            this.datatablesHistoriqueMailsPartenaire.ajusterLesColonnes();
            $("#inputNomUtilisateur").removeClass("is-invalid");

        });
        this.modalEditeHistoriqueMailsPartenaire.onCacherModal(() => {
            $("#inputDateEnvoie").removeClass("is-invalid");
        });
        $("#inputDateEnvoie").click(function () {
            $("#inputDateEnvoie").removeClass("is-invalid");
        });
        $("#inputEstEnvoye").click(function () {
            if ($("#inputEstEnvoye").prop("checked") as boolean) {
                $("#inputDateEnvoie").prop("disabled", false);
            }
            else {
                $("#inputDateEnvoie").prop("disabled", true);
            }
        });
        this.modalDetailsMailPartenaire.onCacherModal(() => {
            $("#labelListeDestinatairesContactsEtrangersDetailMail").show();
            $("#labelListeDestinatairesCoordinateursDetailMail").show();
            $("#labelListeDestinatairesContactsMailsDetailMail").show();
            $("#labelListeCopiesCarbonesContactsEtrangersDetailMail").show();
            $("#labelListeCopiesCarbonesCoordinateursDetailMail").show();
            $("#labelListeCopiesCarbonesContactsMailsDetailMail").show();
            $("#labelListeCopiesCarbonesInvisiblesContactsEtrangersDetailMail").show();
            $("#labelListeCopiesCarbonesInvisiblesCoordinateursDetailMail").show();
            $("#labelListeCopiesCarbonesInvisiblesContactsMailsDetailMail").show();
            $("#listeDestinatairesContactsEtrangersDetailMail").empty();
            $("#listeDestinatairesCoordinateursDetailMail").empty();
            $("#listeDestinatairesContactsMailsDetailMail").empty();
            $("#listeCopiesCarbonesContactsEtrangersDetailMail").empty();
            $("#listeCopiesCarbonesCoordinateursDetailMail").empty();
            $("#listeCopiesCarbonesContactsMailsDetailMail").empty();
            $("#listeCopiesCarbonesInvisiblesContactsEtrangersDetailMail").empty();
            $("#listeCopiesCarbonesInvisiblesCoordinateursDetailMail").empty();
            $("#listeCopiesCarbonesInvisiblesContactsMailsDetailMail").empty();
            $("#messageHtmlMailDetailsMail").empty();
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
        if ($("#inputEstEnvoye").prop("checked") as boolean) {
            mail.DateEnvoie = new Date($("#inputDateEnvoie").val() as string);
        }
        else {
            mail.DateEnvoie = new Date();
        }
        mail.EstEnvoye = !($("#inputEstEnvoye").prop("checked") as boolean);
        this.multipleSelectAvecTagDestinatairesMail.getListeOptionsSelectionneeAvecGroupe().forEach((optionMultipleSelectAvecTag: OptionMultipleSelectAvecTag) => {
            if (optionMultipleSelectAvecTag.GroupeParentOption == "Contact Etranger") {
                mail.ajouterDestinataireContactEtranger(this.plateforme.getContactEtrangerAvecIdentifiant(Number(optionMultipleSelectAvecTag.IdentifiantOption)));
            }
            else if (optionMultipleSelectAvecTag.GroupeParentOption == "Coordinateur") {
                mail.ajouterDestinataireCoordinateur(this.plateforme.getCoordinateurAvecIdentifiant(Number(optionMultipleSelectAvecTag.IdentifiantOption)));
            }
            else if (optionMultipleSelectAvecTag.GroupeParentOption == "Autres Contacts Mails") {
                mail.ajouterDestinataire(new ContactMail(optionMultipleSelectAvecTag.TexteOption, optionMultipleSelectAvecTag.IdentifiantOption));
            }
        });
        this.multipleSelectAvecTagCCMail.getListeOptionsSelectionneeAvecGroupe().forEach((optionMultipleSelectAvecTag: OptionMultipleSelectAvecTag) => {
            if (optionMultipleSelectAvecTag.GroupeParentOption == "Contact Etranger") {
                mail.ajouterCopieCarboneContactEtranger(this.plateforme.getContactEtrangerAvecIdentifiant(Number(optionMultipleSelectAvecTag.IdentifiantOption)));
            }
            else if (optionMultipleSelectAvecTag.GroupeParentOption == "Coordinateur") {
                mail.ajouterCopieCarboneCoordinateur(this.plateforme.getCoordinateurAvecIdentifiant(Number(optionMultipleSelectAvecTag.IdentifiantOption)));
            }
            else if (optionMultipleSelectAvecTag.GroupeParentOption == "Autres Contacts Mails") {
                mail.ajouterCopieCarbone(new ContactMail(optionMultipleSelectAvecTag.TexteOption, optionMultipleSelectAvecTag.IdentifiantOption));
            }
        });
        this.multipleSelectAvecTagCCIMail.getListeOptionsSelectionneeAvecGroupe().forEach((optionMultipleSelectAvecTag: OptionMultipleSelectAvecTag) => {
            if (optionMultipleSelectAvecTag.GroupeParentOption == "Contact Etranger") {
                mail.ajouterCopieCarboneInvisibleContactEtranger(this.plateforme.getContactEtrangerAvecIdentifiant(Number(optionMultipleSelectAvecTag.IdentifiantOption)));
            }
            else if (optionMultipleSelectAvecTag.GroupeParentOption == "Coordinateur") {
                mail.ajouterCopieCarboneInvisibleCoordinateur(this.plateforme.getCoordinateurAvecIdentifiant(Number(optionMultipleSelectAvecTag.IdentifiantOption)));
            }
            else if (optionMultipleSelectAvecTag.GroupeParentOption == "Autres Contacts Mails") {
                mail.ajouterCopieCarboneInvisible(new ContactMail(optionMultipleSelectAvecTag.TexteOption, optionMultipleSelectAvecTag.IdentifiantOption));
            }
        });
        if ($("#selectTemplateMail").val() != "0") {
            mail.TemplateMail = this.plateforme.getTemplateMailAvecIdentifiant(Number($("#selectTemplateMail").val()));
        }
        mail.SujetMail = $("#inputSujetMail").val() as string;
        mail.MessageHtmlMail = this.editeurHtmlMail.getContenuHtml();
        return mail;
    }

    private creerTemplateMail(): TemplateMail {
        var templateMail = new TemplateMail();
        templateMail.NomTemplateMail = $("#inputNomTemplateMail").val() as string;
        templateMail.SujetTemplateMail = $("#inputSujetTemplateMail").val() as string;
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
            this.controleurTemplatesMails.chargerListeTemplatesMails(),
            this.controleurEtatsPartenaires.chargerListeEtatsPartenaires()).done(() => {
                this.controleurPartenaires.chargerListePartenaires();
            }).done(() => {
                this.controleurMails.chargerListeMails();
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
            $("#inputTitreMailPartenaire").text("Envoyer mail au partenaire : " + premierPartenaireSelectionne.NomPartenaire);
            $("#inputEstEnvoye").prop("checked", false);
            $("#inputDateEnvoie").prop("disabled", true);
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
                this.multipleSelectAvecTagDestinatairesMail.ajouterOptionDansSelect(new OptionMultipleSelectAvecTag(contactEtranger.IdentifiantContact + "", contactEtranger.NomContact));
                this.multipleSelectAvecTagCCMail.ajouterOptionDansSelect(new OptionMultipleSelectAvecTag(contactEtranger.IdentifiantContact + "", contactEtranger.NomContact));
                this.multipleSelectAvecTagCCIMail.ajouterOptionDansSelect(new OptionMultipleSelectAvecTag(contactEtranger.IdentifiantContact + "", contactEtranger.NomContact));
            });
            this.multipleSelectAvecTagDestinatairesMail.ajouterOptionGroupDansSelect("Coordinateur");
            this.multipleSelectAvecTagCCMail.ajouterOptionGroupDansSelect("Coordinateur");
            this.multipleSelectAvecTagCCIMail.ajouterOptionGroupDansSelect("Coordinateur");
            premierPartenaireSelectionne.ListeCoordinateursPartenaires.forEach((coordinateur: Coordinateur) => {
                this.multipleSelectAvecTagDestinatairesMail.ajouterOptionDansSelect(new OptionMultipleSelectAvecTag(coordinateur.IdentifiantContact + "", coordinateur.NomContact));
                this.multipleSelectAvecTagCCMail.ajouterOptionDansSelect(new OptionMultipleSelectAvecTag(coordinateur.IdentifiantContact + "", coordinateur.NomContact));
                this.multipleSelectAvecTagCCIMail.ajouterOptionDansSelect(new OptionMultipleSelectAvecTag(coordinateur.IdentifiantContact + "", coordinateur.NomContact));
            });
            this.multipleSelectAvecTagDestinatairesMail.ajouterOptionGroupDansSelect("Autres Contacts Mails");
            this.multipleSelectAvecTagCCMail.ajouterOptionGroupDansSelect("Autres Contacts Mails");
            this.multipleSelectAvecTagCCIMail.ajouterOptionGroupDansSelect("Autres Contacts Mails");
            this.modalEditeMailPartenaire.montrerModal();
            $("#boutonEditeMailPartenaire").off();
            $("#boutonEditeMailPartenaire").on("click", () => {
                try {
                    if (($("#inputDateEnvoie").val() == "") && ($("#inputEstEnvoye").prop("checked") as boolean)) {
                        $("#inputDateEnvoie").addClass("is-invalid");
                        throw new ErreurChampsNonRemplis();
                    }
                    var mailAEnvoyer: Mail = this.creerMail();
                    mailAEnvoyer.PartenaireMail = premierPartenaireSelectionne;
                    this.controleurMails.envoyerMailPartenaire(mailAEnvoyer);
                    this.modalEditeMailPartenaire.cacherModal();
                }
                catch (erreur) {
                    console.log(erreur);
                    $("body").animate({
                        scrollTop: $($(".is-invalid")[0]).focus().offset().top - 25
                    }, 1000);
                }
            });
        }
    }

    private onClickVoirHistoriqueMailsPartenaire(): void {
        /*var listePartenairesSelectionnes: Partenaire[] = this.datatablesPartenaires.getListeLignesSelectionnees();
        if (listePartenairesSelectionnes.length > 0) {
            var premierPartenaireSelectionne: Partenaire = listePartenairesSelectionnes[0];
            $("#inputTitreMailPartenaire").text("Envoyer mail au partenaire: " + premierPartenaireSelectionne.NomPartenaire);
            this.datatablesHistoriqueMailsPartenaire.viderDatatables()
            this.modalEditeHistoriqueMailsPartenaire.montrerModal();
            $("#boutonEditeHistoriqueMailsPartenaire").off();
            $("#boutonEditeHistoriqueMailsPartenaire").on("click", () => {
                this.modalEditeHistoriqueMailsPartenaire.cacherModal();
            });
        }*/
        $("#inputTitreHistoriqueMailsPartenaire").text("Historique des mails envoyés aux partenaires :");
        this.modalEditeHistoriqueMailsPartenaire.montrerModal();
    }

    private onClickVoirDetailMailPartenaire(): void {
        var listePartenairesSelectionnes: Partenaire[] = this.datatablesPartenaires.getListeLignesSelectionnees();
        if (listePartenairesSelectionnes.length > 0) {
            var premierPartenaireSelectionne: Partenaire = listePartenairesSelectionnes[0];
            var listeMailsSelectionnes: Mail[] = this.datatablesHistoriqueMailsPartenaire.getListeLignesSelectionnees();
            if (listeMailsSelectionnes.length > 0) {
                var premierMailSelectionne: Mail = listeMailsSelectionnes[0];
                $("#inputDetailsMailPartenaire").text("Detail du mail envoyé au partenaire : " + premierPartenaireSelectionne.NomPartenaire);
                $("#nomPartenaireDetailMail").text(premierPartenaireSelectionne.NomPartenaire);
                $("#identifiantMailDetailMail").text(premierMailSelectionne.IdentifiantMail);
                $("#dateEnvoieDetailMail").text(moment(premierMailSelectionne.DateEnvoie).format("DD/MM/YYYY"));
                $("#estEnvoyeDetailMail").text(premierMailSelectionne.EstEnvoye);
                if (premierMailSelectionne.ListeDestinatairesContactsEtrangers.length == 0) {
                    $("#labelListeDestinatairesContactsEtrangersDetailMail").hide();
                }
                if (premierMailSelectionne.ListeDestinatairesCoordinateurs.length == 0) {
                    $("#labelListeDestinatairesCoordinateursDetailMail").hide();
                }
                if (premierMailSelectionne.ListeDestinataires.length == 0) {
                    $("#labelListeDestinatairesContactsMailsDetailMail").hide();
                }
                if (premierMailSelectionne.ListeCopiesCarbonesContactsEtrangers.length == 0) {
                    $("#labelListeCopiesCarbonesContactsEtrangersDetailMail").hide();
                }
                if (premierMailSelectionne.ListeCopiesCarbonesCoordinateurs.length == 0) {
                    $("#labelListeCopiesCarbonesCoordinateursDetailMail").hide();
                }
                if (premierMailSelectionne.ListeCopiesCarbones.length == 0) {
                    $("#labelListeCopiesCarbonesContactsMailsDetailMail").hide();
                }
                if (premierMailSelectionne.ListeCopiesCarbonesInvisiblesContactsEtrangers.length == 0) {
                    $("#labelListeCopiesCarbonesInvisiblesContactsEtrangersDetailMail").hide();
                }
                if (premierMailSelectionne.ListeCopiesCarbonesInvisiblesCoordinateurs.length == 0) {
                    $("#labelListeCopiesCarbonesInvisiblesCoordinateursDetailMail").hide();
                }
                if (premierMailSelectionne.ListeCopiesCarbonesInvisibles.length == 0) {
                    $("#labelListeCopiesCarbonesInvisiblesContactsMailsDetailMail").hide();
                }
                premierMailSelectionne.ListeDestinatairesContactsEtrangers.forEach((contactEtranger: ContactEtranger) => {
                    $("#listeDestinatairesContactsEtrangersDetailMail").append($("<li>").addClass("informationsAProposLi").text(contactEtranger.NomContact));
                });
                premierMailSelectionne.ListeDestinatairesCoordinateurs.forEach((coordinateur: Coordinateur) => {
                    $("#listeDestinatairesCoordinateursDetailMail").append($("<li>").addClass("informationsAProposLi").text(coordinateur.NomContact));
                });
                premierMailSelectionne.ListeDestinataires.forEach((contactMail: ContactMail) => {
                    $("#listeDestinatairesContactsMailsDetailMail").append($("<li>").addClass("informationsAProposLi").text(contactMail.AdresseMailContact));
                });
                premierMailSelectionne.ListeCopiesCarbonesContactsEtrangers.forEach((contactEtranger: ContactEtranger) => {
                    $("#listeCopiesCarbonesContactsEtrangersDetailMail").append($("<li>").addClass("informationsAProposLi").text(contactEtranger.NomContact));
                });
                premierMailSelectionne.ListeCopiesCarbonesCoordinateurs.forEach((coordinateur: Coordinateur) => {
                    $("#listeCopiesCarbonesCoordinateursDetailMail").append($("<li>").addClass("informationsAProposLi").text(coordinateur.NomContact));
                });
                premierMailSelectionne.ListeCopiesCarbones.forEach((contactMail: ContactMail) => {
                    $("#listeCopiesCarbonesContactsMailsDetailMail").append($("<li>").addClass("informationsAProposLi").text(contactMail.AdresseMailContact));
                });
                premierMailSelectionne.ListeCopiesCarbonesInvisiblesContactsEtrangers.forEach((contactEtranger: ContactEtranger) => {
                    $("#listeCopiesCarbonesInvisiblesContactsEtrangersDetailMail").append($("<li>").addClass("informationsAProposLi").text(contactEtranger.NomContact));
                });
                premierMailSelectionne.ListeCopiesCarbonesInvisiblesCoordinateurs.forEach((coordinateur: Coordinateur) => {
                    $("#listeCopiesCarbonesInvisiblesCoordinateursDetailMail").append($("<li>").addClass("informationsAProposLi").text(coordinateur.NomContact));
                });
                premierMailSelectionne.ListeCopiesCarbonesInvisibles.forEach((contactMail: ContactMail) => {
                    $("#listeCopiesCarbonesInvisiblesContactsMailsDetailMail").append($("<li>").addClass("informationsAProposLi").text(contactMail.AdresseMailContact));
                });
                $("#sujetMailDetailMail").text(premierMailSelectionne.SujetMail);
                $("#messageHtmlMailDetailsMail").append(premierMailSelectionne.MessageHtmlMail);
                this.modalDetailsMailPartenaire.montrerModal();
            }
        }
    }

    private onClickSupprimerMail(): void {
        var listeMailsSelectionnes: Mail[] = this.datatablesHistoriqueMailsPartenaire.getListeLignesSelectionnees();
        listeMailsSelectionnes.forEach((mail: Mail) => {
            this.controleurMails.supprimerMail(mail);
        });
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
            $("#inputTitreTemplateMail").text("Modification Template Mail : " + premiereTemplateMailSelectionne.NomTemplateMail);
            $("#inputIdentifiantTemplateMail").val(premiereTemplateMailSelectionne.IdentifiantTemplateMail);
            $("#inputNomTemplateMail").val(premiereTemplateMailSelectionne.NomTemplateMail);
            $("#inputSujetTemplateMail").val(premiereTemplateMailSelectionne.SujetTemplateMail);
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