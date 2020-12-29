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
import { ImagePartenaire } from "../modelePlateforme/imagePartenaire";
import { EtatPartenaire } from "../modelePlateforme/etatpartenaire";
import { Voeu } from "../modelePlateforme/voeu";
import { ErreurSerializable } from "../erreur/erreurSerializable";
import { ErreurChampsNonRemplis } from "../erreur/erreurChampsNonRemplis";
import { InformationSerializable } from "../information/informationSerializable";

import Datatables from "./composants/datatables";
import { ProprietesDatatables } from "./composants/proprietesDatatables";
import { ProprietesDatatablesColonne } from "./composants/proprietesDatatablesColonne";
import { ProprietesDatatablesBouton } from "./composants/proprietesDatatablesBouton";
import ModalSpecifique from "./composants/modalSpecifique";
import SpinnerSpecifique from "./composants/spinnerSpecifique";
import TreeSpecifique from "./composants/treeSpecifique";
import { NoeudTreeSpecifique } from "./composants/noeudTreeSpecifique";
import ModalErreur from "./composants/modalErreur";
import ModalInformation from "./composants/modalInformation";

import mapboxgl, { Marker } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

import "../../scss/vues/vuePartenaires.scss";

import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import { DomaineDeCompetence } from "../modelePlateforme/domaineDeCompetence";

@Component({
    template: require("./templates/vuePartenaires.html"),
    components: {
        Datatables,
        ModalSpecifique,
        SpinnerSpecifique,
        TreeSpecifique,
        ModalErreur,
        ModalInformation
    }
})
export default class VuePartenaire extends Vue implements IVuePlateforme {
    @Prop() private plateforme!: Plateforme;
    @Prop() private controleurPlateforme!: ControleurPlateforme;
    private proprietesDatatablesPartenaires: ProprietesDatatables;
    private proprietesDatatablesDomainesDeCompetencesPartenaires: ProprietesDatatables;
    private proprietesDatatablesMobilitesPartenaires: ProprietesDatatables;
    private proprietesDatatablesAidesFinancieresPartenaires: ProprietesDatatables;
    private proprietesDatatablesContactsPartenaires: ProprietesDatatables;
    private proprietesDatatablesVoeuxPartenaires: ProprietesDatatables;
    private proprietesDatatablesListeVoeuxPartenaires: ProprietesDatatables;
    private mapListePartenaire: mapboxgl.Map;
    private geocoderLocalisation: MapboxGeocoder;
    private mapPartenairesMarker: Map<Partenaire, Marker>;

    @Ref("datatablesPartenaires") readonly datatablesPartenaires!: Datatables<Partenaire>;
    @Ref("datatablesDomainesDeCompetencesPartenaires") readonly datatablesDomainesDeCompetencesPartenaires!: Datatables<DomaineDeCompetence>;
    @Ref("datatablesMobilitesPartenaires") readonly datatablesMobilitesPartenaires!: Datatables<Mobilite>;
    @Ref("datatablesAidesFinancieresPartenaires") readonly datatablesAidesFinancieresPartenaires!: Datatables<AideFinanciere>;
    @Ref("datatablesContactsPartenaires") readonly datatablesContactsPartenaires!: Datatables<Contact>;
    @Ref("datatablesVoeuxPartenaires") readonly datatablesVoeuxPartenaires!: Datatables<Voeu>;
    @Ref("datatablesListeVoeuxPartenaires") readonly datatablesListeVoeuxPartenaires!: Datatables<Partenaire>;
    @Ref("modalEditePartenaire") readonly modalEditePartenaire!: ModalSpecifique;
    @Ref("modalEditeDomaineDeCompetence") readonly modalEditeDomaineDeCompetence!: ModalSpecifique;
    @Ref("modalEditeDomainesDeCompetencesPartenaire") readonly modalEditeDomainesDeCompetencesPartenaire!: ModalSpecifique;
    @Ref("modalEditeSousSpecialitesPartenaire") readonly modalEditeSousSpecialitesPartenaire!: ModalSpecifique;
    @Ref("modalEditeMobilitesPartenaire") readonly modalEditeMobilitesPartenaire!: ModalSpecifique;
    @Ref("modalEditeAidesFinancieresPartenaire") readonly modalEditeAidesFinancieresPartenaire!: ModalSpecifique;
    @Ref("modalEditeContactsPartenaire") readonly modalEditeContactsPartenaire!: ModalSpecifique;
    @Ref("modalEditeVoeuxPartenaire") readonly modalEditeVoeuxPartenaire!: ModalSpecifique;
    @Ref("modalValideVoeuxPartenaires") readonly modalValideVoeuxPartenaires!: ModalSpecifique;
    @Ref("spinner") readonly spinner!: SpinnerSpecifique;
    @Ref("treeSousSpecialitesPartenaire") readonly treeSousSpecialitesPartenaire!: TreeSpecifique;
    @Ref("modalErreur") readonly modalErreur!: ModalErreur;
    @Ref("modalInformation") readonly modalInformation!: ModalInformation;

