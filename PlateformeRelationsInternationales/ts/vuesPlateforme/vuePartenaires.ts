import { IVuePlateforme } from "../ivuePlateforme";
import { Plateforme } from "../modelePlateforme/plateforme";
import { ControleurPlateforme } from "../controleurPlateforme";
import { Partenaire } from "../modelePlateforme/partenaire";
import { AideFinanciere } from "../modelePlateforme/aideFinanciere";
import { Specialite } from "../modelePlateforme/specialite";
import { Mobilite } from "../modelePlateforme/mobilite";
import { Contact } from "../modelePlateforme/contact";
import { Localisation } from "../modelePlateforme/localisation";
import { SousSpecialite } from "../modelePlateforme/sousspecialite";

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
    private proprietesDatatablesAidesFinancieresPartenaires: ProprietesDatatables;
    private proprietesDatatablesContactsPartenaires: ProprietesDatatables;

    @Ref("datatablesPartenaires") readonly datatablesPartenaires!: Datatables<Partenaire>;
    @Ref("datatablesAidesFinancieresPartenaires") readonly datatablesAidesFinancieresPartenaires!: Datatables<AideFinanciere>;
    @Ref("datatablesContactsPartenaires") readonly datatablesContactsPartenaires!: Datatables<Contact>;
    @Ref("modalEditePartenaire") readonly modalEditePartenaire!: ModalSpecifique;
    @Ref("modalEditeAidesFinancieresPartenaire") readonly modalEditeAidesFinancieresPartenaire!: ModalSpecifique;
    @Ref("modalEditeContactsPartenaire") readonly modalEditeContactsPartenaire!: ModalSpecifique;
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

        this.proprietesDatatablesAidesFinancieresPartenaires = new ProprietesDatatables();
        this.proprietesDatatablesAidesFinancieresPartenaires.OrdreDesElementsDeControle = "fti";
        this.proprietesDatatablesAidesFinancieresPartenaires.ajouterColonne(new ProprietesDatatablesColonne("Nom Aide Financiere", "nomAideFinanciere"));

        this.proprietesDatatablesContactsPartenaires = new ProprietesDatatables();
        this.proprietesDatatablesContactsPartenaires.OrdreDesElementsDeControle = "fti";
        this.proprietesDatatablesContactsPartenaires.ajouterColonne(new ProprietesDatatablesColonne("Nom Contact", "nomContact"));
    }

    private initialiserEvenementsModals(): void {
        this.modalEditePartenaire.onCacherModal(() => {
            $("form").trigger("reset");
            $("#selectListeSpecialitesPartenaire").empty();
            $("#listeSousSpecialitesPartenaire").empty();
            $("#listeMobilitesPartenaire").empty();
            $("#selectListeAidesFinancieresPartenaire").empty();
            $("#selectListeContactsPartenaire").empty();
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

        $("#selectListeSpecialitesPartenaire").on("change", () => {
            var identifiantSpecialite: number = Number($("#selectListeSpecialitesPartenaire option:selected").val());
            var specialiteSelectionnee = this.plateforme.getSpecialiteAvecIdentifiant(identifiantSpecialite);
            $("#listeSousSpecialitesPartenaire").empty();
            specialiteSelectionnee.ListeSousSpecialites.forEach((sousSpecialite: SousSpecialite) => {
                this.ajouterSousSpecialiteDansListe(sousSpecialite, false);
            });
        });

        this.modalEditeAidesFinancieresPartenaire.onMontrerModal(() => {
            this.datatablesAidesFinancieresPartenaires.ajusterLesColonnes();
        });

        this.modalEditeContactsPartenaire.onMontrerModal(() => {
            this.datatablesContactsPartenaires.ajusterLesColonnes();
        });

    }

    private ajouterSpecialiteDansSelect(specialite: Specialite): void {
        $("#selectListeSpecialitesPartenaire").append($("<option>", {
            value: specialite.IdentifiantSpecialite,
            text: specialite.NomSpecialite
        }));
    }

    private ajouterSousSpecialiteDansListe(sousSpecialite: SousSpecialite, estSelectionnee: boolean): void {
        var li = $("<li>", {
            value: sousSpecialite.IdentifiantSousSpecialite,
            "class": "list-group-item"
        });
        var span = $("<span>", {
            "class": "name",
            text: sousSpecialite.NomSousSpecialite
        });
        var buttonAjouter = $("<button>", {
            type: "button",
            "class": "btn btn-secondary",
            text: "Ajouter"
        });
        var buttonSupprimer = $("<button>", {
            type: "button",
            "class": "btn btn-secondary",
            text: "Supprimer"
        });
        var buttonGroup = $("<div>", {
            "class": "btn-group float-right",
            role: "group"
        });
        if (estSelectionnee) {
            buttonAjouter.prop("disabled", true);
            li.addClass("list-group-item-secondary");
        }
        else {
            buttonSupprimer.prop("disabled", true);
        }
        buttonAjouter.on("click", () => {
            li.addClass("list-group-item-secondary");
            buttonAjouter.prop("disabled", true);
            buttonSupprimer.prop("disabled", false);
        });
        buttonSupprimer.on("click", () => {
            li.removeClass("list-group-item-secondary");
            buttonSupprimer.prop("disabled", true);
            buttonAjouter.prop("disabled", false);
        });

        buttonGroup.append(buttonAjouter);
        buttonGroup.append(buttonSupprimer);
        li.append(span);
        li.append(buttonGroup);
        $("#listeSousSpecialitesPartenaire").append(li);
    }

    private ajouterMobiliteDansListe(mobilite: Mobilite, estSelectionnee: boolean): void {
        var li = $("<li>", {
            value: mobilite.IdentifiantMobilite,
            "class": "list-group-item"
        });
        var span = $("<span>", {
            "class": "name",
            text: mobilite.TypeMobilite
        });
        var buttonAjouter = $("<button>", {
            type: "button",
            "class": "btn btn-secondary",
            text: "Ajouter"
        });
        var buttonSupprimer = $("<button>", {
            type: "button",
            "class": "btn btn-secondary",
            text: "Supprimer"
        });
        var buttonGroup = $("<div>", {
            "class": "btn-group float-right",
            role: "group"
        });
        if (estSelectionnee) {
            buttonAjouter.prop("disabled", true);
            li.addClass("list-group-item-secondary");
        }
        else {
            buttonSupprimer.prop("disabled", true);
        }
        buttonAjouter.on("click", () => {
            li.addClass("list-group-item-secondary");
            buttonAjouter.prop("disabled", true);
            buttonSupprimer.prop("disabled", false);
        });
        buttonSupprimer.on("click", () => {
            li.removeClass("list-group-item-secondary");
            buttonSupprimer.prop("disabled", true);
            buttonAjouter.prop("disabled", false);
        });

        buttonGroup.append(buttonAjouter);
        buttonGroup.append(buttonSupprimer);
        li.append(span);
        li.append(buttonGroup);
        
        $("#listeMobilitesPartenaire").append(li);
    }

    private ajouterAideFinanciereDansSelect(aideFinanciere: AideFinanciere): void {
        $("#selectListeAidesFinancieresPartenaire").append($("<option>", {
            value: aideFinanciere.IdentifiantAideFinanciere,
            text: aideFinanciere.NomAideFinanciere
        }));
    }

    private supprimerAideFinanciereDansSelect(aideFinanciere: AideFinanciere): void {
        $("#selectListeAidesFinancieresPartenaire option[value='" + aideFinanciere.IdentifiantAideFinanciere + "']").remove(); 
    }

    private ajouterContactDansSelect(contact: Contact): void {
        $("#selectListeContactsPartenaire").append($("<option>", {
            value: contact.IdentifiantContact,
            text: contact.NomContact
        }));
    }

    private supprimerContactDansSelect(contact: Contact): void {
        $("#selectListeContactsPartenaire option[value='" + contact.IdentifiantContact + "']").remove(); 
    }

    private getListeSousSpecialitesSelectionnees(): SousSpecialite[] {
        var listeSousSpecialitesSelectionnees: SousSpecialite[] = [];
        $("#listeSousSpecialitesPartenaire li").each((index: number, element: HTMLElement) => {
            if ($(element).hasClass("list-group-item-secondary")) {
                var identifiantSousSpecialite: number = Number($(element).val());
                listeSousSpecialitesSelectionnees.push(this.plateforme.getSousSpecialiteAvecIdentifiant(identifiantSousSpecialite));
            }
        });
        return listeSousSpecialitesSelectionnees;
    }

    private getListeMobilitesSelectionnees(): Mobilite[] {
        var listeMobilitesSelectionnees: Mobilite[] = [];
        $("#listeMobilitesPartenaire li").each((index: number, element: HTMLElement) => {
            if ($(element).hasClass("list-group-item-secondary")) {
                var identifiantMobilite: number = Number($(element).val());
                listeMobilitesSelectionnees.push(this.plateforme.getMobiliteAvecIdentifiant(identifiantMobilite));
            }
        });
        return listeMobilitesSelectionnees;
    }

    private getListeAidesFinancieresSelectionnees(): AideFinanciere[] {
        var listeAidesFinancieresSelectionnees: AideFinanciere[] = [];
        $("#selectListeAidesFinancieresPartenaire option").each((index: number, element: HTMLElement) => {
            var identifiantAideFinanciere: number = Number($(element).val());
            listeAidesFinancieresSelectionnees.push(this.plateforme.getAideFinanciereAvecIdentifiant(identifiantAideFinanciere));
        });
        return listeAidesFinancieresSelectionnees;
    }

    private getListeContactsSelectionnees(): Contact[] {
        var listeContactsSelectionnees: Contact[] = [];
        $("#selectListeContactsPartenaire option").each((index: number, element: HTMLElement) => {
            var identfiantContact: number = Number($(element).val());
            listeContactsSelectionnees.push(this.plateforme.getContactAvecIdentifiant(identfiantContact));
        });
        return listeContactsSelectionnees;
    }

    private creerPartenaire(): Partenaire {
        var partenaire = new Partenaire();
        partenaire.NomPartenaire = $("#inputNomPartenaire").val() as string;
        partenaire.DomaineDeCompetencePartenaire = $("#inputDomaineDeCompetencePartenaire").val() as string;
        var localisationPartenaire = new Localisation();
        localisationPartenaire.LatitudeLocalisation = $("#inputLatitudePartenaire").val() as string;
        localisationPartenaire.LongitudeLocalisation = $("#inputLongitudePartenaire").val() as string;
        partenaire.LocalisationPartenaire = localisationPartenaire;
        partenaire.InformationLogementPartenaire = $("#textareaInformationLogementPartenaire").val() as string;
        partenaire.InformationCoutPartenaire = $("#textareaInformationCoutPartenaire").val() as string;

        $("#listeSousSpecialitesPartenaire li").each((index: number, element: HTMLElement) => {
            if ($(element).hasClass("list-group-item-secondary")) {
                var identifiantSousSpecialite: number = Number($(element).val());
                partenaire.ajouterSousSpecialite(this.plateforme.getSousSpecialiteAvecIdentifiant(identifiantSousSpecialite));
            }
        });

        $("#listeMobilitesPartenaire li").each((index: number, element: HTMLElement) => {
            if ($(element).hasClass("list-group-item-secondary")) {
                var identifiantMobilite: number = Number($(element).val());
                partenaire.ajouterMobilite(this.plateforme.getMobiliteAvecIdentifiant(identifiantMobilite));
            }
        });

        partenaire.ListeAidesFinancieresPartenaires = this.getListeAidesFinancieresSelectionnees();
        partenaire.ListeContactsPartenaires = this.getListeContactsSelectionnees();
        return partenaire;
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
        $("#selectListeSpecialitesPartenaire").prop("disabled", false);
        this.plateforme.ListeSpecialitesPlateforme.forEach((specialite: Specialite) => {
            this.ajouterSpecialiteDansSelect(specialite);
        });
        if (this.plateforme.ListeSpecialitesPlateforme.length > 0) {
            this.plateforme.ListeSpecialitesPlateforme[0].ListeSousSpecialites.forEach((sousSpecialite: SousSpecialite) => {
                this.ajouterSousSpecialiteDansListe(sousSpecialite, false);
            });
        }
        this.plateforme.ListeMobilitesPlateforme.forEach((mobilite: Mobilite) => {
            this.ajouterMobiliteDansListe(mobilite, false);
        });
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

            $("#listeSousSpecialitesPartenaire li").each((index: number, element: HTMLElement) => {
                if ($(element).hasClass("list-group-item-secondary")) {
                    var identifiantSousSpecialite: number = Number($(element).val());
                    partenaire.ajouterSousSpecialite(this.plateforme.getSousSpecialiteAvecIdentifiant(identifiantSousSpecialite));
                }
            });

            $("#listeMobilitesPartenaire li").each((index: number, element: HTMLElement) => {
                if ($(element).hasClass("list-group-item-secondary")) {
                    var identifiantMobilite: number = Number($(element).val());
                    partenaire.ajouterMobilite(this.plateforme.getMobiliteAvecIdentifiant(identifiantMobilite));
                }
            });

            partenaire.ListeAidesFinancieresPartenaires = this.getListeAidesFinancieresSelectionnees();
            partenaire.ListeContactsPartenaires = this.getListeContactsSelectionnees();

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
        var listePartenairesSelectionnes: Partenaire[] = this.datatablesPartenaires.getListeLignesSelectionnees();
        if (listePartenairesSelectionnes.length > 0) {
            var premierPartenaireSelectionne = listePartenairesSelectionnes[0];
            $("#inputTitrePartenaire").text("Modification Partenaire : " + premierPartenaireSelectionne.NomPartenaire);
            $("#inputNomPartenaire").val(premierPartenaireSelectionne.NomPartenaire);
            $("#inputDomaineDeCompetencePartenaire").val(premierPartenaireSelectionne.DomaineDeCompetencePartenaire);
            $("#inputLatitudePartenaire").val(premierPartenaireSelectionne.LocalisationPartenaire.LatitudeLocalisation);
            $("#inputLongitudePartenaire").val(premierPartenaireSelectionne.LocalisationPartenaire.LongitudeLocalisation);
            $("#textareaInformationLogementPartenaire").val(premierPartenaireSelectionne.InformationLogementPartenaire);
            $("#textareaInformationCoutPartenaire").val(premierPartenaireSelectionne.InformationCoutPartenaire);

            if (premierPartenaireSelectionne.ListeSousSpecialitesPartenaire.length > 0) {
                var specialiteSelectionnee = this.plateforme.getSpecialiteAvecSousSpecialite(premierPartenaireSelectionne.ListeSousSpecialitesPartenaire[0]);
                this.ajouterSpecialiteDansSelect(specialiteSelectionnee);
                $("#selectListeSpecialitesPartenaire").prop("disabled", true);
                specialiteSelectionnee.ListeSousSpecialites.forEach((sousSpecialite: SousSpecialite) => {
                    var sousSpecialiteEstSelectionnee: boolean = false;
                    if (premierPartenaireSelectionne.ListeSousSpecialitesPartenaire.includes(sousSpecialite)) {
                        sousSpecialiteEstSelectionnee = true;
                    }
                    this.ajouterSousSpecialiteDansListe(sousSpecialite, sousSpecialiteEstSelectionnee);
                });
            }
            else {
                $("#selectListeSpecialitesPartenaire").prop("disabled", false);
                this.plateforme.ListeSpecialitesPlateforme.forEach((specialite: Specialite) => {
                    this.ajouterSpecialiteDansSelect(specialite);
                });
                if (this.plateforme.ListeSpecialitesPlateforme.length > 0) {
                    this.plateforme.ListeSpecialitesPlateforme[0].ListeSousSpecialites.forEach((sousSpecialite: SousSpecialite) => {
                        this.ajouterSousSpecialiteDansListe(sousSpecialite, false);
                    });
                }
            }

            this.plateforme.ListeMobilitesPlateforme.forEach((mobilite: Mobilite) => {
                var mobiliteEstSelectionnee: boolean = false;
                if (premierPartenaireSelectionne.ListeMobilitesPartenaires.includes(mobilite)) {
                    mobiliteEstSelectionnee = true;
                }
                this.ajouterMobiliteDansListe(mobilite, mobiliteEstSelectionnee);
            });
            premierPartenaireSelectionne.ListeAidesFinancieresPartenaires.forEach((aideFinanciere: AideFinanciere) => {
                this.ajouterAideFinanciereDansSelect(aideFinanciere);
            });

            premierPartenaireSelectionne.ListeContactsPartenaires.forEach((contact: Contact) => {
                this.ajouterContactDansSelect(contact);
            });

            this.modalEditePartenaire.montrerModal();
            $("#boutonEditePartenaire").off();
            $("#boutonEditePartenaire").on("click", () => {
                this.controleurPlateforme.modifierPartenaire(premierPartenaireSelectionne, this.creerPartenaire());
                this.modalEditePartenaire.cacherModal();
            });
        }
    }

    private onClickAjouterAideFinancierePartenaire(): void {
        // on a besoin du partenaire
        //soit ue variable partenaireSelectionne soit un event on off la ou on a le partenaire
        var listePartenairesSelectionnes: Partenaire[] = this.datatablesPartenaires.getListeLignesSelectionnees();
        if (listePartenairesSelectionnes.length > 0) {
            var premierPartenaireSelectionne = listePartenairesSelectionnes[0];
        }
        $("#inputTitreAidesFinancieresPartenaire").text("Ajout Aides Financières dans le partenaire :");
        this.datatablesAidesFinancieresPartenaires.viderDatatables();
        var listeAidesFinancieresSelectionnees: AideFinanciere[] = this.getListeAidesFinancieresSelectionnees();
        this.plateforme.ListeAidesFinancieresPlateforme.forEach((aideFinanciere: AideFinanciere) => {
            if (!listeAidesFinancieresSelectionnees.includes(aideFinanciere)) {
                this.datatablesAidesFinancieresPartenaires.ajouterLigneDansDatatables(aideFinanciere);
            }
        });
        this.modalEditeAidesFinancieresPartenaire.montrerModal();
        $("#boutonEditeAidesFinancieresPartenaire").off();
        $("#boutonEditeAidesFinancieresPartenaire").on("click", () => {
            var listeAidesFinancieresAAjouter: AideFinanciere[] = this.datatablesAidesFinancieresPartenaires.getListeLignesSelectionnees();
            listeAidesFinancieresAAjouter.forEach((aideFinanciere: AideFinanciere) => {
                this.ajouterAideFinanciereDansSelect(aideFinanciere);
                // le partenaire n'a pas encore été créée
                //premierPartenaireSelectionne.ajouterAideFinanciere(aideFinanciere);
            });
            this.modalEditeAidesFinancieresPartenaire.cacherModal();
        });
    }
    private onClickSupprimerAideFinancierePartenaire(): void {
        // on a besoin du partenaire
        //soit ue variable partenaireSelectionne soit un event on off la ou on a le partenaire
        var listePartenairesSelectionnes: Partenaire[] = this.datatablesPartenaires.getListeLignesSelectionnees();
        if (listePartenairesSelectionnes.length > 0) {
            var premierPartenaireSelectionne = listePartenairesSelectionnes[0];
            console.log(premierPartenaireSelectionne);
        }
        $("#inputTitreAidesFinancieresPartenaire").text("Suppression Aides Financières dans le partenaire :");
        this.datatablesAidesFinancieresPartenaires.viderDatatables();
        var listeAidesFinancieresSelectionnees: AideFinanciere[] = this.getListeAidesFinancieresSelectionnees();
        listeAidesFinancieresSelectionnees.forEach((aideFinanciere: AideFinanciere) => {
            this.datatablesAidesFinancieresPartenaires.ajouterLigneDansDatatables(aideFinanciere);
        });
        this.modalEditeAidesFinancieresPartenaire.montrerModal();
        $("#boutonEditeAidesFinancieresPartenaire").off();
        $("#boutonEditeAidesFinancieresPartenaire").on("click", () => {
            var listeAidesFinancieresASupprimer: AideFinanciere[] = this.datatablesAidesFinancieresPartenaires.getListeLignesSelectionnees();
            listeAidesFinancieresASupprimer.forEach((aideFinanciere: AideFinanciere) => {
                this.supprimerAideFinanciereDansSelect(aideFinanciere);
                // le partenaire n'a pas encore été créée
                //premierPartenaireSelectionne.ajouterAideFinanciere(aideFinanciere);
            });
            this.modalEditeAidesFinancieresPartenaire.cacherModal();
        });
    }
    private onClickAjouterContactPartenaire(): void {
        // on a besoin du partenaire
        //soit ue variable partenaireSelectionne soit un event on off la ou on a le partenaire
        var listePartenairesSelectionnes: Partenaire[] = this.datatablesPartenaires.getListeLignesSelectionnees();
        if (listePartenairesSelectionnes.length > 0) {
            var premierPartenaireSelectionne = listePartenairesSelectionnes[0];
        }
        $("#inputTitreContactsPartenaire").text("Ajout Contacts dans le partenaire :");
        this.datatablesContactsPartenaires.viderDatatables();
        var listeContactsSelectionnes: Contact[] = this.getListeContactsSelectionnees();
        this.plateforme.ListeContactsPlateforme.forEach((contact: Contact) => {
            if (!listeContactsSelectionnes.includes(contact)) {
                this.datatablesContactsPartenaires.ajouterLigneDansDatatables(contact);
            }
        });
        this.modalEditeContactsPartenaire.montrerModal();
        $("#boutonEditeContactsPartenaire").off();
        $("#boutonEditeContactsPartenaire").on("click", () => {
            var listeContactsAAjouter: Contact[] = this.datatablesContactsPartenaires.getListeLignesSelectionnees();
            listeContactsAAjouter.forEach((contact: Contact) => {
                this.ajouterContactDansSelect(contact);
                // le partenaire n'a pas encore été créée
                //premierPartenaireSelectionne.ajouterAideFinanciere(aideFinanciere);
            });
            this.modalEditeContactsPartenaire.cacherModal();
        });
    }
    private onClickSupprimerContactPartenaire(): void {
        var listePartenairesSelectionnes: Partenaire[] = this.datatablesPartenaires.getListeLignesSelectionnees();
        if (listePartenairesSelectionnes.length > 0) {
            var premierPartenaireSelectionne = listePartenairesSelectionnes[0];
            console.log(premierPartenaireSelectionne);
        }
        $("#inputTitreContactsPartenaire").text("Suppression Contacts dans le partenaire :");
        this.datatablesContactsPartenaires.viderDatatables();
        var listeContactsSelectionnes: Contact[] = this.getListeContactsSelectionnees();
        listeContactsSelectionnes.forEach((contact: Contact) => {
            this.datatablesContactsPartenaires.ajouterLigneDansDatatables(contact);
        });
        this.modalEditeContactsPartenaire.montrerModal();
        $("#boutonEditeContactsPartenaire").off();
        $("#boutonEditeContactsPartenaire").on("click", () => {
            var listeContactsASupprimer: Contact[] = this.datatablesContactsPartenaires.getListeLignesSelectionnees();
            listeContactsASupprimer.forEach((contact: Contact) => {
                this.supprimerContactDansSelect(contact);
                // le partenaire n'a pas encore été créée
                //premierPartenaireSelectionne.ajouterAideFinanciere(aideFinanciere);
            });
            this.modalEditeContactsPartenaire.cacherModal();
        });
    }

}