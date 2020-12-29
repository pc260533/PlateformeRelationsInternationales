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
import { Cout } from "../modelePlateforme/cout";
import { ErreurSerializable } from "../erreur/erreurSerializable";

import Datatables from "./composants/datatables";
import { ProprietesDatatables } from "./composants/proprietesDatatables";
import { ProprietesDatatablesColonne } from "./composants/proprietesDatatablesColonne";
import { ProprietesDatatablesBouton } from "./composants/proprietesDatatablesBouton";
import ModalSpecifique from "./composants/modalSpecifique";
import SpinnerSpecifique from "./composants/spinnerSpecifique";
import ModalErreur from "./composants/modalErreur";

import mapboxgl, { Marker } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

import "../../scss/vues/vuePartenaires.scss";

import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import { ImagePartenaire } from "../modelePlateforme/imagePartenaire";
import { ErreurChampsNonRemplis } from "../erreur/erreurChampsNonRemplis";
import { EtatPartenaire } from "../modelePlateforme/etatpartenaire";
import { Voeu } from "../modelePlateforme/voeu";

@Component({
    template: require("./templates/vuePartenaires.html"),
    components: {
        Datatables,
        ModalSpecifique,
        SpinnerSpecifique,
        ModalErreur
    }
})
export default class VuePartenaire extends Vue implements IVuePlateforme {
    @Prop() private plateforme!: Plateforme;
    @Prop() private controleurPlateforme!: ControleurPlateforme;
    private proprietesDatatablesPartenaires: ProprietesDatatables;
    private proprietesDatatablesAidesFinancieresPartenaires: ProprietesDatatables;
    private proprietesDatatablesContactsPartenaires: ProprietesDatatables;
    private proprietesDatatablesVoeuxPartenaires: ProprietesDatatables;
    private mapListePartenaire: mapboxgl.Map;
    private geocoderLocalisation: MapboxGeocoder;
    private mapPartenairesMarker: Map<Partenaire, Marker>;

    @Ref("datatablesPartenaires") readonly datatablesPartenaires!: Datatables<Partenaire>;
    @Ref("datatablesAidesFinancieresPartenaires") readonly datatablesAidesFinancieresPartenaires!: Datatables<AideFinanciere>;
    @Ref("datatablesContactsPartenaires") readonly datatablesContactsPartenaires!: Datatables<Contact>;
    @Ref("datatablesVoeuxPartenaires") readonly datatablesVoeuxPartenaires!: Datatables<Voeu>;
    @Ref("modalEditePartenaire") readonly modalEditePartenaire!: ModalSpecifique;
    @Ref("modalEditeAidesFinancieresPartenaire") readonly modalEditeAidesFinancieresPartenaire!: ModalSpecifique;
    @Ref("modalEditeContactsPartenaire") readonly modalEditeContactsPartenaire!: ModalSpecifique;
    @Ref("modalEditeVoeuxPartenaire") readonly modalEditeVoeuxPartenaire!: ModalSpecifique;
    @Ref("spinner") readonly spinner!: SpinnerSpecifique;
    @Ref("modalErreur") readonly modalErreur!: ModalErreur;

    public afficheErreur(erreur: ErreurSerializable): void {
        this.modalErreur.afficherErreur(erreur);
    }

    public ajoutPartenaire(partenaire: Partenaire): void {
        var latitudeLocalisation = partenaire.LocalisationPartenaire.LatitudeLocalisation;
        var longitudeLocalisation = partenaire.LocalisationPartenaire.LongitudeLocalisation;
        if ((latitudeLocalisation != "") && (longitudeLocalisation != "")) {
            var marker = new mapboxgl.Marker({ color: this.getCouleurMarkerPartenaire(partenaire) }).setLngLat([Number(longitudeLocalisation), Number(latitudeLocalisation)]).addTo(this.mapListePartenaire);
            this.mapPartenairesMarker.set(partenaire, marker);
        }
        this.datatablesPartenaires.ajouterLigneDansDatatables(partenaire);
    }

    public suppressionPartenaire(partenaire: Partenaire): void {
        this.datatablesPartenaires.supprimerLigneSelectionneeDansDatatables();
        var markerASupprimer: Marker = this.mapPartenairesMarker.get(partenaire);
        if (markerASupprimer != undefined) {
            markerASupprimer.remove();
        }
    }