    public afficheErreur(erreur: ErreurSerializable): void {
        this.modalErreur.afficherErreur(erreur);
    }

    public afficheInformation(information: InformationSerializable): void {
        this.modalInformation.afficherInformation(information);
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

        this.proprietesDatatablesDomainesDeCompetencesPartenaires = new ProprietesDatatables();
        this.proprietesDatatablesDomainesDeCompetencesPartenaires.OrdreDesElementsDeControle = "Bfti";
        this.proprietesDatatablesDomainesDeCompetencesPartenaires.ajouterColonne(new ProprietesDatatablesColonne("Nom Domaine De Compétence", "nomDomaineDeCompetence"));
        this.proprietesDatatablesDomainesDeCompetencesPartenaires.ajouterBouton(new ProprietesDatatablesBouton("Ajouter Domaine De Compétence", this.onAjouterNouveauDomaineDeCompetenceClick));

        this.proprietesDatatablesMobilitesPartenaires = new ProprietesDatatables();
        this.proprietesDatatablesMobilitesPartenaires.OrdreDesElementsDeControle = "fti";
        this.proprietesDatatablesMobilitesPartenaires.ajouterColonne(new ProprietesDatatablesColonne("Type Mobilite", "typeMobilite"));

        this.proprietesDatatablesAidesFinancieresPartenaires = new ProprietesDatatables();
        this.proprietesDatatablesAidesFinancieresPartenaires.OrdreDesElementsDeControle = "fti";
        this.proprietesDatatablesAidesFinancieresPartenaires.ajouterColonne(new ProprietesDatatablesColonne("Nom Aide Financiere", "nomAideFinanciere"));

        this.proprietesDatatablesContactsPartenaires = new ProprietesDatatables();
        this.proprietesDatatablesContactsPartenaires.OrdreDesElementsDeControle = "fti";
        this.proprietesDatatablesContactsPartenaires.ajouterColonne(new ProprietesDatatablesColonne("Nom Contact", "nomContact"));

        this.proprietesDatatablesVoeuxPartenaires = new ProprietesDatatables();
        this.proprietesDatatablesVoeuxPartenaires.OrdreDesElementsDeControle = "fti";
        this.proprietesDatatablesVoeuxPartenaires.ajouterColonne(new ProprietesDatatablesColonne("Adresse Mail Voeu", "adresseMailVoeu"));

        this.proprietesDatatablesListeVoeuxPartenaires = new ProprietesDatatables();
        this.proprietesDatatablesListeVoeuxPartenaires.OrdreDesElementsDeControle = "t";
        this.proprietesDatatablesListeVoeuxPartenaires.ajouterColonne(new ProprietesDatatablesColonne("Nom Partenaire", "nomPartenaire"));
    }

