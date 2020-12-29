import { IVuePlateforme } from "../ivuePlateforme";
import { Plateforme } from "../modelePlateforme/plateforme";
import { ControleurUtilisateurs } from "../controleursPlateforme/controleurUtilisateurs";
import { Partenaire } from "../modelePlateforme/partenaire";
import { SousSpecialite } from "../modelePlateforme/sousspecialite";
import { Mobilite } from "../modelePlateforme/mobilite";
import { AideFinanciere } from "../modelePlateforme/aideFinanciere";
import { Contact } from "../modelePlateforme/contact";
import { Cout } from "../modelePlateforme/cout";
import { ErreurSerializable } from "../erreur/erreurSerializable";
import { InformationSerializable } from "../information/informationSerializable";

import ModalSpecifique from "./composants/modalSpecifique";
import SpinnerSpecifique from "./composants/spinnerSpecifique";
import ModalErreur from "./composants/modalErreur";

import "../../scss/vues/vueDetailsUtilisateur.scss";

import { Component, Prop, Vue, Ref } from "vue-property-decorator";


@Component({
    template: require("./templates/vueDetailsUtilisateur.html"),
    components: {
        ModalSpecifique,
        SpinnerSpecifique,
        ModalErreur
    }
})
export default class VueDetailsUtilisateur extends Vue implements IVuePlateforme {
    @Prop() private plateforme!: Plateforme;
    @Prop() private controleurUtilisateurs!: ControleurUtilisateurs;

    private identifiantUtilisateur: string;
    private nomUtilisateur: string;
    private adresseMailUtilisateur: string;
    private estAdministrateur: boolean;

    @Ref("modalEditeMotDePasseUtilisateur") readonly modalEditeMotDePasseUtilisateur!: ModalSpecifique;
    @Ref("spinner") readonly spinner!: SpinnerSpecifique;
    @Ref("modalErreur") readonly modalErreur!: ModalErreur;

    public afficheErreur(erreur: ErreurSerializable): void {
        this.modalErreur.afficherErreur(erreur);
    }

    public afficheInformation(information: InformationSerializable): void {

    }

    private initialiserEvenements(): void {
        $("#boutonModificationMotDePasseUtilisateur").on("click", () => {
            this.onClickModifierMotDePasseUtilisateur();
        });
    }

    public constructor() {
        super();
        this.controleurUtilisateurs.inscrire(this);
        this.identifiantUtilisateur = this.plateforme.UtilisateurConnecte.IdentifiantUtilisateur + "";
        this.nomUtilisateur = this.plateforme.UtilisateurConnecte.NomUtilisateur;
        this.adresseMailUtilisateur = this.plateforme.UtilisateurConnecte.AdresseMailUtilisateur;
        this.estAdministrateur = this.plateforme.UtilisateurConnecte.EstAdministrateur;
    }

    mounted() {
        this.initialiserEvenements();
    }

    beforeDestroy() {
        this.controleurUtilisateurs.resilier(this);
    }

    private onClickModifierMotDePasseUtilisateur(): void {
        $("#inputTitreMotDePasseUtisiateur").text("Réinitialiser mot de passe : ");
        this.modalEditeMotDePasseUtilisateur.montrerModal();
        $("#boutonEditeMotDePasseUtilisateur").off();
        $("#boutonEditeMotDePasseUtilisateur").on("click", () => {
            var motDePasseUtilisateur = $("#inputMotDePasseUtilisateur").val() as string;
            this.controleurUtilisateurs.modifierMotDePasseUtilisateur(this.plateforme.UtilisateurConnecte, motDePasseUtilisateur);
            this.modalEditeMotDePasseUtilisateur.cacherModal();
        });
    }

}