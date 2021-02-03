import { IVueContactsEtrangers } from "./ivueContactsEtrangers";
import { IVueDomainesDeCompetences } from "./ivueDomainesDeCompetences";
import { Plateforme } from "../modelePlateforme/plateforme";
import { ControleurContactsEtrangers } from "../controleursPlateforme/controleurContactsEtrangers";
import { ControleurEtatsPartenaires } from "../controleursPlateforme/controleurEtatsPartenaires";
import { ControleurMobilites } from "../controleursPlateforme/controleurMobilites";
import { ControleurSpecialites } from "../controleursPlateforme/controleurSpecialites";
import { ControleurVoeux } from "../controleursPlateforme/controleurVoeux";
import { ControleurDomainesDeCompetences } from "../controleursPlateforme/controleurDomainesDeCompetences";
import { ControleurUtilisateurs } from "../controleursPlateforme/controleurUtilisateurs";
import { Partenaire } from "../modelePlateforme/partenaire";
import { ContactEtranger } from "../modelePlateforme/contactEtranger";
import { DomaineDeCompetence } from "../modelePlateforme/domaineDeCompetence";
import { EtatPartenaire } from "../modelePlateforme/etatpartenaire";
import { Mobilite } from "../modelePlateforme/mobilite";
import { Specialite } from "../modelePlateforme/specialite";
import { SousSpecialite } from "../modelePlateforme/sousspecialite";
import { Voeu } from "../modelePlateforme/voeu";
import { Utilisateur } from "../modelePlateforme/utilisateur";
import { ErreurSerializable } from "../erreur/erreurSerializable";
import { InformationSerializable } from "../information/informationSerializable";

import Datatables from "./composants/datatables";
import { ProprietesDatatables } from "./composants/proprietesDatatables";
import { ProprietesDatatablesColonne } from "./composants/proprietesDatatablesColonne";
import { ProprietesDatatablesBouton } from "./composants/proprietesDatatablesBouton";
import ModalSpecifique from "./composants/modalSpecifique";
import SpinnerSpecifique from "./composants/spinnerSpecifique";
import ModalErreur from "./composants/modalErreur";
import ModalInformation from "./composants/modalInformation";

import "../../scss/vues/vueAdministration.scss";

import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import { IVueEtatsPartenaires } from "./ivueEtatsPartenaires";
import { IVueMobilites } from "./ivueMobilites";
import { IVueSpecialites } from "./ivueSpecialites";
import { IVueVoeux } from "./ivueVoeux";
import { IVueUtilisateurs } from "./ivueUtilisateurs";
import { ErreurChampsNonRemplis } from "../erreur/erreurChampsNonRemplis";

@Component({
    template: require("./templates/vueAdministration.html"),
    components: {
        Datatables,
        ModalSpecifique,
        SpinnerSpecifique,
        ModalErreur,
        ModalInformation
    }
})
export default class VueAdminisitration extends Vue implements IVueContactsEtrangers, IVueDomainesDeCompetences, IVueEtatsPartenaires, IVueMobilites, IVueSpecialites, IVueVoeux, IVueUtilisateurs {
    @Prop() private plateforme!: Plateforme;
    @Prop() private controleurContactsEtrangers!: ControleurContactsEtrangers;
    @Prop() private controleurDomainesDeCompetences!: ControleurDomainesDeCompetences;
    @Prop() private controleurEtatsPartenaires!: ControleurEtatsPartenaires;
    @Prop() private controleurMobilites!: ControleurMobilites;
    @Prop() private controleurSpecialites!: ControleurSpecialites;
    @Prop() private controleurVoeux!: ControleurVoeux;
    @Prop() private controleurUtilisateurs!: ControleurUtilisateurs;

    @Ref("datatablesContactsEtrangers") readonly datatablesContactsEtrangers!: Datatables<ContactEtranger>;
    @Ref("datatablesDomainesDeCompetences") readonly datatablesDomainesDeCompetences!: Datatables<DomaineDeCompetence>;
    @Ref("datatablesEtatsPartenaires") readonly datatablesEtatsPartenaires!: Datatables<EtatPartenaire>;
    @Ref("datatablesMobilites") readonly datatablesMobilites!: Datatables<Mobilite>;
    @Ref("datatablesSpecialites") readonly datatablesSpecialites!: Datatables<Specialite>;
    @Ref("datatablesSousSpecialites") readonly datatablesSousSpecialites!: Datatables<SousSpecialite>;
    @Ref("datatablesVoeux") readonly datatablesVoeux!: Datatables<Voeu>;
    @Ref("datatablesUtilisateurs") readonly datatablesUtilisateurs!: Datatables<Utilisateur>;
    @Ref("modalContactEtranger") readonly modalContactEtranger!: ModalSpecifique;
    @Ref("modalDomaineDeCompetence") readonly modalDomaineDeCompetence!: ModalSpecifique;
    @Ref("modalEtatPartenaire") readonly modalEtatPartenaire!: ModalSpecifique;
    @Ref("modalMobilite") readonly modalMobilite!: ModalSpecifique;
    @Ref("modalSpecialite") readonly modalSpecialite!: ModalSpecifique;
    @Ref("modalSousSpecialite") readonly modalSousSpecialite!: ModalSpecifique;
    //@Ref("modalVoeu") readonly modalVoeu!: ModalSpecifique;
    @Ref("modalUtilisateur") readonly modalUtilisateur!: ModalSpecifique;
    @Ref("spinner") readonly spinner!: SpinnerSpecifique;
    @Ref("modalErreur") readonly modalErreur!: ModalErreur;
    @Ref("modalInformation") readonly modalInformation!: ModalInformation;

