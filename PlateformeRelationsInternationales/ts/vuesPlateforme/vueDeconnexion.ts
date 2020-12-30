import { IVuePlateforme } from "../ivuePlateforme";
import { Plateforme } from "../modelePlateforme/plateforme";
import { ControleurAuthentification } from "../controleursPlateforme/controleurAuthentification";
import { ErreurSerializable } from "../erreur/erreurSerializable";
import { InformationSerializable } from "../information/informationSerializable";
import { Utilisateur } from "../modelePlateforme/utilisateur";

import ModalErreur from "./composants/modalErreur";

import "../../scss/vues/vueDeconnexion.scss";

import { Component, Prop, Vue, Ref } from "vue-property-decorator";

@Component({
    template: require("./templates/vueDeconnexion.html"),
    components: {
        ModalErreur
    }
})
export default class VueDeconnexion extends Vue implements IVuePlateforme {
    @Prop() private plateforme!: Plateforme;
    @Prop() private controleurAuthentification!: ControleurAuthentification;

    @Ref("modalErreur") readonly modalErreur!: ModalErreur;

    public afficheErreur(erreur: ErreurSerializable): void {
        this.modalErreur.afficherErreur(erreur);
    }

    public afficheInformation(information: InformationSerializable): void {

    }

    public constructor() {
        super();
    }

    mounted() {
        this.controleurAuthentification.inscrire(this);
        if (this.plateforme.UtilisateurConnecte != null) {
            this.controleurAuthentification.deconnecterUtilisateur(this.plateforme.UtilisateurConnecte);
        }
    }

    beforeDestroy() {
        this.controleurAuthentification.resilier(this);
    }

}