    public modificationPartenaire(partenaire: Partenaire): void {
        this.datatablesPartenaires.modifierLigneSelectionneeDansDatatables(partenaire);
        var latitudeLocalisation = partenaire.LocalisationPartenaire.LatitudeLocalisation;
        var longitudeLocalisation = partenaire.LocalisationPartenaire.LongitudeLocalisation;
        if ((latitudeLocalisation != "") && (longitudeLocalisation != "")) {
            var markerAModifier: Marker = this.mapPartenairesMarker.get(partenaire);
            if (markerAModifier != undefined) {
                //modifier le label
                markerAModifier.remove();
            }
            var marker = new mapboxgl.Marker({ color: this.getCouleurMarkerPartenaire(partenaire) }).setLngLat([Number(longitudeLocalisation), Number(latitudeLocalisation)]).addTo(this.mapListePartenaire);
            this.mapPartenairesMarker.set(partenaire, marker);
        }
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

    }

    public modificationCout(cout: Cout): void {

    }

    private initialiserDatatables() {
        this.proprietesDatatablesPartenaires = new ProprietesDatatables();
        this.proprietesDatatablesPartenaires.OrdreDesElementsDeControle = "Bfti";
        this.proprietesDatatablesPartenaires.ajouterColonne(new ProprietesDatatablesColonne("Identifiant Partenaire", "identifiantPartenaire"));
        this.proprietesDatatablesPartenaires.ajouterColonne(new ProprietesDatatablesColonne("Nom Partenaire", "nomPartenaire"));
        this.proprietesDatatablesPartenaires.ajouterBouton(new ProprietesDatatablesBouton("Ajouter Partenaire", this.onAjouterPartenaireClick));
        this.proprietesDatatablesPartenaires.ajouterBouton(new ProprietesDatatablesBouton("Supprimer Partenaire", this.onSupprimerPartenaireClick));
        this.proprietesDatatablesPartenaires.ajouterBouton(new ProprietesDatatablesBouton("Modifier Partenaire", this.onModifierPartenaireClick));
        this.proprietesDatatablesPartenaires.ajouterBouton(new ProprietesDatatablesBouton("Valider les voeux", this.onValiderVoeuxPartenairesClick));

        this.proprietesDatatablesAidesFinancieresPartenaires = new ProprietesDatatables();
        this.proprietesDatatablesAidesFinancieresPartenaires.OrdreDesElementsDeControle = "fti";
        this.proprietesDatatablesAidesFinancieresPartenaires.ajouterColonne(new ProprietesDatatablesColonne("Nom Aide Financiere", "nomAideFinanciere"));

        this.proprietesDatatablesContactsPartenaires = new ProprietesDatatables();
        this.proprietesDatatablesContactsPartenaires.OrdreDesElementsDeControle = "fti";
        this.proprietesDatatablesContactsPartenaires.ajouterColonne(new ProprietesDatatablesColonne("Nom Contact", "nomContact"));

        this.proprietesDatatablesVoeuxPartenaires = new ProprietesDatatables();
        this.proprietesDatatablesVoeuxPartenaires.OrdreDesElementsDeControle = "Bfti";
        this.proprietesDatatablesVoeuxPartenaires.ajouterColonne(new ProprietesDatatablesColonne("Adresse Mail Voeu", "adresseMailVoeu"));
        this.proprietesDatatablesVoeuxPartenaires.ajouterBouton(new ProprietesDatatablesBouton("Supprimer Voeu", this.onSupprimerVoeuPartenaireClick));
    }