    private initialiserEvenementsModals(): void {
        this.modalEditePartenaire.onCacherModal(() => {
            $("form").trigger("reset");
            $("#selectListeDomainesDeCompetencesPartenaire").empty();
            $("#selectListeSousSpecialitesPartenaire").empty();
            $("#selectListeMobilitesPartenaire").empty();
            $("#selectListeAidesFinancieresPartenaire").empty();
            $("#selectListeContactsPartenaire").empty();
            $("#selectListeVoeuxPartenaire").empty();
            $("#listeImagesPartenaireServeur").empty();
            $("#inputListeImagesPartenaires").removeClass("is-invalid");
            $("#inputNomPartenaire").removeClass("is-invalid");
            $("#inputLatitudePartenaire").removeClass("is-invalid");
            $("#inputLongitudePartenaire").removeClass("is-invalid");
            $("#inputNomLocalisationPartenaire").removeClass("is-invalid");
            $("#inputNomPaysLocalisationPartenaire").removeClass("is-invalid");
            this.geocoderLocalisation.clear();
        });

        $("#boutonAjouterDomaineDeCompetencePartenaire").on("click", () => {
            this.onClickAjouterDomaineDeCompetencePartenaire();
        });
        $("#boutonSupprimerDomaineDeCompetencePartenaire").on("click", () => {
            this.onClickSupprimerDomaineDeCompetencePartenaire();
        });
        $("#boutonEditerSousSpecialitePartenaire").on("click", () => {
            this.onClickEditerSousSpecialitePartenaire();
        });
        $("#boutonSupprimerSousSpecialitePartenaire").on("click", () => {
            this.onClickSupprimerSousSpecialitePartenaire();
        });
        $("#boutonAjouterMobilitePartenaire").on("click", () => {
            this.onClickAjouterMobilitePartenaire();
        });
        $("#boutonSupprimerMobilitePartenaire").on("click", () => {
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
        $("#boutonSupprimerVoeuPartenaire").on("click", () => {
            this.onClickSupprimerVoeuPartenaire();
        });

        $("#inputNomPartenaire").click(function () {
            $("#inputNomPartenaire").removeClass("is-invalid");
        });

        $("#inputListeImagesPartenaires").click(function () {
            $("#inputListeImagesPartenaires").removeClass("is-invalid");
        });

        $("#inputAdresseMailVoeuxPartenaires").click(function () {
            $("#inputAdresseMailVoeuxPartenaires").removeClass("is-invalid");
        });

        this.modalEditeDomainesDeCompetencesPartenaire.onMontrerModal(() => {
            this.datatablesDomainesDeCompetencesPartenaires.ajusterLesColonnes();
        });

        this.modalEditeSousSpecialitesPartenaire.onCacherModal(() => {
            this.treeSousSpecialitesPartenaire.deselectionnerTousLesNoeuds();
        });

        this.modalEditeMobilitesPartenaire.onMontrerModal(() => {
            this.datatablesMobilitesPartenaires.ajusterLesColonnes();
        });

        this.modalEditeAidesFinancieresPartenaire.onMontrerModal(() => {
            this.datatablesAidesFinancieresPartenaires.ajusterLesColonnes();
        });

        this.modalEditeContactsPartenaire.onMontrerModal(() => {
            this.datatablesContactsPartenaires.ajusterLesColonnes();
        });

        this.modalValideVoeuxPartenaires.onMontrerModal(() => {
            this.datatablesListeVoeuxPartenaires.ajusterLesColonnes();
        });

        this.modalValideVoeuxPartenaires.onCacherModal(() => {
            $("#inputAdresseMailVoeuxPartenaires").removeClass("is-invalid");
        });

    }

    private ajouterDomaineDeCompetenceDansSelect(domaineDeCompetence: DomaineDeCompetence): void {
        console.log(domaineDeCompetence);
        $("#selectListeDomainesDeCompetencesPartenaire").append($("<option>", {
            value: domaineDeCompetence.IdentifiantDomaineDeCompetence,
            text: domaineDeCompetence.NomDomaineDeCompetence
        }));
    }

    private supprimerDomaineDeCompetenceDansSelect(domaineDeCompetence: DomaineDeCompetence): void {
        $("#selectListeDomainesDeCompetencesPartenaire option[value='" + domaineDeCompetence.IdentifiantDomaineDeCompetence + "']").remove();
    }

    private ajouterSousSpecialiteDansSelect(sousSpecialite: SousSpecialite): void {
        $("#selectListeSousSpecialitesPartenaire").append($("<option>", {
            value: sousSpecialite.IdentifiantSousSpecialite,
            text: sousSpecialite.NomSousSpecialite
        }));
    }

    private supprimerSousSpecialiteDansSelect(sousSpecialite: SousSpecialite): void {
        $("#selectListeSousSpecialitesPartenaire option[value='" + sousSpecialite.IdentifiantSousSpecialite + "']").remove();
    }

    private ajouterMobiliteDansSelect(mobilite: Mobilite): void {
        $("#selectListeMobilitesPartenaire").append($("<option>", {
            value: mobilite.IdentifiantMobilite,
            text: mobilite.TypeMobilite
        }));
    }

    private supprimerMobiliteDansSelect(mobilite: Mobilite): void {
        $("#selectListeMobilitesPartenaire option[value='" + mobilite.IdentifiantMobilite + "']").remove();
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
        $("#selectListeVoeuxPartenaire option[value='" + voeu.IdentifiantVoeu + "']").remove();
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

    private getListeDomainesDeCompetencesSelectionnees(): DomaineDeCompetence[] {
        var listeDomainesDeCompetencesSelectionnes: DomaineDeCompetence[] = [];
        $("#selectListeDomainesDeCompetencesPartenaire option").each((index: number, element: HTMLElement) => {
            var identifiantDomaineDeCompetence: number = Number($(element).val());
            listeDomainesDeCompetencesSelectionnes.push(this.plateforme.getDomaineDeCompetenceAvecIdentifiant(identifiantDomaineDeCompetence));
        });
        return listeDomainesDeCompetencesSelectionnes;
    }

    private getListeSousSpecialitesSelectionnees(): SousSpecialite[] {
        var listeSousSpecialitesSelectionnees: SousSpecialite[] = [];
        $("#selectListeSousSpecialitesPartenaire option").each((index: number, element: HTMLElement) => {
            var identifiantSousSpecialite: number = Number($(element).val());
            listeSousSpecialitesSelectionnees.push(this.plateforme.getSousSpecialiteAvecIdentifiant(identifiantSousSpecialite));
        });
        return listeSousSpecialitesSelectionnees;
    }

    private getListeMobilitesSelectionnees(): Mobilite[] {
        var listeMobilitesSelectionnees: Mobilite[] = [];
        $("#selectListeMobilitesPartenaire option").each((index: number, element: HTMLElement) => {
            var identifiantMobilite: number = Number($(element).val());
            listeMobilitesSelectionnees.push(this.plateforme.getMobiliteAvecIdentifiant(identifiantMobilite));
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
        partenaire.LienPartenaire = $("#inputLienPartenaire").val() as string;
        partenaire.InformationLogementPartenaire = $("#textareaInformationLogementPartenaire").val() as string;
        partenaire.InformationCoutPartenaire = $("#textareaInformationCoutPartenaire").val() as string;
        var localisationPartenaire = new Localisation();
        localisationPartenaire.LatitudeLocalisation = $("#inputLatitudePartenaire").val() as string;
        localisationPartenaire.LongitudeLocalisation = $("#inputLongitudePartenaire").val() as string;
        localisationPartenaire.NomLocalisation = $("#inputNomLocalisationPartenaire").val() as string;
        localisationPartenaire.NomPaysLocalisation = $("#inputNomPaysLocalisationPartenaire").val() as string;
        localisationPartenaire.CodePaysLocalisation = $("#inputCodePaysLocalisationPartenaire").val() as string;
        partenaire.LocalisationPartenaire = localisationPartenaire;
        partenaire.EtatPartenaire = this.plateforme.getEtatPartenaireAvecIdentifiant(Number($("#selectEtatPartenaire").val()));
        partenaire.ListeDomainesDeCompetencesPartenaire = this.getListeDomainesDeCompetencesSelectionnees();
        partenaire.ListeSousSpecialitesPartenaire = this.getListeSousSpecialitesSelectionnees();
        partenaire.ListeMobilitesPartenaires = this.getListeMobilitesSelectionnees();
        partenaire.ListeAidesFinancieresPartenaires = this.getListeAidesFinancieresSelectionnees();
        partenaire.ListeContactsPartenaires = this.getListeContactsSelectionnees();
        partenaire.ListeVoeuxPartenaire = this.getListeVoeuxSelectionnees();

        $.each(($("#inputListeImagesPartenaires")[0] as HTMLInputElement).files, (indexFile: number, file: File) => {
            var imagePartenaire = new ImagePartenaire();
            imagePartenaire.FileImagePartenaireLocal = file;
            partenaire.ajouterImagePartenaire(imagePartenaire);
        });
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
            if (e.result.context != undefined) {
                e.result.context.forEach((context: any) => {
                    if (context.id.startsWith("country")) {
                        $("#inputNomPaysLocalisationPartenaire").val(context.text);
                        $("#inputCodePaysLocalisationPartenaire").val(context.short_code);
                    }
                });
            }
            else {
                $("#inputNomPaysLocalisationPartenaire").val(e.result.place_name);
                $("#inputCodePaysLocalisationPartenaire").val(e.result.properties.short_code);
            }
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
        $.when(this.controleurPlateforme.chargerListeDomainesDeCompetences(),
            this.controleurPlateforme.chargerListeSpecialites(),
            this.controleurPlateforme.chargerListeMobilites(),
            this.controleurPlateforme.chargerListeAidesFinancieres(),
            this.controleurPlateforme.chargerListeContacts(),
            this.controleurPlateforme.chargerListeVoeux(),
            this.controleurPlateforme.chargerListeCouts(),
            this.controleurPlateforme.chargerListeEtatsPartenaires()).done(() => {
                this.controleurPlateforme.chargerListePartenaires();

                this.plateforme.ListeEtatsPartenairesPlateforme.forEach((etatPartenaire: EtatPartenaire) => {
                    this.ajouterEtatPartenaireDansSelect(etatPartenaire);
                });

                this.plateforme.ListeSpecialitesPlateforme.forEach((specialite: Specialite) => {
                    var noeudSpecilitePartenaire = new NoeudTreeSpecifique(specialite.NomSpecialite + "", specialite.NomSpecialite);
                    this.treeSousSpecialitesPartenaire.ajouterNoeudRacine(noeudSpecilitePartenaire);
                    specialite.ListeSousSpecialites.forEach((sousSpecialite: SousSpecialite) => {
                        this.treeSousSpecialitesPartenaire.ajouterNoeud(new NoeudTreeSpecifique(sousSpecialite.IdentifiantSousSpecialite + "", sousSpecialite.NomSousSpecialite), noeudSpecilitePartenaire);
                    });
                });

            });
    }

    beforeDestroy() {
        this.controleurPlateforme.resilier(this);
    }

    private onAjouterPartenaireClick(): void {
        $("#formGroupListeImagesPartenaireServeur").hide();

        $("#inputTitrePartenaire").text("Ajout Partenaire");
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
            $("#inputLienPartenaire").val(premierPartenaireSelectionne.LienPartenaire);
            $("#textareaInformationLogementPartenaire").val(premierPartenaireSelectionne.InformationLogementPartenaire);
            $("#textareaInformationCoutPartenaire").val(premierPartenaireSelectionne.InformationCoutPartenaire);
            $("#selectEtatPartenaire").val(premierPartenaireSelectionne.EtatPartenaire.IdentifiantEtatPartenaire);
            $("#inputLatitudePartenaire").val(premierPartenaireSelectionne.LocalisationPartenaire.LatitudeLocalisation);
            $("#inputLongitudePartenaire").val(premierPartenaireSelectionne.LocalisationPartenaire.LongitudeLocalisation);
            $("#inputNomLocalisationPartenaire").val(premierPartenaireSelectionne.LocalisationPartenaire.NomLocalisation);
            $("#inputNomPaysLocalisationPartenaire").val(premierPartenaireSelectionne.LocalisationPartenaire.NomPaysLocalisation);
            $("#inputCodePaysLocalisationPartenaire").val(premierPartenaireSelectionne.LocalisationPartenaire.CodePaysLocalisation);

            premierPartenaireSelectionne.ListeDomainesDeCompetencesPartenaire.forEach((domaineDeCompetence: DomaineDeCompetence) => {
                this.ajouterDomaineDeCompetenceDansSelect(domaineDeCompetence);
            });

            premierPartenaireSelectionne.ListeSousSpecialitesPartenaire.forEach((sousSpecialite: SousSpecialite) => {
                this.ajouterSousSpecialiteDansSelect(sousSpecialite);
            });

            premierPartenaireSelectionne.ListeMobilitesPartenaires.forEach((mobilite: Mobilite) => {
                this.ajouterMobiliteDansSelect(mobilite);
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

    private onAjouterNouveauDomaineDeCompetenceClick(): void {
        $("#inputTitreDomaineDeCompetence").text("Ajout Domaine De Compétence :");
        this.modalEditeDomainesDeCompetencesPartenaire.cacherModal();
        this.modalEditeDomaineDeCompetence.montrerModal();
        $("#boutonEditeDomaineDeCompetence").off();
        $("#boutonEditeDomaineDeCompetence").on("click", () => {
            var domaineDeCompetence = new DomaineDeCompetence();
            domaineDeCompetence.NomDomaineDeCompetence = $("#inputNomDomaineDeCompetence").val() as string;
            this.controleurPlateforme.ajouterDomaineDeCompetence(domaineDeCompetence);
            //a faire après notification
            this.ajouterDomaineDeCompetenceDansSelect(domaineDeCompetence);
            this.modalEditeDomaineDeCompetence.cacherModal();
        });
    }

    private onClickAjouterDomaineDeCompetencePartenaire(): void {
        $("#inputTitreDomainesDeCompetencesPartenaire").text("Ajout Domaines De Compétences dans le partenaire :");
        this.datatablesDomainesDeCompetencesPartenaires.viderDatatables();
        var listeDomainesDeCompetencesSelectionnes: DomaineDeCompetence[] = this.getListeDomainesDeCompetencesSelectionnees();
        this.plateforme.ListeDomainesDeCompetences.forEach((domaineDeCompetence: DomaineDeCompetence) => {
            if (!listeDomainesDeCompetencesSelectionnes.includes(domaineDeCompetence)) {
                this.datatablesDomainesDeCompetencesPartenaires.ajouterLigneDansDatatables(domaineDeCompetence);
            }
        });
        this.modalEditeDomainesDeCompetencesPartenaire.montrerModal();
        $("#boutonEditeDomainesDeCompetencesPartenaire").off();
        $("#boutonEditeDomainesDeCompetencesPartenaire").on("click", () => {
            var listeDomainesDeCompetencesAAjouter: DomaineDeCompetence[] = this.datatablesDomainesDeCompetencesPartenaires.getListeLignesSelectionnees();
            listeDomainesDeCompetencesAAjouter.forEach((domaineDeCompetence: DomaineDeCompetence) => {
                this.ajouterDomaineDeCompetenceDansSelect(domaineDeCompetence);
            });
            this.modalEditeDomainesDeCompetencesPartenaire.cacherModal();
        });
    }

    private onClickSupprimerDomaineDeCompetencePartenaire(): void {
        $.each($("#selectListeDomainesDeCompetencesPartenaire").val(), (indexDomaineDeCompetence, identifiantDomaineDeCompetence) => {
            this.supprimerDomaineDeCompetenceDansSelect(this.plateforme.getDomaineDeCompetenceAvecIdentifiant(Number(identifiantDomaineDeCompetence)));
        });
    }

    private onClickEditerSousSpecialitePartenaire(): void {
        $("#inputTitreSousSpecialitesPartenaire").text("Edite Sous Spécialités dans le partenaire :");
        var listeSousSpecialitesSelectionnees: SousSpecialite[] = this.getListeSousSpecialitesSelectionnees();
        listeSousSpecialitesSelectionnees.forEach((sousSpecialite: SousSpecialite) => {
            this.treeSousSpecialitesPartenaire.selectionnerNoeud(new NoeudTreeSpecifique(sousSpecialite.IdentifiantSousSpecialite + "", sousSpecialite.NomSousSpecialite));
        });
        this.modalEditeSousSpecialitesPartenaire.montrerModal();
        $("#boutonEditeSousSpecialitesPartenaire").off();
        $("#boutonEditeSousSpecialitesPartenaire").on("click", () => {
            $("#selectListeSousSpecialitesPartenaire").empty();
            this.treeSousSpecialitesPartenaire.getListeFeuilleSelectionne().forEach((noeudTreeSpecifique: NoeudTreeSpecifique) => {
                this.ajouterSousSpecialiteDansSelect(this.plateforme.getSousSpecialiteAvecIdentifiant(Number(noeudTreeSpecifique.IdentifiantNoeud)));
            });
            this.modalEditeSousSpecialitesPartenaire.cacherModal();
        });
    }

    private onClickSupprimerSousSpecialitePartenaire(): void {
        $.each($("#selectListeSousSpecialitesPartenaire").val(), (indexSousSpecialite, identifiantSousSpecialite) => {
            this.supprimerSousSpecialiteDansSelect(this.plateforme.getSousSpecialiteAvecIdentifiant(Number(identifiantSousSpecialite)));
        });
    }

    private onClickAjouterMobilitePartenaire(): void {
        $("#inputTitreMobilitesPartenaire").text("Ajout Mobilités dans le partenaire :");
        this.datatablesMobilitesPartenaires.viderDatatables();
        var listeMobilitesSelectionnes: Mobilite[] = this.getListeMobilitesSelectionnees();
        this.plateforme.ListeMobilitesPlateforme.forEach((mobilite: Mobilite) => {
            if (!listeMobilitesSelectionnes.includes(mobilite)) {
                this.datatablesMobilitesPartenaires.ajouterLigneDansDatatables(mobilite);
            }
        });
        this.modalEditeMobilitesPartenaire.montrerModal();
        $("#boutonEditeMobilitesPartenaire").off();
        $("#boutonEditeMobilitesPartenaire").on("click", () => {
            var listeMobilitesAAjouter: Mobilite[] = this.datatablesMobilitesPartenaires.getListeLignesSelectionnees();
            listeMobilitesAAjouter.forEach((mobilite: Mobilite) => {
                this.ajouterMobiliteDansSelect(mobilite);
            });
            this.modalEditeMobilitesPartenaire.cacherModal();
        });
    }

    private onClickSupprimerMobilitePartenaire(): void {
        $.each($("#selectListeMobilitesPartenaire").val(), (indexMobilite, identifiantMobilite) => {
            this.supprimerMobiliteDansSelect(this.plateforme.getMobiliteAvecIdentifiant(Number(identifiantMobilite)));
        });
    }

    private onClickAjouterAideFinancierePartenaire(): void {
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
            });
            this.modalEditeAidesFinancieresPartenaire.cacherModal();
        });
    }
    private onClickSupprimerAideFinancierePartenaire(): void {
        $.each($("#selectListeAidesFinancieresPartenaire").val(), (indexAideFinanciere, identifiantAideFinanciere) => {
            this.supprimerAideFinanciereDansSelect(this.plateforme.getAideFinanciereAvecIdentifiant(Number(identifiantAideFinanciere)));
        });
    }
    private onClickAjouterContactPartenaire(): void {
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
            });
            this.modalEditeContactsPartenaire.cacherModal();
        });
    }
    private onClickSupprimerContactPartenaire(): void {
        $.each($("#selectListeContactsPartenaire").val(), (indexContact, identifiantContact) => {
            this.supprimerContactDansSelect(this.plateforme.getContactAvecIdentifiant(Number(identifiantContact)));
        });
    }