    private proprietesDatatablesContactsEtrangers: ProprietesDatatables;
    private proprietesDatatablesDomainesDeCompetences: ProprietesDatatables;
    private proprietesDatatablesEtatsPartenaires: ProprietesDatatables;
    private proprietesDatatablesMobilites: ProprietesDatatables;
    private proprietesDatatablesSpecialites: ProprietesDatatables;
    private proprietesDatatablesSousSpecialites: ProprietesDatatables;
    private proprietesDatatablesVoeux: ProprietesDatatables;
    private proprietesDatatablesUtilisateurs: ProprietesDatatables;

    public afficheErreur(erreur: ErreurSerializable): void {
        this.modalErreur.afficherErreur(erreur);
    }

    public afficheInformation(information: InformationSerializable): void {
        this.modalInformation.afficherInformation(information);
    }

    public ajoutContactEtranger(contactEtranger: ContactEtranger): void {
        this.datatablesContactsEtrangers.ajouterLigneDansDatatables(contactEtranger);
    }
    public suppressionContactEtranger(contactEtranger: ContactEtranger): void {
        this.datatablesContactsEtrangers.supprimerLigneSelectionneeDansDatatables();
    }
    public modificationContactEtranger(contactEtranger: ContactEtranger): void {
        this.datatablesContactsEtrangers.modifierLigneSelectionneeDansDatatables(contactEtranger);
    }

    public ajoutDomaineDeCompetence(domaineDeCompetence: DomaineDeCompetence): void {
        this.datatablesDomainesDeCompetences.ajouterLigneDansDatatables(domaineDeCompetence);
    }
    public suppressionDomaineDeCompetence(domaineDeCompetence: DomaineDeCompetence): void {
        this.datatablesDomainesDeCompetences.supprimerLigneSelectionneeDansDatatables();
    }
    public modificationDomaineDeCompetence(domaineDeCompetence: DomaineDeCompetence): void {
        this.datatablesDomainesDeCompetences.modifierLigneSelectionneeDansDatatables(domaineDeCompetence);
    }

    public ajoutEtatPartenaire(etatPartenaire: EtatPartenaire): void {
        this.datatablesEtatsPartenaires.ajouterLigneDansDatatables(etatPartenaire);
    }
    public suppressionEtatPartenaire(etatPartenaire: EtatPartenaire): void {
        this.datatablesEtatsPartenaires.supprimerLigneSelectionneeDansDatatables();
    }
    public modificationEtatPartenaire(etatPartenaire: EtatPartenaire): void {
        this.datatablesEtatsPartenaires.modifierLigneSelectionneeDansDatatables(etatPartenaire);
    }

    public ajoutMobilite(mobilite: Mobilite): void {
        this.datatablesMobilites.ajouterLigneDansDatatables(mobilite);
    }
    public suppressionMobilite(mobilite: Mobilite): void {
        this.datatablesMobilites.supprimerLigneSelectionneeDansDatatables();
    }
    public modificationMobilite(mobilite: Mobilite): void {
        this.datatablesMobilites.modifierLigneSelectionneeDansDatatables(mobilite);
    }

    public ajoutSpecialite(specialite: Specialite): void {
        this.datatablesSpecialites.ajouterLigneDansDatatables(specialite);
    }
    public suppressionSpecialite(specialite: Specialite): void {
        this.datatablesSpecialites.supprimerLigneSelectionneeDansDatatables();
    }
    public modificationSpecialite(specialite: Specialite): void {
        this.datatablesSpecialites.modifierLigneSelectionneeDansDatatables(specialite);
    }
    public ajoutSousSpecialite(sousSpecialite: SousSpecialite): void {
        this.datatablesSousSpecialites.ajouterLigneDansDatatables(sousSpecialite);
    }
    public suppressionSousSpecialite(sousSpecialite: SousSpecialite): void {
        if (this.datatablesSousSpecialites.getListeLignesSelectionnees().includes(sousSpecialite)) {
            this.datatablesSousSpecialites.supprimerLigneSelectionneeDansDatatables();
        }
        else {
            this.datatablesSousSpecialites.supprimerLigne(sousSpecialite);
        }
    }
    public modificationSousSpecialite(sousSpecialite: SousSpecialite): void {
        this.datatablesSousSpecialites.modifierLigneSelectionneeDansDatatables(sousSpecialite);
    }

    public ajoutVoeu(voeu: Voeu): void {
        this.datatablesVoeux.ajouterLigneDansDatatables(voeu);
    }
    public suppressionVoeu(voeu: Voeu): void {
        this.datatablesVoeux.supprimerLigneSelectionneeDansDatatables();
    }

    public ajoutUtilisateur(utilisateur: Utilisateur): void {
        this.datatablesUtilisateurs.ajouterLigneDansDatatables(utilisateur);
    }
    public suppressionUtilisateur(utilisateur: Utilisateur): void {
        this.datatablesUtilisateurs.supprimerLigneSelectionneeDansDatatables();
    }
    public modificationUtilisateur(utilisateur: Utilisateur): void {
        this.datatablesUtilisateurs.modifierLigneSelectionneeDansDatatables(utilisateur);
    }