    private initialiserEvenementsModals(): void {
        this.modalEditePartenaire.onCacherModal(() => {
            $("form").trigger("reset");
            //$("#selectEtatPartenaire").empty();
            $("#selectListeSpecialitesPartenaire").empty();
            $("#listeSousSpecialitesPartenaire").empty();
            $("#listeMobilitesPartenaire").empty();
            $("#selectListeAidesFinancieresPartenaire").empty();
            $("#selectListeContactsPartenaire").empty();
            $("#listeImagesPartenaireServeur").empty();
            $("#inputListeImagesPartenaires").removeClass("is-invalid");
            $("#inputNomPartenaire").removeClass("is-invalid");
            $("#inputLatitudePartenaire").removeClass("is-invalid");
            $("#inputLongitudePartenaire").removeClass("is-invalid");
            $("#inputNomLocalisationPartenaire").removeClass("is-invalid");
            $("#inputNomPaysLocalisationPartenaire").removeClass("is-invalid");
            this.geocoderLocalisation.clear();
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
        $("#boutonOuvrirModalEditeVoeuxPartenaire").on("click", () => {
            this.onClickOuvrirModalEditeVoeuxPartenaire();
        });

        $("#selectListeSpecialitesPartenaire").on("change", () => {
            var identifiantSpecialite: number = Number($("#selectListeSpecialitesPartenaire option:selected").val());
            var specialiteSelectionnee = this.plateforme.getSpecialiteAvecIdentifiant(identifiantSpecialite);
            $("#listeSousSpecialitesPartenaire").empty();
            specialiteSelectionnee.ListeSousSpecialites.forEach((sousSpecialite: SousSpecialite) => {
                this.ajouterSousSpecialiteDansListe(sousSpecialite, false);
            });
        });

        $("#inputNomPartenaire").click(function () {
            $("#inputNomPartenaire").removeClass("is-invalid");
        });

        $("#inputListeImagesPartenaires").click(function () {
            $("#inputListeImagesPartenaires").removeClass("is-invalid");
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

    private ajouterVoeuDansSelect(voeu: Voeu): void {
        $("#selectListeVoeuxPartenaire").append($("<option>", {
            value: voeu.IdentifiantVoeu,
            text: voeu.AdresseMailVoeu
        }));
    }

    private supprimerVoeuDansSelect(voeu: Voeu): void {
        $("#selectListeContactsPartenaire option[value='" + voeu.IdentifiantVoeu + "']").remove();
    }

    private ajouterImagePartenaireDansListe(imagePartenaire: ImagePartenaire): void {
        var li = $("<li>", {
            value: imagePartenaire.IdentifiantImagePartenaire,
            "class": "list-group-item"
        });
        var span = $("<span>", {
            "class": "name",
            text: imagePartenaire.CheminImagePartenaireServeur
        });
        var buttonSupprimer = $("<button>", {
            type: "button",
            "class": "btn btn-secondary float-right",
            text: "Supprimer"
        });
        var imgPartenaire = $("<img>", {
            src: imagePartenaire.CheminImagePartenaireServeur,
        });
        buttonSupprimer.on("click", () => {
            li.remove();
        });
        li.append(span);
        li.append(buttonSupprimer);
        li.append(imgPartenaire.height(50));
        $("#listeImagesPartenaireServeur").append(li);
    }

    private ajouterEtatPartenaireDansSelect(etatPartenaire: EtatPartenaire): void {
        $("#selectEtatPartenaire").append($("<option>", {
            value: etatPartenaire.IdentifiantEtatPartenaire,
            text: etatPartenaire.NomEtatPartenaire
        }));
    }

    private supprimerEtatPartenaireDansSelect(etatPartenaire: EtatPartenaire): void {
        $("#selectEtatPartenaire option[value='" + etatPartenaire.IdentifiantEtatPartenaire + "']").remove();
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

    private getListeVoeuxSelectionnees(): Voeu[] {
        var listeVoeuxSelectionnes: Voeu[] = [];
        $("#selectListeVoeuxPartenaire option").each((index: number, element: HTMLElement) => {
            var identifiantVoeu: number = Number($(element).val());
            listeVoeuxSelectionnes.push(this.plateforme.getVoeuAvecIdentifiant(identifiantVoeu));
        });
        return listeVoeuxSelectionnes;
    }

    private getCouleurMarkerPartenaire(partenaire: Partenaire): string {
        var couleurSpecialitePartenaire = "#f0f0f0";
        if (partenaire.ListeSousSpecialitesPartenaire.length > 0) {
            couleurSpecialitePartenaire = this.plateforme.getSpecialiteAvecSousSpecialite(partenaire.ListeSousSpecialitesPartenaire[0]).CouleurSpecialite;
        }
        return couleurSpecialitePartenaire;
    }

    private creerPartenaire(): Partenaire {
        var partenaire = new Partenaire();
        partenaire.NomPartenaire = $("#inputNomPartenaire").val() as string;
        partenaire.DomaineDeCompetencePartenaire = $("#inputDomaineDeCompetencePartenaire").val() as string;
        partenaire.LienPartenaire = $("#inputLienPartenaire").val() as string;
        partenaire.EtatPartenaire = this.plateforme.getEtatPartenaireAvecIdentifiant(Number($("#selectEtatPartenaire").val()));
        var localisationPartenaire = new Localisation();
        localisationPartenaire.LatitudeLocalisation = $("#inputLatitudePartenaire").val() as string;
        localisationPartenaire.LongitudeLocalisation = $("#inputLongitudePartenaire").val() as string;
        localisationPartenaire.NomLocalisation = $("#inputNomLocalisationPartenaire").val() as string;
        localisationPartenaire.NomPaysLocalisation = $("#inputNomPaysLocalisationPartenaire").val() as string;
        localisationPartenaire.CodePaysLocalisation = $("#inputCodePaysLocalisationPartenaire").val() as string;
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

        $.each(($("#inputListeImagesPartenaires")[0] as HTMLInputElement).files, (indexFile: number, file: File) => {
            var imagePartenaire = new ImagePartenaire();
            imagePartenaire.FileImagePartenaireLocal = file;
            partenaire.ajouterImagePartenaire(imagePartenaire);
        });

        partenaire.ListeAidesFinancieresPartenaires = this.getListeAidesFinancieresSelectionnees();
        partenaire.ListeContactsPartenaires = this.getListeContactsSelectionnees();
        return partenaire;
    }

    private creerMapEtGeocoder(): void {
        mapboxgl.accessToken = process.env.MAPBOXGL_ACCESSTOKEN;

        this.mapListePartenaire = new mapboxgl.Map({
            container: "mapListePartenaires",
            style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
            center: [5.074101, 47.31231], // starting position [lng, lat]
            zoom: 1, // starting zoom
            attributionControl: false
        });
        this.mapListePartenaire.on("load", () => {
            this.mapListePartenaire.setLayoutProperty("country-label", "text-field", ["get", "name_fr"]);
            this.mapListePartenaire.setLayoutProperty("state-label", "text-field", ["get", "name_fr"]);
            this.mapListePartenaire.setLayoutProperty("settlement-label", "text-field", ["get", "name_fr"]);
            this.mapListePartenaire.setLayoutProperty("settlement-subdivision-label", "text-field", ["get", "name_fr"]);
            this.mapListePartenaire.setLayoutProperty("airport-label", "text-field", ["get", "name_fr"]);
            this.mapListePartenaire.setLayoutProperty("poi-label", "text-field", ["get", "name_fr"]);
            this.mapListePartenaire.setLayoutProperty("water-point-label", "text-field", ["get", "name_fr"]);
            this.mapListePartenaire.setLayoutProperty("water-line-label", "text-field", ["get", "name_fr"]);
            this.mapListePartenaire.setLayoutProperty("natural-point-label", "text-field", ["get", "name_fr"]);
            this.mapListePartenaire.setLayoutProperty("natural-line-label", "text-field", ["get", "name_fr"]);
            this.mapListePartenaire.setLayoutProperty("waterway-label", "text-field", ["get", "name_fr"]);
            this.mapListePartenaire.setLayoutProperty("road-label", "text-field", ["get", "name_fr"]);
        });

        this.geocoderLocalisation = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
        });
        this.geocoderLocalisation.addTo("#geocoderLocalisation");
        $("#inputLatitudePartenaire").prop("disabled", true);
        $("#inputLongitudePartenaire").prop("disabled", true);
        $("#inputNomLocalisationPartenaire").prop("disabled", true);
        $("#inputNomPaysLocalisationPartenaire").prop("disabled", true);
        this.geocoderLocalisation.on("result", function (e) {
            //On désactive l'affichage de précédente erreur.
            $("#inputLatitudePartenaire").removeClass("is-invalid");
            $("#inputLongitudePartenaire").removeClass("is-invalid");
            $("#inputNomLocalisationPartenaire").removeClass("is-invalid");
            $("#inputNomPaysLocalisationPartenaire").removeClass("is-invalid");

            $("#inputLatitudePartenaire").val(e.result.center[1]);
            $("#inputLongitudePartenaire").val(e.result.center[0])
            $("#inputNomLocalisationPartenaire").val(e.result.place_name);
            e.result.context.forEach((context: any) => {
                if (context.id.startsWith("country")) {
                    $("#inputNomPaysLocalisationPartenaire").val(context.text);
                    $("#inputCodePaysLocalisationPartenaire").val(context.short_code);
                }
            });

        });
        //$("#geocoderLocalisation").find("input").val("Dijon, Côte-d'Or, France");
        //geocoder.setInput("Dijon, Côte-d'Or, France");
    }

    public constructor() {
        super();
        this.initialiserDatatables();
        this.mapPartenairesMarker = new Map();
    }

    mounted() {
        this.initialiserEvenementsModals();
        this.creerMapEtGeocoder();
        this.controleurPlateforme.inscrire(this);
        $.when(this.controleurPlateforme.chargerListeSpecialites(),
            this.controleurPlateforme.chargerListeMobilites(),
            this.controleurPlateforme.chargerListeAidesFinancieres(),
            this.controleurPlateforme.chargerListeContacts(),
            this.controleurPlateforme.chargerListeVoeux(),
            this.controleurPlateforme.chargerListeCouts(),
            this.controleurPlateforme.chargerListeEtatsPartenaires()).done(() => {
                this.controleurPlateforme.chargerListePartenaires();
                console.log(this.plateforme);
                this.plateforme.ListeEtatsPartenairesPlateforme.forEach((etatPartenaire: EtatPartenaire) => {
                    this.ajouterEtatPartenaireDansSelect(etatPartenaire);
                });

            });
    }

    beforeDestroy() {
        this.controleurPlateforme.resilier(this);
    }

    private onAjouterPartenaireClick(): void {
        $("#formGroupListeImagesPartenaireServeur").hide();

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
        //mis dans le mounted car ne change jamais
        /*this.plateforme.ListeEtatsPartenairesPlateforme.forEach((etatPartenaire: EtatPartenaire) => {
            this.ajouterEtatPartenaireDansSelect(etatPartenaire);
        });*/
        this.modalEditePartenaire.montrerModal();
        $("#boutonEditePartenaire").off();
        $("#boutonEditePartenaire").on("click", () => {
            try {
                if ($("#inputNomPartenaire").val() == "") {
                    $("#inputNomPartenaire").addClass("is-invalid");
                    throw new ErreurChampsNonRemplis();
                }
                if ($("#inputLatitudePartenaire").val() == "") {
                    $("#inputLatitudePartenaire").addClass("is-invalid");
                    $("#inputLongitudePartenaire").addClass("is-invalid");
                    $("#inputNomLocalisationPartenaire").addClass("is-invalid");
                    $("#inputNomPaysLocalisationPartenaire").addClass("is-invalid");
                    throw new ErreurChampsNonRemplis();
                }
                this.controleurPlateforme.ajouterPartenaire(this.creerPartenaire());
                this.modalEditePartenaire.cacherModal();
            }
            catch (erreur) {
                console.log(erreur);
                $("body").animate({
                    scrollTop: $($(".is-invalid")[0]).focus().offset().top - 25
                }, 1000);
            }
        });
    }

    private onSupprimerPartenaireClick(): void {
        var listePartenairesSelectionnes: Partenaire[] = this.datatablesPartenaires.getListeLignesSelectionnees();
        listePartenairesSelectionnes.forEach((partenaire: Partenaire) => {
            this.controleurPlateforme.supprimerPartenaire(partenaire);
        });
    }

    private onModifierPartenaireClick(): void {
        $("#formGroupListeImagesPartenaireServeur").show();

        var listePartenairesSelectionnes: Partenaire[] = this.datatablesPartenaires.getListeLignesSelectionnees();
        if (listePartenairesSelectionnes.length > 0) {
            var premierPartenaireSelectionne = listePartenairesSelectionnes[0];
            $("#inputTitrePartenaire").text("Modification Partenaire : " + premierPartenaireSelectionne.NomPartenaire);
            $("#inputNomPartenaire").val(premierPartenaireSelectionne.NomPartenaire);
            $("#inputDomaineDeCompetencePartenaire").val(premierPartenaireSelectionne.DomaineDeCompetencePartenaire);
            $("#inputLienPartenaire").val(premierPartenaireSelectionne.LienPartenaire);
            $("#selectEtatPartenaire").val(premierPartenaireSelectionne.EtatPartenaire.IdentifiantEtatPartenaire);
            $("#inputLatitudePartenaire").val(premierPartenaireSelectionne.LocalisationPartenaire.LatitudeLocalisation);
            $("#inputLongitudePartenaire").val(premierPartenaireSelectionne.LocalisationPartenaire.LongitudeLocalisation);
            $("#inputNomLocalisationPartenaire").val(premierPartenaireSelectionne.LocalisationPartenaire.NomLocalisation);
            $("#inputNomPaysLocalisationPartenaire").val(premierPartenaireSelectionne.LocalisationPartenaire.NomPaysLocalisation);
            $("#inputCodePaysLocalisationPartenaire").val(premierPartenaireSelectionne.LocalisationPartenaire.CodePaysLocalisation);
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

            //quand on modifie affiché dans une select la liste des fichiers qui a déjà été uplad avec un bouton supprimer après le li

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

            premierPartenaireSelectionne.ListeVoeuxPartenaire.forEach((voeu: Voeu) => {
                this.ajouterVoeuDansSelect(voeu);
            });

            premierPartenaireSelectionne.ListeImagesPartenaire.forEach((imagePartenaire: ImagePartenaire) => {
                this.ajouterImagePartenaireDansListe(imagePartenaire);
            });

            this.modalEditePartenaire.montrerModal();
            $("#boutonEditePartenaire").off();
            $("#boutonEditePartenaire").on("click", () => {
                // On vérifie que les nouvelles immages sélectionnées à ajouter ne sont pas déjà présent sur le serveur et si celles-ci ne vont pas être supprimées.
                try {
                    $.each(($("#inputListeImagesPartenaires")[0] as HTMLInputElement).files, (indexFile: number, file: File) => {
                        var nomImagePartenaireSelectionnee = file.name;
                        $("#listeImagesPartenaireServeur li").each((index: number, element: HTMLElement) => {
                            var nomImagePartenaire = $(element).find("span").text().split("/").pop();
                            if (nomImagePartenaire == nomImagePartenaireSelectionnee) {
                                throw new ErreurChampsNonRemplis();
                            }
                        });
                    });
                    var nouveauPartenaire = this.creerPartenaire();
                    // tout ce qui est dans la liste des images du nouveau partenaire et qui a un fichier à null est supprimé sinon ajouté.
                    premierPartenaireSelectionne.ListeImagesPartenaire.forEach((imagePartenaire: ImagePartenaire) => {
                        if ($("#listeImagesPartenaireServeur li[value=" + imagePartenaire.IdentifiantImagePartenaire + "]").length == 0) {
                            nouveauPartenaire.ajouterImagePartenaire(imagePartenaire);
                        }
                    });
                    this.controleurPlateforme.modifierPartenaire(premierPartenaireSelectionne, nouveauPartenaire);
                    this.modalEditePartenaire.cacherModal();
                }
                catch (erreur) {
                    console.log(erreur);
                    $("#inputListeImagesPartenaires").addClass("is-invalid");
                    $("body").animate({
                        scrollTop: $($(".is-invalid")[0]).focus().offset().top - 25
                    }, 1000);
                }
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

    private onClickOuvrirModalEditeVoeuxPartenaire(): void {
        var listePartenairesSelectionnes: Partenaire[] = this.datatablesPartenaires.getListeLignesSelectionnees();
        if (listePartenairesSelectionnes.length > 0) {
            var premierPartenaireSelectionne = listePartenairesSelectionnes[0];
            $("#inputTitreVoeuxPartenaire").text("Edition Voeux dans le partenaire : " + premierPartenaireSelectionne.NomPartenaire);
            this.datatablesVoeuxPartenaires.viderDatatables();
            /*var listeVoeuxSelectionnes: Voeu[] = this.getListeVoeuxSelectionnees();
            listeVoeuxSelectionnes.forEach((voeu: Voeu) => {
                this.datatablesVoeuxPartenaires.ajouterLigneDansDatatables(voeu);
            });*/
            //même chose
            premierPartenaireSelectionne.ListeVoeuxPartenaire.forEach((voeu: Voeu) => {
                this.datatablesVoeuxPartenaires.ajouterLigneDansDatatables(voeu);
            });
        }
        this.modalEditeVoeuxPartenaire.montrerModal();
    }

    private onSupprimerVoeuPartenaireClick(): void {

    }

    private onValiderVoeuxPartenairesClick(): void {
        var listePartenairesSelectionnes: Partenaire[] = this.datatablesPartenaires.getListeLignesSelectionnees();
        this.controleurPlateforme.validerListeVoeuxPartenaires(listePartenairesSelectionnes, "pierre-nicolas_chassagne@etu.u-bourgogne.fr");
    }

}