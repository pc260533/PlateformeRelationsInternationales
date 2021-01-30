import { IVueCouts } from "./ivueCouts";
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
export default class VueCouts extends Vue implements IVueCouts {
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

    public ajoutCout(cout: Cout): void {
        this.datatablesCouts.ajouterLigneDansDatatables(cout);
    }

    public modificationCout(cout: Cout): void {
        this.datatablesCouts.modifierLigneSelectionneeDansDatatables(cout);
    }

    private initialiserDatatables() {
        this.proprietesDatatablesCouts = new ProprietesDatatables();
        this.proprietesDatatablesCouts.OrdreDesElementsDeControle = "Bfti";
        this.proprietesDatatablesCouts.ajouterColonne(new ProprietesDatatablesColonne("Identifiant Coût", "identifiantCout"));
        this.proprietesDatatablesCouts.ajouterColonne(new ProprietesDatatablesColonne("Nom Pays", "nomPaysCout"));
        this.proprietesDatatablesCouts.ajouterColonne(new ProprietesDatatablesColonne("Liste Partenaires", "ListePartenairesCoutString"));
        this.proprietesDatatablesCouts.ajouterColonne(new ProprietesDatatablesColonne("Coût Moyen Par Mois", "coutMoyenParMois"));
        this.proprietesDatatablesCouts.ajouterColonne(new ProprietesDatatablesColonne("Coût Logement Par Mois", "coutLogementParMois"));
        this.proprietesDatatablesCouts.ajouterColonne(new ProprietesDatatablesColonne("Coût Vie Par Mois", "coutVieParMois"));
        this.proprietesDatatablesCouts.ajouterColonne(new ProprietesDatatablesColonne("Coût Inscription Par Mois", "coutInscriptionParMois"));
        if (this.plateforme.UtilisateurConnecte) {
            this.proprietesDatatablesCouts.ajouterBouton(new ProprietesDatatablesBouton("Modifier Coût", this.onClickModifierCout));
        }
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
        this.initialiserEvenementsModals();
        $.when(this.controleurDomainesDeCompetences.chargerListeDomainesDeCompetences(),
            this.controleurSpecialites.chargerListeSpecialites(),
            this.controleurMobilites.chargerListeMobilites(),
            this.controleurAidesFinancieres.chargerListeAidesFinancieres(),
            this.controleurContactsEtrangers.chargerListeContactsEtrangers(),
            this.controleurCoordinateurs.chargerListeCoordinateurs(),
            this.controleurVoeux.chargerListeVoeux(),
            this.controleurPartenaires.chargerListeCouts(),
            this.controleurEtatsPartenaires.chargerListeEtatsPartenaires()).done(() => {
                $.when(this.controleurPartenaires.chargerListePartenaires()).done(() => {
                    this.datatablesCouts.redessinerDatatables();
                });
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
    }

    private onClickModifierCout(): void {
        var listeCoutsSelectionne: Cout[] = this.datatablesCouts.getListeLignesSelectionnees();
        if (listeCoutsSelectionne.length > 0) {
            var premierCoutSelectionne: Cout = listeCoutsSelectionne[0];
            $("#inputTitreCout").text("Modification Coût : " + premierCoutSelectionne.NomPaysCout);
            $("#inputIdentifiantCout").val(premierCoutSelectionne.IdentifiantCout);
            $("#inputCoutMoyenParMois").val(premierCoutSelectionne.CoutMoyenParMois);
            $("#inputCoutLogementParMois").val(premierCoutSelectionne.CoutLogementParMois);
            $("#inputCoutVieParMois").val(premierCoutSelectionne.CoutVieParMois);
            $("#inputCoutInscriptionParMois").val(premierCoutSelectionne.CoutInscriptionParMois);
            this.modalEditeCout.montrerModal();
            $("#boutonEditeCout").off();
            $("#boutonEditeCout").on("click", () => {
                this.controleurPartenaires.modifierCout(premierCoutSelectionne, this.creerCout());
                this.modalEditeCout.cacherModal();
            });
        }
    }

}