    private initialiserDatatables() {
        this.proprietesDatatablesContactsEtrangers = new ProprietesDatatables();
        this.proprietesDatatablesContactsEtrangers.OrdreDesElementsDeControle = "Bfti";
        //this.proprietesDatatablesContactsEtrangers.ajouterColonne(new ProprietesDatatablesColonne("Identifiant Contact Etranger", "identifiantContact"));
        this.proprietesDatatablesContactsEtrangers.ajouterColonne(new ProprietesDatatablesColonne("Nom Contact Etranger", "nomContact"));
        this.proprietesDatatablesContactsEtrangers.ajouterColonne(new ProprietesDatatablesColonne("Prénom Contact Etranger", "prenomContact"));
        this.proprietesDatatablesContactsEtrangers.ajouterColonne(new ProprietesDatatablesColonne("Adresse Mail Contact Etranger", "adresseMailContact"));
        this.proprietesDatatablesContactsEtrangers.ajouterColonne(new ProprietesDatatablesColonne("Fonction Contact Etranger", "fonctionContact"));
        this.proprietesDatatablesContactsEtrangers.ajouterBouton(new ProprietesDatatablesBouton("Ajouter Contact Etranger", this.onClickAjouterContactEtranger));
        this.proprietesDatatablesContactsEtrangers.ajouterBouton(new ProprietesDatatablesBouton("Supprimer Contact Etranger", this.onClickSupprimerContactEtranger));
        this.proprietesDatatablesContactsEtrangers.ajouterBouton(new ProprietesDatatablesBouton("Modifier Contact Etranger", this.onClickModifierContactEtranger));

        this.proprietesDatatablesDomainesDeCompetences = new ProprietesDatatables();
        this.proprietesDatatablesDomainesDeCompetences.OrdreDesElementsDeControle = "Bfti";
        //this.proprietesDatatablesDomainesDeCompetences.ajouterColonne(new ProprietesDatatablesColonne("Identifiant Domaine De Compétence", "identifiantDomaineDeCompetence"));
        this.proprietesDatatablesDomainesDeCompetences.ajouterColonne(new ProprietesDatatablesColonne("Nom Domaine De Compétence", "nomDomaineDeCompetence"));
        this.proprietesDatatablesDomainesDeCompetences.ajouterBouton(new ProprietesDatatablesBouton("Ajouter Domaine De Compétence", this.onClickAjouterDomaineDeCompetence));
        this.proprietesDatatablesDomainesDeCompetences.ajouterBouton(new ProprietesDatatablesBouton("Supprimer Domaine De Compétence", this.onClickSupprimerDomaineDeCompetence));
        this.proprietesDatatablesDomainesDeCompetences.ajouterBouton(new ProprietesDatatablesBouton("Modifier Domaine De Compétence", this.onClickModifierDomaineDeCompetence));

        this.proprietesDatatablesEtatsPartenaires = new ProprietesDatatables();
        this.proprietesDatatablesEtatsPartenaires.OrdreDesElementsDeControle = "Bfti";
        //this.proprietesDatatablesEtatsPartenaires.ajouterColonne(new ProprietesDatatablesColonne("Identifiant Etat Partenaire", "identifiantEtatPartenaire"));
        this.proprietesDatatablesEtatsPartenaires.ajouterColonne(new ProprietesDatatablesColonne("Nom Etat Partenaire", "nomEtatPartenaire"));
        this.proprietesDatatablesEtatsPartenaires.ajouterBouton(new ProprietesDatatablesBouton("Ajouter Etat Partenaire", this.onClickAjouterEtatPartenaire));
        this.proprietesDatatablesEtatsPartenaires.ajouterBouton(new ProprietesDatatablesBouton("Supprimer Etat Partenaire", this.onClickSupprimerEtatPartenaire));
        this.proprietesDatatablesEtatsPartenaires.ajouterBouton(new ProprietesDatatablesBouton("Modifier Etat Partenaire", this.onClickModifierEtatPartenaire));

        this.proprietesDatatablesMobilites = new ProprietesDatatables();
        this.proprietesDatatablesMobilites.OrdreDesElementsDeControle = "Bfti";
        //this.proprietesDatatablesMobilites.ajouterColonne(new ProprietesDatatablesColonne("Identifiant Mobilité", "identifiantMobilite"));
        this.proprietesDatatablesMobilites.ajouterColonne(new ProprietesDatatablesColonne("Type Mobilité", "typeMobilite"));
        this.proprietesDatatablesMobilites.ajouterBouton(new ProprietesDatatablesBouton("Ajouter Mobilité", this.onClickAjouterMobilite));
        this.proprietesDatatablesMobilites.ajouterBouton(new ProprietesDatatablesBouton("Supprimer Mobilité", this.onClickSupprimerMobilite));
        this.proprietesDatatablesMobilites.ajouterBouton(new ProprietesDatatablesBouton("Modifier Mobilité", this.onClickModifierMobilite));

        this.proprietesDatatablesSpecialites = new ProprietesDatatables();
        this.proprietesDatatablesSpecialites.OrdreDesElementsDeControle = "Bfti";
        //this.proprietesDatatablesSpecialites.ajouterColonne(new ProprietesDatatablesColonne("Identifiant Spécialité", "identifiantSpecialite"));
        this.proprietesDatatablesSpecialites.ajouterColonne(new ProprietesDatatablesColonne("Nom Spécialité", "nomSpecialite"));
        this.proprietesDatatablesSpecialites.ajouterColonne(new ProprietesDatatablesColonne("Couleur Spécialité", "couleurSpecialite"));
        this.proprietesDatatablesSpecialites.ajouterBouton(new ProprietesDatatablesBouton("Ajouter Spécialité", this.onClickAjouterSpecialite));
        this.proprietesDatatablesSpecialites.ajouterBouton(new ProprietesDatatablesBouton("Supprimer Spécialité", this.onClickSupprimerSpecialite));
        this.proprietesDatatablesSpecialites.ajouterBouton(new ProprietesDatatablesBouton("Modifier Spécialité", this.onClickModifierSpecialite));

        this.proprietesDatatablesSousSpecialites = new ProprietesDatatables();
        this.proprietesDatatablesSousSpecialites.OrdreDesElementsDeControle = "Bfti";
        //this.proprietesDatatablesSousSpecialites.ajouterColonne(new ProprietesDatatablesColonne("Identifiant Sous Spécialité", "identifiantSousSpecialite"));
        this.proprietesDatatablesSousSpecialites.ajouterColonne(new ProprietesDatatablesColonne("Nom Sous Spécialité", "nomSousSpecialite"));
        this.proprietesDatatablesSousSpecialites.ajouterBouton(new ProprietesDatatablesBouton("Ajouter Sous Spécialité", this.onClickAjouterSousSpecialite));
        this.proprietesDatatablesSousSpecialites.ajouterBouton(new ProprietesDatatablesBouton("Supprimer Sous Spécialité", this.onClickSupprimerSousSpecialite));
        this.proprietesDatatablesSousSpecialites.ajouterBouton(new ProprietesDatatablesBouton("Modifier Sous Spécialité", this.onClickModifierSousSpecialite));

        this.proprietesDatatablesVoeux = new ProprietesDatatables();
        this.proprietesDatatablesVoeux.OrdreDesElementsDeControle = "Bfti";
        //this.proprietesDatatablesVoeux.ajouterColonne(new ProprietesDatatablesColonne("Identifiant Voeu", "identifiantVoeu"));
        this.proprietesDatatablesVoeux.ajouterColonne(new ProprietesDatatablesColonne("Adresse Mail Voeu", "adresseMailVoeu"));
        this.proprietesDatatablesVoeux.ajouterBouton(new ProprietesDatatablesBouton("Supprimer Voeu", this.onClickSupprimerVoeu));

        this.proprietesDatatablesUtilisateurs = new ProprietesDatatables();
        //this.proprietesDatatablesUtilisateurs.OrdreDesElementsDeControle = "Bfti";
        this.proprietesDatatablesUtilisateurs.ajouterColonne(new ProprietesDatatablesColonne("Identifiant Utilisateur", "identifiantUtilisateur"));
        this.proprietesDatatablesUtilisateurs.ajouterColonne(new ProprietesDatatablesColonne("Nom Utilisateur", "nomUtilisateur"));
        this.proprietesDatatablesUtilisateurs.ajouterColonne(new ProprietesDatatablesColonne("Adresse Mail Utilisateur", "adresseMailUtilisateur"));
        this.proprietesDatatablesUtilisateurs.ajouterColonne(new ProprietesDatatablesColonne("Est Administrateur", "EstAdministrateurString"));
        this.proprietesDatatablesUtilisateurs.ajouterBouton(new ProprietesDatatablesBouton("Ajouter Utilisateur", this.onClickAjouterUtilisateur));
        this.proprietesDatatablesUtilisateurs.ajouterBouton(new ProprietesDatatablesBouton("Supprimer Utilisateur", this.onClickSupprimerUtilisateur));
        this.proprietesDatatablesUtilisateurs.ajouterBouton(new ProprietesDatatablesBouton("Modifier Utilisateur", this.onClickModifierUtilisateur));
    }

