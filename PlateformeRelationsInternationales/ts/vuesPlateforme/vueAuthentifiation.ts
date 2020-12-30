import { IVuePlateforme } from "../ivuePlateforme";
import { Plateforme } from "../modelePlateforme/plateforme";
import { ControleurAuthentification } from "../controleursPlateforme/controleurAuthentification";
import { Utilisateur } from "../modelePlateforme/utilisateur";
import { ErreurSerializable } from "../erreur/erreurSerializable";
import { InformationSerializable } from "../information/informationSerializable";

import ModalErreur from "./composants/modalErreur";

import "../../scss/vues/vueAuthentification.scss";

import { Component, Prop, Vue, Ref } from "vue-property-decorator";

@Component({
    template: require("./templates/vueAuthentification.html"),
    components: {
        ModalErreur
    }
})
export default class VueAuthentification extends Vue implements IVuePlateforme {
    @Prop() private plateforme!: Plateforme;
    @Prop() private controleurAuthentification!: ControleurAuthentification;

    @Ref("modalErreur") readonly modalErreur!: ModalErreur;

    public afficheErreur(erreur: ErreurSerializable): void {
        this.modalErreur.afficherErreur(erreur);
    }

    public afficheInformation(information: InformationSerializable): void {

    }

    private initialiserEvenements(): void {
        $("#buttonConnecterUtilisateur").on("click", () => {
            this.onClickConnecterUtilisateur();
        });
    }

    private creerUtilisateur(): Utilisateur {
        var utilisateur = new Utilisateur();
        utilisateur.NomUtilisateur = $("#inputNomUtilisateur").val() as string;
        utilisateur.MotDePasseUtilisateur = $("#inputMotDePasseUtilisateur").val() as string;
        return utilisateur;
    }

    public constructor() {
        super();
    }

    mounted() {
        this.controleurAuthentification.inscrire(this);
        this.initialiserEvenements();
    }

    beforeDestroy() {
        this.controleurAuthentification.resilier(this);
    }

    private onClickConnecterUtilisateur(): void {
        $.when(this.controleurAuthentification.connecterUtilisateur(this.creerUtilisateur())).done(() => {
            this.$router.push("accueil");
        });
    }

}