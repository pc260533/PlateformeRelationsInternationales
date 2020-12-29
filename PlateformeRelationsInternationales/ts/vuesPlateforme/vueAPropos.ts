import { IVuePlateforme } from "../ivuePlateforme";
import { Plateforme } from "../modelePlateforme/plateforme";
import { ControleurPlateforme } from "../controleurPlateforme";
import { ErreurSerializable } from "../erreur/erreurSerializable";
import { InformationSerializable } from "../information/informationSerializable";

import ModalErreur from "./composants/modalErreur";

import imageAPropos from "../../images/apropos/apropos.png";

import "../../scss/vues/vueAPropos.scss";

import { Component, Prop, Vue, Ref } from "vue-property-decorator";

@Component({
    template: require("./templates/vueAPropos.html"),
    components: {
        ModalErreur
    }
})
export default class VueAPropos extends Vue implements IVuePlateforme {
    @Prop() private plateforme!: Plateforme;
    @Prop() private controleurPlateforme!: ControleurPlateforme;

    private nomApplication: string;
    private versionApplication: string;
    private databaseHostApplication: string;
    private listeCreditsClientsApplication: any[];
    private listeCreditsServeursApplication: any[];
    private listeAuteursApplication: any[];

    @Ref("modalErreur") readonly modalErreur!: ModalErreur;

    public afficheErreur(erreur: ErreurSerializable): void {
        this.modalErreur.afficherErreur(erreur);
    }

    public afficheInformation(information: InformationSerializable): void {

    }

    public constructor() {
        super();
        this.controleurPlateforme.inscrire(this);
        this.nomApplication = process.env.NOM_APPLICATION;
        this.versionApplication = process.env.VERSION_APPLICATION;
        this.databaseHostApplication = process.env.DATASOURCENAME_BASEDEDONNEEPLATEFORME;
        this.listeCreditsClientsApplication = JSON.parse(process.env.LISTECREDITSCLIENTS_APPLICATION);
        this.listeCreditsServeursApplication = JSON.parse(process.env.LISTECREDITSSERVEURS_APPLICATION);
        this.listeAuteursApplication = JSON.parse(process.env.AUTEURS_APPLICATION);
    }

    mounted() {
        $("#imageAPropos").attr("src", imageAPropos);
    }

    beforeDestroy() {
        this.controleurPlateforme.resilier(this);
    }

}