    private initialiserEvenementsModals(): void {
        this.modalDomaineDeCompetence.onCacherModal(() => {
            $("form").trigger("reset");
        });
        this.modalContactEtranger.onCacherModal(() => {
            $("form").trigger("reset");
        });
        this.modalEtatPartenaire.onCacherModal(() => {
            $("form").trigger("reset");
        });
        this.modalMobilite.onCacherModal(() => {
            $("form").trigger("reset");
        });
        this.modalSpecialite.onCacherModal(() => {
            $("form").trigger("reset");
        });
        this.modalSousSpecialite.onCacherModal(() => {
            $("form").trigger("reset");
            $("#selectSpecialiteSousSpecialite").empty();
        });
        this.modalUtilisateur.onCacherModal(() => {
            $("form").trigger("reset");
            $("#inputNomUtilisateur").removeClass("is-invalid");
            $("#inputAdresseMailUtilisateur").removeClass("is-invalid");
            $("#inputMotDePasseUtilisateur").removeClass("is-invalid");
        });
        $("#inputNomDomaineDeCompetence").keypress((event) => {
            if (event.keyCode == 13) {
                event.preventDefault();
            }
        });
        $("#inputNomEtatPartenaire").keypress((event) => {
            if (event.keyCode == 13) {
                event.preventDefault();
            }
        });
        $("#inputTypeMobilite").keypress((event) => {
            if (event.keyCode == 13) {
                event.preventDefault();
            }
        });
        $("#inputNomSpecialite").keypress((event) => {
            if (event.keyCode == 13) {
                event.preventDefault();
            }
        });
        $("#inputNomUtilisateur").click(function () {
            $("#inputNomUtilisateur").removeClass("is-invalid");
        });
        $("#inputAdresseMailUtilisateur").click(function () {
            $("#inputAdresseMailUtilisateur").removeClass("is-invalid");
        });
        $("#inputMotDePasseUtilisateur").click(function () {
            $("#inputMotDePasseUtilisateur").removeClass("is-invalid");
        });
    }