    private onClickSupprimerVoeuPartenaire(): void {
        $.each($("#selectListeVoeuxPartenaire").val(), (indexVoeu, identifiantVoeu) => {
            this.supprimerVoeuDansSelect(this.plateforme.getVoeuAvecIdentifiant(Number(identifiantVoeu)));
        });
    }

    private onValiderVoeuxPartenairesClick(): void {
        var listePartenairesSelectionnes: Partenaire[] = this.datatablesPartenaires.getListeLignesSelectionnees();
        if (listePartenairesSelectionnes.length == 3) {
            $("#inputTitreValideVoeuxPartenaire").text("Valider les voeux partenaires :");
            this.datatablesListeVoeuxPartenaires.viderDatatables();
            var listePartenairesSelectionnes: Partenaire[] = this.datatablesPartenaires.getListeLignesSelectionnees();
            listePartenairesSelectionnes.forEach((partenaire: Partenaire) => {
                this.datatablesListeVoeuxPartenaires.ajouterLigneDansDatatables(partenaire);
            });
            this.modalValideVoeuxPartenaires.montrerModal();
            $("#boutonValideVoeuxPartenaires").off();
            $("#boutonValideVoeuxPartenaires").on("click", () => {
                //pierre-nicolas_chassagne@etu.u-bourgogne.fr
                try {
                    var adresseMailVoeux = $("#inputAdresseMailVoeuxPartenaires").val() as string;
                    if (!/\S+@\S+\.\S+/.test(adresseMailVoeux)) {
                        $("#inputAdresseMailVoeuxPartenaires").addClass("is-invalid");
                        throw new ErreurChampsNonRemplis();

                    }
                    if (adresseMailVoeux.split("@").pop() != process.env.ADRESSEMAIL_DOMAINE) {
                        this.modalInformation.afficherInformation(new InformationSerializable("Adresse mail incorrecte", "L'adresse mail spécifiée n'est pas une adresse mail étudiant de l'université de bourgogne.", "Veuillez utiliser votre adresse de l'université de bourgogne. Celle-ci se termine par @etu.u-bourgogne.fr."));
                    }
                    else {
                        this.controleurPlateforme.validerListeVoeuxPartenaires(listePartenairesSelectionnes, adresseMailVoeux);
                        this.modalValideVoeuxPartenaires.cacherModal();
                    }
                }
                catch (erreur) {
                    console.log(erreur);
                    $("body").animate({
                        scrollTop: $($(".is-invalid")[0]).focus().offset().top - 25
                    }, 1000);
                }
            });
        }
        else {
            this.modalInformation.afficherInformation(new InformationSerializable("Nombre de voeux sélectionnés incorrect", "Le nombre de voeux spécifié pour un partenaire à l'internationale doit être exactement de trois.", "Veuillez sélectionner trois voeux pour valider vos voeux."));
        }
    }

}