    private creerContactEtranger(): ContactEtranger {
        var contactEtranger = new ContactEtranger();
        contactEtranger.NomContact = $("#inputNomContactEtranger").val() as string;
        contactEtranger.PrenomContact = $("#inputPrenomContactEtranger").val() as string;
        contactEtranger.AdresseMailContact = $("#inputAdresseMailContactEtranger").val() as string;
        contactEtranger.FonctionContact = $("#inputFonctionContactEtranger").val() as string;
        return contactEtranger;
    }

    private creerDomaineDeCompetence(): DomaineDeCompetence {
        var domaineDeCompetence = new DomaineDeCompetence();
        domaineDeCompetence.NomDomaineDeCompetence = $("#inputNomDomaineDeCompetence").val() as string;
        return domaineDeCompetence;
    }

    private creerEtatPartenaire(): EtatPartenaire {
        var etatPartenaire = new EtatPartenaire();
        etatPartenaire.NomEtatPartenaire = $("#inputNomEtatPartenaire").val() as string;
        return etatPartenaire;
    }

    private creerMobilite(): Mobilite {
        var mobilite = new Mobilite();
        mobilite.TypeMobilite = $("#inputTypeMobilite").val() as string;
        return mobilite;
    }

    private creerSpecialite(): Specialite {
        var specialite = new Specialite();
        specialite.NomSpecialite = $("#inputNomSpecialite").val() as string;
        specialite.CouleurSpecialite = $("#inputCouleurSpecialite").val() as string;
        return specialite;
    }

    private creerSousSpecialite(): SousSpecialite {
        var sousSpecialite = new SousSpecialite();
        sousSpecialite.NomSousSpecialite = $("#inputNomSousSpecialite").val() as string;
        return sousSpecialite;
    }

    private creerUtilisateur(): Utilisateur {
        var utilisateur = new Utilisateur();
        utilisateur.NomUtilisateur = $("#inputNomUtilisateur").val() as string;
        utilisateur.MotDePasseUtilisateur = $("#inputMotDePasseUtilisateur").val() as string;
        utilisateur.AdresseMailUtilisateur = $("#inputAdresseMailUtilisateur").val() as string;
        utilisateur.EstAdministrateur = $("#inputEstAdministrateur").prop("checked") as boolean;
        return utilisateur;
    }

    public constructor() {
        super();
        this.initialiserDatatables();
    }

    mounted() {
        this.initialiserEvenementsModals();
        this.controleurContactsEtrangers.inscrire(this);
        this.controleurDomainesDeCompetences.inscrire(this);
        this.controleurEtatsPartenaires.inscrire(this);
        this.controleurMobilites.inscrire(this);
        this.controleurSpecialites.inscrire(this);
        this.controleurVoeux.inscrire(this);
        this.controleurUtilisateurs.inscrire(this);
        this.controleurContactsEtrangers.chargerListeContactsEtrangers();
        this.controleurDomainesDeCompetences.chargerListeDomainesDeCompetences();
        this.controleurEtatsPartenaires.chargerListeEtatsPartenaires();
        this.controleurMobilites.chargerListeMobilites();
        this.controleurSpecialites.chargerListeSpecialites();
        this.controleurVoeux.chargerListeVoeux();
        this.controleurUtilisateurs.chargerListeUtilisateur();
    }

    beforeDestroy() {
        this.controleurContactsEtrangers.resilier(this);
        this.controleurDomainesDeCompetences.resilier(this);
        this.controleurEtatsPartenaires.resilier(this);
        this.controleurMobilites.resilier(this);
        this.controleurSpecialites.resilier(this);
        this.controleurVoeux.resilier(this);
        this.controleurUtilisateurs.resilier(this);
    }

    private onClickAjouterContactEtranger(): void {
        $("#inputTitreContactEtranger").text("Ajout Contact Etranger :");
        this.modalContactEtranger.montrerModal();
        $("#boutonEditeContactEtranger").off();
        $("#boutonEditeContactEtranger").on("click", () => {
            this.controleurContactsEtrangers.ajouterContactEtranger(this.creerContactEtranger());
            this.modalContactEtranger.cacherModal();
        });
    }

    private onClickSupprimerContactEtranger(): void {
        var listeContactsEtrangersSelectionnes: ContactEtranger[] = this.datatablesContactsEtrangers.getListeLignesSelectionnees();
        listeContactsEtrangersSelectionnes.forEach((contactEtranger: ContactEtranger) => {
            this.controleurContactsEtrangers.supprimerContactEtranger(contactEtranger);
        });
    }

    private onClickModifierContactEtranger(): void {
        var listeContactsEtrangersSelectionnes: ContactEtranger[] = this.datatablesContactsEtrangers.getListeLignesSelectionnees();
        if (listeContactsEtrangersSelectionnes.length > 0) {
            var premiereContactEtrangerSelectionne: ContactEtranger = listeContactsEtrangersSelectionnes[0];
            $("#inputTitreContactEtranger").text("Modification Contact Etranger : " + premiereContactEtrangerSelectionne.NomContact);
            $("#inputIdentifiantContactEtranger").val(premiereContactEtrangerSelectionne.IdentifiantContact);
            $("#inputNomContactEtranger").val(premiereContactEtrangerSelectionne.NomContact);
            $("#inputPrenomContactEtranger").val(premiereContactEtrangerSelectionne.PrenomContact);
            $("#inputAdresseMailContactEtranger").val(premiereContactEtrangerSelectionne.AdresseMailContact);
            $("#inputFonctionContactEtranger").val(premiereContactEtrangerSelectionne.FonctionContact);
            this.modalContactEtranger.montrerModal();
            $("#boutonEditeContactEtranger").off();
            $("#boutonEditeContactEtranger").on("click", () => {
                this.controleurContactsEtrangers.modifierContactEtranger(premiereContactEtrangerSelectionne, this.creerContactEtranger());
                this.modalContactEtranger.cacherModal();
            });
        }
    }

    private onClickAjouterDomaineDeCompetence(): void {
        $("#inputTitreDomaineDeCompetence").text("Ajout Domaine De Compétence :");
        this.modalDomaineDeCompetence.montrerModal();
        $("#boutonEditeDomaineDeCompetence").off();
        $("#boutonEditeDomaineDeCompetence").on("click", () => {
            this.controleurDomainesDeCompetences.ajouterDomaineDeCompetence(this.creerDomaineDeCompetence());
            this.modalDomaineDeCompetence.cacherModal();
        });
    }

    private onClickSupprimerDomaineDeCompetence(): void {
        var listeDomainesDeCompetencesSelectionnes: DomaineDeCompetence[] = this.datatablesDomainesDeCompetences.getListeLignesSelectionnees();
        listeDomainesDeCompetencesSelectionnes.forEach((domaineDeCompetence: DomaineDeCompetence) => {
            this.controleurDomainesDeCompetences.supprimerDomaineDeCompetence(domaineDeCompetence);
        });
    }

    private onClickModifierDomaineDeCompetence(): void {
        var listeDomainesDeCompetencesSelectionnes: DomaineDeCompetence[] = this.datatablesDomainesDeCompetences.getListeLignesSelectionnees();
        if (listeDomainesDeCompetencesSelectionnes.length > 0) {
            var premiereDomaineDeCompetenceSelectionne: DomaineDeCompetence = listeDomainesDeCompetencesSelectionnes[0];
            $("#inputTitreDomaineDeCompetence").text("Modification Domaine De Compétence : " + premiereDomaineDeCompetenceSelectionne.NomDomaineDeCompetence);
            $("#inputIdentifiantDomaineDeCompetence").val(premiereDomaineDeCompetenceSelectionne.IdentifiantDomaineDeCompetence);
            $("#inputNomDomaineDeCompetence").val(premiereDomaineDeCompetenceSelectionne.NomDomaineDeCompetence);
            this.modalDomaineDeCompetence.montrerModal();
            $("#boutonEditeDomaineDeCompetence").off();
            $("#boutonEditeDomaineDeCompetence").on("click", () => {
                this.controleurDomainesDeCompetences.modifierDomaineDeCompetence(premiereDomaineDeCompetenceSelectionne, this.creerDomaineDeCompetence());
                this.modalDomaineDeCompetence.cacherModal();
            });
        }
    }

    private onClickAjouterEtatPartenaire(): void {
        $("#inputTitreEtatPartenaire").text("Ajout Etat Partenaire :");
        this.modalEtatPartenaire.montrerModal();
        $("#boutonEditeEtatPartenaire").off();
        $("#boutonEditeEtatPartenaire").on("click", () => {
            this.controleurEtatsPartenaires.ajouterEtatPartenaire(this.creerEtatPartenaire());
            this.modalEtatPartenaire.cacherModal();
        });
    }

    private onClickSupprimerEtatPartenaire(): void {
        var listeEtatsPartenairesSelectionnes: EtatPartenaire[] = this.datatablesEtatsPartenaires.getListeLignesSelectionnees();
        listeEtatsPartenairesSelectionnes.forEach((etatPartenaire: EtatPartenaire) => {
            this.plateforme.ListePartenairesPlateforme.forEach((partenaire: Partenaire) => {
                if (partenaire.EtatPartenaire == etatPartenaire) {
                    this.modalInformation.afficherInformation(new InformationSerializable("Etat Partenaire non supprimable", "Un ou plusieurs partenaires possèdent cet état partenaire.", "Pour le supprimer, veuillez tout d'abord supprimer les partenaires concernés."));
                    return;
                }
            });
            this.controleurEtatsPartenaires.supprimerEtatPartenaire(etatPartenaire);
        });
    }

    private onClickModifierEtatPartenaire(): void {
        var listeEtatsPartenairesSelectionnes: EtatPartenaire[] = this.datatablesEtatsPartenaires.getListeLignesSelectionnees();
        if (listeEtatsPartenairesSelectionnes.length > 0) {
            var premierEtatPartenaireSelectionne: EtatPartenaire = listeEtatsPartenairesSelectionnes[0];
            $("#inputTitreEtatPartenaire").text("Modification Etat Partenaire : " + premierEtatPartenaireSelectionne.NomEtatPartenaire);
            $("#inputIdentifiantDomaineDeCompetence").val(premierEtatPartenaireSelectionne.IdentifiantEtatPartenaire);
            $("#inputNomDomaineDeCompetence").val(premierEtatPartenaireSelectionne.NomEtatPartenaire);
            this.modalEtatPartenaire.montrerModal();
            $("#boutonEditeEtatPartenaire").off();
            $("#boutonEditeEtatPartenaire").on("click", () => {
                this.controleurEtatsPartenaires.modifierEtatPartenaire(premierEtatPartenaireSelectionne, this.creerEtatPartenaire());
                this.modalEtatPartenaire.cacherModal();
            });
        }
    }

    private onClickAjouterMobilite(): void {
        $("#inputTitreMobilite").text("Ajout Mobilité :");
        this.modalMobilite.montrerModal();
        $("#boutonEditeMobilite").off();
        $("#boutonEditeMobilite").on("click", () => {
            this.controleurMobilites.ajouterMobilite(this.creerMobilite());
            this.modalMobilite.cacherModal();
        });
    }

    private onClickSupprimerMobilite(): void {
        var listeMobilitesSelectionnees: Mobilite[] = this.datatablesMobilites.getListeLignesSelectionnees();
        listeMobilitesSelectionnees.forEach((mobilite: Mobilite) => {
            this.controleurMobilites.supprimerMobilite(mobilite);
        });
    }

    private onClickModifierMobilite(): void {
        var listeMobilitesSelectionnees: Mobilite[] = this.datatablesMobilites.getListeLignesSelectionnees();
        if (listeMobilitesSelectionnees.length > 0) {
            var premiereMobiliteSelectionnee: Mobilite = listeMobilitesSelectionnees[0];
            $("#inputTitreMobilite").text("Modification Mobilité : " + premiereMobiliteSelectionnee.TypeMobilite);
            $("#inputIdentifiantMobilite").val(premiereMobiliteSelectionnee.IdentifiantMobilite);
            $("#inputTypeMobilite").val(premiereMobiliteSelectionnee.TypeMobilite);
            this.modalMobilite.montrerModal();
            $("#boutonEditeMobilite").off();
            $("#boutonEditeMobilite").on("click", () => {
                this.controleurMobilites.modifierMobilite(premiereMobiliteSelectionnee, this.creerMobilite());
                this.modalMobilite.cacherModal();
            });
        }
    }

    private onClickAjouterSpecialite(): void {
        $("#inputTitreSpecialite").text("Ajout Spécialité :");
        this.modalSpecialite.montrerModal();
        $("#boutonEditeSpecialite").off();
        $("#boutonEditeSpecialite").on("click", () => {
            this.controleurSpecialites.ajouterSpecialite(this.creerSpecialite());
            this.modalSpecialite.cacherModal();
        });
    }

    private onClickSupprimerSpecialite(): void {
        var listeSpecialitesSelectionnees: Specialite[] = this.datatablesSpecialites.getListeLignesSelectionnees();
        listeSpecialitesSelectionnees.forEach((specialite: Specialite) => {
            this.controleurSpecialites.supprimerSpecialite(specialite);
        });
    }

    private onClickModifierSpecialite(): void {
        var listeSpecialitesSelectionnees: Specialite[] = this.datatablesSpecialites.getListeLignesSelectionnees();
        if (listeSpecialitesSelectionnees.length > 0) {
            var premiereSpecialiteSelectionnee: Specialite = listeSpecialitesSelectionnees[0];
            $("#inputTitreSpecialite").text("Modification Spécialité : " + premiereSpecialiteSelectionnee.NomSpecialite);
            $("#inputIdentifiantSpecialite").val(premiereSpecialiteSelectionnee.IdentifiantSpecialite);
            $("#inputNomSpecialite").val(premiereSpecialiteSelectionnee.NomSpecialite);
            $("#inputCouleurSpecialite").val(premiereSpecialiteSelectionnee.CouleurSpecialite);
            this.modalSpecialite.montrerModal();
            $("#boutonEditeSpecialite").off();
            $("#boutonEditeSpecialite").on("click", () => {
                this.controleurSpecialites.modifierSpecialite(premiereSpecialiteSelectionnee, this.creerSpecialite());
                this.modalSpecialite.cacherModal();
            });
        }
    }

    private onClickAjouterSousSpecialite(): void {
        $("#inputTitreSousSpecialite").text("Ajout Sous Spécialité :");
        this.plateforme.ListeSpecialitesPlateforme.forEach((specialite: Specialite) => {
            $("#selectSpecialiteSousSpecialite").append($("<option>", {
                value: specialite.IdentifiantSpecialite,
                text: specialite.NomSpecialite
            }));
        });
        this.modalSousSpecialite.montrerModal();
        $("#boutonEditeSousSpecialite").off();
        $("#boutonEditeSousSpecialite").on("click", () => {
            this.controleurSpecialites.ajouterSousSpecialite(this.plateforme.getSpecialiteAvecIdentifiant(Number($("#selectSpecialiteSousSpecialite").val())), this.creerSousSpecialite());
            this.modalSousSpecialite.cacherModal();
        });
    }

    private onClickSupprimerSousSpecialite(): void {
        var listeSousSpecialitesSelectionnees: SousSpecialite[] = this.datatablesSousSpecialites.getListeLignesSelectionnees();
        listeSousSpecialitesSelectionnees.forEach((sousSpecialite: SousSpecialite) => {
            this.controleurSpecialites.supprimerSousSpecialite(this.plateforme.getSpecialiteAvecSousSpecialite(sousSpecialite), sousSpecialite);
        });
    }

    private onClickModifierSousSpecialite(): void {
        var listeSousSpecialitesSelectionnees: SousSpecialite[] = this.datatablesSousSpecialites.getListeLignesSelectionnees();
        if (listeSousSpecialitesSelectionnees.length > 0) {
            var premiereSousSpecialiteSelectionnee: SousSpecialite = listeSousSpecialitesSelectionnees[0];
            this.plateforme.ListeSpecialitesPlateforme.forEach((specialite: Specialite) => {
                $("#selectSpecialiteSousSpecialite").append($("<option>", {
                    value: specialite.IdentifiantSpecialite,
                    text: specialite.NomSpecialite
                }));
            });
            $("#inputTitreSousSpecialite").text("Modification Sous Spécialité : " + premiereSousSpecialiteSelectionnee.NomSousSpecialite);
            $("#inputIdentifiantSousSpecialite").val(premiereSousSpecialiteSelectionnee.IdentifiantSousSpecialite);
            $("#inputNomSousSpecialite").val(premiereSousSpecialiteSelectionnee.NomSousSpecialite);
            $("#selectSpecialiteSousSpecialite").val(this.plateforme.getSpecialiteAvecSousSpecialite(premiereSousSpecialiteSelectionnee).IdentifiantSpecialite);
            this.modalSousSpecialite.montrerModal();
            $("#boutonEditeSousSpecialite").off();
            $("#boutonEditeSousSpecialite").on("click", () => {
                this.controleurSpecialites.modifierSousSpecialite(this.plateforme.getSpecialiteAvecIdentifiant(Number($("#selectSpecialiteSousSpecialite").val())), premiereSousSpecialiteSelectionnee, this.creerSousSpecialite());
                this.modalSousSpecialite.cacherModal();
            });
        }
    }

    private onClickSupprimerVoeu(): void {
        var listeVoeuxSelectionnes: Voeu[] = this.datatablesVoeux.getListeLignesSelectionnees();
        listeVoeuxSelectionnes.forEach((voeu: Voeu) => {
            this.controleurVoeux.supprimerVoeu(voeu);
        });
    }

    private onClickAjouterUtilisateur(): void {
        $("#inputTitreUtilisateur").text("Ajout Utilisateur :");
        this.modalUtilisateur.montrerModal();
        $("#boutonEditeUtilisateur").off();
        $("#boutonEditeUtilisateur").on("click", () => {
            try {
                if ($("#inputNomUtilisateur").val() == "") {
                    $("#inputNomUtilisateur").addClass("is-invalid");
                    throw new ErreurChampsNonRemplis();
                }
                if (this.plateforme.getUtilisateurAvecNom($("#inputNomUtilisateur").val() as string)) {
                    $("#inputNomUtilisateur").addClass("is-invalid");
                    throw new ErreurChampsNonRemplis();
                }
                if (!/\S+@\S+\.\S+/.test($("#inputAdresseMailUtilisateur").val() as string)) {
                    $("#inputAdresseMailUtilisateur").addClass("is-invalid");
                    throw new ErreurChampsNonRemplis();
                }
                if ($("#inputMotDePasseUtilisateur").val() == "") {
                    $("#inputMotDePasseUtilisateur").addClass("is-invalid");
                    throw new ErreurChampsNonRemplis();
                }
                this.controleurUtilisateurs.ajouterUtilisateur(this.creerUtilisateur());
                this.modalUtilisateur.cacherModal();
            }
            catch (erreur) {
                console.log(erreur);
                $("body").animate({
                    scrollTop: $($(".is-invalid")[0]).focus().offset().top - 25
                }, 1000);
            }
        });
    }

    private onClickSupprimerUtilisateur(): void {
        var listeUtilisateursSelectionnes: Utilisateur[] = this.datatablesUtilisateurs.getListeLignesSelectionnees();
        listeUtilisateursSelectionnes.forEach((utilisateur: Utilisateur) => {
            this.controleurUtilisateurs.supprimerUtilisateur(utilisateur);
        });
    }

    private onClickModifierUtilisateur(): void {
        $("#formGroupMotDePasse").hide();
        var listeUtilisateursSelectionnes: Utilisateur[] = this.datatablesUtilisateurs.getListeLignesSelectionnees();
        if (listeUtilisateursSelectionnes.length > 0) {
            var premierUtilisateurSelectionne: Utilisateur = listeUtilisateursSelectionnes[0];
            $("#inputTitreUtilisateur").text("Modification Utilisateur : " + premierUtilisateurSelectionne.NomUtilisateur);
            $("#inputIdentifiantUtilisateur").val(premierUtilisateurSelectionne.IdentifiantUtilisateur);
            $("#inputNomUtilisateur").val(premierUtilisateurSelectionne.NomUtilisateur);
            $("#inputAdresseMailUtilisateur").val(premierUtilisateurSelectionne.AdresseMailUtilisateur);
            $("#inputEstAdministrateur").prop("checked", premierUtilisateurSelectionne.EstAdministrateur);
            this.modalUtilisateur.montrerModal();
            $("#boutonEditeUtilisateur").off();
            $("#boutonEditeUtilisateur").on("click", () => {
                try {
                    if ($("#inputNomUtilisateur").val() == "") {
                        $("#inputNomUtilisateur").addClass("is-invalid");
                        throw new ErreurChampsNonRemplis();
                    }
                    if (!/\S+@\S+\.\S+/.test($("#inputAdresseMailUtilisateur").val() as string)) {
                        $("#inputAdresseMailUtilisateur").addClass("is-invalid");
                        throw new ErreurChampsNonRemplis();
                    }
                    this.controleurUtilisateurs.modifierUtilisateur(premierUtilisateurSelectionne, this.creerUtilisateur());
                    this.modalUtilisateur.cacherModal();
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

}